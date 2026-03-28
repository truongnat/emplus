import { useState, useCallback } from "react";
import { useSession } from "@/src/session-context";
import { useToast } from "@/src/toast-context";
import {
  useBudgetSummaryQuery,
  useBudgetExpensesQuery,
} from "../components/budgetQueries";

export function useBudgetData() {
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
