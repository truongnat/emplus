import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { parseGiftSuggestionsQuery } from "../dto/gift-suggestions.dto.ts";
import { filterGiftSuggestions } from "../engines/gift-suggestions.ts";
import { requireAuth } from "../middleware/auth.ts";
import { store } from "../store.ts";
import { AppError, success } from "../utils/http.ts";
import { giftSuggestionsConfig } from "./gift-suggestions.config.ts";

export const giftSuggestionsRoutes = new Hono<AppEnv>();

const giftSuggestionCategories = [
  "ANNIVERSARY",
  "BIRTHDAY",
  "APOLOGY",
  "RANDOM_SURPRISE",
  "COUPLE_ITEM",
  "HANDMADE",
] as const;

const giftBudgetRanges = [
  "UNDER_100K",
  "FROM_100K_TO_300K",
  "FROM_300K_TO_700K",
  "ABOVE_700K",
] as const;

giftSuggestionsRoutes.use("*", requireAuth);

async function getActiveCouple(userId: string) {
  const couple = await store.getActiveCoupleForUser(userId);
  if (!couple) {
    throw new AppError(404, "COUPLE_NOT_FOUND", "Bạn chưa ghép đôi hoặc chưa có mối quan hệ đang hoạt động.");
  }
  return couple;
}

giftSuggestionsRoutes.get("/", async (context) => {
  const user = context.get("user");
  const couple = await getActiveCouple(user.id);
  const query = parseGiftSuggestionsQuery({
    category: context.req.query("category"),
    budgetRange: context.req.query("budgetRange"),
    milestoneId: context.req.query("milestoneId"),
  });

  const milestone = query.milestoneId
    ? await store.getCustomMilestoneByCouple(couple.id, query.milestoneId)
    : undefined;

  const suggestions = filterGiftSuggestions(giftSuggestionsConfig, {
    category: query.category,
    budgetRange: query.budgetRange,
    milestone,
    hasMilestoneId: Boolean(query.milestoneId),
  });

  return success(context, { items: suggestions });
});

giftSuggestionsRoutes.get("/categories", async (context) => {
  const user = context.get("user");
  await getActiveCouple(user.id);

  return success(context, {
    categories: giftSuggestionCategories,
    budgetRanges: giftBudgetRanges,
    platforms: ["TIKTOK", "SHOPEE", "OTHER"],
  });
});
