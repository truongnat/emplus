import { z } from "zod";
import { isoDateString, optionalTrimmedString, parseWithSchema, requiredTrimmedString } from "../shared/validators/zod.ts";

const timelineQuerySchema = z.object({
  page: z.preprocess((value) => {
    const parsed = Number(value ?? 1);
    if (!Number.isFinite(parsed)) {
      return 1;
    }
    return Math.max(1, Math.floor(parsed));
  }, z.number()),
  limit: z.preprocess((value) => {
    const parsed = Number(value ?? 10);
    if (!Number.isFinite(parsed)) {
      return 10;
    }
    return Math.min(50, Math.max(1, Math.floor(parsed)));
  }, z.number()),
  order: z.preprocess((value) => {
    if (typeof value !== "string") {
      return "desc";
    }
    const normalized = value.trim().toLowerCase();
    return normalized === "asc" ? "asc" : "desc";
  }, z.enum(["asc", "desc"])),
  tag: optionalTrimmedString(),
});

const nonEmptyTrimmedStringSchema = requiredTrimmedString("Giá trị chuỗi không được để trống.");

const createMemorySchema = z.object({
  title: requiredTrimmedString("title là bắt buộc."),
  description: optionalTrimmedString(),
  memoryDate: isoDateString("memoryDate phải theo định dạng YYYY-MM-DD."),
  mediaUrls: z.array(nonEmptyTrimmedStringSchema).optional().default([]),
  tags: z.array(nonEmptyTrimmedStringSchema).optional().default([]),
});

export type TimelineQueryDto = z.infer<typeof timelineQuerySchema>;
export type CreateMemoryDto = z.infer<typeof createMemorySchema>;
export type UpdateMemoryDto = z.infer<typeof createMemorySchema>;

export function parseTimelineQueryParams(query: Record<string, string | undefined>): TimelineQueryDto {
  return parseWithSchema(timelineQuerySchema, query, {
    message: "Query timeline không hợp lệ.",
  });
}

export function validateCreateMemoryInput(input: unknown): CreateMemoryDto {
  return parseWithSchema(createMemorySchema, input, {
    message: "Dữ liệu memory không hợp lệ.",
  });
}

export function validateUpdateMemoryInput(input: unknown): UpdateMemoryDto {
  return parseWithSchema(createMemorySchema, input, {
    message: "Dữ liệu cập nhật memory không hợp lệ.",
  });
}
