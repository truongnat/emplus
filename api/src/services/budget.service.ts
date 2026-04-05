/**
 * Budget service - handles budget-related business logic
 */

import { store } from "../store.ts";
import type { BudgetItem, BudgetSummary } from "../types.ts";
import { mapDisplayStatusToInternal } from "../dto/budget.dto.ts";
import { resolveActiveCoupleIdAsync } from "../utils/couple.ts";
import { env } from "../config/env.ts";
import { AppError } from "../utils/http.ts";

export interface BudgetSummaryResponse {
  totalBudget: number;
  totalSpent: number;
  pendingAmount: number;
  remainingAmount: number;
  usagePercentage: number;
  projectedTotal: number;
}

export interface PaginatedExpenses<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
  };
}

/**
 * Calculate budget summary for a couple (SQL aggregate — no full scan).
 */
export async function calculateBudgetSummary(coupleId: string): Promise<BudgetSummaryResponse> {
  const totalBudget = env.defaultBudgetAmount;

  const dataStore = store as unknown as Record<string, unknown>;
  let totalSpent: number;
  let pendingAmount: number;

  if (typeof dataStore.aggregateBudgetByCouple === "function") {
    const agg = await (dataStore as unknown as { aggregateBudgetByCouple: (id: string) => Promise<{ totalSpent: number; pendingAmount: number }> })
      .aggregateBudgetByCouple(coupleId);
    totalSpent = agg.totalSpent;
    pendingAmount = agg.pendingAmount;
  } else {
    const items = await store.listBudgetItemsByCouple(coupleId);
    totalSpent = items
      .filter((i) => i.status === "PAID" || i.status === "OVER_BUDGET")
      .reduce((sum, i) => sum + i.amount, 0);
    pendingAmount = items
      .filter((i) => i.status === "PENDING")
      .reduce((sum, i) => sum + i.amount, 0);
  }

  const remainingAmount = totalBudget - totalSpent;
  const usagePercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const projectedTotal = totalSpent + pendingAmount;

  return {
    totalBudget,
    totalSpent,
    pendingAmount,
    remainingAmount,
    usagePercentage,
    projectedTotal,
  };
}

/**
 * Get paginated expenses for a couple (SQL-level pagination when available).
 */
export async function getExpenses(
  coupleId: string,
  page: number,
  limit: number,
  status?: string,
): Promise<PaginatedExpenses<BudgetItem>> {
  const internalStatus =
    status && status !== "Tất cả" ? mapDisplayStatusToInternal(status) : undefined;

  const dataStore = store as unknown as Record<string, unknown>;

  if (typeof dataStore.paginateBudgetByCouple === "function") {
    const result = await (dataStore as unknown as {
      paginateBudgetByCouple: (
        id: string, p: number, l: number, s?: string,
      ) => Promise<{ items: BudgetItem[]; totalItems: number }>;
    }).paginateBudgetByCouple(coupleId, page, limit, internalStatus);

    return {
      data: result.items,
      pagination: { page, limit, totalItems: result.totalItems },
    };
  }

  let items = await store.listBudgetItemsByCouple(coupleId);

  if (internalStatus) {
    items = items.filter((i) => i.status === internalStatus);
  }

  items.sort((a, b) => b.date.localeCompare(a.date));
  const offset = (page - 1) * limit;

  return {
    data: items.slice(offset, offset + limit),
    pagination: { page, limit, totalItems: items.length },
  };
}

/**
 * Create a new expense item
 */
export async function createExpense(
  userId: string,
  coupleId: string,
  data: {
    title: string;
    amount: number;
    category: string;
    date: string;
    place?: string;
    status?: "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT";
    note?: string;
  },
): Promise<BudgetItem> {
  const item: BudgetItem = {
    id: crypto.randomUUID(),
    coupleId,
    createdById: userId,
    title: data.title.trim(),
    amount: data.amount,
    category: data.category ?? "other",
    date: data.date,
    place: data.place?.trim(),
    status: data.status ?? "PENDING",
    note: data.note?.trim(),
    createdAt: new Date().toISOString(),
  };

  await store.saveBudgetItem(item);
  return item;
}

/**
 * Update an existing expense item
 */
export async function updateExpense(
  expenseId: string,
  coupleId: string,
  data: {
    title?: string;
    amount?: number;
    category?: string;
    date?: string;
    place?: string;
    status?: "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT";
    note?: string;
  },
): Promise<BudgetItem> {
  const existing = await store.getBudgetItem(expenseId);
  if (!existing || existing.coupleId !== coupleId) {
    throw new AppError(404, "EXPENSE_NOT_FOUND", "Không tìm thấy chi phí.");
  }

  const updated: BudgetItem = {
    ...existing,
    title: data.title?.trim() ?? existing.title,
    amount: data.amount ?? existing.amount,
    category: data.category ?? existing.category,
    date: data.date ?? existing.date,
    place: data.place !== undefined ? (data.place?.trim() ?? undefined) : existing.place,
    status: data.status ?? existing.status,
    note: data.note !== undefined ? (data.note?.trim() ?? undefined) : existing.note,
  };

  await store.saveBudgetItem(updated);
  return updated;
}

/**
 * Delete an expense item
 */
export async function deleteExpense(expenseId: string, coupleId: string): Promise<void> {
  const existing = await store.getBudgetItem(expenseId);
  if (!existing || existing.coupleId !== coupleId) {
    throw new AppError(404, "EXPENSE_NOT_FOUND", "Không tìm thấy chi phí.");
  }

  await store.deleteBudgetItem(expenseId);
}
