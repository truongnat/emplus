import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useSession } from "@/src/session-context";
import { getDashboard } from "@/src/api";

export function useHomeQuery() {
  const { withAccessToken, session, isAuthenticated } = useSession();
  const queryClient = useQueryClient();
  const isPaired = Boolean(session?.user?.coupleId);
  const enabled = isAuthenticated && isPaired;

  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => withAccessToken(getDashboard),
    enabled,
  });

  useFocusEffect(
    useCallback(() => {
      if (!enabled) {
        return;
      }
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }, [enabled, queryClient]),
  );

  return query;
}
