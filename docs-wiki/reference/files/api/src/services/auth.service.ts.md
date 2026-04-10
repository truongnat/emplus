---
title: "api/src/services/auth.service.ts"
description: "Authentication Service API"
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
  page: "reference/files/api/src/services/auth.service.ts.md"
  relativePath: "api/src/services/auth.service.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/auth.service.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 10
---

# api/src/services/auth.service.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/auth.service.ts`
- Lines: 312
- Symbols: 10

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
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
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

Authentication Service API

### Usage Notes

- This API involves creating, updating, logging in, refreshing tokens, and resetting passwords. Each action has its own set of responsibilities and use cases.

## Public API

- `interface AuthPayload`
- `async function issueAuthPayload(user: User): Promise<AuthPayload>`
- `async function createUser( email: string, password: string, fullName?: string, gender?: string, ): Promise<User>`
- `async function registerUser( email: string, password: string, fullName?: string, gender?: string, ): Promise<AuthPayload>`
- `async function loginUser( email: string, password: string, ): Promise<AuthPayload | { requiresOTP: boolean }>`
- `async function verifyOtpAndLogin(email: string, otp: string): Promise<AuthPayload>`
- `async function refreshToken(refreshToken: string): Promise<AuthPayload>`
- `async function logout(userId: string, accessToken?: string, refreshToken?: string): Promise<void>`
- `async function requestPasswordReset(email: string): Promise<{ success: boolean }>`
- `async function resetPassword(email: string, otp: string, newPassword: string): Promise<{ success: boolean }>`

## Symbols

### interface `AuthPayload`

- Signature: `interface AuthPayload`
- Lines: 26-40
- Exported: yes

```ts
interface AuthPayload {
  user: {
    id: string;
    email: string;
    fullName: string;
    isPaired: boolean;
    isAdmin: boolean;
    gender: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
```

### function `issueAuthPayload`

- Signature: `async function issueAuthPayload(user: User): Promise<AuthPayload>`
- Lines: 45-70
- Exported: yes

```ts
async function issueAuthPayload(user: User): Promise<AuthPayload> {
  const { accessToken, refreshToken } = generateTokens();

  await Promise.all([
    store.saveSession(accessToken, user.id, ACCESS_TOKEN_TTL_SECONDS),
    store.saveRefreshSession(refreshToken, user.id, REFRESH_TOKEN_TTL_SECONDS),
  ]);

  const isPaired = Boolean(await store.getActiveCoupleForUser(user.id));

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isPaired,
      isAdmin: user.isAdmin || false,
      gender: hienThiGioiTinh(user.gender),
    },
    tokens: {
      accessToken,
      refreshToken,
      expiresIn: ACCESS_TOKEN_TTL_SECONDS,
    },
  };
}
```

### function `createUser`

- Signature: `async function createUser( email: string, password: string, fullName?: string, gender?: string, ): Promise<User>`
- Lines: 75-99
- Exported: yes

```ts
async function createUser(
  email: string,
  password: string,
  fullName?: string,
  gender?: string,
): Promise<User> {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    email,
    fullName: fullName || email.split("@")[0] || "Người dùng Em+",
    gender: chuanHoaGioiTinhDauVao(gender),
    authProvider: "LOCAL",
    authId: email,
    passwordHash: hashPassword(password),
    timezone: DEFAULT_TIMEZONE,
    emailNotificationsEnabled: true,
    profilePrivate: false,
    showOnlineStatus: true,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };
}
```

### function `registerUser`

- Signature: `async function registerUser( email: string, password: string, fullName?: string, gender?: string, ): Promise<AuthPayload>`
- Lines: 104-119
- Exported: yes

```ts
async function registerUser(
  email: string,
  password: string,
  fullName?: string,
  gender?: string,
): Promise<AuthPayload> {
  const existing = await store.findUserByEmail(email);
  if (existing) {
    throw new AppError(409, "EMAIL_ALREADY_EXISTS", "Email đã được đăng ký");
  }

  const user = await createUser(email, password, fullName, gender);
  await store.saveUser(user);

  return issueAuthPayload(user);
}
```

### function `loginUser`

- Signature: `async function loginUser( email: string, password: string, ): Promise<AuthPayload | { requiresOTP: boolean }>`
- Lines: 124-170
- Exported: yes

```ts
async function loginUser(
  email: string,
  password: string,
): Promise<AuthPayload | { requiresOTP: boolean }> {
  // Rate limit check for login attempts
  const loginRateLimitKey = `login:${email}`;
  const loginCount = await store.getRateLimitCount(loginRateLimitKey);
  if (loginCount >= LOGIN_RATE_LIMIT_COUNT) {
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.");
  }
  await store.incrementRateLimit(loginRateLimitKey, LOGIN_RATE_LIMIT_WINDOW_SECONDS);

  // Rate limit check for OTP sending
  const otpRateLimitKey = `otp:send:${email}`;
  const otpCount = await store.getRateLimitCount(otpRateLimitKey);
  if (otpCount >= OTP_RATE_LIMIT_COUNT) {
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã yêu cầu OTP quá nhiều lần. Vui lòng thử lại sau.");
  }

  const user = await store.findUserByEmail(email);

  if (user) {
    if (user.authProvider !== "LOCAL" || typeof user.passwordHash !== "string") {
      throw new AppError(401, "INVALID_CREDENTIALS", "Email hoặc mật khẩu không đúng.");
    }

    if (!verifyPassword(password, user.passwordHash)) {
      throw new AppError(401, "INVALID_CREDENTIALS", "Email hoặc mật khẩu không đúng.");
    }

    // Password correct, user found -> Standard login
    return issueAuthPayload(user);
  } else {
    // User not found -> Start lazy registration/OTP flow
    // 1. Generate OTP
    const otp = generateNumericCode(6);

    // 2. Save OTP (with password to be set once verified)
    await store.saveOtp(email, encrypt(JSON.stringify({ otp, password })), OTP_TTL_SECONDS);
    await store.incrementRateLimit(otpRateLimitKey, OTP_RATE_LIMIT_WINDOW_SECONDS);

    // 3. Send Mail
    await sendOtpMail(email, otp);

    return { requiresOTP: true };
  }
}
```

### function `verifyOtpAndLogin`

- Signature: `async function verifyOtpAndLogin(email: string, otp: string): Promise<AuthPayload>`
- Lines: 175-211
- Exported: yes

```ts
async function verifyOtpAndLogin(email: string, otp: string): Promise<AuthPayload> {
  // Rate limit check for OTP verify attempts
  const verifyRateLimitKey = `otp:verify:${email}`;
  const verifyCount = await store.getRateLimitCount(verifyRateLimitKey);

  if (verifyCount >= OTP_MAX_VERIFY_ATTEMPTS) {
    await store.deleteOtp(email);
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã nhập sai mã OTP quá nhiều lần. Vui lòng yêu cầu mã mới.");
  }

  const rawOtpStr = await store.getOtp(email);
  if (!rawOtpStr) {
    throw new AppError(401, "EXPIRED_OTP", "Mã OTP đã hết hạn hoặc không tồn tại.");
  }

  const { otp: storedOtp, password } = JSON.parse(decrypt(rawOtpStr));

  if (storedOtp !== otp) {
    await store.incrementRateLimit(verifyRateLimitKey, OTP_TTL_SECONDS);
    throw new AppError(401, "INVALID_OTP", "Mã OTP không chính xác.");
  }

  await store.deleteRateLimitCount(verifyRateLimitKey);
  await store.deleteOtp(email);

  let user = await store.findUserByEmail(email);
  if (!user) {
    user = await createUser(email, password, email.split("@")[0], "KHONG_TIET_LO");
    await store.saveUser(user);
  }

  if (!user) {
    throw new AppError(500, "USER_CREATION_FAILED", "Không thể tạo tài khoản.");
  }

  return issueAuthPayload(user);
}
```

### function `refreshToken`

- Signature: `async function refreshToken(refreshToken: string): Promise<AuthPayload>`
- Lines: 216-223
- Exported: yes

```ts
async function refreshToken(refreshToken: string): Promise<AuthPayload> {
  const user = await store.consumeRefreshSession(refreshToken);
  if (!user || !user.isActive) {
    throw new AppError(401, "INVALID_REFRESH_TOKEN", "Refresh token không hợp lệ hoặc đã hết hạn.");
  }

  return issueAuthPayload(user);
}
```

### function `logout`

- Signature: `async function logout(userId: string, accessToken?: string, refreshToken?: string): Promise<void>`
- Lines: 228-238
- Exported: yes

```ts
async function logout(userId: string, accessToken?: string, refreshToken?: string): Promise<void> {
  // If access token provided, delete the session
  if (accessToken) {
    await store.deleteSession(accessToken);
  }

  // If refresh token provided, delete the refresh session
  if (refreshToken) {
    await store.deleteRefreshSession(refreshToken);
  }
}
```

### function `requestPasswordReset`

- Signature: `async function requestPasswordReset(email: string): Promise<{ success: boolean }>`
- Lines: 243-266
- Exported: yes

```ts
async function requestPasswordReset(email: string): Promise<{ success: boolean }> {
  // Rate limit check for OTP sending
  const otpRateLimitKey = `otp:reset:${email}`;
  const otpCount = await store.getRateLimitCount(otpRateLimitKey);
  if (otpCount >= OTP_RATE_LIMIT_COUNT) {
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã yêu cầu đặt lại mật khẩu quá nhiều lần. Vui lòng thử lại sau.");
  }

  const user = await store.findUserByEmail(email);

  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Email chưa được đăng ký trong hệ thống.");
  }

  const otp = generateNumericCode(6);

  await store.saveOtp(`reset:${email}`, encrypt(JSON.stringify({ otp })), OTP_TTL_SECONDS);
  await store.incrementRateLimit(otpRateLimitKey, OTP_RATE_LIMIT_WINDOW_SECONDS);

  // Send Mail
  await sendOtpMail(email, otp);

  return { success: true };
}
```

### function `resetPassword`

- Signature: `async function resetPassword(email: string, otp: string, newPassword: string): Promise<{ success: boolean }>`
- Lines: 271-311
- Exported: yes

```ts
async function resetPassword(email: string, otp: string, newPassword: string): Promise<{ success: boolean }> {
  // Rate limit check for reset OTP verify attempts
  const verifyRateLimitKey = `otp:verify:reset:${email}`;
  const verifyCount = await store.getRateLimitCount(verifyRateLimitKey);

  if (verifyCount >= OTP_MAX_VERIFY_ATTEMPTS) {
    await store.deleteOtp(`reset:${email}`);
    throw new AppError(429, "TOO_MANY_REQUESTS", "Bạn đã nhập sai mã OTP quá nhiều lần. Vui lòng yêu cầu mã mới.");
  }

  const rawResetStr = await store.getOtp(`reset:${email}`);
  if (!rawResetStr) {
    throw new AppError(401, "EXPIRED_OTP", "Mã OTP đã hết hạn hoặc không tồn tại.");
  }

  const { otp: storedOtp } = JSON.parse(decrypt(rawResetStr));

  if (storedOtp !== otp) {
    await store.incrementRateLimit(verifyRateLimitKey, OTP_TTL_SECONDS);
    throw new AppError(401, "INVALID_OTP", "Mã OTP không chính xác.");
  }

  const user = await store.findUserByEmail(email);
  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Không thể tìm thấy tài khoản.");
  }

  // OTP Valid -> Update password
  user.passwordHash = hashPassword(newPassword);
  user.updatedAt = new Date().toISOString();
  await store.saveUser(user);

  await store.deleteRateLimitCount(verifyRateLimitKey);
  await store.deleteOtp(`reset:${email}`);

  // Invalidate all active sessions for security
  // Note: For simplicity, we assume users will log in again. 
  // A complete implementation might clear sessions from the store.

  return { success: true };
}
```
