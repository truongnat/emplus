import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email là bắt buộc.")
  .email("Email chưa đúng định dạng.")
  .transform((value) => value.toLowerCase());

const passwordSchema = z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Mật khẩu là bắt buộc."),
});

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Tên của bạn là bắt buộc.").max(80, "Tên hơi dài rồi."),
  email: emailSchema,
  password: passwordSchema,
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]).default("OTHER"),
});

export const verifyOtpSchema = z.object({
  email: emailSchema,
  otp: z
    .string()
    .trim()
    .min(4, "Nhập mã OTP trong email.")
    .max(8, "Mã OTP quá dài."),
});

export type LoginFormValues = z.input<typeof loginSchema>;
export type RegisterFormValues = z.input<typeof registerSchema>;
export type VerifyOtpFormValues = z.input<typeof verifyOtpSchema>;
