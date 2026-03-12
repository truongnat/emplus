import { z } from "zod";
import { EMAIL_PATTERN, MIN_PASSWORD_LENGTH } from "../constants/index.ts";
import { optionalTrimmedString, parseWithSchema, requiredTrimmedString } from "../shared/validators/zod.ts";

const emailSchema = requiredTrimmedString("Email là bắt buộc")
  .transform((value) => value.toLowerCase())
  .refine((value) => EMAIL_PATTERN.test(value), "Email không hợp lệ");

const passwordSchema = z.string().min(1, "Mật khẩu là bắt buộc").refine(
  (value) => value.length >= MIN_PASSWORD_LENGTH,
  `Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự`,
);

const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: optionalTrimmedString(),
  gender: optionalTrimmedString(),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

const refreshTokenSchema = z.object({
  refreshToken: requiredTrimmedString("Refresh token là bắt buộc"),
});

const verifyOtpSchema = z.object({
  email: emailSchema,
  otp: requiredTrimmedString("Mã OTP là bắt buộc"),
});

const logoutSchema = z.object({
  accessToken: optionalTrimmedString(),
  refreshToken: optionalTrimmedString(),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;
export type LogoutDto = z.infer<typeof logoutSchema>;

export function validateRegisterInput(input: unknown): RegisterDto {
  return parseWithSchema(registerSchema, input, {
    message: "Dữ liệu đăng ký không hợp lệ.",
  });
}

export function validateLoginInput(input: unknown): LoginDto {
  return parseWithSchema(loginSchema, input, {
    message: "Dữ liệu đăng nhập không hợp lệ.",
  });
}

export function validateRefreshTokenInput(input: unknown): RefreshTokenDto {
  return parseWithSchema(refreshTokenSchema, input, {
    message: "Dữ liệu refresh token không hợp lệ.",
  });
}

export function validateVerifyOtpInput(input: unknown): VerifyOtpDto {
  return parseWithSchema(verifyOtpSchema, input, {
    message: "Dữ liệu xác minh OTP không hợp lệ.",
  });
}

export function validateLogoutInput(input: unknown): LogoutDto {
  return parseWithSchema(logoutSchema, input, {
    message: "Dữ liệu đăng xuất không hợp lệ.",
  });
}

export function validateEmail(email: string): void {
  parseWithSchema(emailSchema, email, {
    message: "Email không hợp lệ.",
  });
}

export function validatePassword(password: string): void {
  parseWithSchema(passwordSchema, password, {
    message: "Mật khẩu không hợp lệ.",
  });
}
