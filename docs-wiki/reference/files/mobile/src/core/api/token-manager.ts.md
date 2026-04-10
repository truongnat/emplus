---
title: "mobile/src/core/api/token-manager.ts"
description: "The TokenManager class is responsible for managing authentication tokens."
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
  page: "reference/files/mobile/src/core/api/token-manager.ts.md"
  relativePath: "mobile/src/core/api/token-manager.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/token-manager.ts"
  module: "mobile/src/core/api"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 7
---

# mobile/src/core/api/token-manager.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/api](../../../../../modules/mobile/src/core/api.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/token-manager.ts`
- Lines: 39
- Symbols: 7

## Related Features

- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.

## AI Summary

The TokenManager class is responsible for managing authentication tokens.

### Responsibilities

- access token
- refresh token

### Usage Notes

- This class provides a singleton instance to manage access tokens and refresh tokens.
- To get an instance, use `TokenManager.getInstance()`.

## Public API

- `class TokenManager`
- `private constructor()`
- `public static getInstance(): TokenManager`
- `setAccessToken(token: string | null)`
- `getAccessToken(): string | null`
- `setRefreshHandler(handler: () => Promise<string | null>)`
- `async refreshToken(): Promise<string | null>`

## Symbols

### class `TokenManager`

- Signature: `class TokenManager`
- Lines: 5-36
- Exported: yes

```ts
class TokenManager {
  private static instance: TokenManager;
  private accessToken: string | null = null;
  private refreshHandler: (() => Promise<string | null>) | null = null;

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) TokenManager.instance = new TokenManager();
    return TokenManager.instance;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Đăng ký hàm thực hiện Refresh Token từ tầng Framework.
   */
  setRefreshHandler(handler: () => Promise<string | null>) {
    this.refreshHandler = handler;
  }

  async refreshToken(): Promise<string | null> {
    if (!this.refreshHandler) return null;
    return this.refreshHandler();
  }
}
```

### method `constructor`

- Signature: `private constructor()`
- Lines: 10-10
- Exported: yes

```ts
private constructor() {}
```

### method `getInstance`

- Signature: `public static getInstance(): TokenManager`
- Lines: 12-15
- Exported: yes

```ts
public static getInstance(): TokenManager {
    if (!TokenManager.instance) TokenManager.instance = new TokenManager();
    return TokenManager.instance;
  }
```

### method `setAccessToken`

- Signature: `setAccessToken(token: string | null)`
- Lines: 17-19
- Exported: yes

```ts
setAccessToken(token: string | null) {
    this.accessToken = token;
  }
```

### method `getAccessToken`

- Signature: `getAccessToken(): string | null`
- Lines: 21-23
- Exported: yes

```ts
getAccessToken(): string | null {
    return this.accessToken;
  }
```

### method `setRefreshHandler`

- Signature: `setRefreshHandler(handler: () => Promise<string | null>)`
- Lines: 28-30
- Exported: yes

```ts
setRefreshHandler(handler: () => Promise<string | null>) {
    this.refreshHandler = handler;
  }
```

### method `refreshToken`

- Signature: `async refreshToken(): Promise<string | null>`
- Lines: 32-35
- Exported: yes

```ts
async refreshToken(): Promise<string | null> {
    if (!this.refreshHandler) return null;
    return this.refreshHandler();
  }
```
