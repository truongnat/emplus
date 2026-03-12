/**
 * Budget service - handles budget-related business logic
 */

import { store } from "../store.ts";
import type { BudgetItem, BudgetSummary } from "../types.ts";
import { mapDisplayStatusToInternal } from "../dto/budget.dto.ts";
import { resolveActiveCoupleIdAsync } from "../utils/couple.ts";
import { env } from "../config/env.ts";

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
 * Calculate budget summary for a couple
 */
export async function calculateBudgetSummary(coupleId: string): Promise<BudgetSummaryResponse> {
  const items = await store.listBudgetItemsByCouple(coupleId);
  const totalBudget = env.defaultBudgetAmount;

  const totalSpent = items
    .filter((i) => i.status === "PAID" || i.status === "OVER_BUDGET")
    .reduce((sum, i) => sum + i.amount, 0);

  const pendingAmount = items
    .filter((i) => i.status === "PENDING")
    .reduce((sum, i) => sum + i.amount, 0);

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
 * Get paginated expenses for a couple
 */
export async function getExpenses(
  coupleId: string,
  page: number,
  limit: number,
  status?: string,
): Promise<PaginatedExpenses<BudgetItem>> {
  let items = await store.listBudgetItemsByCouple(coupleId);

  if (status && status !== "Tất cả") {
    const targetStatus = mapDisplayStatusToInternal(status);
    items = items.filter((i) => i.status === targetStatus);
  }

  // Sort by date desc
  items.sort((a, b) => b.date.localeCompare(a.date));

  const offset = (page - 1) * limit;
  const pagedItems = items.slice(offset, offset + limit);

  return {
    data: pagedItems,
    pagination: {
      page,
      limit,
      totalItems: items.length,
    },
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
    const error = new Error("Không tìm thấy chi phí.") as Error & { status: number; code: string };
    error.status = 404;
    error.code = "EXPENSE_NOT_FOUND";
    throw error;
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
    const error = new Error("Không tìm thấy chi phí.") as Error & { status: number; code: string };
    error.status = 404;
    error.code = "EXPENSE_NOT_FOUND";
    throw error;
  }

  await store.deleteBudgetItem(expenseId);
}
