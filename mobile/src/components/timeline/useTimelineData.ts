import { useState, useCallback, useMemo } from "react";
import { useSession } from "@/src/session-context";
import { useTimelineMemoriesQuery } from "./timelineQueries";
import { groupMemories, type OrderDirection } from "./timelineMap";

export function useTimelineData() {
    const { isAuthenticated, session, withAccessToken } = useSession();
    const isPaired = Boolean(!!session?.user.coupleId);

    const [order, setOrder] = useState<OrderDirection>("desc");
    const [activeFilter, setActiveFilter] = useState("tat-ca");

    // ImageViewer state
    const [viewerImages, setViewerImages] = useState<string[]>([]);
    const [viewerIndex, setViewerIndex] = useState(0);

    const {
        data,
        isLoading,
        isFetchingNextPage: loadingMore,
        hasNextPage: hasNext,
        fetchNextPage: rqFetchNextPage,
    } = useTimelineMemoriesQuery(activeFilter, order);

    const items = data?.pages?.flatMap((page) => page.items) ?? [];
    const timelinePages = data?.pages;
    const page = (timelinePages && timelinePages.length > 0)
        ? timelinePages[timelinePages.length - 1]?.pagination?.page ?? 1
        : 1;
    const loading = isLoading;

    // Utilize pure mapper to group
    const groupedItems = useMemo(() => groupMemories(items, order), [items, order]);

    const toggleOrder = useCallback(() => {
        setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    }, []);

    const fetchNextPage = useCallback(() => {
        if (hasNext && !loadingMore) {
            void rqFetchNextPage();
        }
    }, [hasNext, loadingMore, rqFetchNextPage]);

    const openViewer = useCallback((images: string[], index: number = 0) => {
        setViewerImages(images);
        setViewerIndex(index);
    }, []);

    const closeViewer = useCallback(() => {
        setViewerImages([]);
    }, []);

    return {
        isAuthenticated,
        isPaired,
        loading,
        loadingMore,
        order,
        activeFilter,
        setActiveFilter,
        groupedItems,
        hasNext,
        page,
        items,
        fetchNextPage,
        toggleOrder,
        viewerImages,
        viewerIndex,
        openViewer,
        closeViewer,
    };
}
