import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import {
  calculateNextMilestone,
  combineMilestones,
  generateAutoMilestones,
} from "../engines/milestones.ts";
import {
  validateCreateMilestoneInput,
  validateUpdateMilestoneInput,
} from "../dto/milestones.dto.ts";
import { requireAuth } from "../middleware/auth.ts";
import { store } from "../store.ts";
import type { CustomMilestone } from "../types.ts";
import { AppError, readJson, success } from "../utils/http.ts";

export const milestonesRoutes = new Hono<AppEnv>();

milestonesRoutes.use("*", requireAuth);

async function getActiveCouple(userId: string) {
  const couple = await store.getActiveCoupleForUser(userId);
  if (!couple) {
    throw new AppError(404, "COUPLE_NOT_FOUND", "Bạn chưa ghép đôi hoặc chưa có mối quan hệ đang hoạt động.");
  }
  return couple;
}

milestonesRoutes.get("/", async (context) => {
  const user = context.get("user");
  const couple = await getActiveCouple(user.id);
  const autoMilestones = generateAutoMilestones(couple.loveStartDate);
  const customMilestones = await store.listCustomMilestonesByCouple(couple.id);
  const nextMilestone = calculateNextMilestone(combineMilestones(autoMilestones, customMilestones));

  return success(context, {
    autoMilestones,
    customMilestones,
    nextMilestone,
  });
});

milestonesRoutes.post("/", async (context) => {
  const user = context.get("user");
  const couple = await getActiveCouple(user.id);
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateCreateMilestoneInput(body);
  const now = new Date().toISOString();

  const milestone: CustomMilestone = {
    id: crypto.randomUUID(),
    coupleId: couple.id,
    title: input.title,
    description: input.description,
    milestoneDate: input.milestoneDate,
    type: "CUSTOM",
    category: input.category,
    remindBeforeDays: input.remindBeforeDays,
    isImportant: input.isImportant,
    createdById: user.id,
    createdAt: now,
    updatedAt: now,
  };

  await store.saveCustomMilestone(milestone);
  await store.invalidateHomeCache(couple.id);

  return success(context, milestone, 201);
});

milestonesRoutes.patch("/:id", async (context) => {
  const user = context.get("user");
  const couple = await getActiveCouple(user.id);
  const id = context.req.param("id");
  const existing = await store.getCustomMilestoneByCouple(couple.id, id);
  if (!existing) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy milestone.");
  }

  const body = await readJson<Record<string, unknown>>(context);
  const input = validateUpdateMilestoneInput(body);
  const updated: CustomMilestone = {
    ...existing,
    title: input.title ?? existing.title,
    description: input.description ?? existing.description,
    milestoneDate: input.milestoneDate ?? existing.milestoneDate,
    category: input.category ?? existing.category,
    remindBeforeDays: input.remindBeforeDays ?? existing.remindBeforeDays,
    isImportant: input.isImportant ?? existing.isImportant,
    updatedAt: new Date().toISOString(),
  };

  await store.updateCustomMilestone(updated);
  await store.invalidateHomeCache(couple.id);

  return success(context, updated);
});

milestonesRoutes.delete("/:id", async (context) => {
  const user = context.get("user");
  const couple = await getActiveCouple(user.id);
  const id = context.req.param("id");
  const deleted = await store.deleteCustomMilestone(couple.id, id);

  if (!deleted) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy milestone.");
  }

  await store.invalidateHomeCache(couple.id);

  return success(context, { ok: true });
});
