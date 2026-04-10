---
title: "mobile/src/features/timeline/components/timelineQueries.ts"
description: "The `useTimelineMemoriesQuery` function in the `timelineQueries` module retrieves a paginated list of timeline memories based on an active filter and order."
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
  page: "reference/files/mobile/src/features/timeline/components/timelineQueries.ts.md"
  relativePath: "mobile/src/features/timeline/components/timelineQueries.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/timelineQueries.ts"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/timeline/components/timelineQueries.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/timelineQueries.ts`
- Lines: 34
- Symbols: 1

## Related Features

- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Order Management Read / List](../../../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

The `useTimelineMemoriesQuery` function in the `timelineQueries` module retrieves a paginated list of timeline memories based on an active filter and order.

### Responsibilities

- Retrieve data from the Timeline Memories API

### Usage Notes

- Can be used to get the latest data after a page reload.

## Public API

- `function useTimelineMemoriesQuery( activeFilter: string, order: OrderDirection, )`

## Symbols

### function `useTimelineMemoriesQuery`

- Signature: `function useTimelineMemoriesQuery( activeFilter: string, order: OrderDirection, )`
- Lines: 6-33
- Exported: yes

```ts
function useTimelineMemoriesQuery(
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
```
