import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useSession } from "@/src/session-context";
import { getDashboard } from "@/src/api";

export function useHomeQuery() {
  const { withAccessToken } = useSession();

  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => withAccessToken(getDashboard),
  });

  useFocusEffect(
    useCallback(() => {
      void query.refetch();
    }, [query.refetch]),
  );

  return query;
}
