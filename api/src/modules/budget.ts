import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { requireAuth } from "../middleware/auth.ts";
import { calculateBudgetSummary, getExpenses, createExpense, updateExpense, deleteExpense } from "../services/budget.service.ts";
import {
  parseExpenseQueryParams,
  validateCreateExpenseInput,
  validateExpenseIdParam,
  validateUpdateExpenseInput,
} from "../dto/budget.dto.ts";
import { readJson, success, paginated } from "../utils/http.ts";
import { resolveActiveCoupleIdAsync } from "../utils/couple.ts";

export const budgetRoutes = new Hono<AppEnv>();

budgetRoutes.use("*", requireAuth);

budgetRoutes.get("/summary", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);

  const summary = await calculateBudgetSummary(coupleId);

  return success(context, summary);
});

budgetRoutes.get("/expenses", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);

  const query = parseExpenseQueryParams({
    page: context.req.query("page"),
    limit: context.req.query("limit"),
    status: context.req.query("status"),
  });

  const result = await getExpenses(coupleId, query.page, query.limit, query.status);

  return paginated(context, result.data, result.pagination);
});

budgetRoutes.post("/expenses", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);
  const body = await readJson<Record<string, unknown>>(context);

  const input = validateCreateExpenseInput(body);

  const item = await createExpense(user.id, coupleId, {
    title: input.title,
    amount: input.amount,
    category: input.category,
    date: input.date,
    place: input.place,
    status: input.status,
    note: input.note,
  });

  return success(context, item, 201);
});

budgetRoutes.put("/expenses/:id", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);
  const expenseId = validateExpenseIdParam(context.req.param("id"));
  const body = await readJson<Record<string, unknown>>(context);

  const input = validateUpdateExpenseInput(body);

  const item = await updateExpense(expenseId, coupleId, {
    title: input.title,
    amount: input.amount,
    category: input.category,
    date: input.date,
    place: input.place,
    status: input.status,
    note: input.note,
  });

  return success(context, item);
});

budgetRoutes.delete("/expenses/:id", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);
  const expenseId = validateExpenseIdParam(context.req.param("id"));

  await deleteExpense(expenseId, coupleId);

  return success(context, { deleted: true });
});
