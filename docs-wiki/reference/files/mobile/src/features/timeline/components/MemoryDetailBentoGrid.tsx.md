---
title: "mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx"
description: ".url's array,"
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
  page: "reference/files/mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx.md"
  relativePath: "mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx`
- Lines: 201
- Symbols: 3

## AI Summary

.url's array,

### Responsibilities

- .url's array,
- .onCellPress function
- n number

### Usage Notes

- .useThemeColors() function, .useThemeMode() hook, .bentoRowCounts function, ` Pressable component` and its accessibility related styles]
- symbols": [{

## Public API

- `interface MemoryDetailBentoGridProps`
- `function MemoryDetailBentoGrid({ urls, onCellPress, }: MemoryDetailBentoGridProps)`

## Symbols

### interface `MemoryDetailBentoGridProps`

- Signature: `interface MemoryDetailBentoGridProps`
- Lines: 15-18
- Exported: yes

```tsx
interface MemoryDetailBentoGridProps {
  urls: string[];
  onCellPress: (index: number) => void;
}
```

### function `MemoryDetailBentoGrid`

- Signature: `function MemoryDetailBentoGrid({ urls, onCellPress, }: MemoryDetailBentoGridProps)`
- Lines: 40-151
- Exported: yes

```tsx
function MemoryDetailBentoGrid({
  urls,
  onCellPress,
}: MemoryDetailBentoGridProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const n = urls.length;
  const cellUnderlay = isDark
    ? homeDarkGridInset.backgroundColor
    : colors.surface.sunken;

  const rowPlan = useMemo(() => (n >= 5 ? bentoRowCounts(n) : []), [n]);

  const cell = useCallback(
    (
      uri: string,
      index: number,
      style: StyleProp<ViewStyle>,
      a11yHint?: string,
    ) => (
      <Pressable
        key={`${index}-${uri.slice(0, 48)}`}
        onPress={() => onCellPress(index)}
        style={({ pressed }) => [
          styles.cell,
          { backgroundColor: cellUnderlay },
          style,
          pressed && styles.cellPressed,
        ]}
        accessibilityRole="imagebutton"
        accessibilityLabel={a11yHint ?? `Xem ảnh ${index + 1}`}
      >
        <Image
          source={uri}
          style={styles.image}
          contentFit="cover"
          transition={180}
        />
      </Pressable>
    ),
    [cellUnderlay, onCellPress],
  );

  if (n === 0) return null;

  if (n === 1) {
    return (
      <View style={styles.block}>
        {cell(urls[0], 0, styles.oneTall, "Xem ảnh")}
      </View>
    );
  }

  if (n === 2) {
    return (
      <View style={[styles.block, styles.row, { gap: GAP }]}>
        {cell(urls[0], 0, styles.half)}
        {cell(urls[1], 1, styles.half)}
      </View>
    );
  }

  if (n === 3) {
    return (
      <View style={[styles.block, styles.row, { gap: GAP, height: 240 }]}>
        <View style={[styles.flex1, { minWidth: 0 }]}>
          {cell(urls[0], 0, styles.fill)}
        </View>
        <View style={[styles.flex1, styles.col, { gap: GAP, minWidth: 0 }]}>
          {cell(urls[1], 1, styles.stackHalf)}
          {cell(urls[2], 2, styles.stackHalf)}
        </View>
      </View>
    );
  }

  if (n === 4) {
    return (
      <View style={[styles.block, styles.col, { gap: GAP, height: 240 }]}>
        <View style={[styles.row, { flex: 1, gap: GAP, minHeight: 0 }]}>
          {cell(urls[0], 0, styles.flex1)}
          {cell(urls[1], 1, styles.flex1)}
        </View>
        <View style={[styles.row, { flex: 1, gap: GAP, minHeight: 0 }]}>
          {cell(urls[2], 2, styles.flex1)}
          {cell(urls[3], 3, styles.flex1)}
        </View>
      </View>
    );
  }

  const multiRows: React.ReactNode[] = [];
  let rowStart = 0;
  for (let i = 0; i < rowPlan.length; i++) {
    const count = rowPlan[i];
    const slice = urls.slice(rowStart, rowStart + count);
    const rowHeight = count === 1 ? 220 : 152;
    multiRows.push(
      <View
        key={`bento-row-${i}-${rowStart}`}
        style={[styles.row, { gap: GAP, height: rowHeight }]}
      >
        {slice.map((uri, j) => cell(uri, rowStart + j, styles.flex1))}
      </View>,
    );
    rowStart += count;
  }

  return (
    <View style={[styles.block, styles.col, { gap: GAP }]}>{multiRows}</View>
  );
}
```

### function `bentoRowCounts`

- Signature: `function bentoRowCounts(n: number): number[]`
- Lines: 21-38
- Exported: no

```tsx
function bentoRowCounts(n: number): number[] {
  if (n <= 0) return [];
  const rows: number[] = [];
  let left = n;
  while (left > 0) {
    if (left === 4) {
      rows.push(2, 2);
      break;
    }
    if (left <= 3) {
      rows.push(left);
      break;
    }
    rows.push(3);
    left -= 3;
  }
  return rows;
}
```
