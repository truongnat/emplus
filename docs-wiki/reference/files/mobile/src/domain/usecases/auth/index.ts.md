---
title: "mobile/src/domain/usecases/auth/index.ts"
description: "LoginUseCase class."
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
  page: "reference/files/mobile/src/domain/usecases/auth/index.ts.md"
  relativePath: "mobile/src/domain/usecases/auth/index.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/usecases/auth/index.ts"
  module: "mobile/src/domain/usecases/auth"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 27
---

# mobile/src/domain/usecases/auth/index.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/domain/usecases/auth](../../../../../../modules/mobile/src/domain/usecases/auth.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/usecases/auth/index.ts`
- Lines: 104
- Symbols: 27

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Notify](../../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Notifications Login](../../../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Storage Login](../../../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Authentication Verification](../../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Login](../../../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Notify](../../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [Search Create](../../../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Reporting Login](../../../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Verification](../../../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Notify](../../../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Administration Verification](../../../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

LoginUseCase class.

### Usage Notes

- The usage notes section can be used to gather information about the specific use case being implemented.
- Note that some methods may not have any usage notes if they do not make sense in a real-world context.

## Public API

- `class LoginUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute( params: AuthModule.LoginRequest, ): Promise<AuthModule.LoginResponse>`
- `class RegisterUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute( params: AuthModule.RegisterRequest, ): Promise<AuthModule.RegisterResponse>`
- `class RefreshSessionUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute(refreshToken: string): Promise<AuthModule.RefreshResponse>`
- `class VerifyOtpUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute( params: AuthModule.VerifyOtpRequest, ): Promise<AuthModule.VerifyOtpResponse>`
- `class GetProfileUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute(): Promise<AuthModule.User>`
- `class UpdateProfileUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute( params: UserModule.UpdateProfileRequest, ): Promise<AuthModule.User>`
- `class RequestPasswordResetUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute( params: AuthModule.ForgotPasswordRequest, ): Promise<AuthModule.ForgotPasswordResponse>`
- `class ResetPasswordUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute( params: AuthModule.ResetPasswordRequest, ): Promise<AuthModule.ResetPasswordResponse>`
- `class RegisterPushTokenUseCase`
- `constructor(private authRepository: AuthRepository)`
- `async execute( params: UserModule.PushTokenRequest, ): Promise<UserModule.PushTokenResponse>`

## Symbols

### class `LoginUseCase`

- Signature: `class LoginUseCase`
- Lines: 7-15
- Exported: yes

```ts
class LoginUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.LoginRequest,
  ): Promise<AuthModule.LoginResponse> {
    return this.authRepository.login(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 8-8
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute( params: AuthModule.LoginRequest, ): Promise<AuthModule.LoginResponse>`
- Lines: 10-14
- Exported: yes

```ts
async execute(
    params: AuthModule.LoginRequest,
  ): Promise<AuthModule.LoginResponse> {
    return this.authRepository.login(params);
  }
```

### class `RegisterUseCase`

- Signature: `class RegisterUseCase`
- Lines: 20-28
- Exported: yes

```ts
class RegisterUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.RegisterRequest,
  ): Promise<AuthModule.RegisterResponse> {
    return this.authRepository.register(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 21-21
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute( params: AuthModule.RegisterRequest, ): Promise<AuthModule.RegisterResponse>`
- Lines: 23-27
- Exported: yes

```ts
async execute(
    params: AuthModule.RegisterRequest,
  ): Promise<AuthModule.RegisterResponse> {
    return this.authRepository.register(params);
  }
```

### class `RefreshSessionUseCase`

- Signature: `class RefreshSessionUseCase`
- Lines: 33-39
- Exported: yes

```ts
class RefreshSessionUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(refreshToken: string): Promise<AuthModule.RefreshResponse> {
    return this.authRepository.refresh({ refreshToken });
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 34-34
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute(refreshToken: string): Promise<AuthModule.RefreshResponse>`
- Lines: 36-38
- Exported: yes

```ts
async execute(refreshToken: string): Promise<AuthModule.RefreshResponse> {
    return this.authRepository.refresh({ refreshToken });
  }
```

### class `VerifyOtpUseCase`

- Signature: `class VerifyOtpUseCase`
- Lines: 44-52
- Exported: yes

```ts
class VerifyOtpUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse> {
    return this.authRepository.verifyOtp(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 45-45
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute( params: AuthModule.VerifyOtpRequest, ): Promise<AuthModule.VerifyOtpResponse>`
- Lines: 47-51
- Exported: yes

```ts
async execute(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse> {
    return this.authRepository.verifyOtp(params);
  }
```

### class `GetProfileUseCase`

- Signature: `class GetProfileUseCase`
- Lines: 57-63
- Exported: yes

```ts
class GetProfileUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(): Promise<AuthModule.User> {
    return this.authRepository.getProfile();
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 58-58
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute(): Promise<AuthModule.User>`
- Lines: 60-62
- Exported: yes

```ts
async execute(): Promise<AuthModule.User> {
    return this.authRepository.getProfile();
  }
```

### class `UpdateProfileUseCase`

- Signature: `class UpdateProfileUseCase`
- Lines: 65-73
- Exported: yes

```ts
class UpdateProfileUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: UserModule.UpdateProfileRequest,
  ): Promise<AuthModule.User> {
    return this.authRepository.updateProfile(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 66-66
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute( params: UserModule.UpdateProfileRequest, ): Promise<AuthModule.User>`
- Lines: 68-72
- Exported: yes

```ts
async execute(
    params: UserModule.UpdateProfileRequest,
  ): Promise<AuthModule.User> {
    return this.authRepository.updateProfile(params);
  }
```

### class `RequestPasswordResetUseCase`

- Signature: `class RequestPasswordResetUseCase`
- Lines: 75-83
- Exported: yes

```ts
class RequestPasswordResetUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.ForgotPasswordRequest,
  ): Promise<AuthModule.ForgotPasswordResponse> {
    return this.authRepository.forgotPassword(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 76-76
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute( params: AuthModule.ForgotPasswordRequest, ): Promise<AuthModule.ForgotPasswordResponse>`
- Lines: 78-82
- Exported: yes

```ts
async execute(
    params: AuthModule.ForgotPasswordRequest,
  ): Promise<AuthModule.ForgotPasswordResponse> {
    return this.authRepository.forgotPassword(params);
  }
```

### class `ResetPasswordUseCase`

- Signature: `class ResetPasswordUseCase`
- Lines: 85-93
- Exported: yes

```ts
class ResetPasswordUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.ResetPasswordRequest,
  ): Promise<AuthModule.ResetPasswordResponse> {
    return this.authRepository.resetPassword(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 86-86
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute( params: AuthModule.ResetPasswordRequest, ): Promise<AuthModule.ResetPasswordResponse>`
- Lines: 88-92
- Exported: yes

```ts
async execute(
    params: AuthModule.ResetPasswordRequest,
  ): Promise<AuthModule.ResetPasswordResponse> {
    return this.authRepository.resetPassword(params);
  }
```

### class `RegisterPushTokenUseCase`

- Signature: `class RegisterPushTokenUseCase`
- Lines: 95-103
- Exported: yes

```ts
class RegisterPushTokenUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: UserModule.PushTokenRequest,
  ): Promise<UserModule.PushTokenResponse> {
    return this.authRepository.registerPushToken(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private authRepository: AuthRepository)`
- Lines: 96-96
- Exported: yes

```ts
constructor(private authRepository: AuthRepository) { }
```

### method `execute`

- Signature: `async execute( params: UserModule.PushTokenRequest, ): Promise<UserModule.PushTokenResponse>`
- Lines: 98-102
- Exported: yes

```ts
async execute(
    params: UserModule.PushTokenRequest,
  ): Promise<UserModule.PushTokenResponse> {
    return this.authRepository.registerPushToken(params);
  }
```
