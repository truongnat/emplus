import { useState, useMemo } from "react";
import { useSession } from "@/src/session-context";
import { toDisplayError } from "@/src/api";
import { useHomeQuery } from "../components/homeQueries";
import { mapDashboardData } from "../components/homeMap";

export type BusyAction = "dashboard" | null;

export function useHomeData() {
  const { session, isAuthenticated } = useSession();
  const [showFocusCard, setShowFocusCard] = useState(true);

  const isPaired = Boolean(!!session?.user?.coupleId);

  const {
    data: dashboard = null,
    isPending,
    error: queryError,
    refetch: loadDashboard,
  } = useHomeQuery();

  const busy: BusyAction =
    isPending && isAuthenticated && isPaired ? "dashboard" : null;
  const error = queryError ? toDisplayError(queryError) : null;

  // 1. Static/Getter logic has been moved to homeMap
  const mappedData = useMemo(() => mapDashboardData(dashboard), [dashboard]);

  return {
    ...mappedData,
    dashboard,
    busy,
    error,
    showFocusCard,
    setShowFocusCard,
    isPaired,
    loadDashboard,
  };
}
