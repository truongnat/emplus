import { z } from "zod";
import { BUDGET_STATUS, BUDGET_STATUS_DISPLAY, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../constants/index.ts";
import {
  isoDateString,
  optionalTrimmedString,
  parseWithSchema,
  requiredTrimmedString,
} from "../shared/validators/zod.ts";

const budgetStatusValues = Object.values(BUDGET_STATUS) as [BudgetStatus, ...BudgetStatus[]];
const budgetStatusSchema = z.enum(budgetStatusValues);

function isSupportedStatusFilter(status: string): boolean {
  return status === "Tất cả" || isValidStatus(status);
}

const createExpenseSchema = z.object({
  title: requiredTrimmedString("Tiêu đề là bắt buộc"),
  amount: z.coerce.number().positive("Số tiền phải là số dương"),
  category: z.preprocess((value) => {
    if (typeof value !== "string") {
      return undefined;
    }
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, z.string().optional()).transform((value) => value ?? "other"),
  date: isoDateString("Ngày phải theo định dạng YYYY-MM-DD hợp lệ."),
  place: optionalTrimmedString(),
  status: budgetStatusSchema.optional().default(BUDGET_STATUS.PENDING),
  note: optionalTrimmedString(),
});

const updateExpenseSchema = z.object({
  title: optionalTrimmedString(),
  amount: z.preprocess((value) => {
    if (value === undefined) {
      return undefined;
    }
    return value;
  }, z.coerce.number().positive("Số tiền phải là số dương").optional()),
  category: z.preprocess((value) => {
    if (value === undefined) {
      return undefined;
    }
    if (typeof value !== "string") {
      return value;
    }
    const trimmed = value.trim();
    return trimmed === "" ? "other" : trimmed;
  }, z.string().optional()),
  date: z.preprocess((value) => {
    if (value === undefined) {
      return undefined;
    }
    return value;
  }, isoDateString("Ngày phải theo định dạng YYYY-MM-DD hợp lệ.").optional()),
  place: optionalTrimmedString(),
  status: budgetStatusSchema.optional(),
  note: optionalTrimmedString(),
});

const expenseQuerySchema = z.object({
  page: z.preprocess((value) => {
    const parsed = Number(value ?? 1);
    if (!Number.isFinite(parsed)) {
      return 1;
    }
    return Math.max(1, Math.floor(parsed));
  }, z.number()),
  limit: z.preprocess((value) => {
    const parsed = Number(value ?? DEFAULT_PAGE_SIZE);
    if (!Number.isFinite(parsed)) {
      return DEFAULT_PAGE_SIZE;
    }
    return Math.min(MAX_PAGE_SIZE, Math.max(1, Math.floor(parsed)));
  }, z.number()),
  status: z.preprocess((value) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, z.string().optional()).refine(
    (value) => value === undefined || isSupportedStatusFilter(value),
    "status không hợp lệ",
  ),
});

const expenseIdParamSchema = requiredTrimmedString("id là bắt buộc");

export type BudgetStatus = "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT";

export interface BudgetSummaryDto {
  totalBudget: number;
  totalSpent: number;
  pendingAmount: number;
  remainingAmount: number;
  usagePercentage: number;
  projectedTotal: number;
}

export type CreateExpenseDto = z.infer<typeof createExpenseSchema>;

export interface ExpenseQueryParams {
  page: number;
  limit: number;
  status?: string;
}

export type UpdateExpenseDto = z.infer<typeof updateExpenseSchema>;

export function validateCreateExpenseInput(input: unknown): CreateExpenseDto {
  return parseWithSchema(createExpenseSchema, input, {
    message: "Dữ liệu tạo khoản chi không hợp lệ.",
  });
}

export function parseExpenseQueryParams(query: Record<string, string | undefined | null>): ExpenseQueryParams {
  return parseWithSchema(expenseQuerySchema, query, {
    message: "Query danh sách khoản chi không hợp lệ.",
  });
}

export function validateExpenseIdParam(input: unknown): string {
  return parseWithSchema(expenseIdParamSchema, input, {
    message: "ID khoản chi không hợp lệ.",
  });
}

export function mapDisplayStatusToInternal(displayStatus: string): string {
  return BUDGET_STATUS_DISPLAY[displayStatus] ?? displayStatus;
}

export function isValidStatus(status: string): boolean {
  return Object.values(BUDGET_STATUS).includes(status as BudgetStatus) ||
    Object.keys(BUDGET_STATUS_DISPLAY).includes(status);
}

export function validateUpdateExpenseInput(input: unknown): UpdateExpenseDto {
  return parseWithSchema(updateExpenseSchema, input, {
    message: "Dữ liệu cập nhật khoản chi không hợp lệ.",
  });
}
