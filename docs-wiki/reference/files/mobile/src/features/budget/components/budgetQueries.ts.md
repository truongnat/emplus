---
title: "mobile/src/features/budget/components/budgetQueries.ts"
description: "Bases the `useBudgetSummaryQuery` and `useBudgetExpensesQuery` requests on various budget-related query APIs."
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
  page: "reference/files/mobile/src/features/budget/components/budgetQueries.ts.md"
  relativePath: "mobile/src/features/budget/components/budgetQueries.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/components/budgetQueries.ts"
  module: "mobile/src/features/budget/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/budget/components/budgetQueries.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/budget/components](../../../../../../modules/mobile/src/features/budget/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/components/budgetQueries.ts`
- Lines: 42
- Symbols: 2

## AI Summary

Bases the `useBudgetSummaryQuery` and `useBudgetExpensesQuery` requests on various budget-related query APIs.

### Responsibilities

- to retrieve budget summaries and expenses

### Usage Notes

- May be used in conjunction with other queries to fetch related data.

## Public API

- `function useBudgetSummaryQuery()`
- `function useBudgetExpensesQuery(activeFilter: string)`

## Symbols

### function `useBudgetSummaryQuery`

- Signature: `function useBudgetSummaryQuery()`
- Lines: 12-19
- Exported: yes

```ts
function useBudgetSummaryQuery() {
  const { withAccessToken } = useSession();

  return useQuery({
    queryKey: ["budgetSummary"],
    queryFn: () => withAccessToken(getBudgetSummary),
  });
}
```

### function `useBudgetExpensesQuery`

- Signature: `function useBudgetExpensesQuery(activeFilter: string)`
- Lines: 21-41
- Exported: yes

```ts
function useBudgetExpensesQuery(activeFilter: string) {
  const { withAccessToken } = useSession();

  return useInfiniteQuery({
    queryKey: ["budgetExpenses", activeFilter],
    queryFn: async ({ pageParam }) => {
      const apiStatus = FILTER_TO_STATUS[activeFilter] ?? activeFilter;
      return withAccessToken((token) =>
        listBudgetExpenses(token, {
          page: pageParam as number,
          status: apiStatus !== "Tất cả" ? apiStatus : undefined,
        }),
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined,
  });
}
```
