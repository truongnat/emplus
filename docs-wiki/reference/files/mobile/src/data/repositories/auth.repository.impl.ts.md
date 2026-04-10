---
title: "mobile/src/data/repositories/auth.repository.impl.ts"
description: "AuthRepositoryImpl class"
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
  page: "reference/files/mobile/src/data/repositories/auth.repository.impl.ts.md"
  relativePath: "mobile/src/data/repositories/auth.repository.impl.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/data/repositories/auth.repository.impl.ts"
  module: "mobile/src/data/repositories"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 10
---

# mobile/src/data/repositories/auth.repository.impl.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/data/repositories](../../../../../modules/mobile/src/data/repositories.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/data/repositories/auth.repository.impl.ts`
- Lines: 110
- Symbols: 10

## Related Features

- [Authentication Login](../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Login](../../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Storage Login](../../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Authentication Verification](../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Login](../../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Login](../../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Reporting Login](../../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Verification](../../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

AuthRepositoryImpl class

### Responsibilities

- AUTHOR

### Usage Notes

- This class is responsible for handling authentication-related tasks.

## Public API

- `class AuthRepositoryImpl implements AuthRepository`
- `async register( params: AuthModule.RegisterRequest, ): Promise<AuthModule.RegisterResponse>`
- `async login( params: AuthModule.LoginRequest, ): Promise<AuthModule.LoginResponse>`
- `async refresh( params: AuthModule.RefreshRequest, ): Promise<AuthModule.RefreshResponse>`
- `async verifyOtp( params: AuthModule.VerifyOtpRequest, ): Promise<AuthModule.VerifyOtpResponse>`
- `async getProfile(): Promise<AuthModule.User>`
- `async updateProfile( params: UserModule.UpdateProfileRequest, ): Promise<AuthModule.User>`
- `async forgotPassword( params: AuthModule.ForgotPasswordRequest, ): Promise<AuthModule.ForgotPasswordResponse>`
- `async resetPassword( params: AuthModule.ResetPasswordRequest, ): Promise<AuthModule.ResetPasswordResponse>`
- `async registerPushToken( params: UserModule.PushTokenRequest, ): Promise<UserModule.PushTokenResponse>`

## Symbols

### class `AuthRepositoryImpl`

- Signature: `class AuthRepositoryImpl implements AuthRepository`
- Lines: 9-109
- Exported: yes

```ts
class AuthRepositoryImpl implements AuthRepository {
  async register(
    params: AuthModule.RegisterRequest,
  ): Promise<AuthModule.RegisterResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.RegisterResponse>
    >("/auth/register", params);
    return response.data;
  }

  async login(
    params: AuthModule.LoginRequest,
  ): Promise<AuthModule.LoginResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.LoginResponse>
    >("/auth/login", params);
    return response.data;
  }

  async refresh(
    params: AuthModule.RefreshRequest,
  ): Promise<AuthModule.RefreshResponse> {
    /** Không gửi Bearer access token — tránh 401 khi access đã hết hạn (chỉ dùng refresh trong body). */
    const envelope = await apiClient.post<
      ApiResponse<
        | AuthModule.RefreshResponse
        | { user: AuthModule.User; tokens: AuthModule.RefreshResponse }
      >
    >("/auth/refresh", params, { skipAuth: true });
    const inner = envelope.data;
    /**
     * Backend trả AuthPayload `{ user, tokens }` trong `data` (giống verify-otp),
     * không phải chỉ TokenPair. Nếu gán cả object vào `session.tokens` thì
     * `accessToken` biến mất → reload mất đăng nhập.
     */
    if (
      inner &&
      typeof inner === "object" &&
      "tokens" in inner &&
      inner.tokens &&
      typeof inner.tokens === "object" &&
      "accessToken" in inner.tokens
    ) {
      return inner.tokens;
    }
    return inner as AuthModule.RefreshResponse;
  }

  async verifyOtp(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.VerifyOtpResponse>
    >("/auth/verify-otp", params);
    return response.data;
  }

  async getProfile(): Promise<AuthModule.User> {
    const response = await apiClient.get<ApiResponse<AuthModule.User>>(
      "/users/me",
    );
    return response.data;
  }

  async updateProfile(
    params: UserModule.UpdateProfileRequest,
  ): Promise<AuthModule.User> {
    const response = await apiClient.put<ApiResponse<AuthModule.User>>(
      "/users/me",
      params,
    );
    return response.data;
  }

  async forgotPassword(
    params: AuthModule.ForgotPasswordRequest,
  ): Promise<AuthModule.ForgotPasswordResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.ForgotPasswordResponse>
    >("/auth/forgot-password", params, { skipAuth: true });
    return response.data;
  }

  async resetPassword(
    params: AuthModule.ResetPasswordRequest,
  ): Promise<AuthModule.ResetPasswordResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.ResetPasswordResponse>
    >("/auth/reset-password", params, { skipAuth: true });
    return response.data;
  }

  async registerPushToken(
    params: UserModule.PushTokenRequest,
  ): Promise<UserModule.PushTokenResponse> {
    const response = await apiClient.post<
      ApiResponse<UserModule.PushTokenResponse>
    >("/users/push-token", params);
    return response.data;
  }
}
```

### method `register`

- Signature: `async register( params: AuthModule.RegisterRequest, ): Promise<AuthModule.RegisterResponse>`
- Lines: 10-17
- Exported: yes

```ts
async register(
    params: AuthModule.RegisterRequest,
  ): Promise<AuthModule.RegisterResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.RegisterResponse>
    >("/auth/register", params);
    return response.data;
  }
```

### method `login`

- Signature: `async login( params: AuthModule.LoginRequest, ): Promise<AuthModule.LoginResponse>`
- Lines: 19-26
- Exported: yes

```ts
async login(
    params: AuthModule.LoginRequest,
  ): Promise<AuthModule.LoginResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.LoginResponse>
    >("/auth/login", params);
    return response.data;
  }
```

### method `refresh`

- Signature: `async refresh( params: AuthModule.RefreshRequest, ): Promise<AuthModule.RefreshResponse>`
- Lines: 28-55
- Exported: yes

```ts
async refresh(
    params: AuthModule.RefreshRequest,
  ): Promise<AuthModule.RefreshResponse> {
    /** Không gửi Bearer access token — tránh 401 khi access đã hết hạn (chỉ dùng refresh trong body). */
    const envelope = await apiClient.post<
      ApiResponse<
        | AuthModule.RefreshResponse
        | { user: AuthModule.User; tokens: AuthModule.RefreshResponse }
      >
    >("/auth/refresh", params, { skipAuth: true });
    const inner = envelope.data;
    /**
     * Backend trả AuthPayload `{ user, tokens }` trong `data` (giống verify-otp),
     * không phải chỉ TokenPair. Nếu gán cả object vào `session.tokens` thì
     * `accessToken` biến mất → reload mất đăng nhập.
     */
    if (
      inner &&
      typeof inner === "object" &&
      "tokens" in inner &&
      inner.tokens &&
      typeof inner.tokens === "object" &&
      "accessToken" in inner.tokens
    ) {
      return inner.tokens;
    }
    return inner as AuthModule.RefreshResponse;
  }
```

### method `verifyOtp`

- Signature: `async verifyOtp( params: AuthModule.VerifyOtpRequest, ): Promise<AuthModule.VerifyOtpResponse>`
- Lines: 57-64
- Exported: yes

```ts
async verifyOtp(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.VerifyOtpResponse>
    >("/auth/verify-otp", params);
    return response.data;
  }
```

### method `getProfile`

- Signature: `async getProfile(): Promise<AuthModule.User>`
- Lines: 66-71
- Exported: yes

```ts
async getProfile(): Promise<AuthModule.User> {
    const response = await apiClient.get<ApiResponse<AuthModule.User>>(
      "/users/me",
    );
    return response.data;
  }
```

### method `updateProfile`

- Signature: `async updateProfile( params: UserModule.UpdateProfileRequest, ): Promise<AuthModule.User>`
- Lines: 73-81
- Exported: yes

```ts
async updateProfile(
    params: UserModule.UpdateProfileRequest,
  ): Promise<AuthModule.User> {
    const response = await apiClient.put<ApiResponse<AuthModule.User>>(
      "/users/me",
      params,
    );
    return response.data;
  }
```

### method `forgotPassword`

- Signature: `async forgotPassword( params: AuthModule.ForgotPasswordRequest, ): Promise<AuthModule.ForgotPasswordResponse>`
- Lines: 83-90
- Exported: yes

```ts
async forgotPassword(
    params: AuthModule.ForgotPasswordRequest,
  ): Promise<AuthModule.ForgotPasswordResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.ForgotPasswordResponse>
    >("/auth/forgot-password", params, { skipAuth: true });
    return response.data;
  }
```

### method `resetPassword`

- Signature: `async resetPassword( params: AuthModule.ResetPasswordRequest, ): Promise<AuthModule.ResetPasswordResponse>`
- Lines: 92-99
- Exported: yes

```ts
async resetPassword(
    params: AuthModule.ResetPasswordRequest,
  ): Promise<AuthModule.ResetPasswordResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.ResetPasswordResponse>
    >("/auth/reset-password", params, { skipAuth: true });
    return response.data;
  }
```

### method `registerPushToken`

- Signature: `async registerPushToken( params: UserModule.PushTokenRequest, ): Promise<UserModule.PushTokenResponse>`
- Lines: 101-108
- Exported: yes

```ts
async registerPushToken(
    params: UserModule.PushTokenRequest,
  ): Promise<UserModule.PushTokenResponse> {
    const response = await apiClient.post<
      ApiResponse<UserModule.PushTokenResponse>
    >("/users/push-token", params);
    return response.data;
  }
```
