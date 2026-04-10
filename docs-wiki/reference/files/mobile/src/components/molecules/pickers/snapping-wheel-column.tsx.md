---
title: "mobile/src/components/molecules/pickers/snapping-wheel-column.tsx"
description: "The SnappingWheelColumn component handles horizontal scrolling in a picking wheel."
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
  page: "reference/files/mobile/src/components/molecules/pickers/snapping-wheel-column.tsx.md"
  relativePath: "mobile/src/components/molecules/pickers/snapping-wheel-column.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/snapping-wheel-column.tsx"
  module: "mobile/src/components/molecules/pickers"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/molecules/pickers/snapping-wheel-column.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/components/molecules/pickers](../../../../../../modules/mobile/src/components/molecules/pickers.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/snapping-wheel-column.tsx`
- Lines: 102
- Symbols: 2

## AI Summary

The SnappingWheelColumn component handles horizontal scrolling in a picking wheel.

### Responsibilities

- to handle the vertical positioning of items within the selection range

### Usage Notes

- It uses `useLayoutEffect` for continuous updating of scroll position as user interacts with the wheel
- it has input parameters for customizing item height, count, selected index, and labeling function

## Public API

- `interface SnappingWheelColumnProps`
- `function SnappingWheelColumn({ itemHeight = DEFAULT_WHEEL_ITEM_H, count, selectedIndex, onSelectIndex, formatLabel, textColor, syncKey, }: SnappingWheelColumnProps)`

## Symbols

### interface `SnappingWheelColumnProps`

- Signature: `interface SnappingWheelColumnProps`
- Lines: 18-26
- Exported: yes

```tsx
interface SnappingWheelColumnProps {
  itemHeight?: number;
  count: number;
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  formatLabel: (index: number) => string;
  textColor: string;
  syncKey?: number | string | boolean;
}
```

### function `SnappingWheelColumn`

- Signature: `function SnappingWheelColumn({ itemHeight = DEFAULT_WHEEL_ITEM_H, count, selectedIndex, onSelectIndex, formatLabel, textColor, syncKey, }: SnappingWheelColumnProps)`
- Lines: 35-89
- Exported: yes

```tsx
function SnappingWheelColumn({
  itemHeight = DEFAULT_WHEEL_ITEM_H,
  count,
  selectedIndex,
  onSelectIndex,
  formatLabel,
  textColor,
  syncKey,
}: SnappingWheelColumnProps) {
  const ref = useRef<ScrollView>(null);
  const indexRef = useRef(selectedIndex);
  indexRef.current = selectedIndex;

  const visibleH = itemHeight * VISIBLE_ROWS;
  const padV = (visibleH - itemHeight) / 2;
  const maxIdx = Math.max(0, count - 1);

  useLayoutEffect(() => {
    if (itemHeight <= 0 || count <= 0) return;
    const idx = Math.min(maxIdx, Math.max(0, indexRef.current));
    ref.current?.scrollTo({ y: idx * itemHeight, animated: false });
  }, [syncKey, itemHeight, count, maxIdx]);

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (itemHeight <= 0) return;
      const rawY = e.nativeEvent.contentOffset?.y ?? 0;
      if (!Number.isFinite(rawY)) return;
      const idx = Math.min(maxIdx, Math.max(0, Math.round(rawY / itemHeight)));
      onSelectIndex(idx);
    },
    [itemHeight, maxIdx, onSelectIndex],
  );

  return (
    <ScrollView
      ref={ref}
      style={[styles.col, { height: visibleH }]}
      contentContainerStyle={{ paddingVertical: padV }}
      showsVerticalScrollIndicator={false}
      snapToInterval={itemHeight}
      decelerationRate="fast"
      onMomentumScrollEnd={onScrollEnd}
      onScrollEndDrag={onScrollEnd}
    >
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={[styles.cell, { height: itemHeight }]}>
          <AppText style={[styles.label, { color: textColor }]}>
            {formatLabel(i)}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
}
```
