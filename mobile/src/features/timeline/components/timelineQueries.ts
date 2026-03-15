import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "@/src/session-context";
import { listMemories } from "@/src/api";
import type { OrderDirection } from "./timelineMap";

export function useTimelineMemoriesQuery(
  activeFilter: string,
  order: OrderDirection,
) {
  const { withAccessToken } = useSession();

  return useInfiniteQuery({
    queryKey: ["timelineMemories", activeFilter, order],
    queryFn: async ({ pageParam }) => {
      return withAccessToken((token) =>
        listMemories(token, {
          page: pageParam as number,
          limit: 20,
          order,
          tag: activeFilter,
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
