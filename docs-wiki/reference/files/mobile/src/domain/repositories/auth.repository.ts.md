---
title: "mobile/src/domain/repositories/auth.repository.ts"
description: "Provides methods for user authentication and profile management."
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
  page: "reference/files/mobile/src/domain/repositories/auth.repository.ts.md"
  relativePath: "mobile/src/domain/repositories/auth.repository.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/repositories/auth.repository.ts"
  module: "mobile/src/domain/repositories"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/domain/repositories/auth.repository.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/domain/repositories](../../../../../modules/mobile/src/domain/repositories.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/repositories/auth.repository.ts`
- Lines: 64
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Verification](../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Login](../../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Verification](../../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Provides methods for user authentication and profile management.

### Responsibilities

- Register new users
- Authenticate existing users
- Refresh session cookies
- Verify OTPs related to passwords

### Usage Notes

- Note: These methods are part of the AuthModule, which is responsible for handling authentication-related logic. They are not part of the UserModule or any other domain components.

## Public API

- `interface AuthRepository`

## Symbols

### interface `AuthRepository`

- Signature: `interface AuthRepository`
- Lines: 7-63
- Exported: yes

```ts
interface AuthRepository {
  /**
   * Registers a new user account.
   */
  register(
    params: AuthModule.RegisterRequest,
  ): Promise<AuthModule.RegisterResponse>;

  /**
   * Authenticates a user with email and password.
   */
  login(params: AuthModule.LoginRequest): Promise<AuthModule.LoginResponse>;

  /**
   * Refreshes the session using a refresh token.
   */
  refresh(
    params: AuthModule.RefreshRequest,
  ): Promise<AuthModule.RefreshResponse>;

  /**
   * Verifies the OTP and logs the user in.
   */
  verifyOtp(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse>;

  /**
   * Retrieves the current user profile.
   */
  getProfile(): Promise<AuthModule.User>;

  /**
   * Updates the current user profile (partial body).
   */
  updateProfile(
    params: UserModule.UpdateProfileRequest,
  ): Promise<AuthModule.User>;

  /**
   * Sends OTP to email for password reset.
   */
  forgotPassword(
    params: AuthModule.ForgotPasswordRequest,
  ): Promise<AuthModule.ForgotPasswordResponse>;

  /**
   * Sets new password after OTP verification (reset flow).
   */
  resetPassword(
    params: AuthModule.ResetPasswordRequest,
  ): Promise<AuthModule.ResetPasswordResponse>;

  registerPushToken(
    params: UserModule.PushTokenRequest,
  ): Promise<UserModule.PushTokenResponse>;
}
```
