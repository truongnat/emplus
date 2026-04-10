---
title: "mobile/src/presentation/hooks/notifications/useNotifications.ts"
description: "Provides 3 documented symbols in mobile/src/presentation/hooks/notifications/useNotifications.ts."
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
  page: "reference/files/mobile/src/presentation/hooks/notifications/useNotifications.ts.md"
  relativePath: "mobile/src/presentation/hooks/notifications/useNotifications.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/notifications/useNotifications.ts"
  module: "mobile/src/presentation/hooks/notifications"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/presentation/hooks/notifications/useNotifications.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/presentation/hooks/notifications](../../../../../../modules/mobile/src/presentation/hooks/notifications.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/notifications/useNotifications.ts`
- Lines: 32
- Symbols: 3

## Related Features

- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.

## AI Summary

Provides 3 documented symbols in mobile/src/presentation/hooks/notifications/useNotifications.ts.

### Usage Notes

- These functions modify the application state using queries and mutations.
- Note: Dependencies (`dependencies` objects) are assumed to be configured elsewhere.

## Public API

- `function useNotificationsList()`
- `function useMarkNotificationRead()`
- `function useMarkAllNotificationsRead()`

## Symbols

### function `useNotificationsList`

- Signature: `function useNotificationsList()`
- Lines: 6-11
- Exported: yes

```ts
function useNotificationsList() {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: () => dependencies.notifications.list.execute({ page: 1, limit: 50 }),
  });
}
```

### function `useMarkNotificationRead`

- Signature: `function useMarkNotificationRead()`
- Lines: 13-21
- Exported: yes

```ts
function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => dependencies.notifications.markRead.execute(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}
```

### function `useMarkAllNotificationsRead`

- Signature: `function useMarkAllNotificationsRead()`
- Lines: 23-31
- Exported: yes

```ts
function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => dependencies.notifications.markAllRead.execute(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}
```
