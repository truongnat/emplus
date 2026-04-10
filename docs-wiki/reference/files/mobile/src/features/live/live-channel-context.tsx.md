---
title: "mobile/src/features/live/live-channel-context.tsx"
description: "The LiveChannelProvider class is responsible for managing live channel functionality."
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
  page: "reference/files/mobile/src/features/live/live-channel-context.tsx.md"
  relativePath: "mobile/src/features/live/live-channel-context.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/live/live-channel-context.tsx"
  module: "mobile/src/features/live"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 8
---

# mobile/src/features/live/live-channel-context.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/features/live](../../../../../modules/mobile/src/features/live.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/live/live-channel-context.tsx`
- Lines: 172
- Symbols: 8

## Related Features

- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.

## AI Summary

The LiveChannelProvider class is responsible for managing live channel functionality.

### Responsibilities

- Manages live channels
- Connects to live channels
- Handles reconnect attempts

### Usage Notes

- LiveChannelProvider is used as a context provider in the app.
- It takes a children prop which can be an array of React nodes.

## Public API

- `type LiveWsMessage = | { type: "subscribed"; coupleId: string } | { type: "message"; userId: string; payload: unknown; timestamp: number; } | Record<string, unknown>;`
- `type LiveChannelStatus = | "disabled" | "connecting" | "open" | "reconnecting" | "error";`
- `type LiveChannelContextValue = { status: LiveChannelStatus; lastMessage: LiveWsMessage | null; error: Error | null; reconnectAttempt: number; };`
- `function LiveChannelProvider({ children }: { children: ReactNode })`
- `function clearTimer()`
- `function scheduleReconnect()`
- `function connect()`
- `function useLiveChannel(): LiveChannelContextValue`

## Symbols

### type `LiveWsMessage`

- Signature: `type LiveWsMessage = | { type: "subscribed"; coupleId: string } | { type: "message"; userId: string; payload: unknown; timestamp: number; } | Record<string, unknown>;`
- Lines: 14-22
- Exported: yes

```tsx
type LiveWsMessage =
  | { type: "subscribed"; coupleId: string }
  | {
      type: "message";
      userId: string;
      payload: unknown;
      timestamp: number;
    }
  | Record<string, unknown>;
```

### type `LiveChannelStatus`

- Signature: `type LiveChannelStatus = | "disabled" | "connecting" | "open" | "reconnecting" | "error";`
- Lines: 24-29
- Exported: yes

```tsx
type LiveChannelStatus =
  | "disabled"
  | "connecting"
  | "open"
  | "reconnecting"
  | "error";
```

### type `LiveChannelContextValue`

- Signature: `type LiveChannelContextValue = { status: LiveChannelStatus; lastMessage: LiveWsMessage | null; error: Error | null; reconnectAttempt: number; };`
- Lines: 31-36
- Exported: yes

```tsx
type LiveChannelContextValue = {
  status: LiveChannelStatus;
  lastMessage: LiveWsMessage | null;
  error: Error | null;
  reconnectAttempt: number;
};
```

### function `LiveChannelProvider`

- Signature: `function LiveChannelProvider({ children }: { children: ReactNode })`
- Lines: 47-167
- Exported: yes

```tsx
function LiveChannelProvider({ children }: { children: ReactNode }) {
  const { session, isAuthenticated } = useSession();
  const coupleId = session?.user?.coupleId;
  const token = session?.tokens?.accessToken;

  const shouldConnect = Boolean(
    appConfig.features.liveWebSocket &&
      isAuthenticated &&
      coupleId &&
      token,
  );

  const [status, setStatus] = useState<LiveChannelStatus>("disabled");
  const [lastMessage, setLastMessage] = useState<LiveWsMessage | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);

  useEffect(() => {
    setLastMessage(null);
  }, [coupleId]);

  useEffect(() => {
    if (!shouldConnect || !coupleId || !token) {
      setStatus("disabled");
      setReconnectAttempt(0);
      setError(null);
      return;
    }

    const resolvedToken = token;
    const resolvedCoupleId = coupleId;

    let cancelled = false;
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let attempt = 0;

    function clearTimer() {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    }

    function scheduleReconnect() {
      if (cancelled) return;
      clearTimer();
      attempt += 1;
      setReconnectAttempt(attempt);
      setStatus("reconnecting");
      const delay = Math.min(1000 * 2 ** (attempt - 1), 30_000);
      reconnectTimer = setTimeout(() => {
        if (!cancelled) connect();
      }, delay);
    }

    function connect() {
      if (cancelled) return;
      setStatus(attempt === 0 ? "connecting" : "reconnecting");
      setError(null);

      const url = buildLiveWebSocketUrl(resolvedToken, resolvedCoupleId);
      ws = new WebSocket(url);

      ws.onopen = () => {
        if (cancelled) return;
        attempt = 0;
        setReconnectAttempt(0);
        setStatus("open");
        ws?.send(JSON.stringify({ type: "subscribe" }));
      };

      ws.onmessage = (ev) => {
        if (cancelled) return;
        try {
          const parsed = JSON.parse(String(ev.data)) as LiveWsMessage;
          setLastMessage(parsed);
        } catch {
          /* ignore */
        }
      };

      ws.onerror = () => {
        if (cancelled) return;
        setError(new Error("WebSocket error"));
        setStatus("error");
      };

      ws.onclose = () => {
        if (cancelled) return;
        ws = null;
        scheduleReconnect();
      };
    }

    connect();

    return () => {
      cancelled = true;
      clearTimer();
      if (
        ws &&
        (ws.readyState === WebSocket.OPEN ||
          ws.readyState === WebSocket.CONNECTING)
      ) {
        ws.close();
      }
    };
  }, [shouldConnect, coupleId, token]);

  const value = useMemo(
    () => ({ status, lastMessage, error, reconnectAttempt }),
    [status, lastMessage, error, reconnectAttempt],
  );

  return (
    <LiveChannelContext.Provider value={value}>
      {children}
    </LiveChannelContext.Provider>
  );
}
```

### function `clearTimer`

- Signature: `function clearTimer()`
- Lines: 84-89
- Exported: yes

```tsx
function clearTimer() {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    }
```

### function `scheduleReconnect`

- Signature: `function scheduleReconnect()`
- Lines: 91-101
- Exported: yes

```tsx
function scheduleReconnect() {
      if (cancelled) return;
      clearTimer();
      attempt += 1;
      setReconnectAttempt(attempt);
      setStatus("reconnecting");
      const delay = Math.min(1000 * 2 ** (attempt - 1), 30_000);
      reconnectTimer = setTimeout(() => {
        if (!cancelled) connect();
      }, delay);
    }
```

### function `connect`

- Signature: `function connect()`
- Lines: 103-140
- Exported: yes

```tsx
function connect() {
      if (cancelled) return;
      setStatus(attempt === 0 ? "connecting" : "reconnecting");
      setError(null);

      const url = buildLiveWebSocketUrl(resolvedToken, resolvedCoupleId);
      ws = new WebSocket(url);

      ws.onopen = () => {
        if (cancelled) return;
        attempt = 0;
        setReconnectAttempt(0);
        setStatus("open");
        ws?.send(JSON.stringify({ type: "subscribe" }));
      };

      ws.onmessage = (ev) => {
        if (cancelled) return;
        try {
          const parsed = JSON.parse(String(ev.data)) as LiveWsMessage;
          setLastMessage(parsed);
        } catch {
          /* ignore */
        }
      };

      ws.onerror = () => {
        if (cancelled) return;
        setError(new Error("WebSocket error"));
        setStatus("error");
      };

      ws.onclose = () => {
        if (cancelled) return;
        ws = null;
        scheduleReconnect();
      };
    }
```

### function `useLiveChannel`

- Signature: `function useLiveChannel(): LiveChannelContextValue`
- Lines: 169-171
- Exported: yes

```tsx
function useLiveChannel(): LiveChannelContextValue {
  return useContext(LiveChannelContext);
}
```
