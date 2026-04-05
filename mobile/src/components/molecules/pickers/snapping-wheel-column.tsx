import React, {
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { AppText } from "@/src/ui-kit";

export const DEFAULT_WHEEL_ITEM_H = 44;
const VISIBLE_ROWS = 5;

export interface SnappingWheelColumnProps {
  itemHeight?: number;
  count: number;
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  formatLabel: (index: number) => string;
  textColor: string;
  syncKey?: number | string | boolean;
}

/**
 * Cột cuộn snap — giờ/phút/tháng/năm.
 *
 * Scroll stutter fix: chỉ gọi `scrollTo` khi `syncKey` đổi (mở modal / reset).
 * `onScrollEnd` chỉ gọi `onSelectIndex` — KHÔNG `scrollTo` lại vì `snapToInterval`
 * đã tự căn chỉnh. Tránh vòng lặp setState → re-render → scrollTo → onScrollEnd.
 */
export function SnappingWheelColumn({
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

const styles = StyleSheet.create({
  col: { flex: 1 },
  cell: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
  },
});
