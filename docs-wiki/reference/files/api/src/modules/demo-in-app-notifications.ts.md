---
title: "api/src/modules/demo-in-app-notifications.ts"
description: "Provides 2 documented symbols in api/src/modules/demo-in-app-notifications.ts."
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
  page: "reference/files/api/src/modules/demo-in-app-notifications.ts.md"
  relativePath: "api/src/modules/demo-in-app-notifications.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/modules/demo-in-app-notifications.ts"
  module: "api/src/modules"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/modules/demo-in-app-notifications.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/modules](../../../../modules/api/src/modules.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/modules/demo-in-app-notifications.ts`
- Lines: 106
- Symbols: 2

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

Provides 2 documented symbols in api/src/modules/demo-in-app-notifications.ts.

## Public API

- `async function ensureDemoInAppNotifications( store: DataStore, user: User, ): Promise<void>`

## Symbols

### function `ensureDemoInAppNotifications`

- Signature: `async function ensureDemoInAppNotifications( store: DataStore, user: User, ): Promise<void>`
- Lines: 71-105
- Exported: yes

```ts
async function ensureDemoInAppNotifications(
  store: DataStore,
  user: User,
): Promise<void> {
  const { total } = await store.listNotificationsForUser(user.id, {
    page: 1,
    limit: 1,
  });
  if (total > 0) {
    return;
  }

  const now = Date.now();
  for (const spec of DEMO_SPECS) {
    const createdAt = new Date(now - spec.createdOffsetMs).toISOString();
    const readAt =
      spec.readAtOffsetMs != null
        ? new Date(now - spec.readAtOffsetMs).toISOString()
        : undefined;
    await store.createInAppNotification({
      userId: user.id,
      coupleId: user.coupleId,
      type: spec.type,
      title: spec.title,
      body: spec.body,
      iconName: spec.iconName,
      iconColor: spec.iconColor,
      iconBg: spec.iconBg,
      actionLabel: spec.actionLabel,
      readAt,
      createdAt,
      metadata: { demoSeed: true },
    });
  }
}
```

### type `DemoSpec`

- Signature:

```ts
type DemoSpec = { type: string; title: string; body?: string; iconName?: string; iconColor?: string; iconBg?: string; actionLabel?: string; /** Thời điểm tạo = now - offset */ createdOffsetMs: number; /** Đã đọc tại now - offset (bỏ qua nếu chưa đọc) */ readAtOffsetMs?: number; };
```
- Lines: 4-16
- Exported: no

```ts
type DemoSpec = {
  type: string;
  title: string;
  body?: string;
  iconName?: string;
  iconColor?: string;
  iconBg?: string;
  actionLabel?: string;
  /** Thời điểm tạo = now - offset */
  createdOffsetMs: number;
  /** Đã đọc tại now - offset (bỏ qua nếu chưa đọc) */
  readAtOffsetMs?: number;
};
```
