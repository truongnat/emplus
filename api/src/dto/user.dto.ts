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

const updateProfileSchema = z.object({
  fullName: optionalTrimmedString(),
  nickname: optionalTrimmedString(),
  avatarUrl: optionalTrimmedString(),
  gender: normalizedGenderSchema.optional(),
  dob: z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, isoDateString("dob phải theo định dạng YYYY-MM-DD.").optional()),
  timezone: optionalTrimmedString(),
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
