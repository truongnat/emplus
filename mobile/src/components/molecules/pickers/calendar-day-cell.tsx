import {
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  type DimensionValue,
} from "react-native";
import { AppText } from "@/src/ui-kit";

export type LunarKind = "new" | "full" | null;

export interface CalendarDayCellProps {
  colPct: DimensionValue;
  minHeight: number;
  day: number;
  lunarLine: string;
  lunarKind: LunarKind;
  inMonth: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  onPress: () => void;
  weekendColor: string;
  textPrimary: string;
  textOnBrand: string;
  textTertiary: string;
  successText: string;
  brandColor: string;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
}

/** Một ô ngày trên lưới — tách component cho dễ đọc; tối ưu chính ở useMemo dữ liệu ô. */
export function CalendarDayCell({
  colPct,
  minHeight,
  day,
  lunarLine,
  lunarKind,
  inMonth,
  isWeekend,
  isSelected,
  onPress,
  weekendColor,
  textPrimary,
  textOnBrand,
  textTertiary,
  successText,
  brandColor,
  accessibilityLabel,
  style,
}: CalendarDayCellProps) {
  const lunarAccent =
    lunarKind === "full" || lunarKind === "new" ? successText : textTertiary;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.cell,
        {
          width: colPct,
          minHeight,
          borderWidth: isSelected ? 1 : 0,
        },
        !inMonth && styles.dimmed,
        isSelected && {
          backgroundColor: brandColor,
          borderColor: brandColor,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <AppText
        style={[
          styles.cellMain,
          {
            color: isSelected
              ? textOnBrand
              : isWeekend
                ? weekendColor
                : textPrimary,
          },
        ]}
      >
        {day}
      </AppText>
      {lunarLine ? (
        <AppText
          style={[
            styles.cellSub,
            {
              color: isSelected ? "rgba(255,255,255,0.88)" : lunarAccent,
            },
          ]}
          numberOfLines={1}
        >
          {lunarLine}
        </AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderColor: "transparent",
    paddingVertical: 4,
  },
  dimmed: { opacity: 0.38 },
  cellMain: {
    fontSize: 16,
    fontWeight: "800",
  },
  cellSub: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
});
