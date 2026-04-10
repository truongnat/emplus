---
title: "mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx"
description: "TimelineAuthenticatedBody component"
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
  page: "reference/files/mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx.md"
  relativePath: "mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx"
  module: "mobile/src/features/timeline/screens"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/screens](../../../../../../modules/mobile/src/features/timeline/screens.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx`
- Lines: 163
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

TimelineAuthenticatedBody component

### Responsibilities

- Responsibility of wrapping content in time line feature

### Usage Notes

- Used for authenticated users to display timeline data.

## Public API

- `function TimelineAuthenticatedBody()`

## Symbols

### function `TimelineAuthenticatedBody`

- Signature: `function TimelineAuthenticatedBody()`
- Lines: 24-143
- Exported: yes

```tsx
function TimelineAuthenticatedBody() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { promptDeleteMemory } = useTimelineDeleteMemory();

  const {
    loading,
    loadingMore,
    activeFilter,
    setActiveFilter,
    groupedItems,
    hasNext,
    items,
    fetchNextPage,
    viewerImages,
    viewerIndex,
    openViewer,
    closeViewer,
  } = useTimelineData();

  useAuthGridChrome(isDark, colors.background.default, true);

  const topPad = insets.top + 10;
  const scrollPadBottom = scrollPadBottomWithTabBar(insets.bottom);

  const sections: TimelineSection[] = useMemo(
    () =>
      groupedItems.map(([dateString, data]) => ({
        title: dateString,
        data,
      })),
    [groupedItems],
  );

  const onTitlePressById = useCallback(
    (id: string) => {
      router.push(`/memory/${id}`);
    },
    [router],
  );

  const loadMore = useCallback(() => {
    if (!loadingMore && hasNext) {
      void fetchNextPage();
    }
  }, [loadingMore, hasNext, fetchNextPage]);

  return (
    <AppScreen
      applyTopSafeAreaPadding={false}
      wrapWithKeyboardDismiss={false}
      style={{
        ...loginScreenStyles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={loginScreenStyles.appContent}
      animatedEntrance={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={homeScreenStyles.layerRoot}>
        <View style={[styles.container, { paddingTop: topPad, flex: 1 }]}>
          <TimelineHeader
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          {loading && items.length === 0 ? (
            <View style={styles.centerContainer}>
              <EmplusLottie
                source={lottieInventory.loader}
                style={{ width: 120, height: 120 }}
                loop
              />
              <AppText
                style={[styles.loadingText, { color: colors.text.tertiary }]}
              >
                Đang tải kỷ niệm...
              </AppText>
            </View>
          ) : items.length === 0 ? (
            <View style={styles.centerContainer}>
              <EmplusLottie
                source={lottieInventory.timelineEmptyLove}
                style={{ width: 200, height: 200 }}
                loop
                speed={0.9}
              />
              <AppText
                style={[styles.emptyText, { color: colors.text.tertiary }]}
              >
                Chưa có kỷ niệm nào
              </AppText>
            </View>
          ) : (
            <TimelineMemorySectionList
              sections={sections}
              scrollPadBottom={scrollPadBottom}
              loadingMore={loadingMore}
              onEndReached={loadMore}
              onOpenViewer={openViewer}
              onTitlePressById={onTitlePressById}
              onDeleteItem={promptDeleteMemory}
            />
          )}

          {viewerImages.length > 0 ? (
            <TimelineImageViewerLazy
              key={viewerImages.join("\x1e")}
              images={viewerImages}
              initialIndex={viewerIndex}
              onClose={closeViewer}
            />
          ) : null}
        </View>
      </View>
    </AppScreen>
  );
}
```
