---
title: "api/src/modules/live.ts"
description: "Provides 11 documented symbols in api/src/modules/live.ts."
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
  page: "reference/files/api/src/modules/live.ts.md"
  relativePath: "api/src/modules/live.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/modules/live.ts"
  module: "api/src/modules"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 11
---

# api/src/modules/live.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/modules](../../../../modules/api/src/modules.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/modules/live.ts`
- Lines: 167
- Symbols: 11

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
- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Order Management Login](../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Storage Login](../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Login](../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Reporting Login](../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

Provides 11 documented symbols in api/src/modules/live.ts.

## Public API

- `function isUserOnline(userId: string): boolean`
- `function getOnlineUsersForCouple(coupleId: string): string[]`

## Symbols

### function `isUserOnline`

- Signature: `function isUserOnline(userId: string): boolean`
- Lines: 14-18
- Exported: yes

```ts
function isUserOnline(userId: string): boolean {
  const entry = userPresence.get(userId);
  if (!entry) return false;
  return Date.now() - entry.lastSeen < 90_000;
}
```

### function `getOnlineUsersForCouple`

- Signature: `function getOnlineUsersForCouple(coupleId: string): string[]`
- Lines: 20-28
- Exported: yes

```ts
function getOnlineUsersForCouple(coupleId: string): string[] {
  const online: string[] = [];
  for (const [userId, entry] of userPresence) {
    if (entry.coupleId === coupleId && Date.now() - entry.lastSeen < 90_000) {
      online.push(userId);
    }
  }
  return online;
}
```

### function `broadcastToCouple`

- Signature: `function broadcastToCouple(coupleId: string, message: unknown): void`
- Lines: 30-44
- Exported: no

```ts
function broadcastToCouple(coupleId: string, message: unknown): void {
  const coupleConnections = connections.get(coupleId);
  if (coupleConnections) {
    const data = JSON.stringify(message);
    coupleConnections.forEach((wsCtx) => {
      if (wsCtx.readyState === WebSocket.OPEN) {
        try {
          wsCtx.send(data);
        } catch {
          /* socket may have closed */
        }
      }
    });
  }
}
```

### function `authenticateWebSocket`

- Signature: `async function authenticateWebSocket(c: { req: { query: (key: string) => string | undefined } }): Promise<{ userId: string; coupleId: string }>`
- Lines: 46-65
- Exported: no

```ts
async function authenticateWebSocket(c: { req: { query: (key: string) => string | undefined } }): Promise<{ userId: string; coupleId: string }> {
  const query = validateWebsocketAuthQuery({
    token: c.req.query("token"),
    coupleId: c.req.query("coupleId"),
  });

  // Verify the access token via store
  const user = await store.getUserByToken(query.token);
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Token không hợp lệ.");
  }

  // Verify user belongs to the couple
  const couple = await store.getActiveCoupleForUser(user.id);
  if (!couple || couple.id !== query.coupleId) {
    throw new AppError(403, "FORBIDDEN", "Bạn không thuộc couple này.");
  }

  return { userId: user.id, coupleId: query.coupleId };
}
```

### method `onOpen`

- Signature: `onOpen(_event: unknown, ws: WSContext)`
- Lines: 80-82
- Exported: no

```ts
onOpen(_event: unknown, ws: WSContext) {
          ws.close(4001, "Unauthorized");
        }
```

### method `onMessage`

- Signature: `onMessage()`
- Lines: 83-83
- Exported: no

```ts
onMessage() {}
```

### method `onClose`

- Signature: `onClose()`
- Lines: 84-84
- Exported: no

```ts
onClose() {}
```

### method `onError`

- Signature: `onError()`
- Lines: 85-85
- Exported: no

```ts
onError() {}
```

### method `onMessage`

- Signature: `onMessage(event: unknown, wsCtx?: WSContext)`
- Lines: 90-142
- Exported: no

```ts
onMessage(event: unknown, wsCtx?: WSContext) {
        if (!wsCtx) {
          return;
        }
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const wsEvent = event as any;
          // event.data can be string or ArrayBuffer
          const data = typeof wsEvent.data === "string" ? wsEvent.data : new TextDecoder().decode(wsEvent.data);
          const message = JSON.parse(data);

          if (wsCtx.readyState !== WebSocket.OPEN) {
            return;
          }

          if (message.type === "heartbeat") {
            userPresence.set(userId, { userId, coupleId, lastSeen: Date.now() });
            const onlineUsers = getOnlineUsersForCouple(coupleId);
            broadcastToCouple(coupleId, {
              type: "presence",
              online: onlineUsers,
              timestamp: Date.now(),
            });
            return;
          }

          if (message.type === "subscribe") {
            if (!connections.has(coupleId)) {
              connections.set(coupleId, new Set());
            }
            connections.get(coupleId)?.add(wsCtx);
            userPresence.set(userId, { userId, coupleId, lastSeen: Date.now() });
            try {
              wsCtx.send(JSON.stringify({ type: "subscribed", coupleId }));
            } catch (sendErr) {
              console.error("live/ws: subscribe ack failed:", sendErr);
            }
            return;
          }

          // Handle broadcasting messages to couple
          if (message.type === "broadcast") {
            broadcastToCouple(coupleId, {
              type: "message",
              userId,
              payload: message.payload,
              timestamp: Date.now(),
            });
          }
        } catch (e) {
          console.error("WebSocket message error:", e);
        }
      }
```

### method `onClose`

- Signature: `onClose(_event: unknown, wsCtx?: WSContext)`
- Lines: 143-160
- Exported: no

```ts
onClose(_event: unknown, wsCtx?: WSContext) {
        if (!wsCtx) {
          return;
        }
        userPresence.delete(userId);
        const conns = connections.get(coupleId);
        if (conns) {
          conns.delete(wsCtx);
          if (conns.size === 0) {
            connections.delete(coupleId);
          }
        }
        broadcastToCouple(coupleId, {
          type: "presence",
          online: getOnlineUsersForCouple(coupleId),
          timestamp: Date.now(),
        });
      }
```

### method `onError`

- Signature: `onError(error: unknown)`
- Lines: 161-163
- Exported: no

```ts
onError(error: unknown) {
        console.error("WebSocket error:", error);
      }
```
