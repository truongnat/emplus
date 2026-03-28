import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import appConfig from "@/src/core/config/app-config";
import { buildLiveWebSocketUrl } from "@/src/core/config/live-ws-url";
import { useSession } from "@/src/session-context";

export type LiveWsMessage =
  | { type: "subscribed"; coupleId: string }
  | {
      type: "message";
      userId: string;
      payload: unknown;
      timestamp: number;
    }
  | Record<string, unknown>;

export type LiveChannelStatus =
  | "disabled"
  | "connecting"
  | "open"
  | "reconnecting"
  | "error";

export type LiveChannelContextValue = {
  status: LiveChannelStatus;
  lastMessage: LiveWsMessage | null;
  error: Error | null;
  reconnectAttempt: number;
};

const defaultValue: LiveChannelContextValue = {
  status: "disabled",
  lastMessage: null,
  error: null,
  reconnectAttempt: 0,
};

const LiveChannelContext = createContext<LiveChannelContextValue>(defaultValue);

export function LiveChannelProvider({ children }: { children: ReactNode }) {
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

export function useLiveChannel(): LiveChannelContextValue {
  return useContext(LiveChannelContext);
}
