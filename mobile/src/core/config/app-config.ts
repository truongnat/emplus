import env from "./env";

/**
 * Unified Application Configuration.
 * Centralizes environment-dependent values (via env.ts) and static business logic constants.
 */
export const appConfig = {
  // Environment (from env.ts)
  env: {
    apiBase: env.apiBase,
    isDevelopment: env.isDevelopment,
    isProduction: env.isProduction,
    isTest: env.isTest,
  },

  // Storage Keys (Persistence)
  storage: {
    authTokens: "emplus.auth.tokens.v1", // SecureStore
    userMetadata: "emplus.user.meta.v1", // AsyncStorage
    appSettings: "emplus.settings.v1", // AsyncStorage
    onboarding: "emplus.onboarding.v1", // AsyncStorage
    /** Email ghi nhớ trên màn login (không phải token). */
    loginRememberEmail: "emplus.login.rememberEmail.v1",
    /** Người dùng bật đăng ký thông báo đẩy (`1` / `0`). Mặc định khi chưa lưu: coi như bật (hành vi cũ). */
    pushNotificationsEnabled: "emplus.settings.pushNotifications.enabled.v1",
    /** Ngày quan trọng đầu tiên cho user chưa ghép đôi. */
    soloImportantDate: "emplus.solo.importantDate.v1",
  },

  // Authentication & Session
  auth: {
    activeRefreshCoolDownMs: 30_000,
    silentRefreshBufferMs: 60_000,
  },

  // API & TanStack Query
  api: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    timeoutMs: 15_000,
  },

  /** Realtime: `EXPO_PUBLIC_LIVE_WS_ENABLED=false` tắt WS (kill switch). */
  features: {
    liveWebSocket: env.liveWebSocketEnabled,
  },

  // Other constants
  brand: {
    name: "Em+",
  },
} as const;

export default appConfig;
