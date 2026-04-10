---
title: "api/src/services/budget.service.ts"
description: "Budget Service Interface Summary"
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/api/src/services/budget.service.ts.md"
  relativePath: "api/src/services/budget.service.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/budget.service.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 7
---

# api/src/services/budget.service.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/budget.service.ts`
- Lines: 205
- Symbols: 7

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

Budget Service Interface Summary

### Usage Notes

- contains total budget, spent amount, pending amount, remaining amount, usage percentage, and projected total
- contains pagination options (page, limit, totalItems)

## Public API

- `interface BudgetSummaryResponse`
- `interface PaginatedExpenses<T>`
- `async function calculateBudgetSummary(coupleId: string): Promise<BudgetSummaryResponse>`
- `async function getExpenses( coupleId: string, page: number, limit: number, status?: string, ): Promise<PaginatedExpenses<BudgetItem>>`
- `createExpense`

```ts
async function createExpense( userId: string, coupleId: string, data: { title: string; amount: number; category: string; date: string; place?: string; status?: "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT"; note?: string; }, ): Promise<BudgetItem>
```

- `updateExpense`

```ts
async function updateExpense( expenseId: string, coupleId: string, data: { title?: string; amount?: number; category?: string; date?: string; place?: string; status?: "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT"; note?: string; }, ): Promise<BudgetItem>
```

- `async function deleteExpense(expenseId: string, coupleId: string): Promise<void>`

## Symbols

### interface `BudgetSummaryResponse`

- Signature: `interface BudgetSummaryResponse`
- Lines: 13-20
- Exported: yes

```ts
interface BudgetSummaryResponse {
  totalBudget: number;
  totalSpent: number;
  pendingAmount: number;
  remainingAmount: number;
  usagePercentage: number;
  projectedTotal: number;
}
```

### interface `PaginatedExpenses`

- Signature: `interface PaginatedExpenses<T>`
- Lines: 22-29
- Exported: yes

```ts
interface PaginatedExpenses<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
  };
}
```

### function `calculateBudgetSummary`

- Signature: `async function calculateBudgetSummary(coupleId: string): Promise<BudgetSummaryResponse>`
- Lines: 34-68
- Exported: yes

```ts
async function calculateBudgetSummary(coupleId: string): Promise<BudgetSummaryResponse> {
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
```

### function `getExpenses`

- Signature: `async function getExpenses( coupleId: string, page: number, limit: number, status?: string, ): Promise<PaginatedExpenses<BudgetItem>>`
- Lines: 73-110
- Exported: yes

```ts
async function getExpenses(
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
```

### function `createExpense`

- Signature:

```ts
async function createExpense( userId: string, coupleId: string, data: { title: string; amount: number; category: string; date: string; place?: string; status?: "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT"; note?: string; }, ): Promise<BudgetItem>
```
- Lines: 115-156
- Exported: yes

```ts
async function createExpense(
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

  notifyPartner(userId, coupleId, {
    type: "budget",
    title: `Đã thêm chi tiêu "${item.title}"`,
    body: `${new Intl.NumberFormat("vi-VN").format(item.amount)} ₫ · ${item.category}`,
    iconName: "wallet-outline",
    iconColor: "#c2410c",
    iconBg: "#ffedd5",
    actionLabel: "Xem ngân sách",
    url: "/(tabs)/home",
  }).catch((err) => console.error("[Notify] Budget notify failed:", err));

  return item;
}
```

### function `updateExpense`

- Signature:

```ts
async function updateExpense( expenseId: string, coupleId: string, data: { title?: string; amount?: number; category?: string; date?: string; place?: string; status?: "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT"; note?: string; }, ): Promise<BudgetItem>
```
- Lines: 161-192
- Exported: yes

```ts
async function updateExpense(
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
```

### function `deleteExpense`

- Signature: `async function deleteExpense(expenseId: string, coupleId: string): Promise<void>`
- Lines: 197-204
- Exported: yes

```ts
async function deleteExpense(expenseId: string, coupleId: string): Promise<void> {
  const existing = await store.getBudgetItem(expenseId);
  if (!existing || existing.coupleId !== coupleId) {
    throw new AppError(404, "EXPENSE_NOT_FOUND", "Không tìm thấy chi phí.");
  }

  await store.deleteBudgetItem(expenseId);
}
```
