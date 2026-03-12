/**
 * Token generation utilities
 */

import { ACCESS_TOKEN_TTL_SECONDS, REFRESH_TOKEN_TTL_SECONDS } from "../constants/index.ts";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generate access and refresh tokens
 */
export function generateTokens(): TokenPair {
  return {
    accessToken: `at_${crypto.randomUUID()}`,
    refreshToken: `rt_${crypto.randomUUID()}`,
  };
}

/**
 * Verify access token (for WebSocket middleware compatibility)
 * Note: Session-based auth uses store.getUserByToken for verification
 */
export async function verifyAccessToken(_token: string): Promise<{ userId: string }> {
  throw new Error("Use store.getUserByToken for session verification");
}

/**
 * Get token TTL configuration
 */
export function getTokenConfig() {
  return {
    accessTokenTTL: ACCESS_TOKEN_TTL_SECONDS,
    refreshTokenTTL: REFRESH_TOKEN_TTL_SECONDS,
  };
}
