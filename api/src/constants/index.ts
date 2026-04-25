// Token TTLs (in seconds)
export const ACCESS_TOKEN_TTL_SECONDS = 15 * 60; // 15 minutes (shortened from 1 hour)
export const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days (shortened from 30 days)

// OTP configuration
export const OTP_TTL_SECONDS = 300; // 5 minutes
export const OTP_LENGTH = 6;
export const OTP_RATE_LIMIT_COUNT = 5;
export const OTP_RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes
export const OTP_MAX_VERIFY_ATTEMPTS = 5; // Max invalid guesses before invalidating OTP

// Rate limiting
export const LOGIN_RATE_LIMIT_COUNT = 10;
export const LOGIN_RATE_LIMIT_WINDOW_SECONDS = 300; // 5 minutes

// Validation
export const MIN_PASSWORD_LENGTH = 8;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Invite configuration
export const INVITE_CODE_TTL_SECONDS = 24 * 60 * 60; // 24 hours

// Budget defaults
export const DEFAULT_BUDGET_AMOUNT = 20000;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// Couple statuses
export const COUPLE_STATUS = {
  PENDING: "PENDING",
  DATING: "DATING",
  MARRIED: "MARRIED",
  SEPARATED: "SEPARATED",
} as const;

// Budget statuses
export const BUDGET_STATUS = {
  PAID: "PAID",
  PENDING: "PENDING",
  OVER_BUDGET: "OVER_BUDGET",
  DRAFT: "DRAFT",
} as const;

// Status display mapping
export const BUDGET_STATUS_DISPLAY: Record<string, string> = {
  "Đã trả": "PAID",
  "Đang chờ": "PENDING",
  "Vượt ngân sách": "OVER_BUDGET",
  "Bản nháp": "DRAFT",
};

// Gender values
export const GENDER_VALUES = ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"] as const;

// Auth providers
export const AUTH_PROVIDER = {
  LOCAL: "LOCAL",
  GOOGLE: "GOOGLE",
  APPLE: "APPLE",
} as const;

// Anniversary categories
export const ANNIVERSARY_CATEGORY = {
  LOVE: "LOVE",
  BIRTHDAY: "BIRTHDAY",
  CUSTOM: "CUSTOM",
  HOLIDAY: "HOLIDAY",
} as const;

// Timezone default
export const DEFAULT_TIMEZONE = "Asia/Ho_Chi_Minh";
