import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { validateCreateNudgeInput, parseRecentNudgesQuery } from "../dto/nudges.dto.ts";
import { messageForNudgeType, secondsSince } from "../engines/nudges.ts";
import { requireAuth } from "../middleware/auth.ts";
import { store } from "../store.ts";
import type { Couple, Nudge } from "../types.ts";
import { AppError, readJson, success } from "../utils/http.ts";

const NUDGE_RATE_LIMIT_SECONDS = 30;

export const nudgesRoutes = new Hono<AppEnv>();

nudgesRoutes.use("*", requireAuth);

async function getActiveCoupleWithPartner(userId: string): Promise<{ couple: Couple; partnerId: string }> {
  const couple = await store.getActiveCoupleForUser(userId);
  if (!couple) {
    throw new AppError(404, "COUPLE_NOT_FOUND", "Bạn chưa ghép đôi hoặc chưa có mối quan hệ đang hoạt động.");
  }

  const partnerId = couple.partner1Id === userId ? couple.partner2Id : couple.partner1Id;
  if (!partnerId) {
    throw new AppError(404, "PARTNER_NOT_FOUND", "Chưa tìm thấy người ấy trong mối quan hệ này.");
  }

  if (partnerId === userId) {
    throw new AppError(400, "SELF_NUDGE_NOT_ALLOWED", "Không thể tự gửi nudge cho chính mình.");
  }

  return { couple, partnerId };
}

async function enforceNudgeRateLimit(userId: string): Promise<void> {
  const latest = await store.getLatestNudgeFromUser(userId);
  if (!latest) {
    return;
  }

  const elapsedSeconds = secondsSince(latest.createdAt);
  if (elapsedSeconds < NUDGE_RATE_LIMIT_SECONDS) {
    throw new AppError(429, "NUDGE_RATE_LIMITED", "Bạn chỉ có thể gửi một nudge mỗi 30 giây.", [
      {
        retryAfterSeconds: NUDGE_RATE_LIMIT_SECONDS - elapsedSeconds,
      },
    ]);
  }
}

nudgesRoutes.post("/", async (context) => {
  const user = context.get("user");
  const { couple, partnerId } = await getActiveCoupleWithPartner(user.id);
  await enforceNudgeRateLimit(user.id);

  const body = await readJson<Record<string, unknown>>(context);
  const input = validateCreateNudgeInput(body);
  const nudge: Nudge = {
    id: crypto.randomUUID(),
    coupleId: couple.id,
    fromUserId: user.id,
    toUserId: partnerId,
    type: input.type,
    message: messageForNudgeType(input.type),
    createdAt: new Date().toISOString(),
  };

  await store.createNudge(nudge);

  return success(context, nudge, 201);
});

nudgesRoutes.get("/recent", async (context) => {
  const user = context.get("user");
  await getActiveCoupleWithPartner(user.id);
  const query = parseRecentNudgesQuery({
    limit: context.req.query("limit"),
  });
  const nudges = await store.listRecentNudgesForUser(user.id, query.limit);

  return success(context, { items: nudges });
});

nudgesRoutes.post("/:id/read", async (context) => {
  const user = context.get("user");
  await getActiveCoupleWithPartner(user.id);
  const id = context.req.param("id");
  const nudge = await store.markNudgeReadForUser(user.id, id);

  if (!nudge) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy nudge.");
  }

  return success(context, nudge);
});
