import zod from "zod";

const envSchema = zod.object({
  EXPO_PUBLIC_API_BASE: zod.string().url().default("http://localhost:3000/v1"),
  NODE_ENV: zod
    .enum(["development", "production", "test"])
    .default("development"),
  /** `false` tắt kết nối WebSocket live; mọi giá trị khác = bật. */
  EXPO_PUBLIC_LIVE_WS_ENABLED: zod.string().optional(),
});

// Use process.env but handle missing keys gracefully for production
const unsafeEnv = {
  EXPO_PUBLIC_API_BASE: process.env.EXPO_PUBLIC_API_BASE,
  NODE_ENV: process.env.NODE_ENV,
  EXPO_PUBLIC_LIVE_WS_ENABLED: process.env.EXPO_PUBLIC_LIVE_WS_ENABLED,
};

const result = envSchema.safeParse(unsafeEnv);

if (!result.success) {
  console.warn("⚠️ Environment validation failed:", result.error.format());
}

const env = result.success
  ? result.data
  : {
    EXPO_PUBLIC_API_BASE: "http://localhost:3000/v1",
    NODE_ENV: "development" as const,
    EXPO_PUBLIC_LIVE_WS_ENABLED: undefined as string | undefined,
  };

export default {
  apiBase: env.EXPO_PUBLIC_API_BASE,
  isDevelopment: env.NODE_ENV === "development",
  isProduction: env.NODE_ENV === "production",
  isTest: env.NODE_ENV === "test",
  liveWebSocketEnabled: env.EXPO_PUBLIC_LIVE_WS_ENABLED !== "false",
} as const;
