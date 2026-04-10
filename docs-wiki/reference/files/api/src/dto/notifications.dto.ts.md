---
title: "api/src/dto/notifications.dto.ts"
description: "ListNotificationsQuery definition, responsible for parsing a JSON object into its constituent parts and extracting lists of notifications."
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
  page: "reference/files/api/src/dto/notifications.dto.ts.md"
  relativePath: "api/src/dto/notifications.dto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/dto/notifications.dto.ts"
  module: "api/src/dto"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 3
---

# api/src/dto/notifications.dto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/dto](../../../../modules/api/src/dto.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/dto/notifications.dto.ts`
- Lines: 30
- Symbols: 3

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

ListNotificationsQuery definition, responsible for parsing a JSON object into its constituent parts and extracting lists of notifications.

### Responsibilities

- parsePositiveInt
- parseListNotificationsQuery

### Usage Notes

- No additional notes are provided in the given code snippet. Additional usage notes may be documented elsewhere,

## Public API

- `type ListNotificationsQuery = { page: number; limit: number; unreadOnly: boolean; };`
- `function parseListNotificationsQuery(input: { page?: string; limit?: string; unread_only?: string; }): ListNotificationsQuery`

## Symbols

### type `ListNotificationsQuery`

- Signature: `type ListNotificationsQuery = { page: number; limit: number; unreadOnly: boolean; };`
- Lines: 1-5
- Exported: yes

```ts
type ListNotificationsQuery = {
  page: number;
  limit: number;
  unreadOnly: boolean;
};
```

### function `parseListNotificationsQuery`

- Signature: `function parseListNotificationsQuery(input: { page?: string; limit?: string; unread_only?: string; }): ListNotificationsQuery`
- Lines: 19-29
- Exported: yes

```ts
function parseListNotificationsQuery(input: {
  page?: string;
  limit?: string;
  unread_only?: string;
}): ListNotificationsQuery {
  const page = parsePositiveInt(input.page, 1);
  const limit = parsePositiveInt(input.limit, 20, 50);
  const u = input.unread_only?.toLowerCase();
  const unreadOnly = u === "true" || u === "1";
  return { page, limit, unreadOnly };
}
```

### function `parsePositiveInt`

- Signature: `function parsePositiveInt(value: string | undefined, fallback: number, max?: number): number`
- Lines: 7-17
- Exported: no

```ts
function parsePositiveInt(value: string | undefined, fallback: number, max?: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) {
    return fallback;
  }
  const i = Math.floor(n);
  if (max !== undefined) {
    return Math.min(max, i);
  }
  return i;
}
```
