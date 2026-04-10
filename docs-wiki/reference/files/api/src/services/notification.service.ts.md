---
title: "api/src/services/notification.service.ts"
description: "The `notify` function is an asynchronous API endpoint that creates and sends push or email notifications to users."
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
  page: "reference/files/api/src/services/notification.service.ts.md"
  relativePath: "api/src/services/notification.service.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/notification.service.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 3
---

# api/src/services/notification.service.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/notification.service.ts`
- Lines: 76
- Symbols: 3

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

The `notify` function is an asynchronous API endpoint that creates and sends push or email notifications to users.

### Responsibilities

- Create In-App Notifiactions
- Send Push/Email Notifications

### Usage Notes

- To use this function, call it with a `NotifyInput` object containing user-specific data, such as userId, coupleId, etc.

## Public API

- `interface NotifyInput`
- `async function notify(input: NotifyInput): Promise<InAppNotification>`
- `async function notifyPartner( senderId: string, coupleId: string, input: Omit<NotifyInput, "userId" | "coupleId">, ): Promise<void>`

## Symbols

### interface `NotifyInput`

- Signature: `interface NotifyInput`
- Lines: 6-19
- Exported: yes

```ts
interface NotifyInput {
  userId: string;
  coupleId?: string;
  type: string;
  title: string;
  body?: string;
  iconName?: string;
  iconColor?: string;
  iconBg?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
  /** Deep link path for push tap, e.g. "/(tabs)/notifications" */
  url?: string;
}
```

### function `notify`

- Signature: `async function notify(input: NotifyInput): Promise<InAppNotification>`
- Lines: 25-58
- Exported: yes

```ts
async function notify(input: NotifyInput): Promise<InAppNotification> {
  const notification = await store.createInAppNotification({
    userId: input.userId,
    coupleId: input.coupleId,
    type: input.type,
    title: input.title,
    body: input.body,
    iconName: input.iconName,
    iconColor: input.iconColor,
    iconBg: input.iconBg,
    actionLabel: input.actionLabel,
    metadata: input.metadata,
  });

  const user = await store.getUserById(input.userId);
  if (!user) return notification;

  const pushToken = await store.getExpoPushToken(input.userId);

  sendPushToUser(
    pushToken,
    input.title,
    input.body,
    { url: input.url ?? "/(tabs)/notifications", notificationId: notification.id },
  ).catch((err) => console.error("[Notify] Push failed:", err));

  if (user.emailNotificationsEnabled) {
    sendNotificationEmail(user.email, input.title, input.body).catch((err) =>
      console.error("[Notify] Email failed:", err),
    );
  }

  return notification;
}
```

### function `notifyPartner`

- Signature: `async function notifyPartner( senderId: string, coupleId: string, input: Omit<NotifyInput, "userId" | "coupleId">, ): Promise<void>`
- Lines: 63-75
- Exported: yes

```ts
async function notifyPartner(
  senderId: string,
  coupleId: string,
  input: Omit<NotifyInput, "userId" | "coupleId">,
): Promise<void> {
  const couple = await store.getCoupleById(coupleId);
  if (!couple) return;

  const partnerId = couple.partner1Id === senderId ? couple.partner2Id : couple.partner1Id;
  if (!partnerId) return;

  await notify({ ...input, userId: partnerId, coupleId });
}
```
