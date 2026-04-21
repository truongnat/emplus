import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { env } from "../config/env.ts";
import {
  parseTimelineQueryParams,
  validateCreateMemoryInput,
  validateUpdateMemoryInput,
} from "../dto/timeline.dto.ts";
import { requireAuth } from "../middleware/auth.ts";
import {
  ensureDemoTimelineMemories,
  ensureDemoGridTestMemories,
  syncDemoTimelineMediaUrls,
} from "./demo-timeline-memories.ts";
import { store } from "../store.ts";
import type { MemoryItem } from "../types.ts";
import { resolveActiveCoupleIdAsync } from "../utils/couple.ts";
import { AppError, paginated, readJson, success } from "../utils/http.ts";

export const timelineRoutes = new Hono<AppEnv>();

timelineRoutes.use("*", requireAuth);

timelineRoutes.get("/memories/:id", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);
  const id = context.req.param("id");
  const memory = await store.getMemoryByCouple(coupleId, id);
  if (!memory) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy mục.");
  }
  return success(context, memory);
});

timelineRoutes.delete("/memories/:id", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);
  const id = context.req.param("id");
  const deleted = await store.deleteMemory(coupleId, id);
  if (!deleted) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy mục.");
  }
  await store.invalidateHomeCache(coupleId);
  return success(context, { ok: true });
});

timelineRoutes.put("/memories/:id", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);
  const id = context.req.param("id");
  const existing = await store.getMemoryByCouple(coupleId, id);

  if (!existing) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy mục.");
  }

  const body = await readJson<Record<string, unknown>>(context);
  const input = validateUpdateMemoryInput(body);

  const memory: MemoryItem = {
    ...existing,
    title: input.title,
    description: input.description,
    memoryDate: input.memoryDate,
    mediaUrls: input.mediaUrls,
    tags: input.tags,
  };

  await store.updateMemory(memory);
  await store.invalidateHomeCache(coupleId);

  return success(context, memory);
});

timelineRoutes.get("/memories", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);

  if (env.fakeTimelineMemories) {
    await ensureDemoTimelineMemories(store, coupleId, user.id);
    await syncDemoTimelineMediaUrls(store, coupleId);
    await ensureDemoGridTestMemories(store, coupleId, user.id);
  }

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
