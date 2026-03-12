import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/src/session-context";
import { getDashboard } from "@/src/api";

export function useHomeQuery() {
    const { withAccessToken } = useSession();

    return useQuery({
        queryKey: ["dashboard"],
        queryFn: () => withAccessToken(getDashboard)
    });
}
