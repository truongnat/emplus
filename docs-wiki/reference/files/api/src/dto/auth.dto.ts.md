---
title: "api/src/dto/auth.dto.ts"
description: "Functionality to validate and format user input for various types of authentication and login processes."
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
  page: "reference/files/api/src/dto/auth.dto.ts.md"
  relativePath: "api/src/dto/auth.dto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/dto/auth.dto.ts"
  module: "api/src/dto"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 16
---

# api/src/dto/auth.dto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/dto](../../../../modules/api/src/dto.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/dto/auth.dto.ts`
- Lines: 111
- Symbols: 16

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Order Management Login](../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Storage Login](../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Login](../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Reporting Login](../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

Functionality to validate and format user input for various types of authentication and login processes.

### Responsibilities

- Ensure register, login, refresh token, verification OTP, forgot password, reset password, logout, and email validation are correct in format.
- Format password and email inputs according to their respective schema definitions.

### Usage Notes

- These functions are used throughout the authentication system to validate user input before allowing it to proceed with an action.
- Each function assumes that its corresponding schema (validation logic) will handle any potential errors or invalid data.

## Public API

- `type RegisterDto = z.infer<typeof registerSchema>;`
- `type LoginDto = z.infer<typeof loginSchema>;`
- `type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;`
- `type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;`
- `type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;`
- `type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;`
- `type LogoutDto = z.infer<typeof logoutSchema>;`
- `function validateRegisterInput(input: unknown): RegisterDto`
- `function validateLoginInput(input: unknown): LoginDto`
- `function validateRefreshTokenInput(input: unknown): RefreshTokenDto`
- `function validateVerifyOtpInput(input: unknown): VerifyOtpDto`
- `function validateForgotPasswordInput(input: unknown): ForgotPasswordDto`
- `function validateResetPasswordInput(input: unknown): ResetPasswordDto`
- `function validateLogoutInput(input: unknown): LogoutDto`
- `function validateEmail(email: string): void`
- `function validatePassword(password: string): void`

## Symbols

### type `RegisterDto`

- Signature: `type RegisterDto = z.infer<typeof registerSchema>;`
- Lines: 50-50
- Exported: yes

```ts
type RegisterDto = z.infer<typeof registerSchema>;
```

### type `LoginDto`

- Signature: `type LoginDto = z.infer<typeof loginSchema>;`
- Lines: 51-51
- Exported: yes

```ts
type LoginDto = z.infer<typeof loginSchema>;
```

### type `RefreshTokenDto`

- Signature: `type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;`
- Lines: 52-52
- Exported: yes

```ts
type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
```

### type `VerifyOtpDto`

- Signature: `type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;`
- Lines: 53-53
- Exported: yes

```ts
type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;
```

### type `ForgotPasswordDto`

- Signature: `type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;`
- Lines: 54-54
- Exported: yes

```ts
type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
```

### type `ResetPasswordDto`

- Signature: `type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;`
- Lines: 55-55
- Exported: yes

```ts
type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
```

### type `LogoutDto`

- Signature: `type LogoutDto = z.infer<typeof logoutSchema>;`
- Lines: 56-56
- Exported: yes

```ts
type LogoutDto = z.infer<typeof logoutSchema>;
```

### function `validateRegisterInput`

- Signature: `function validateRegisterInput(input: unknown): RegisterDto`
- Lines: 58-62
- Exported: yes

```ts
function validateRegisterInput(input: unknown): RegisterDto {
  return parseWithSchema(registerSchema, input, {
    message: "Dữ liệu đăng ký không hợp lệ.",
  });
}
```

### function `validateLoginInput`

- Signature: `function validateLoginInput(input: unknown): LoginDto`
- Lines: 64-68
- Exported: yes

```ts
function validateLoginInput(input: unknown): LoginDto {
  return parseWithSchema(loginSchema, input, {
    message: "Dữ liệu đăng nhập không hợp lệ.",
  });
}
```

### function `validateRefreshTokenInput`

- Signature: `function validateRefreshTokenInput(input: unknown): RefreshTokenDto`
- Lines: 70-74
- Exported: yes

```ts
function validateRefreshTokenInput(input: unknown): RefreshTokenDto {
  return parseWithSchema(refreshTokenSchema, input, {
    message: "Dữ liệu refresh token không hợp lệ.",
  });
}
```

### function `validateVerifyOtpInput`

- Signature: `function validateVerifyOtpInput(input: unknown): VerifyOtpDto`
- Lines: 76-80
- Exported: yes

```ts
function validateVerifyOtpInput(input: unknown): VerifyOtpDto {
  return parseWithSchema(verifyOtpSchema, input, {
    message: "Dữ liệu xác minh OTP không hợp lệ.",
  });
}
```

### function `validateForgotPasswordInput`

- Signature: `function validateForgotPasswordInput(input: unknown): ForgotPasswordDto`
- Lines: 82-86
- Exported: yes

```ts
function validateForgotPasswordInput(input: unknown): ForgotPasswordDto {
  return parseWithSchema(forgotPasswordSchema, input, {
    message: "Dữ liệu yêu cầu quên mật khẩu không hợp lệ.",
  });
}
```

### function `validateResetPasswordInput`

- Signature: `function validateResetPasswordInput(input: unknown): ResetPasswordDto`
- Lines: 88-92
- Exported: yes

```ts
function validateResetPasswordInput(input: unknown): ResetPasswordDto {
  return parseWithSchema(resetPasswordSchema, input, {
    message: "Dữ liệu đặt lại mật khẩu không hợp lệ.",
  });
}
```

### function `validateLogoutInput`

- Signature: `function validateLogoutInput(input: unknown): LogoutDto`
- Lines: 94-98
- Exported: yes

```ts
function validateLogoutInput(input: unknown): LogoutDto {
  return parseWithSchema(logoutSchema, input, {
    message: "Dữ liệu đăng xuất không hợp lệ.",
  });
}
```

### function `validateEmail`

- Signature: `function validateEmail(email: string): void`
- Lines: 100-104
- Exported: yes

```ts
function validateEmail(email: string): void {
  parseWithSchema(emailSchema, email, {
    message: "Email không hợp lệ.",
  });
}
```

### function `validatePassword`

- Signature: `function validatePassword(password: string): void`
- Lines: 106-110
- Exported: yes

```ts
function validatePassword(password: string): void {
  parseWithSchema(passwordSchema, password, {
    message: "Mật khẩu không hợp lệ.",
  });
}
```
