import { z } from "zod";
import { optionalTrimmedString, parseWithSchema } from "../shared/validators/zod.ts";

export const giftSuggestionCategorySchema = z.enum([
  "ANNIVERSARY",
  "BIRTHDAY",
  "APOLOGY",
  "RANDOM_SURPRISE",
  "COUPLE_ITEM",
  "HANDMADE",
]);

export const giftBudgetRangeSchema = z.enum([
  "UNDER_100K",
  "FROM_100K_TO_300K",
  "FROM_300K_TO_700K",
  "ABOVE_700K",
]);

const giftSuggestionsQuerySchema = z.object({
  category: giftSuggestionCategorySchema.optional(),
  budgetRange: giftBudgetRangeSchema.optional(),
  milestoneId: optionalTrimmedString(),
});

export type GiftSuggestionsQueryDto = z.infer<typeof giftSuggestionsQuerySchema>;

export function parseGiftSuggestionsQuery(input: Record<string, string | undefined>): GiftSuggestionsQueryDto {
  return parseWithSchema(giftSuggestionsQuerySchema, input, {
    message: "Query gợi ý quà không hợp lệ.",
  });
}
