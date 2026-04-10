---
title: "api/src/middleware/auth.ts"
description: "/api/auth.middleware.requireAuth"
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
  page: "reference/files/api/src/middleware/auth.ts.md"
  relativePath: "api/src/middleware/auth.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/middleware/auth.ts"
  module: "api/src/middleware"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/middleware/auth.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/middleware](../../../../modules/api/src/middleware.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/middleware/auth.ts`
- Lines: 41
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Order Management Login](../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Storage Login](../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Login](../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Login](../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Reporting Login](../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

/api/auth.middleware.requireAuth

## Public API

- `requireAuth = async (context, next) => { const header = context.req.header("Authorization");`
- `requireAdmin = async (context, next) => { const user = context.get("user"); if (!user) {`

## Symbols

### function `requireAuth`

- Signature: `requireAuth = async (context, next) => { const header = context.req.header("Authorization");`
- Lines: 5-23
- Exported: yes

```ts
requireAuth: MiddlewareHandler = async (context, next) => {
  const header = context.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "UNAUTHORIZED", "Thiếu bearer token trong header Authorization.");
  }

  const token = header.replace("Bearer ", "").trim();
  if (!token) {
    throw new AppError(401, "UNAUTHORIZED", "Thiếu bearer token trong header Authorization.");
  }

  const user = await store.getUserByToken(token);
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Phiên đăng nhập không hợp lệ hoặc đã hết hạn.");
  }

  context.set("user", user);
  await next();
}
```

### function `requireAdmin`

- Signature: `requireAdmin = async (context, next) => { const user = context.get("user"); if (!user) {`
- Lines: 28-40
- Exported: yes

```ts
requireAdmin: MiddlewareHandler = async (context, next) => {
  const user = context.get("user");

  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Vui lòng đăng nhập.");
  }

  if (!user.isAdmin) {
    throw new AppError(403, "FORBIDDEN", "Bạn không có quyền truy cập admin.");
  }

  await next();
}
```
