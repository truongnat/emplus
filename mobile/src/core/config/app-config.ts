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

  // Other constants
  brand: {
    name: "Em Plus",
  },
} as const;

export default appConfig;
