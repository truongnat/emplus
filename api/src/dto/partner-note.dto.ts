import { z } from "zod";
import { optionalTrimmedString, parseWithSchema, requiredTrimmedString } from "../shared/validators/zod.ts";

const partnerNoteSchema = z.object({
  title: requiredTrimmedString("title là bắt buộc."),
  content: requiredTrimmedString("content là bắt buộc."),
  category: optionalTrimmedString(),
});

export type PartnerNoteDto = z.infer<typeof partnerNoteSchema>;

export function validatePartnerNoteInput(input: unknown): PartnerNoteDto {
  return parseWithSchema(partnerNoteSchema, input, {
    message: "Dữ liệu partner note không hợp lệ.",
  });
}
