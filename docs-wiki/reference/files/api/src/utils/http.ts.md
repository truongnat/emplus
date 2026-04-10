---
title: "api/src/utils/http.ts"
description: "The `readJson` function is used to read data from request body as JSON."
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
  page: "reference/files/api/src/utils/http.ts.md"
  relativePath: "api/src/utils/http.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/utils/http.ts"
  module: "api/src/utils"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 6
---

# api/src/utils/http.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/utils](../../../../modules/api/src/utils.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/utils/http.ts`
- Lines: 86
- Symbols: 6

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
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

The `readJson` function is used to read data from request body as JSON.

## Public API

- `class AppError extends Error`
- `constructor(status: ContentfulStatusCode, code: string, message: string, details: unknown[] = [])`
- `async function readJson<T>(context: Context): Promise<T>`
- `function success<T>(context: Context, data: T, status: ContentfulStatusCode = 200): Response`
- `function paginated<T>( context: Context, data: T[], pagination: { page: number; limit: number; totalItems: number; }, ): Response`
- `function fail(context: Context, error: AppError): Response`

## Symbols

### class `AppError`

- Signature: `class AppError extends Error`
- Lines: 4-15
- Exported: yes

```ts
class AppError extends Error {
  status: ContentfulStatusCode;
  code: string;
  details: unknown[];

  constructor(status: ContentfulStatusCode, code: string, message: string, details: unknown[] = []) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
```

### method `constructor`

- Signature: `constructor(status: ContentfulStatusCode, code: string, message: string, details: unknown[] = [])`
- Lines: 9-14
- Exported: yes

```ts
constructor(status: ContentfulStatusCode, code: string, message: string, details: unknown[] = []) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
```

### function `readJson`

- Signature: `async function readJson<T>(context: Context): Promise<T>`
- Lines: 17-23
- Exported: yes

```ts
async function readJson<T>(context: Context): Promise<T> {
  try {
    return await context.req.json<T>();
  } catch {
    throw new AppError(400, "BAD_REQUEST", "Nội dung request phải là JSON hợp lệ.");
  }
}
```

### function `success`

- Signature: `function success<T>(context: Context, data: T, status: ContentfulStatusCode = 200): Response`
- Lines: 25-37
- Exported: yes

```ts
function success<T>(context: Context, data: T, status: ContentfulStatusCode = 200): Response {
  return context.json(
    {
      success: true,
      data,
      meta: {
        requestId: context.get("requestId") as string,
        timestamp: new Date().toISOString(),
      },
    },
    status,
  );
}
```

### function `paginated`

- Signature: `function paginated<T>( context: Context, data: T[], pagination: { page: number; limit: number; totalItems: number; }, ): Response`
- Lines: 39-67
- Exported: yes

```ts
function paginated<T>(
  context: Context,
  data: T[],
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
  },
): Response {
  const totalPages = Math.max(1, Math.ceil(pagination.totalItems / pagination.limit));

  return context.json({
    success: true,
    data: {
      items: data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        totalItems: pagination.totalItems,
        totalPages,
        hasNext: pagination.page < totalPages,
      },
    },
    meta: {
      requestId: context.get("requestId") as string,
      timestamp: new Date().toISOString(),
    },
  });
}
```

### function `fail`

- Signature: `function fail(context: Context, error: AppError): Response`
- Lines: 69-85
- Exported: yes

```ts
function fail(context: Context, error: AppError): Response {
  return context.json(
    {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      meta: {
        requestId: context.get("requestId") as string,
        timestamp: new Date().toISOString(),
      },
    },
    error.status,
  );
}
```
