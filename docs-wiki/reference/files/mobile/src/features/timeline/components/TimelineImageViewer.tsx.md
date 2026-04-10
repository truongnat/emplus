---
title: "mobile/src/features/timeline/components/TimelineImageViewer.tsx"
description: "The TimelineImageViewer component is responsible for rendering a timeline view of images within the application."
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
  page: "reference/files/mobile/src/features/timeline/components/TimelineImageViewer.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineImageViewer.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineImageViewer.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/timeline/components/TimelineImageViewer.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineImageViewer.tsx`
- Lines: 202
- Symbols: 2

## Related Features

- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [User Management Read / List](../../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Order Management Read / List](../../../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

The TimelineImageViewer component is responsible for rendering a timeline view of images within the application.

### Responsibilities

- The TimelineImageViewer component has two main responsibilities: displaying an image timeline and handling user interactions to navigate through the content.
- User interactions include scrolling to the start of the timeline, selecting the currently visible item, or closing the component when it becomes focused.
- These responsibilities are implemented through various methods such as filtering images, determining the initial index, handling viewability changes, and updating the list of items.

### Usage Notes

- To get started with using TimelineImageViewer components, you need to create a timeline image source data.
- Note that the TimelineImageViewer component works seamlessly with the Fullscreen mode to display the timeline in full screen for better visibility. However, please refer to the documentation for more information on setting up Fullscreen mode.
- It is recommended to use this component when displaying long or frequent timelines as it optimizes performance and provides good user experience.

## Public API

- `interface TimelineImageViewerProps`
- `function TimelineImageViewer({ images, initialIndex = 0, onClose, }: TimelineImageViewerProps)`

## Symbols

### interface `TimelineImageViewerProps`

- Signature: `interface TimelineImageViewerProps`
- Lines: 23-27
- Exported: yes

```tsx
interface TimelineImageViewerProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}
```

### function `TimelineImageViewer`

- Signature: `function TimelineImageViewer({ images, initialIndex = 0, onClose, }: TimelineImageViewerProps)`
- Lines: 29-164
- Exported: yes

```tsx
function TimelineImageViewer({
  images,
  initialIndex = 0,
  onClose,
}: TimelineImageViewerProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<string>>(null);

  const safeImages = useMemo(
    () =>
      images.filter(
        (u) => typeof u === "string" && u.trim().length > 0,
      ) as string[],
    [images],
  );

  const startIndex = Math.min(
    Math.max(0, initialIndex),
    Math.max(0, safeImages.length - 1),
  );

  const [visibleIndex, setVisibleIndex] = useState(startIndex);
  useEffect(() => {
    setVisibleIndex(startIndex);
  }, [startIndex]);

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: { index: number | null }[] }) => {
      const idx = info.viewableItems[0]?.index;
      if (idx != null) setVisibleIndex(idx);
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 55,
  }).current;

  const scrollToStart = useCallback(() => {
    if (safeImages.length === 0 || startIndex <= 0) return;
    listRef.current?.scrollToIndex({
      index: startIndex,
      animated: false,
    });
  }, [safeImages.length, startIndex]);

  useEffect(() => {
    if (safeImages.length === 0 || startIndex <= 0) return;
    const task = InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(scrollToStart);
    });
    return () => task.cancel();
  }, [safeImages.length, startIndex, scrollToStart]);

  if (!safeImages.length) return null;

  const pageH = height - insets.top - insets.bottom;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.root,
          {
            width,
            height,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.closeBtn, { top: insets.top + 8 }]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Đóng xem ảnh"
        >
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>

        <FlatList
          ref={listRef}
          data={safeImages}
          keyExtractor={(uri, index) => `${index}-${uri.slice(0, 48)}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={[styles.list, { width }]}
          removeClippedSubviews={false}
          initialNumToRender={Math.min(safeImages.length, 8)}
          windowSize={Math.min(safeImages.length + 1, 11)}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              listRef.current?.scrollToOffset({
                offset: info.averageItemLength * info.index,
                animated: false,
              });
            }, 120);
          }}
          renderItem={({ item: uri }) => (
            <View style={[styles.page, { width, height: pageH }]}>
              <Image
                source={{ uri }}
                style={[styles.image, { width: width - 24, height: pageH - 32 }]}
                contentFit="contain"
                transition={200}
                accessibilityLabel="Ảnh kỷ niệm phóng to"
              />
            </View>
          )}
        />

        {safeImages.length > 1 ? (
          <View style={[styles.counter, { bottom: insets.bottom + 16 }]}>
            <Text style={[styles.counterText, { fontFamily: fonts.sans }]}>
              {visibleIndex + 1} / {safeImages.length}
            </Text>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}
```
