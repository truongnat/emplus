---
title: "api/src/oauth/verify.ts"
description: "Identifies an identity from an OAuth token and provides fallbacks in case of issues."
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
  page: "reference/files/api/src/oauth/verify.ts.md"
  relativePath: "api/src/oauth/verify.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/oauth/verify.ts"
  module: "api/src/oauth"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 6
---

# api/src/oauth/verify.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/oauth](../../../../modules/api/src/oauth.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/oauth/verify.ts`
- Lines: 126
- Symbols: 6

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

Identifies an identity from an OAuth token and provides fallbacks in case of issues.

### Responsibilities

- Verify OAuth identity from tokens

### Usage Notes

- Provides fallback methods for cases where the original method fails due to authentication failures or other reasons.

## Public API

- `interface VerifiedIdentity`
- `async function verifyIdentity(provider: AuthProvider, idToken: string): Promise<VerifiedIdentity>`

## Symbols

### interface `VerifiedIdentity`

- Signature: `interface VerifiedIdentity`
- Lines: 8-12
- Exported: yes

```ts
interface VerifiedIdentity {
  authId: string;
  email?: string;
  emailVerified?: boolean;
}
```

### function `verifyIdentity`

- Signature: `async function verifyIdentity(provider: AuthProvider, idToken: string): Promise<VerifiedIdentity>`
- Lines: 115-125
- Exported: yes

```ts
async function verifyIdentity(provider: AuthProvider, idToken: string): Promise<VerifiedIdentity> {
  if (provider === "LOCAL") {
    throw new AppError(400, "UNSUPPORTED_PROVIDER", "Nhà cung cấp LOCAL không hỗ trợ xác minh OAuth idToken.");
  }

  if (provider === "GOOGLE") {
    return verifyGoogleToken(idToken);
  }

  return verifyAppleToken(idToken);
}
```

### function `fallbackIdentity`

- Signature: `function fallbackIdentity(provider: AuthProvider, idToken: string): VerifiedIdentity`
- Lines: 17-22
- Exported: no

```ts
function fallbackIdentity(provider: AuthProvider, idToken: string): VerifiedIdentity {
  const digest = createHash("sha256").update(`${provider}:${idToken}`).digest("hex").slice(0, 24);
  return {
    authId: digest,
  };
}
```

### function `canUseMock`

- Signature: `function canUseMock(idToken: string): boolean`
- Lines: 24-26
- Exported: no

```ts
function canUseMock(idToken: string): boolean {
  return env.allowMockOAuth && idToken.startsWith("dev_");
}
```

### function `verifyGoogleToken`

- Signature: `async function verifyGoogleToken(idToken: string): Promise<VerifiedIdentity>`
- Lines: 28-68
- Exported: no

```ts
async function verifyGoogleToken(idToken: string): Promise<VerifiedIdentity> {
  if (env.googleClientIds.length === 0 && !env.allowMockOAuth) {
    throw new AppError(
      500,
      "GOOGLE_CLIENT_ID_MISSING",
      "Thiếu GOOGLE_CLIENT_IDS (hoặc GOOGLE_CLIENT_ID) để xác minh Google OAuth.",
    );
  }

  if (env.googleClientIds.length === 0 && canUseMock(idToken)) {
    return fallbackIdentity("GOOGLE", idToken);
  }

  if (env.googleClientIds.length === 0) {
    throw new AppError(400, "OAUTH_CONFIG_MISSING", "Google OAuth chưa được cấu hình để xác minh token thật.");
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.googleClientIds,
    });

    const payload = ticket.getPayload();
    if (!payload?.sub) {
      throw new AppError(401, "INVALID_GOOGLE_TOKEN", "Google token không chứa trường subject.");
    }

    return {
      authId: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified,
    };
  } catch (error) {
    if (canUseMock(idToken)) {
      return fallbackIdentity("GOOGLE", idToken);
    }

    throw new AppError(401, "INVALID_GOOGLE_TOKEN", "Xác minh Google idToken thất bại.", [String(error)]);
  }
}
```

### function `verifyAppleToken`

- Signature: `async function verifyAppleToken(idToken: string): Promise<VerifiedIdentity>`
- Lines: 70-113
- Exported: no

```ts
async function verifyAppleToken(idToken: string): Promise<VerifiedIdentity> {
  if (env.appleAudiences.length === 0 && !env.allowMockOAuth) {
    throw new AppError(
      500,
      "APPLE_AUDIENCE_MISSING",
      "Thiếu APPLE_AUDIENCES (hoặc APPLE_AUDIENCE) để xác minh Apple OAuth.",
    );
  }

  if (env.appleAudiences.length === 0 && canUseMock(idToken)) {
    return fallbackIdentity("APPLE", idToken);
  }

  if (env.appleAudiences.length === 0) {
    throw new AppError(400, "OAUTH_CONFIG_MISSING", "Apple OAuth chưa được cấu hình để xác minh token thật.");
  }

  try {
    const verified = await jwtVerify(idToken, appleJwks, {
      issuer: env.appleIssuer,
      audience: env.appleAudiences,
    });

    const subject = verified.payload.sub;
    if (!subject) {
      throw new AppError(401, "INVALID_APPLE_TOKEN", "Apple token không chứa trường subject.");
    }

    const email = typeof verified.payload.email === "string" ? verified.payload.email : undefined;
    const emailVerified = verified.payload.email_verified === true || verified.payload.email_verified === "true";

    return {
      authId: subject,
      email,
      emailVerified,
    };
  } catch (error) {
    if (canUseMock(idToken)) {
      return fallbackIdentity("APPLE", idToken);
    }

    throw new AppError(401, "INVALID_APPLE_TOKEN", "Xác minh Apple idToken thất bại.", [String(error)]);
  }
}
```
