import { z } from "zod";
import { parseWithSchema } from "../shared/validators/zod.ts";

export const nudgeTypeSchema = z.enum([
  "POKE",
  "HUG",
  "MISS_YOU",
  "KISS",
  "ANGRY",
  "MAKE_UP",
  "EAT_TOGETHER",
  "CALL_ME",
]);

const createNudgeSchema = z.object({
  type: nudgeTypeSchema,
});

const recentNudgesQuerySchema = z.object({
  limit: z.preprocess((value) => {
    const parsed = Number(value ?? 20);
    if (!Number.isFinite(parsed)) {
      return 20;
    }
    return Math.min(50, Math.max(1, Math.floor(parsed)));
  }, z.number()),
});

export type CreateNudgeDto = z.infer<typeof createNudgeSchema>;
export type RecentNudgesQueryDto = z.infer<typeof recentNudgesQuerySchema>;

export function validateCreateNudgeInput(input: unknown): CreateNudgeDto {
  return parseWithSchema(createNudgeSchema, input, {
    message: "Dữ liệu nudge không hợp lệ.",
  });
}

export function parseRecentNudgesQuery(input: Record<string, string | undefined>): RecentNudgesQueryDto {
  return parseWithSchema(recentNudgesQuerySchema, input, {
    message: "Query nudges không hợp lệ.",
  });
}
