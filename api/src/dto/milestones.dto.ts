import { z } from "zod";
import {
  isoDateString,
  optionalTrimmedString,
  parseWithSchema,
  requiredTrimmedString,
} from "../shared/validators/zod.ts";

const milestoneCategorySchema = z.enum(["ANNIVERSARY", "DATE", "MEMORY", "GIFT", "OTHER"]);
const remindBeforeDaySchema = z.union([
  z.literal(1),
  z.literal(3),
  z.literal(7),
  z.literal(14),
  z.literal(30),
]);

const remindBeforeDaysSchema = z
  .array(remindBeforeDaySchema)
  .min(1, "remindBeforeDays phải có ít nhất một giá trị.")
  .transform((days) => Array.from(new Set(days)).sort((a, b) => a - b));

const createMilestoneSchema = z.object({
  title: requiredTrimmedString("title là bắt buộc.").pipe(z.string().max(255, "title tối đa 255 ký tự.")),
  description: optionalTrimmedString(),
  milestoneDate: isoDateString("milestoneDate phải theo định dạng YYYY-MM-DD."),
  category: milestoneCategorySchema.optional().default("OTHER"),
  remindBeforeDays: remindBeforeDaysSchema.optional().default([1, 3, 7]),
  isImportant: z.boolean().optional().default(false),
});

const updateMilestoneSchema = createMilestoneSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "Cần gửi ít nhất một trường để cập nhật.",
);

export type CreateMilestoneDto = z.infer<typeof createMilestoneSchema>;
export type UpdateMilestoneDto = z.infer<typeof updateMilestoneSchema>;

export function validateCreateMilestoneInput(input: unknown): CreateMilestoneDto {
  return parseWithSchema(createMilestoneSchema, input, {
    message: "Dữ liệu milestone không hợp lệ.",
  });
}

export function validateUpdateMilestoneInput(input: unknown): UpdateMilestoneDto {
  return parseWithSchema(updateMilestoneSchema, input, {
    message: "Dữ liệu cập nhật milestone không hợp lệ.",
  });
}
