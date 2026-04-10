---
title: "mobile/src/data/repositories/notifications.repository.impl.ts"
description: "List notifications by page, limit and unread_only"
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
  page: "reference/files/mobile/src/data/repositories/notifications.repository.impl.ts.md"
  relativePath: "mobile/src/data/repositories/notifications.repository.impl.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/data/repositories/notifications.repository.impl.ts"
  module: "mobile/src/data/repositories"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/src/data/repositories/notifications.repository.impl.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/data/repositories](../../../../../modules/mobile/src/data/repositories.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/data/repositories/notifications.repository.impl.ts`
- Lines: 32
- Symbols: 4

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

List notifications by page, limit and unread_only

### Usage Notes

- String. The `page` parameter is used to specify the starting position of the list.

## Public API

- `class NotificationsRepositoryImpl implements NotificationsRepository`
- `async list(params: NotificationModule.ListQueryParams)`
- `async markRead(id: string)`
- `async markAllRead()`

## Symbols

### class `NotificationsRepositoryImpl`

- Signature: `class NotificationsRepositoryImpl implements NotificationsRepository`
- Lines: 5-31
- Exported: yes

```ts
class NotificationsRepositoryImpl implements NotificationsRepository {
  async list(params: NotificationModule.ListQueryParams) {
    const q = new URLSearchParams();
    if (params?.page != null) q.set("page", String(params.page));
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.unread_only != null) q.set("unread_only", String(params.unread_only));
    const qs = q.toString();
    const response = await apiClient.get<
      ApiResponse<NotificationModule.ListResponse>
    >(`/notifications${qs ? `?${qs}` : ""}`);
    return response.data;
  }

  async markRead(id: string) {
    const response = await apiClient.patch<
      ApiResponse<NotificationModule.MarkReadResponse>
    >(`/notifications/${id}/read`);
    return response.data;
  }

  async markAllRead() {
    const response = await apiClient.post<
      ApiResponse<NotificationModule.MarkAllReadResponse>
    >("/notifications/read-all", {});
    return response.data;
  }
}
```

### method `list`

- Signature: `async list(params: NotificationModule.ListQueryParams)`
- Lines: 6-16
- Exported: yes

```ts
async list(params: NotificationModule.ListQueryParams) {
    const q = new URLSearchParams();
    if (params?.page != null) q.set("page", String(params.page));
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.unread_only != null) q.set("unread_only", String(params.unread_only));
    const qs = q.toString();
    const response = await apiClient.get<
      ApiResponse<NotificationModule.ListResponse>
    >(`/notifications${qs ? `?${qs}` : ""}`);
    return response.data;
  }
```

### method `markRead`

- Signature: `async markRead(id: string)`
- Lines: 18-23
- Exported: yes

```ts
async markRead(id: string) {
    const response = await apiClient.patch<
      ApiResponse<NotificationModule.MarkReadResponse>
    >(`/notifications/${id}/read`);
    return response.data;
  }
```

### method `markAllRead`

- Signature: `async markAllRead()`
- Lines: 25-30
- Exported: yes

```ts
async markAllRead() {
    const response = await apiClient.post<
      ApiResponse<NotificationModule.MarkAllReadResponse>
    >("/notifications/read-all", {});
    return response.data;
  }
```
