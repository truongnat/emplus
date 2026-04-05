import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "@/src/session-context";
import { getBudgetSummary, listBudgetExpenses } from "@/src/api";

const FILTER_TO_STATUS: Record<string, string> = {
  "Tất cả": "Tất cả",
  "Đã trả": "PAID",
  "Đang chờ": "PENDING",
  "Vượt ngân sách": "OVER_BUDGET",
};

export function useBudgetSummaryQuery() {
  const { withAccessToken } = useSession();

  return useQuery({
    queryKey: ["budgetSummary"],
    queryFn: () => withAccessToken(getBudgetSummary),
  });
}

export function useBudgetExpensesQuery(activeFilter: string) {
  const { withAccessToken } = useSession();

  return useInfiniteQuery({
    queryKey: ["budgetExpenses", activeFilter],
    queryFn: async ({ pageParam }) => {
      const apiStatus = FILTER_TO_STATUS[activeFilter] ?? activeFilter;
      return withAccessToken((token) =>
        listBudgetExpenses(token, {
          page: pageParam as number,
          category: apiStatus !== "Tất cả" ? apiStatus : undefined,
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
