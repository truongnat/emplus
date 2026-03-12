import { createHash } from "node:crypto";
import { OAuth2Client } from "google-auth-library";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { env } from "../config/env.ts";
import type { AuthProvider } from "../types.ts";
import { AppError } from "../utils/http.ts";

export interface VerifiedIdentity {
  authId: string;
  email?: string;
  emailVerified?: boolean;
}

const googleClient = new OAuth2Client();
const appleJwks = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));

function fallbackIdentity(provider: AuthProvider, idToken: string): VerifiedIdentity {
  const digest = createHash("sha256").update(`${provider}:${idToken}`).digest("hex").slice(0, 24);
  return {
    authId: digest,
  };
}

function canUseMock(idToken: string): boolean {
  return env.allowMockOAuth && idToken.startsWith("dev_");
}

async function verifyGoogleToken(idToken: string): Promise<VerifiedIdentity> {
  if (env.googleClientIds.length === 0 && !env.allowMockOAuth) {
    throw new AppError(
      500,
      "GOOGLE_CLIENT_ID_MISSING",
      "Thiếu GOOGLE_CLIENT_IDS (hoặc GOOGLE_CLIENT_ID) để xác minh Google OAuth.",
    );
  }

  if (env.googleClientIds.length === 0 && canUseMock(idToken)) {
    return fallbackIdentity("GOOGLE", idToken);
  }

  if (env.googleClientIds.length === 0) {
    throw new AppError(400, "OAUTH_CONFIG_MISSING", "Google OAuth chưa được cấu hình để xác minh token thật.");
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.googleClientIds,
    });

    const payload = ticket.getPayload();
    if (!payload?.sub) {
      throw new AppError(401, "INVALID_GOOGLE_TOKEN", "Google token không chứa trường subject.");
    }

    return {
      authId: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified,
    };
  } catch (error) {
    if (canUseMock(idToken)) {
      return fallbackIdentity("GOOGLE", idToken);
    }

    throw new AppError(401, "INVALID_GOOGLE_TOKEN", "Xác minh Google idToken thất bại.", [String(error)]);
  }
}

async function verifyAppleToken(idToken: string): Promise<VerifiedIdentity> {
  if (env.appleAudiences.length === 0 && !env.allowMockOAuth) {
    throw new AppError(
      500,
      "APPLE_AUDIENCE_MISSING",
      "Thiếu APPLE_AUDIENCES (hoặc APPLE_AUDIENCE) để xác minh Apple OAuth.",
    );
  }

  if (env.appleAudiences.length === 0 && canUseMock(idToken)) {
    return fallbackIdentity("APPLE", idToken);
  }

  if (env.appleAudiences.length === 0) {
    throw new AppError(400, "OAUTH_CONFIG_MISSING", "Apple OAuth chưa được cấu hình để xác minh token thật.");
  }

  try {
    const verified = await jwtVerify(idToken, appleJwks, {
      issuer: env.appleIssuer,
      audience: env.appleAudiences,
    });

    const subject = verified.payload.sub;
    if (!subject) {
      throw new AppError(401, "INVALID_APPLE_TOKEN", "Apple token không chứa trường subject.");
    }

    const email = typeof verified.payload.email === "string" ? verified.payload.email : undefined;
    const emailVerified = verified.payload.email_verified === true || verified.payload.email_verified === "true";

    return {
      authId: subject,
      email,
      emailVerified,
    };
  } catch (error) {
    if (canUseMock(idToken)) {
      return fallbackIdentity("APPLE", idToken);
    }

    throw new AppError(401, "INVALID_APPLE_TOKEN", "Xác minh Apple idToken thất bại.", [String(error)]);
  }
}

export async function verifyIdentity(provider: AuthProvider, idToken: string): Promise<VerifiedIdentity> {
  if (provider === "LOCAL") {
    throw new AppError(400, "UNSUPPORTED_PROVIDER", "Nhà cung cấp LOCAL không hỗ trợ xác minh OAuth idToken.");
  }

  if (provider === "GOOGLE") {
    return verifyGoogleToken(idToken);
  }

  return verifyAppleToken(idToken);
}
