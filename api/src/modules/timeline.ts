import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { parseTimelineQueryParams, validateCreateMemoryInput } from "../dto/timeline.dto.ts";
import { requireAuth } from "../middleware/auth.ts";
import { store } from "../store.ts";
import type { MemoryItem } from "../types.ts";
import { resolveActiveCoupleIdAsync } from "../utils/couple.ts";
import { paginated, readJson, success } from "../utils/http.ts";

export const timelineRoutes = new Hono<AppEnv>();

timelineRoutes.use("*", requireAuth);

timelineRoutes.get("/memories", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);

  const query = parseTimelineQueryParams({
    page: context.req.query("page"),
    limit: context.req.query("limit"),
    order: context.req.query("order"),
    tag: context.req.query("tag"),
  });

  // Use server-side pagination
  const result = await store.listMemoriesByCouple(coupleId, {
    page: query.page,
    limit: query.limit,
    order: query.order,
    tag: query.tag,
  });

  return paginated(context, result.items, {
    page: query.page,
    limit: query.limit,
    totalItems: result.total,
  });
});

timelineRoutes.post("/memories", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateCreateMemoryInput(body);

  const memory: MemoryItem = {
    id: crypto.randomUUID(),
    coupleId,
    createdById: user.id,
    title: input.title,
    description: input.description,
    memoryDate: input.memoryDate,
    mediaUrls: input.mediaUrls,
    tags: input.tags,
    createdAt: new Date().toISOString(),
  };

  await store.saveMemory(memory);
  await store.invalidateHomeCache(coupleId);

  return success(context, memory, 201);
});
