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
import { hienThiGioiTinh, chuanHoaGioiTinhDauVao } from "../utils/presentation.ts";
import { sendOtpMail } from "./mail.ts";

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
      gender: hienThiGioiTinh(user.gender),
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
    gender: chuanHoaGioiTinhDauVao(gender),
    authProvider: "LOCAL",
    authId: email,
    passwordHash: hashPassword(password),
    timezone: DEFAULT_TIMEZONE,
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
    const error = new Error("Email đã được đăng ký") as Error & { status: number; code: string };
    error.status = 409;
    error.code = "EMAIL_ALREADY_EXISTS";
    throw error;
  }

  const user = await createUser(email, password, fullName, gender);
  await store.saveUser(user);

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
    const error = new Error("Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.") as Error & { status: number; code: string };
    error.status = 429;
    error.code = "TOO_MANY_REQUESTS";
    throw error;
  }
  await store.incrementRateLimit(loginRateLimitKey, LOGIN_RATE_LIMIT_WINDOW_SECONDS);

  // Rate limit check for OTP sending
  const otpRateLimitKey = `otp:send:${email}`;
  const otpCount = await store.getRateLimitCount(otpRateLimitKey);
  if (otpCount >= OTP_RATE_LIMIT_COUNT) {
    const error = new Error("Bạn đã yêu cầu OTP quá nhiều lần. Vui lòng thử lại sau.") as Error & { status: number; code: string };
    error.status = 429;
    error.code = "TOO_MANY_REQUESTS";
    throw error;
  }

  const user = await store.findUserByEmail(email);

  if (user) {
    // If user exists, check password
    if (user.authProvider !== "LOCAL" || typeof user.passwordHash !== "string") {
      const error = new Error("Email hoặc mật khẩu không đúng.") as Error & { status: number; code: string };
      error.status = 401;
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }

    if (!verifyPassword(password, user.passwordHash)) {
      const error = new Error("Email hoặc mật khẩu không đúng.") as Error & { status: number; code: string };
      error.status = 401;
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }

    // Password correct, user found -> Standard login
    return issueAuthPayload(user);
  } else {
    // User not found -> Start lazy registration/OTP flow
    // 1. Generate OTP
    const otp = generateNumericCode(6);

    // 2. Save OTP (with password to be set once verified)
    await store.saveOtp(email, JSON.stringify({ otp, password }), OTP_TTL_SECONDS);
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
    await store.deleteOtp(email); // Invalidate OTP completely
    const error = new Error("Bạn đã nhập sai mã OTP quá nhiều lần. Vui lòng yêu cầu mã mới.") as Error & { status: number; code: string };
    error.status = 429;
    error.code = "TOO_MANY_REQUESTS";
    throw error;
  }

  const storedDataStr = await store.getOtp(email);
  if (!storedDataStr) {
    const error = new Error("Mã OTP đã hết hạn hoặc không tồn tại.") as Error & { status: number; code: string };
    error.status = 401;
    error.code = "EXPIRED_OTP";
    throw error;
  }

  const { otp: storedOtp, password } = JSON.parse(storedDataStr);

  if (storedOtp !== otp) {
    await store.incrementRateLimit(verifyRateLimitKey, OTP_TTL_SECONDS); // Keep verify limit alive for OTP TTL
    const error = new Error("Mã OTP không chính xác.") as Error & { status: number; code: string };
    error.status = 401;
    error.code = "INVALID_OTP";
    throw error;
  }

  // OTP Valid -> Clear verify limits and OTP
  await store.deleteRateLimitCount(verifyRateLimitKey);
  await store.deleteOtp(email);

  let user = await store.findUserByEmail(email);
  if (!user) {
    user = await createUser(email, password, email.split("@")[0], "KHONG_TIET_LO");
    await store.saveUser(user);
  }

  if (!user) {
    const error = new Error("Không thể tạo tài khoản.") as Error & { status: number; code: string };
    error.status = 500;
    error.code = "USER_CREATION_FAILED";
    throw error;
  }

  return issueAuthPayload(user);
}

/**
 * Refresh token - get new token pair from refresh token
 */
export async function refreshToken(refreshToken: string): Promise<AuthPayload> {
  const user = await store.consumeRefreshSession(refreshToken);
  if (!user || !user.isActive) {
    const error = new Error("Refresh token không hợp lệ hoặc đã hết hạn.") as Error & { status: number; code: string };
    error.status = 401;
    error.code = "INVALID_REFRESH_TOKEN";
    throw error;
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
    const error = new Error("Bạn đã yêu cầu đặt lại mật khẩu quá nhiều lần. Vui lòng thử lại sau.") as Error & { status: number; code: string };
    error.status = 429;
    error.code = "TOO_MANY_REQUESTS";
    throw error;
  }

  const user = await store.findUserByEmail(email);

  if (!user) {
    const error = new Error("Email chưa được đăng ký trong hệ thống.") as Error & { status: number; code: string };
    error.status = 404;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  const otp = generateNumericCode(6);

  await store.saveOtp(`reset:${email}`, JSON.stringify({ otp }), OTP_TTL_SECONDS);
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
    await store.deleteOtp(`reset:${email}`); // Invalidate OTP completely
    const error = new Error("Bạn đã nhập sai mã OTP quá nhiều lần. Vui lòng yêu cầu mã mới.") as Error & { status: number; code: string };
    error.status = 429;
    error.code = "TOO_MANY_REQUESTS";
    throw error;
  }

  const storedDataStr = await store.getOtp(`reset:${email}`);
  if (!storedDataStr) {
    const error = new Error("Mã OTP đã hết hạn hoặc không tồn tại.") as Error & { status: number; code: string };
    error.status = 401;
    error.code = "EXPIRED_OTP";
    throw error;
  }

  const { otp: storedOtp } = JSON.parse(storedDataStr);

  if (storedOtp !== otp) {
    await store.incrementRateLimit(verifyRateLimitKey, OTP_TTL_SECONDS); // Keep verify limit alive for OTP TTL
    const error = new Error("Mã OTP không chính xác.") as Error & { status: number; code: string };
    error.status = 401;
    error.code = "INVALID_OTP";
    throw error;
  }

  const user = await store.findUserByEmail(email);
  if (!user) {
    const error = new Error("Không thể tìm thấy tài khoản.") as Error & { status: number; code: string };
    error.status = 404;
    error.code = "USER_NOT_FOUND";
    throw error;
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
