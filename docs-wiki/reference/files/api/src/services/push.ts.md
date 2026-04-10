---
title: "api/src/services/push.ts"
description: "The sendExpoPush function sends Expo push notifications."
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
  page: "reference/files/api/src/services/push.ts.md"
  relativePath: "api/src/services/push.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/push.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 4
---

# api/src/services/push.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/push.ts`
- Lines: 78
- Symbols: 4

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

The sendExpoPush function sends Expo push notifications.

### Responsibilities

- async function sendExpoPush(messages: ExpoPushMessage[]): Promise&lt;ExpoPushTicket[]&gt;

### Usage Notes

- This function takes an array of Expo push messages and returns a promise that resolves to an array of Expo push tickets.

## Public API

- `interface ExpoPushMessage`
- `async function sendExpoPush(messages: ExpoPushMessage[]): Promise<ExpoPushTicket[]>`
- `async function sendPushToUser( expoPushToken: string | null | undefined, title: string, body?: string, data?: Record<string, unknown>, ): Promise<void>`

## Symbols

### interface `ExpoPushMessage`

- Signature: `interface ExpoPushMessage`
- Lines: 5-13
- Exported: yes

```ts
interface ExpoPushMessage {
  to: string;
  title: string;
  body?: string;
  data?: Record<string, unknown>;
  sound?: "default" | null;
  badge?: number;
  channelId?: string;
}
```

### function `sendExpoPush`

- Signature: `async function sendExpoPush(messages: ExpoPushMessage[]): Promise<ExpoPushTicket[]>`
- Lines: 22-58
- Exported: yes

```ts
async function sendExpoPush(messages: ExpoPushMessage[]): Promise<ExpoPushTicket[]> {
  if (messages.length === 0) return [];

  const validMessages = messages.filter((m) => m.to && m.to.startsWith("ExponentPushToken["));
  if (validMessages.length === 0) return [];

  try {
    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate",
      },
      body: JSON.stringify(validMessages),
    });

    if (!response.ok) {
      console.error(`[Push] Expo API returned ${response.status}`);
      return [];
    }

    const result = (await response.json()) as { data: ExpoPushTicket[] };
    const tickets = result.data ?? [];

    for (const ticket of tickets) {
      if (ticket.status === "error") {
        console.error(`[Push] Ticket error: ${ticket.message}`, ticket.details);
      }
    }

    return tickets;
  } catch (error) {
    console.error("[Push] Failed to send:", error);
    return [];
  }
}
```

### function `sendPushToUser`

- Signature: `async function sendPushToUser( expoPushToken: string | null | undefined, title: string, body?: string, data?: Record<string, unknown>, ): Promise<void>`
- Lines: 60-77
- Exported: yes

```ts
async function sendPushToUser(
  expoPushToken: string | null | undefined,
  title: string,
  body?: string,
  data?: Record<string, unknown>,
): Promise<void> {
  if (!expoPushToken) return;

  await sendExpoPush([
    {
      to: expoPushToken,
      title,
      body,
      data,
      sound: "default",
    },
  ]);
}
```

### interface `ExpoPushTicket`

- Signature: `interface ExpoPushTicket`
- Lines: 15-20
- Exported: no

```ts
interface ExpoPushTicket {
  status: "ok" | "error";
  id?: string;
  message?: string;
  details?: { error?: string };
}
```
