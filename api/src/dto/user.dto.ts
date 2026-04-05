import { z } from "zod";
import { GENDER_VALUES } from "../constants/index.ts";
import { isoDateString, optionalTrimmedString, parseWithSchema } from "../shared/validators/zod.ts";

const acceptedGenderValues = [...GENDER_VALUES, "MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"] as const;

const normalizedGenderSchema = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }
  return value.trim().toUpperCase();
}, z.enum(acceptedGenderValues));

/**
 * URL tuyệt đối http(s) cho ảnh đã upload (MinIO).
 * Chuỗi rỗng = xóa ảnh (ghi đè bằng null trong DB).
 */
function optionalHttpImageUrl(fieldLabel: string) {
  return z.preprocess((value) => {
    if (value == null) {
      return undefined;
    }
    if (typeof value !== "string") {
      return value;
    }
    return value.trim();
  }, z
    .union([
      z.literal(""),
      z
        .string()
        .max(2000, `${fieldLabel} tối đa 2000 ký tự.`)
        .refine((s) => /^https?:\/\//i.test(s), {
          message: `${fieldLabel} phải là URL http hoặc https.`,
        }),
    ])
    .optional());
}

const updateProfileSchema = z.object({
  fullName: optionalTrimmedString(),
  nickname: optionalTrimmedString(),
  avatarUrl: optionalHttpImageUrl("avatarUrl"),
  profileBackgroundUrl: optionalHttpImageUrl("profileBackgroundUrl"),
  gender: normalizedGenderSchema.optional(),
  dob: z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, isoDateString("dob phải theo định dạng YYYY-MM-DD.").optional()),
  timezone: optionalTrimmedString(),
  birthTime: z.preprocess((value) => {
    if (typeof value !== "string") return value;
    const t = value.trim();
    return t === "" ? undefined : t;
  }, z.string().regex(/^\d{2}:\d{2}$/, "birthTime phải theo định dạng HH:mm (24h).").optional()),
  emailNotificationsEnabled: z.boolean().optional(),
  profilePrivate: z.boolean().optional(),
  showOnlineStatus: z.boolean().optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

export function validateUpdateProfileInput(input: unknown): UpdateProfileDto {
  return parseWithSchema(updateProfileSchema, input, {
    message: "Dữ liệu cập nhật hồ sơ không hợp lệ.",
  });
}

const pushTokenSchema = z.object({
  expoPushToken: z.union([z.string().min(1).max(512), z.null()]),
});

export type PushTokenDto = z.infer<typeof pushTokenSchema>;

export function validatePushTokenInput(input: unknown): PushTokenDto {
  return parseWithSchema(pushTokenSchema, input, {
    message: "Dữ liệu push token không hợp lệ.",
  });
}
