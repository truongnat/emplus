---
title: "mobile/src/components/atoms/BottomSheet.tsx"
description: "BottomSheetComponent"
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
  page: "reference/files/mobile/src/components/atoms/BottomSheet.tsx.md"
  relativePath: "mobile/src/components/atoms/BottomSheet.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/BottomSheet.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 7
---

# mobile/src/components/atoms/BottomSheet.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/BottomSheet.tsx`
- Lines: 439
- Symbols: 7

## AI Summary

BottomSheetComponent

### Responsibilities

- manage sheet state and layout
- respond to user interactions with the sheet

### Usage Notes

- This component defines the functionality for managing a bottomsheet in an application. It includes functions for snapping points and scrolling

## Public API

- ``type SnapPoint = number | `${number}%`;``
- `interface BottomSheetHandle`
- `interface BottomSheetProps`
- `function BottomSheetScrollView({ children, style, }: { children: ReactNode; style?: ViewStyle; })`
- `onScroll(e)`
- `onBeginDrag()`

## Symbols

### type `SnapPoint`

- Signature: ``type SnapPoint = number | `${number}%`;``
- Lines: 40-40
- Exported: yes

```tsx
type SnapPoint = number | `${number}%`;
```

### interface `BottomSheetHandle`

- Signature: `interface BottomSheetHandle`
- Lines: 42-47
- Exported: yes

```tsx
interface BottomSheetHandle {
  snapTo: (index: number) => void;
  expand: () => void;
  collapse: () => void;
  close: () => void;
}
```

### interface `BottomSheetProps`

- Signature: `interface BottomSheetProps`
- Lines: 49-67
- Exported: yes

```tsx
interface BottomSheetProps {
  snapPoints: SnapPoint[];
  initialSnap?: number;
  onSnapChange?: (index: number) => void;
  onClose?: () => void;
  backdropComponent?: (props: {
    animatedIndex: SharedValue<number>;
  }) => ReactNode;
  handleComponent?: () => ReactNode;
  children: ReactNode;
  enableScrolling?: boolean;
  dismissOnBackdrop?: boolean;
  dismissVelocityThreshold?: number;
  modal?: boolean;
  style?: ViewStyle;
  keyboardAware?: boolean;
  detached?: boolean;
  bottomInset?: number;
}
```

### function `BottomSheetScrollView`

- Signature: `function BottomSheetScrollView({ children, style, }: { children: ReactNode; style?: ViewStyle; })`
- Lines: 88-121
- Exported: yes

```tsx
function BottomSheetScrollView({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  const ctx = useContext(BottomSheetScrollCtx);
  const animRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll(e) {
      if (ctx) {
        ctx.scrollY.value = e.contentOffset.y;
        ctx.allowSheetGesture.value = e.contentOffset.y <= 0;
      }
    },
    onBeginDrag() {
      if (ctx) ctx.allowSheetGesture.value = false;
    },
  });

  return (
    <Animated.ScrollView
      ref={animRef}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      bounces={false}
      style={style}
    >
      {children}
    </Animated.ScrollView>
  );
}
```

### method `onScroll`

- Signature: `onScroll(e)`
- Lines: 99-104
- Exported: yes

```tsx
onScroll(e) {
      if (ctx) {
        ctx.scrollY.value = e.contentOffset.y;
        ctx.allowSheetGesture.value = e.contentOffset.y <= 0;
      }
    }
```

### method `onBeginDrag`

- Signature: `onBeginDrag()`
- Lines: 105-107
- Exported: yes

```tsx
onBeginDrag() {
      if (ctx) ctx.allowSheetGesture.value = false;
    }
```

### function `resolveSnapPoint`

- Signature: `function resolveSnapPoint(point: SnapPoint): number`
- Lines: 71-77
- Exported: no

```tsx
function resolveSnapPoint(point: SnapPoint): number {
  if (typeof point === "string") {
    const pct = parseFloat(point) / 100;
    return SCREEN_H * pct;
  }
  return point;
}
```
