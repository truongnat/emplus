import { Hono } from "hono";
import { upgradeWebSocket } from "hono/bun";
import type { WSContext } from "hono/ws";
import type { AppEnv } from "../app-env.ts";
import { validateWebsocketAuthQuery } from "../dto/live.dto.ts";
import { store } from "../store.ts";
import { AppError } from "../utils/http.ts";

export const liveRoutes = new Hono<AppEnv>();

// Store active connections by coupleId (Hono WSContext — MessageEvent.target is null by design)
const connections = new Map<string, Set<WSContext>>();

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
    } catch (error) {
      // Return a dummy response for unauthenticated connections
      return {
        onMessage(event) {
          console.log("Message from unauthenticated:", event.data);
        },
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

          // Handle subscription to couple room
          if (message.type === "subscribe") {
            if (!connections.has(coupleId)) {
              connections.set(coupleId, new Set());
            }
            connections.get(coupleId)?.add(wsCtx);
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
        const conns = connections.get(coupleId);
        if (conns) {
          conns.delete(wsCtx);
          if (conns.size === 0) {
            connections.delete(coupleId);
          }
        }
      },
      onError(error: unknown) {
        console.error("WebSocket error:", error);
      },
    };
  })
);
