---
title: "mobile/src/features/timeline/hooks/useTimelineData.ts"
description: "The useTimelineData function sets up hooks for managing the timeline data, including authentication and navigation."
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/features/timeline/hooks/useTimelineData.ts.md"
  relativePath: "mobile/src/features/timeline/hooks/useTimelineData.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/hooks/useTimelineData.ts"
  module: "mobile/src/features/timeline/hooks"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/timeline/hooks/useTimelineData.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/hooks](../../../../../../modules/mobile/src/features/timeline/hooks.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/hooks/useTimelineData.ts`
- Lines: 78
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [User Management Read / List](../../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Order Management Login](../../../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Read / List](../../../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

The useTimelineData function sets up hooks for managing the timeline data, including authentication and navigation.

### Responsibilities

- ['Authentication', 'Navigation']

### Usage Notes

- This function is used to provide state and functionality for managing the timeline data using the `useSession()` hook.

## Public API

- `function useTimelineData()`

## Symbols

### function `useTimelineData`

- Signature: `function useTimelineData()`
- Lines: 6-77
- Exported: yes

```ts
function useTimelineData() {
  const { isAuthenticated, session, withAccessToken } = useSession();
  const isPaired = Boolean(!!session?.user?.coupleId);

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
  const page =
    timelinePages && timelinePages.length > 0
      ? (timelinePages[timelinePages.length - 1]?.pagination?.page ?? 1)
      : 1;
  const loading = isLoading;

  // Utilize pure mapper to group
  const groupedItems = useMemo(
    () => groupMemories(items, order),
    [items, order],
  );

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
```
