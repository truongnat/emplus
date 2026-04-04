import React, { useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { homeDarkGridInset } from "@/src/theme/emplus-design-tokens";

const GAP = 8;

export interface MemoryDetailBentoGridProps {
  urls: string[];
  onCellPress: (index: number) => void;
}

/** Kế hoạch số ô mỗi hàng cho n ≥ 5 (ưu tiên hàng 3, tách 4 → 2+2). */
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

export function MemoryDetailBentoGrid({
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

const styles = StyleSheet.create({
  block: {
    width: "100%",
    marginBottom: 20,
  },
  col: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  flex1: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },
  cell: {
    borderRadius: 20,
    overflow: "hidden",
  },
  cellPressed: {
    opacity: 0.92,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fill: {
    flex: 1,
    width: "100%",
    minHeight: 0,
  },
  oneTall: {
    width: "100%",
    height: 280,
  },
  half: {
    flex: 1,
    height: 220,
    minWidth: 0,
  },
  stackHalf: {
    flex: 1,
    width: "100%",
    minHeight: 0,
  },
});
