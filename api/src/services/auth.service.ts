/**
 * Auth service - handles authentication business logic
 */

import { store } from "../store.ts";
import type { User } from "../types.ts";
import {
  ACCESS_TOKEN_TTL_SECONDS,
  DEFAULT_TIMEZONE,
  LOGIN_RATE_LIMIT_COUNT,
  LOGIN_RATE_LIMIT_WINDOW_SECONDS,
  OTP_RATE_LIMIT_COUNT,
  OTP_RATE_LIMIT_WINDOW_SECONDS,
  OTP_MAX_VERIFY_ATTEMPTS,
  OTP_TTL_SECONDS,
  REFRESH_TOKEN_TTL_SECONDS,
} from "../constants/index.ts";
import { generateTokens } from "../shared/token.ts";
import { generateNumericCode } from "../shared/code.ts";
import { hashPassword, verifyPassword } from "../utils/password.ts";
import { displayGender, normalizeGenderInput } from "../utils/presentation.ts";
import { sendNewSignupAlertMail, sendOtpMail } from "./mail.ts";
import { AppError } from "../utils/http.ts";
import { encrypt, decrypt } from "./crypto.ts";

export interface AuthPayload {
  user: {
    id: string;
    email: string;
    fullName: string;
    isPaired: boolean;
    isAdmin: boolean;
    gender: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

/**
 * Issue authentication payload for a user
 */
export async function issueAuthPayload(user: User): Promise<AuthPayload> {
  const { accessToken, refreshToken } = generateTokens();

  await Promise.all([
    store.saveSession(accessToken, user.id, ACCESS_TOKEN_TTL_SECONDS),
    store.saveRefreshSession(refreshToken, user.id, REFRESH_TOKEN_TTL_SECONDS),
  ]);

  const isPaired = Boolean(await store.getActiveCoupleForUser(user.id));

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isPaired,
      isAdmin: user.isAdmin || false,
      gender: displayGender(user.gender),
    },
    tokens: {
      accessToken,
      refreshToken,
      expiresIn: ACCESS_TOKEN_TTL_SECONDS,
    },
  };
}

/**
 * Create a new user from register input
 */
export async function createUser(
  email: string,
  password: string,
  fullName?: string,
  gender?: string,
): Promise<User> {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    email,
    fullName: fullName || email.split("@")[0] || "Người dùng Em+",
    gender: normalizeGenderInput(gender),
    authProvider: "LOCAL",
    authId: email,
    passwordHash: hashPassword(password),
    timezone: DEFAULT_TIMEZONE,
    emailNotificationsEnabled: true,
    profilePrivate: false,
    showOnlineStatus: true,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Register a new user
 */
export async function registerUser(
  email: string,
  password: string,
  fullName?: string,
  gender?: string,
): Promise<AuthPayload> {
  const existing = await store.findUserByEmail(email);
  if (existing) {
    throw new AppError(409, "EMAIL_ALREADY_EXISTS", "Email đã được đăng ký");
  }

  const user = await createUser(email, password, fullName, gender);
  await store.saveUser(user);
  void sendNewSignupAlertMail({
    userEmail: user.email,
    fullName: user.fullName,
    source: "register",
  });

  return issueAuthPayload(user);
}

/**
 * Login with email and password
 */
export async function loginUser(
  email: string,
  password: string,
): Promise<AuthPayload | { requiresOTP: boolean }> {
  // Rate limit check for login attempts
  const loginRateLimitKey = `login:${email}`;
  const loginCount = await store.getRateLimitCount(loginRateLimitKey);
  if (loginCount >= LOGIN_RATE_LIMIT_COUNT) {
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.");
  }
  await store.incrementRateLimit(loginRateLimitKey, LOGIN_RATE_LIMIT_WINDOW_SECONDS);

  // Rate limit check for OTP sending
  const otpRateLimitKey = `otp:send:${email}`;
  const otpCount = await store.getRateLimitCount(otpRateLimitKey);
  if (otpCount >= OTP_RATE_LIMIT_COUNT) {
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã yêu cầu OTP quá nhiều lần. Vui lòng thử lại sau.");
  }

  const user = await store.findUserByEmail(email);

  if (user) {
    if (user.authProvider !== "LOCAL" || typeof user.passwordHash !== "string") {
      throw new AppError(401, "INVALID_CREDENTIALS", "Email hoặc mật khẩu không đúng.");
    }

    if (!verifyPassword(password, user.passwordHash)) {
      throw new AppError(401, "INVALID_CREDENTIALS", "Email hoặc mật khẩu không đúng.");
    }

    // Password correct, user found -> Standard login
    return issueAuthPayload(user);
  } else {
    // User not found -> Start lazy registration/OTP flow
    // 1. Generate OTP
    const otp = generateNumericCode(6);

    // 2. Save OTP (with password to be set once verified)
    await store.saveOtp(email, encrypt(JSON.stringify({ otp, password })), OTP_TTL_SECONDS);
    await store.incrementRateLimit(otpRateLimitKey, OTP_RATE_LIMIT_WINDOW_SECONDS);

    // 3. Send Mail
    await sendOtpMail(email, otp);

    return { requiresOTP: true };
  }
}

/**
 * Verify OTP and create or login user
 */
export async function verifyOtpAndLogin(email: string, otp: string): Promise<AuthPayload> {
  // Rate limit check for OTP verify attempts
  const verifyRateLimitKey = `otp:verify:${email}`;
  const verifyCount = await store.getRateLimitCount(verifyRateLimitKey);

  if (verifyCount >= OTP_MAX_VERIFY_ATTEMPTS) {
    await store.deleteOtp(email);
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã nhập sai mã OTP quá nhiều lần. Vui lòng yêu cầu mã mới.");
  }

  const rawOtpStr = await store.getOtp(email);
  if (!rawOtpStr) {
    throw new AppError(401, "EXPIRED_OTP", "Mã OTP đã hết hạn hoặc không tồn tại.");
  }

  const { otp: storedOtp, password } = JSON.parse(decrypt(rawOtpStr));

  if (storedOtp !== otp) {
    await store.incrementRateLimit(verifyRateLimitKey, OTP_TTL_SECONDS);
    throw new AppError(401, "INVALID_OTP", "Mã OTP không chính xác.");
  }

  await store.deleteRateLimitCount(verifyRateLimitKey);
  await store.deleteOtp(email);

  let user = await store.findUserByEmail(email);
  if (!user) {
    user = await createUser(email, password, email.split("@")[0], "PREFER_NOT_TO_SAY");
    await store.saveUser(user);
    void sendNewSignupAlertMail({
      userEmail: user.email,
      fullName: user.fullName,
      source: "otp",
    });
  }

  if (!user) {
    throw new AppError(500, "USER_CREATION_FAILED", "Không thể tạo tài khoản.");
  }

  return issueAuthPayload(user);
}

/**
 * Refresh token - get new token pair from refresh token
 */
export async function refreshToken(refreshToken: string): Promise<AuthPayload> {
  const user = await store.consumeRefreshSession(refreshToken);
  if (!user || !user.isActive) {
    throw new AppError(401, "INVALID_REFRESH_TOKEN", "Refresh token không hợp lệ hoặc đã hết hạn.");
  }

  return issueAuthPayload(user);
}

/**
 * Logout - invalidate access token and refresh token
 */
export async function logout(userId: string, accessToken?: string, refreshToken?: string): Promise<void> {
  // If access token provided, delete the session
  if (accessToken) {
    await store.deleteSession(accessToken);
  }

  // If refresh token provided, delete the refresh session
  if (refreshToken) {
    await store.deleteRefreshSession(refreshToken);
  }
}

/**
 * Request password reset - send OTP to email
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean }> {
  // Rate limit check for OTP sending
  const otpRateLimitKey = `otp:reset:${email}`;
  const otpCount = await store.getRateLimitCount(otpRateLimitKey);
  if (otpCount >= OTP_RATE_LIMIT_COUNT) {
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã yêu cầu đặt lại mật khẩu quá nhiều lần. Vui lòng thử lại sau.");
  }

  const user = await store.findUserByEmail(email);

  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Email chưa được đăng ký trong hệ thống.");
  }

  const otp = generateNumericCode(6);

  await store.saveOtp(`reset:${email}`, encrypt(JSON.stringify({ otp })), OTP_TTL_SECONDS);
  await store.incrementRateLimit(otpRateLimitKey, OTP_RATE_LIMIT_WINDOW_SECONDS);

  // Send Mail
  await sendOtpMail(email, otp);

  return { success: true };
}

/**
 * Reset password using OTP
 */
export async function resetPassword(email: string, otp: string, newPassword: string): Promise<{ success: boolean }> {
  // Rate limit check for reset OTP verify attempts
  const verifyRateLimitKey = `otp:verify:reset:${email}`;
  const verifyCount = await store.getRateLimitCount(verifyRateLimitKey);

  if (verifyCount >= OTP_MAX_VERIFY_ATTEMPTS) {
    await store.deleteOtp(`reset:${email}`);
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã nhập sai mã OTP quá nhiều lần. Vui lòng yêu cầu mã mới.");
  }

  const rawResetStr = await store.getOtp(`reset:${email}`);
  if (!rawResetStr) {
    throw new AppError(401, "EXPIRED_OTP", "Mã OTP đã hết hạn hoặc không tồn tại.");
  }

  const { otp: storedOtp } = JSON.parse(decrypt(rawResetStr));

  if (storedOtp !== otp) {
    await store.incrementRateLimit(verifyRateLimitKey, OTP_TTL_SECONDS);
    throw new AppError(401, "INVALID_OTP", "Mã OTP không chính xác.");
  }

  const user = await store.findUserByEmail(email);
  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Không thể tìm thấy tài khoản.");
  }

  // OTP Valid -> Update password
  user.passwordHash = hashPassword(newPassword);
  user.updatedAt = new Date().toISOString();
  await store.saveUser(user);

  await store.deleteRateLimitCount(verifyRateLimitKey);
  await store.deleteOtp(`reset:${email}`);

  // Invalidate all active sessions for security
  // Note: For simplicity, we assume users will log in again. 
  // A complete implementation might clear sessions from the store.

  return { success: true };
}
