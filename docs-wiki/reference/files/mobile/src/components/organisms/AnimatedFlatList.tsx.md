---
title: "mobile/src/components/organisms/AnimatedFlatList.tsx"
description: "returns a React node"
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
  page: "reference/files/mobile/src/components/organisms/AnimatedFlatList.tsx.md"
  relativePath: "mobile/src/components/organisms/AnimatedFlatList.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/organisms/AnimatedFlatList.tsx"
  module: "mobile/src/components/organisms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 5
---

# mobile/src/components/organisms/AnimatedFlatList.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/organisms](../../../../../modules/mobile/src/components/organisms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/organisms/AnimatedFlatList.tsx`
- Lines: 429
- Symbols: 5

## Related Features

- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Storage Read / List](../../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.

## AI Summary

returns a React node

### Responsibilities

- returns a React node
- parameters are `type` (ItemAnimation) and `delay` (number)
- no data is returned

### Usage Notes

- This function should be used to set the delay time for when an animated list item enters the screen. The animations supported currently include 'fade', 'slide-left', 'slide-right', 'zoom', 'spring-up', and 'none'.

## Public API

- `type ItemAnimation = | "fade" | "slide-left" | "slide-right" | "zoom" | "spring-up" | "none";`
- `interface SwipeAction`
- `interface AnimatedListHandle`
- `interface AnimatedListProps<T>`

## Symbols

### type `ItemAnimation`

- Signature: `type ItemAnimation = | "fade" | "slide-left" | "slide-right" | "zoom" | "spring-up" | "none";`
- Lines: 23-29
- Exported: yes

```tsx
type ItemAnimation =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "zoom"
  | "spring-up"
  | "none";
```

### interface `SwipeAction`

- Signature: `interface SwipeAction`
- Lines: 31-38
- Exported: yes

```tsx
interface SwipeAction {
  label: string;
  icon?: React.ReactNode;
  color: string;
  textColor?: string;
  onPress: (id: string) => void;
  isDestructive?: boolean;
}
```

### interface `AnimatedListHandle`

- Signature: `interface AnimatedListHandle`
- Lines: 40-44
- Exported: yes

```tsx
interface AnimatedListHandle {
  scrollToTop: () => void;
  scrollToIndex: (index: number) => void;
  flashItem: (index: number) => void;
}
```

### interface `AnimatedListProps`

- Signature: `interface AnimatedListProps<T>`
- Lines: 46-71
- Exported: yes

```tsx
interface AnimatedListProps<T> {
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (info: { item: T; index: number }) => React.ReactNode;
  itemEnterAnimation?: ItemAnimation;
  itemEnterDelay?: number;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  headerComponent?: React.ReactNode;
  headerHeight?: number;
  stickyHeader?: boolean;
  parallaxHeader?: boolean;
  isLoading?: boolean;
  skeletonCount?: number;
  skeletonComponent?: () => React.ReactNode;
  emptyComponent?: React.ReactNode;
  footerLoadingComponent?: React.ReactNode;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  isLoadingMore?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  estimatedItemSize?: number;
  style?: any;
  contentContainerStyle?: any;
}
```

### function `itemEnterAnim`

- Signature: `function itemEnterAnim(type: ItemAnimation, delay: number)`
- Lines: 232-249
- Exported: no

```tsx
function itemEnterAnim(type: ItemAnimation, delay: number) {
  switch (type) {
    case "fade":
      return FadeIn.delay(delay).duration(350);
    case "slide-left":
      return SlideInLeft.delay(delay).duration(350);
    case "slide-right":
      return SlideInRight.delay(delay).duration(350);
    case "zoom":
      return ZoomIn.delay(delay).duration(350);
    case "spring-up":
      return FadeIn.delay(delay).springify();
    case "none":
      return undefined;
    default:
      return FadeIn.delay(delay).duration(350);
  }
}
```
