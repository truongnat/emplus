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

export type AuthFlowFields = z.infer<typeof AuthFlowSchema>;
export type OtpFields = z.infer<typeof OtpSchema>;
