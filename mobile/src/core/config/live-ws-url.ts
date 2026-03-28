import appConfig from "./app-config";

/**
 * URL WebSocket cho `GET /v1/live/ws` — cùng host với `EXPO_PUBLIC_API_BASE`, đổi http→ws / https→wss.
 * Query: `token`, `coupleId` (theo contract server).
 */
export function buildLiveWebSocketUrl(token: string, coupleId: string): string {
  const u = new URL(appConfig.env.apiBase);
  u.protocol = u.protocol === "https:" ? "wss:" : "ws:";
  const prefix = u.pathname.replace(/\/$/, "");
  u.pathname = `${prefix}/live/ws`;
  u.search = "";
  u.searchParams.set("token", token);
  u.searchParams.set("coupleId", coupleId);
  return u.toString();
}
