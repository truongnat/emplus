import { z } from "zod";
import { isoDateString, parseWithSchema } from "../shared/validators/zod.ts";

const saveCycleSchema = z.object({
  lastPeriodStart: isoDateString("lastPeriodStart phải theo định dạng YYYY-MM-DD."),
  avgCycleLength: z.coerce.number().refine(
    (value) => Number.isInteger(value) && value >= 20 && value <= 40,
    "avgCycleLength phải là số nguyên từ 20 đến 40.",
  ),
  avgPeriodLength: z.coerce.number().refine(
    (value) => Number.isInteger(value) && value >= 2 && value <= 10,
    "avgPeriodLength phải là số nguyên từ 2 đến 10.",
  ),
});

export type SaveCycleDto = z.infer<typeof saveCycleSchema>;

export function validateSaveCycleInput(input: unknown): SaveCycleDto {
  return parseWithSchema(saveCycleSchema, input, {
    message: "Dữ liệu chu kỳ không hợp lệ.",
  });
}
