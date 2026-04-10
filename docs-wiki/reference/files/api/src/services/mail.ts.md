---
title: "api/src/services/mail.ts"
description: "API function to send email notifications."
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/api/src/services/mail.ts.md"
  relativePath: "api/src/services/mail.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/mail.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/services/mail.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/mail.ts`
- Lines: 79
- Symbols: 2

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

API function to send email notifications.

### Responsibilities

- Objectified string description of the code snippet

### Usage Notes

- Description related to usage, e.g., purpose and boundaries.

## Public API

- `async function sendNotificationEmail( email: string, title: string, body?: string, ): Promise<void>`
- `async function sendOtpMail(email: string, otp: string)`

## Symbols

### function `sendNotificationEmail`

- Signature: `async function sendNotificationEmail( email: string, title: string, body?: string, ): Promise<void>`
- Lines: 14-45
- Exported: yes

```ts
async function sendNotificationEmail(
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
```

### function `sendOtpMail`

- Signature: `async function sendOtpMail(email: string, otp: string)`
- Lines: 47-78
- Exported: yes

```ts
async function sendOtpMail(email: string, otp: string) {
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
```
