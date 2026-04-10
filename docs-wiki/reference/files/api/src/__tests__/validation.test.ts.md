---
title: "api/src/__tests__/validation.test.ts"
description: "Registers a user and retrieves an access token."
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
  page: "reference/files/api/src/__tests__/validation.test.ts.md"
  relativePath: "api/src/__tests__/validation.test.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/__tests__/validation.test.ts"
  module: "api/src/__tests__"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/__tests__/validation.test.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/__tests__](../../../../modules/api/src/__tests__.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/__tests__/validation.test.ts`
- Lines: 139
- Symbols: 2

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

Registers a user and retrieves an access token.

### Responsibilities

- register user, retrieve access token

## Symbols

### function `registerAndGetAccessToken`

- Signature: `async function registerAndGetAccessToken(profile: { fullName: string; gender: "NAM" | "NU"; email: string; password: string; }): Promise<string>`
- Lines: 6-23
- Exported: no

```ts
async function registerAndGetAccessToken(profile: {
  fullName: string;
  gender: "NAM" | "NU";
  email: string;
  password: string;
}): Promise<string> {
  const response = await app.request("http://localhost/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  expect(response.status).toBe(201);
  const payload = await response.json();
  expect(payload.success).toBe(true);

  return payload.data.tokens.accessToken as string;
}
```

### function `seedHappyCase`

- Signature: `async function seedHappyCase(accessToken: string): Promise<void>`
- Lines: 25-31
- Exported: no

```ts
async function seedHappyCase(accessToken: string): Promise<void> {
  const response = await app.request("http://localhost/v1/debug/seed-happy-case", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  expect(response.status).toBe(200);
}
```
