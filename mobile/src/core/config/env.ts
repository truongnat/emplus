import zod from "zod";

const envSchema = zod.object({
  EXPO_PUBLIC_API_BASE: zod.string().url().default("http://localhost:3000/v1"),
  NODE_ENV: zod
    .enum(["development", "production", "test"])
    .default("development"),
});

const env = envSchema.parse(process.env);

export default {
  apiBase: env.EXPO_PUBLIC_API_BASE,
  isDevelopment: env.NODE_ENV === "development",
  isProduction: env.NODE_ENV === "production",
  isTest: env.NODE_ENV === "test",
} as const;
