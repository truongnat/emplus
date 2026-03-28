import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dependencies } from "@/src/framework/di/dependencies";

export const NOTIFICATIONS_QUERY_KEY = ["notifications"] as const;

export function useNotificationsList() {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: () => dependencies.notifications.list.execute({ page: 1, limit: 50 }),
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => dependencies.notifications.markRead.execute(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => dependencies.notifications.markAllRead.execute(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}
