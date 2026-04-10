---
title: "api/src/dto/budget.dto.ts"
description: "Description of the BudgetDTO classes and their interfaces."
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
  page: "reference/files/api/src/dto/budget.dto.ts.md"
  relativePath: "api/src/dto/budget.dto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/dto/budget.dto.ts"
  module: "api/src/dto"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 12
---

# api/src/dto/budget.dto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/dto](../../../../modules/api/src/dto.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/dto/budget.dto.ts`
- Lines: 145
- Symbols: 12

## Related Features

- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Description of the BudgetDTO classes and their interfaces.

### Responsibilities

- These classes represent data transfer objects for budget-related tasks, such as creating expense data and parsing query parameters.

### Usage Notes

- Note that these classes are likely used in conjunction with a Business Object-Repository (BOR) pattern to encapsulate business logic around budget operations.
- The ` validateCreateExpenseInput` and `validateUpdateExpenseInput` functions demonstrate how the BOR pattern should be implemented to validate input data.

## Public API

- `type BudgetStatus = "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT";`
- `interface BudgetSummaryDto`
- `type CreateExpenseDto = z.infer<typeof createExpenseSchema>;`
- `interface ExpenseQueryParams`
- `type UpdateExpenseDto = z.infer<typeof updateExpenseSchema>;`
- `function validateCreateExpenseInput(input: unknown): CreateExpenseDto`
- `function parseExpenseQueryParams(query: Record<string, string | undefined | null>): ExpenseQueryParams`
- `function validateExpenseIdParam(input: unknown): string`
- `function mapDisplayStatusToInternal(displayStatus: string): string`
- `function isValidStatus(status: string): boolean`
- `function validateUpdateExpenseInput(input: unknown): UpdateExpenseDto`

## Symbols

### type `BudgetStatus`

- Signature: `type BudgetStatus = "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT";`
- Lines: 92-92
- Exported: yes

```ts
type BudgetStatus = "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT";
```

### interface `BudgetSummaryDto`

- Signature: `interface BudgetSummaryDto`
- Lines: 94-101
- Exported: yes

```ts
interface BudgetSummaryDto {
  totalBudget: number;
  totalSpent: number;
  pendingAmount: number;
  remainingAmount: number;
  usagePercentage: number;
  projectedTotal: number;
}
```

### type `CreateExpenseDto`

- Signature: `type CreateExpenseDto = z.infer<typeof createExpenseSchema>;`
- Lines: 103-103
- Exported: yes

```ts
type CreateExpenseDto = z.infer<typeof createExpenseSchema>;
```

### interface `ExpenseQueryParams`

- Signature: `interface ExpenseQueryParams`
- Lines: 105-109
- Exported: yes

```ts
interface ExpenseQueryParams {
  page: number;
  limit: number;
  status?: string;
}
```

### type `UpdateExpenseDto`

- Signature: `type UpdateExpenseDto = z.infer<typeof updateExpenseSchema>;`
- Lines: 111-111
- Exported: yes

```ts
type UpdateExpenseDto = z.infer<typeof updateExpenseSchema>;
```

### function `validateCreateExpenseInput`

- Signature: `function validateCreateExpenseInput(input: unknown): CreateExpenseDto`
- Lines: 113-117
- Exported: yes

```ts
function validateCreateExpenseInput(input: unknown): CreateExpenseDto {
  return parseWithSchema(createExpenseSchema, input, {
    message: "Dữ liệu tạo khoản chi không hợp lệ.",
  });
}
```

### function `parseExpenseQueryParams`

- Signature: `function parseExpenseQueryParams(query: Record<string, string | undefined | null>): ExpenseQueryParams`
- Lines: 119-123
- Exported: yes

```ts
function parseExpenseQueryParams(query: Record<string, string | undefined | null>): ExpenseQueryParams {
  return parseWithSchema(expenseQuerySchema, query, {
    message: "Query danh sách khoản chi không hợp lệ.",
  });
}
```

### function `validateExpenseIdParam`

- Signature: `function validateExpenseIdParam(input: unknown): string`
- Lines: 125-129
- Exported: yes

```ts
function validateExpenseIdParam(input: unknown): string {
  return parseWithSchema(expenseIdParamSchema, input, {
    message: "ID khoản chi không hợp lệ.",
  });
}
```

### function `mapDisplayStatusToInternal`

- Signature: `function mapDisplayStatusToInternal(displayStatus: string): string`
- Lines: 131-133
- Exported: yes

```ts
function mapDisplayStatusToInternal(displayStatus: string): string {
  return BUDGET_STATUS_DISPLAY[displayStatus] ?? displayStatus;
}
```

### function `isValidStatus`

- Signature: `function isValidStatus(status: string): boolean`
- Lines: 135-138
- Exported: yes

```ts
function isValidStatus(status: string): boolean {
  return Object.values(BUDGET_STATUS).includes(status as BudgetStatus) ||
    Object.keys(BUDGET_STATUS_DISPLAY).includes(status);
}
```

### function `validateUpdateExpenseInput`

- Signature: `function validateUpdateExpenseInput(input: unknown): UpdateExpenseDto`
- Lines: 140-144
- Exported: yes

```ts
function validateUpdateExpenseInput(input: unknown): UpdateExpenseDto {
  return parseWithSchema(updateExpenseSchema, input, {
    message: "Dữ liệu cập nhật khoản chi không hợp lệ.",
  });
}
```

### function `isSupportedStatusFilter`

- Signature: `function isSupportedStatusFilter(status: string): boolean`
- Lines: 13-15
- Exported: no

```ts
function isSupportedStatusFilter(status: string): boolean {
  return status === "Tất cả" || isValidStatus(status);
}
```
