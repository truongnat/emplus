---
title: "mobile/src/features/budget/hooks/useBudgetData.ts"
description: "The `useBudgetData` hook retrieves budget data from various sources and manages the state for displaying a summary or expenses report."
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
  page: "reference/files/mobile/src/features/budget/hooks/useBudgetData.ts.md"
  relativePath: "mobile/src/features/budget/hooks/useBudgetData.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/hooks/useBudgetData.ts"
  module: "mobile/src/features/budget/hooks"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/budget/hooks/useBudgetData.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/budget/hooks](../../../../../../modules/mobile/src/features/budget/hooks.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/hooks/useBudgetData.ts`
- Lines: 67
- Symbols: 1

## Related Features

- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Reporting Read / List](../../../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.

## AI Summary

The `useBudgetData` hook retrieves budget data from various sources and manages the state for displaying a summary or expenses report.

### Responsibilities

- To retrieve budgets data from multiple sources (e.g. session, toast), manage the current active filter and show toasts.
- To fetch new pages of expenses data with next page token

### Usage Notes

- Usage notes not provided in this file, as it only contains code snippets for troubleshooting or debugging purposes.

## Public API

- `function useBudgetData()`

## Symbols

### function `useBudgetData`

- Signature: `function useBudgetData()`
- Lines: 9-66
- Exported: yes

```ts
function useBudgetData() {
  const { isAuthenticated, session, withAccessToken } = useSession();
  const { showToast } = useToast();
  const isPaired = Boolean(!!session?.user?.coupleId);

  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const {
    data: summary = null,
    isLoading: isSummaryLoading,
    refetch: refetchSummary,
  } = useBudgetSummaryQuery();

  const {
    data: expensesData,
    isLoading: isExpensesLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage: rqFetchNextPage,
    refetch: refetchExpenses,
  } = useBudgetExpensesQuery(activeFilter);

  const items = expensesData?.pages?.flatMap((p) => p.items) ?? [];
  const loading = isSummaryLoading || isExpensesLoading;

  const onFilterChange = useCallback((label: string) => {
    setActiveFilter(label);
  }, []);

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void rqFetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, rqFetchNextPage]);

  const refresh = useCallback(async () => {
    await Promise.all([refetchSummary(), refetchExpenses()]);
  }, [refetchSummary, refetchExpenses]);

  const expensesPages = expensesData?.pages;

  return {
    isAuthenticated,
    isPaired,
    loading,
    summary,
    items,
    activeFilter,
    onFilterChange,
    hasNext: hasNextPage,
    page:
      expensesPages && expensesPages.length > 0
        ? (expensesPages[expensesPages.length - 1]?.pagination?.page ?? 1)
        : 1,
    fetchNextPage,
    refresh,
  };
}
```
