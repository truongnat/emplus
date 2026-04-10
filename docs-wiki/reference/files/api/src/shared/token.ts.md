---
title: "api/src/shared/token.ts"
description: "Token pair management function with access token and refresh token generation."
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
  page: "reference/files/api/src/shared/token.ts.md"
  relativePath: "api/src/shared/token.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/shared/token.ts"
  module: "api/src/shared"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 4
---

# api/src/shared/token.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/shared](../../../../modules/api/src/shared.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/shared/token.ts`
- Lines: 39
- Symbols: 4

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Token pair management function with access token and refresh token generation.

### Usage Notes

- To get an accessToken, create a new object with either accessToken or refreshToken property followed by the crypto.randomUUID() for a unique string.
- To verify an access token, use store.getUserByToken to retrieve user information before making a request to any protected API endpoint.

## Public API

- `interface TokenPair`
- `function generateTokens(): TokenPair`
- `async function verifyAccessToken(_token: string): Promise<{ userId: string }>`
- `function getTokenConfig()`

## Symbols

### interface `TokenPair`

- Signature: `interface TokenPair`
- Lines: 7-10
- Exported: yes

```ts
interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
```

### function `generateTokens`

- Signature: `function generateTokens(): TokenPair`
- Lines: 15-20
- Exported: yes

```ts
function generateTokens(): TokenPair {
  return {
    accessToken: `at_${crypto.randomUUID()}`,
    refreshToken: `rt_${crypto.randomUUID()}`,
  };
}
```

### function `verifyAccessToken`

- Signature: `async function verifyAccessToken(_token: string): Promise<{ userId: string }>`
- Lines: 26-28
- Exported: yes

```ts
async function verifyAccessToken(_token: string): Promise<{ userId: string }> {
  throw new Error("Use store.getUserByToken for session verification");
}
```

### function `getTokenConfig`

- Signature: `function getTokenConfig()`
- Lines: 33-38
- Exported: yes

```ts
function getTokenConfig() {
  return {
    accessTokenTTL: ACCESS_TOKEN_TTL_SECONDS,
    refreshTokenTTL: REFRESH_TOKEN_TTL_SECONDS,
  };
}
```
