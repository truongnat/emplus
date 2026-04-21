export type StoreMode = "memory" | "postgres";

function boolFromEnv(value: string | undefined, fallback: boolean): boolean {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

function numberFromEnv(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function listFromEnv(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isTestEnvironment(): boolean {
  const nodeEnv = (process.env.NODE_ENV ?? "").trim().toLowerCase();
  return nodeEnv === "test";
}

export interface EnvConfig {
  nodeEnv: string;
  storeMode: StoreMode;
  corsAllowedOrigins: string[];
  databaseUrl?: string;
  readDatabaseUrl?: string;
  redisUrl?: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser?: string;
  smtpPass?: string;
  smtpFrom: string;
  signupAlertEmails: string[];
  minioEndpoint?: string;
  minioRegion: string;
  minioAccessKey?: string;
  minioSecretKey?: string;
  minioBucket: string;
  minioUseSsl: boolean;
  /** URL gốc mà app mobile truy cập được (vd. http://192.168.1.5:9000). Mặc định lấy origin của MINIO_ENDPOINT. */
  minioPublicBaseUrl?: string;
  swaggerEnabled: boolean;
  swaggerPath: string;
  allowMockOAuth: boolean;
  googleClientIds: string[];
  appleAudiences: string[];
  appleIssuer?: string;
  defaultBudgetAmount: number;
  fallbackQuotes: string[];
  /** Khi true: user chưa có thông báo nào thì GET /v1/notifications seed vài bản ghi demo (chỉ dev mặc định). */
  fakeInAppNotifications: boolean;
  /** Khi true: couple chưa có memory nào thì GET /v1/timeline/memories seed 10 demo (dev mặc định). */
  fakeTimelineMemories: boolean;
  /** 32-byte hex key for AES-256-GCM encryption at rest. Required in production. */
  dataEncryptionKey?: string;
}

const googleClientIds = listFromEnv(process.env.GOOGLE_CLIENT_IDS);
if (process.env.GOOGLE_CLIENT_ID?.trim()) {
  googleClientIds.push(process.env.GOOGLE_CLIENT_ID.trim());
}

const appleAudiences = listFromEnv(process.env.APPLE_AUDIENCES);
if (process.env.APPLE_AUDIENCE?.trim()) {
  appleAudiences.push(process.env.APPLE_AUDIENCE.trim());
}

const nodeEnv = process.env.NODE_ENV ?? "development";

export const env: EnvConfig = {
  nodeEnv,
  storeMode: process.env.DATA_STORE === "memory" ? "memory" : "postgres",
  corsAllowedOrigins: listFromEnv(process.env.CORS_ALLOWED_ORIGINS),
  databaseUrl: process.env.DATABASE_URL,
  readDatabaseUrl: process.env.READ_DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  smtpHost: process.env.MAIL_HOST ?? "localhost",
  smtpPort: numberFromEnv(process.env.MAIL_PORT, 1025),
  smtpUser: process.env.MAIL_USER,
  smtpPass: process.env.MAIL_PASS,
  smtpFrom: process.env.MAIL_FROM ?? "no-reply@emplus.local",
  signupAlertEmails: listFromEnv(process.env.SIGNUP_ALERT_EMAILS),
  minioEndpoint: process.env.MINIO_ENDPOINT,
  minioRegion: process.env.MINIO_REGION ?? "us-east-1",
  minioAccessKey: process.env.MINIO_ACCESS_KEY,
  minioSecretKey: process.env.MINIO_SECRET_KEY,
  minioBucket: process.env.MINIO_BUCKET ?? "emplus",
  minioUseSsl: boolFromEnv(process.env.MINIO_USE_SSL, false),
  minioPublicBaseUrl: process.env.MINIO_PUBLIC_BASE_URL?.trim() || undefined,
  swaggerEnabled: boolFromEnv(process.env.SWAGGER_ENABLED, nodeEnv !== "production"),
  swaggerPath: process.env.SWAGGER_PATH ?? "/v1/docs",
  allowMockOAuth: isTestEnvironment() && boolFromEnv(process.env.ALLOW_MOCK_OAUTH, false),
  googleClientIds: [...new Set(googleClientIds)],
  appleAudiences: [...new Set(appleAudiences)],
  appleIssuer: process.env.APPLE_ISSUER ?? "https://appleid.apple.com",
  defaultBudgetAmount: numberFromEnv(process.env.DEFAULT_BUDGET_AMOUNT, 20000),
  fallbackQuotes: process.env.FALLBACK_QUOTES
    ? process.env.FALLBACK_QUOTES.split("|")
    : [
        "Tình yêu không phải là nhìn vào mắt nhau, mà là cùng nhau nhìn về một hướng.",
        "Yêu là chấp nhận điều không hoàn hảo để trở nên hoàn hảo hơn.",
        "Hạnh phúc là khi hai trái tim cùng nhịp đập.",
        "Tình yêu đích thực không phải là một ngọn lửa cháy, mà là một ngọn nến cháy trong gió.",
      ],
  fakeInAppNotifications: boolFromEnv(
    process.env.FAKE_IN_APP_NOTIFICATIONS,
    nodeEnv === "development",
  ),
  fakeTimelineMemories: boolFromEnv(
    process.env.FAKE_TIMELINE_MEMORIES,
    nodeEnv === "development",
  ),
  dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY?.trim() || undefined,
};
