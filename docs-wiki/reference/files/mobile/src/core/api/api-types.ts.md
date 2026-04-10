---
title: "mobile/src/core/api/api-types.ts"
description: "API types documented in mobile/src/core/api/api-types.ts"
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
  page: "reference/files/mobile/src/core/api/api-types.ts.md"
  relativePath: "mobile/src/core/api/api-types.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/api-types.ts"
  module: "mobile/src/core/api"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 5
---

# mobile/src/core/api/api-types.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/api](../../../../../modules/mobile/src/core/api.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/api-types.ts`
- Lines: 35
- Symbols: 5

## Related Features

- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.

## AI Summary

API types documented in mobile/src/core/api/api-types.ts

### Responsibilities

- Describe API meta and success data structures

### Usage Notes

- These definitions are used throughout the mobile app

## Public API

- `interface ApiMeta`
- `interface ApiSuccess<T>`
- `interface ApiFailure`
- `interface PaginationMeta`

## Symbols

### interface `ApiMeta`

- Signature: `interface ApiMeta`
- Lines: 1-4
- Exported: yes

```ts
interface ApiMeta {
  requestId?: string;
  timestamp?: string;
}
```

### interface `ApiSuccess`

- Signature: `interface ApiSuccess<T>`
- Lines: 6-10
- Exported: yes

```ts
interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: ApiMeta;
}
```

### interface `ApiFailure`

- Signature: `interface ApiFailure`
- Lines: 12-20
- Exported: yes

```ts
interface ApiFailure {
  success: false;
  error?: {
    code?: string;
    message?: string;
    details?: unknown[];
  };
  meta?: ApiMeta;
}
```

### interface `PaginationMeta`

- Signature: `interface PaginationMeta`
- Lines: 22-28
- Exported: yes

```ts
interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
}
```

### interface `ApiPaginated`

- Signature: `interface ApiPaginated<T>`
- Lines: 30-34
- Exported: no

```ts
interface ApiPaginated<T> {
  success: true;
  data: T[];
  pagination: PaginationMeta;
}
```
