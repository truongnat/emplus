import type { CustomMilestone, GiftBudgetRange, GiftSuggestion, GiftSuggestionCategory } from "../types.ts";

type GiftSuggestionFilters = {
  category?: GiftSuggestionCategory;
  budgetRange?: GiftBudgetRange;
  milestone?: CustomMilestone;
  hasMilestoneId?: boolean;
};

function categoryForMilestone(milestone?: CustomMilestone): GiftSuggestionCategory | undefined {
  if (!milestone) {
    return undefined;
  }

  if (milestone.category === "ANNIVERSARY") {
    return "ANNIVERSARY";
  }

  if (milestone.category === "GIFT") {
    return "COUPLE_ITEM";
  }

  return undefined;
}

function milestoneKeywords(milestone?: CustomMilestone): string[] {
  if (!milestone) {
    return [];
  }

  return [milestone.title, milestone.description ?? "", milestone.category]
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9\u00C0-\u1EF9]+/i)
    .filter(Boolean);
}

function relevanceScore(suggestion: GiftSuggestion, filters: GiftSuggestionFilters): number {
  let score = 0;
  const inferredCategory = categoryForMilestone(filters.milestone);

  if (filters.category && suggestion.category === filters.category) {
    score += 8;
  }

  if (inferredCategory && suggestion.category === inferredCategory) {
    score += 5;
  }

  const keywords = milestoneKeywords(filters.milestone);
  if (keywords.length > 0) {
    for (const tag of suggestion.tags) {
      if (keywords.includes(tag.toLowerCase())) {
        score += 2;
      }
    }
  }

  if (filters.hasMilestoneId && !filters.milestone && suggestion.category === "ANNIVERSARY") {
    score += 3;
  }

  return score;
}

export function filterGiftSuggestions(
  suggestions: GiftSuggestion[],
  filters: GiftSuggestionFilters,
): GiftSuggestion[] {
  const category = filters.category ?? categoryForMilestone(filters.milestone);

  let items = suggestions;

  if (category) {
    items = items.filter((suggestion) => suggestion.category === category);
  } else if (filters.hasMilestoneId) {
    items = items.filter((suggestion) => suggestion.category === "ANNIVERSARY");
  }

  if (filters.budgetRange) {
    items = items.filter((suggestion) => suggestion.budgetRange === filters.budgetRange);
  }

  return [...items].sort((left, right) => {
    const scoreDiff = relevanceScore(right, filters) - relevanceScore(left, filters);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }
    return left.title.localeCompare(right.title);
  });
}
