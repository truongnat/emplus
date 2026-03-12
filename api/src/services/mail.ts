import nodemailer from "nodemailer";
import { env } from "../config/env.ts";

const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpPort === 465,
    auth: env.smtpUser ? {
        user: env.smtpUser,
        pass: env.smtpPass,
    } : undefined,
});

export async function sendOtpMail(email: string, otp: string) {
    const mailOptions = {
        from: `"Em Plus" <${env.smtpFrom}>`,
        to: email,
        subject: `Mã xác thực OTP của bạn: ${otp}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; borderRadius: 10px;">
        <h2 style="color: #FF4D67; text-align: center;">Xác thực tài khoản Em Plus</h2>
        <p>Chào bạn,</p>
        <p>Để hoàn tất quá trình đăng nhập/đăng ký, vui lòng sử dụng mã OTP dưới đây:</p>
        <div style="background: #f9f9f9; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0; border-radius: 8px;">
          ${otp}
        </div>
        <p>Mã này sẽ hết hạn sau 5 phút. Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888; text-align: center;">Đây là email tự động, vui lòng không trả lời.</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[Mail] Đã gửi OTP đến ${email}`);
    } catch (error) {
        console.error(`[Mail] Lỗi gửi OTP đến ${email}:`, error);
        // Trong môi trường dev, chúng ta vẫn log OTP ra console để test nếu mail server lỗi
        console.log(`[DEV] OTP cho ${email} là: ${otp}`);
    }
}
