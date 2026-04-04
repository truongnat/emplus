import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { env } from "../config/env.ts";
import { parseListNotificationsQuery } from "../dto/notifications.dto.ts";
import { requireAuth } from "../middleware/auth.ts";
import { ensureDemoInAppNotifications } from "./demo-in-app-notifications.ts";
import { store } from "../store.ts";
import { AppError, paginated, success } from "../utils/http.ts";

export const notificationRoutes = new Hono<AppEnv>();

notificationRoutes.use("*", requireAuth);

notificationRoutes.get("/", async (context) => {
  const user = context.get("user");
  const query = parseListNotificationsQuery({
    page: context.req.query("page"),
    limit: context.req.query("limit"),
    unread_only: context.req.query("unread_only"),
  });

  if (env.fakeInAppNotifications) {
    await ensureDemoInAppNotifications(store, user);
  }

  const result = await store.listNotificationsForUser(user.id, {
    page: query.page,
    limit: query.limit,
    unreadOnly: query.unreadOnly,
  });

  return paginated(context, result.items, {
    page: query.page,
    limit: query.limit,
    totalItems: result.total,
  });
});

notificationRoutes.patch("/:id/read", async (context) => {
  const user = context.get("user");
  const id = context.req.param("id");
  const updated = await store.markNotificationRead(user.id, id);
  if (!updated) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy thông báo.");
  }
  return success(context, updated);
});

notificationRoutes.post("/read-all", async (context) => {
  const user = context.get("user");
  const markedCount = await store.markAllNotificationsRead(user.id);
  return success(context, { markedCount });
});
