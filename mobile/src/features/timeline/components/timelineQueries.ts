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
        }),
      );
    },
    initialPageParam: 1,
    /** Timeline cần dữ liệu mới sau khi API đồng bộ demo; tránh cache 5p + persist giữ bản cũ. */
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: "always",
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined,
  });
}
