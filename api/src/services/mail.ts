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

export async function sendNotificationEmail(
    email: string,
    title: string,
    body?: string,
): Promise<void> {
    const mailOptions = {
        from: `"Em+" <${env.smtpFrom}>`,
        to: email,
        subject: `Em+: ${title}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #FF4D67; text-align: center;">Em+</h2>
        <p style="font-size: 16px; font-weight: 600;">${title}</p>
        ${body ? `<p style="color: #555;">${body}</p>` : ""}
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888; text-align: center;">
          Bạn nhận email này vì đã bật thông báo qua email trong Em+.
          Để tắt, vào Cài đặt → Thông báo trong ứng dụng.
        </p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        if (env.nodeEnv !== "production") {
            console.log(`[Mail] Đã gửi notification email đến ${email}: ${title}`);
        }
    } catch (error) {
        console.error(`[Mail] Lỗi gửi notification email:`, error);
    }
}

export async function sendOtpMail(email: string, otp: string) {
    const mailOptions = {
        from: `"Em+" <${env.smtpFrom}>`,
        to: email,
        subject: "Mã xác thực Em+",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; borderRadius: 10px;">
        <h2 style="color: #FF4D67; text-align: center;">Xác thực tài khoản Em+</h2>
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
        if (env.nodeEnv !== "production") {
          console.log(`[Mail] Đã gửi OTP đến ${email}`);
        }
    } catch (error) {
        console.error(`[Mail] Lỗi gửi OTP:`, error);
        if (env.nodeEnv !== "production") {
          console.log(`[DEV] OTP cho ${email} là: ${otp}`);
        }
    }
}

export async function sendNewSignupAlertMail(input: {
    userEmail: string;
    fullName: string;
    source: "register" | "otp";
}): Promise<void> {
    if (env.signupAlertEmails.length === 0) {
        if (env.nodeEnv !== "production") {
            console.log(
                `[Mail] Bỏ qua signup alert vì chưa cấu hình SIGNUP_ALERT_EMAILS cho ${input.userEmail}`,
            );
        }
        return;
    }

    const sourceLabel =
        input.source === "register" ? "Đăng ký trực tiếp" : "Tạo tài khoản sau OTP";

    const mailOptions = {
        from: `"Em+" <${env.smtpFrom}>`,
        to: env.signupAlertEmails.join(", "),
        subject: `Em+: Có account mới ${input.userEmail}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #FF4D67; text-align: center;">Có tài khoản Em+ mới</h2>
        <p><strong>Email:</strong> ${input.userEmail}</p>
        <p><strong>Tên hiển thị:</strong> ${input.fullName}</p>
        <p><strong>Nguồn tạo tài khoản:</strong> ${sourceLabel}</p>
        <p><strong>Thời gian:</strong> ${new Date().toISOString()}</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        if (env.nodeEnv !== "production") {
            console.log(
                `[Mail] Đã gửi signup alert cho ${input.userEmail} đến ${env.signupAlertEmails.join(", ")}`,
            );
        }
    } catch (error) {
        console.error("[Mail] Lỗi gửi signup alert:", error);
    }
}
