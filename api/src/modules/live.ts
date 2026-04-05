import { Hono } from "hono";
import { upgradeWebSocket } from "hono/bun";
import type { WSContext } from "hono/ws";
import type { AppEnv } from "../app-env.ts";
import { validateWebsocketAuthQuery } from "../dto/live.dto.ts";
import { store } from "../store.ts";
import { AppError } from "../utils/http.ts";

export const liveRoutes = new Hono<AppEnv>();

const connections = new Map<string, Set<WSContext>>();
const userPresence = new Map<string, { userId: string; coupleId: string; lastSeen: number }>();

export function isUserOnline(userId: string): boolean {
  const entry = userPresence.get(userId);
  if (!entry) return false;
  return Date.now() - entry.lastSeen < 90_000;
}

export function getOnlineUsersForCouple(coupleId: string): string[] {
  const online: string[] = [];
  for (const [userId, entry] of userPresence) {
    if (entry.coupleId === coupleId && Date.now() - entry.lastSeen < 90_000) {
      online.push(userId);
    }
  }
  return online;
}

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

liveRoutes.get(
  "/ws",
  upgradeWebSocket(async (c) => {
    // Authenticate the WebSocket connection
    let userId: string;
    let coupleId: string;

    try {
      const auth = await authenticateWebSocket(c);
      userId = auth.userId;
      coupleId = auth.coupleId;
    } catch {
      return {
        onOpen(_event: unknown, ws: WSContext) {
          ws.close(4001, "Unauthorized");
        },
        onMessage() {},
        onClose() {},
        onError() {},
      };
    }

    return {
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
      },
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
      },
      onError(error: unknown) {
        console.error("WebSocket error:", error);
      },
    };
  })
);
