---
title: "api/src/__tests__/app.test.ts"
description: "Registers a new user with a profile and returns an access token."
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
  page: "reference/files/api/src/__tests__/app.test.ts.md"
  relativePath: "api/src/__tests__/app.test.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/__tests__/app.test.ts"
  module: "api/src/__tests__"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/__tests__/app.test.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/__tests__](../../../../modules/api/src/__tests__.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/__tests__/app.test.ts`
- Lines: 350
- Symbols: 2

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

Registers a new user with a profile and returns an access token.

### Usage Notes

- This function makes a POST request to the `/v1/auth/register` endpoint with the provided profile data.

## Symbols

### function `dayOffsetIso`

- Signature: `function dayOffsetIso(days: number): string`
- Lines: 6-10
- Exported: no

```ts
function dayOffsetIso(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
```

### function `register`

- Signature: `async function register(profile: { fullName: string; gender: "NAM" | "NU"; email: string; password: string; })`
- Lines: 12-38
- Exported: no

```ts
async function register(profile: {
  fullName: string;
  gender: "NAM" | "NU";
  email: string;
  password: string;
}) {
  const response = await app.request("http://localhost/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: profile.fullName,
      gender: profile.gender,
      email: profile.email,
      password: profile.password,
    }),
  });

  expect(response.status).toBe(201);
  const payload = await response.json();
  expect(payload.success).toBe(true);

  return payload.data.tokens as {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
```
