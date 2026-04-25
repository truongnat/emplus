import { z } from "zod";

/**
 * Auth Schemas for React Hook Form
 */
export const AuthFlowSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  policyAccepted: z.boolean().refine((val) => val === true, {
    message: "Bạn phải đồng ý với Chính sách & Bảo mật để tiếp tục",
  }),
});

export const OtpSchema = z.object({
  otp: z.string().length(6, "Mã OTP phải có 6 chữ số"),
});

export const RegisterSchema = z
  .object({
    fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: z.string().trim().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string().min(8, "Xác nhận mật khẩu là bắt buộc"),
    gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"], {
      message: "Vui lòng chọn giới tính",
    }),
    policyAccepted: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với Chính sách & Bảo mật để tiếp tục",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
});

export const ResetPasswordSchema = z
  .object({
    otp: z.string().length(6, "Mã OTP phải có 6 chữ số"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string().min(8, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type AuthFlowFields = z.infer<typeof AuthFlowSchema>;
export type OtpFields = z.infer<typeof OtpSchema>;
export type RegisterFields = z.infer<typeof RegisterSchema>;
export type ForgotPasswordFields = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;
