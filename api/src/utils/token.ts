export function generateTokens(): { accessToken: string; refreshToken: string } {
  return {
    accessToken: `at_${crypto.randomUUID()}`,
    refreshToken: `rt_${crypto.randomUUID()}`,
  };
}

export async function verifyAccessToken(_token: string): Promise<{ userId: string }> {
  // Session-based auth - token verification done via store.getUserByToken
  // This is for WebSocket middleware compatibility
  throw new Error("Use store.getUserByToken for session verification");
}
