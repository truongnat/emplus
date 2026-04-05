import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";
import { parseTimeHm } from "@/src/utils/date-format-vn";
import { PickerModalOverlay } from "./picker-modal-overlay";
import {
  SnappingWheelColumn,
  DEFAULT_WHEEL_ITEM_H,
} from "./snapping-wheel-column";

const ITEM_H = DEFAULT_WHEEL_ITEM_H;
const VISIBLE_ROWS = 5;
const PICKER_H = ITEM_H * VISIBLE_ROWS;

/** 24h → hiển thị 12h + buổi (tiện export cho màn khác). */
export function to12hParts(h24: number): { h12: number; isPm: boolean } {
  if (h24 === 0) return { h12: 12, isPm: false };
  if (h24 < 12) return { h12: h24, isPm: false };
  if (h24 === 12) return { h12: 12, isPm: true };
  return { h12: h24 - 12, isPm: true };
}

export function from12hParts(h12: number, isPm: boolean): number {
  if (isPm) {
    if (h12 === 12) return 12;
    return h12 + 12;
  }
  if (h12 === 12) return 0;
  return h12;
}

/** 0–11 → AM, 12–23 → PM (chuẩn 24h). */
export function hour24ToAmPm(h24: number): "AM" | "PM" {
  return h24 >= 12 ? "PM" : "AM";
}

export interface TimePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  initialHm: string | undefined | null;
  onConfirm: (hm: string) => void;
  title: string;
  headerIconName?: React.ComponentProps<typeof Ionicons>["name"];
  sheetStyle?: StyleProp<ViewStyle>;
  /**
   * Đồng bộ scroll khi mở sheet / đổi `initialHm`.
   * Mặc định: `visible` + `initialHm` — không đổi khi user vuốt trong sheet.
   */
  syncKey?: number | string | boolean;
  /** Thêm "(AM)" / "(PM)" vào tiêu đề theo giờ 24h đang chọn. Mặc định true. */
  showPeriodInTitle?: boolean;
}

/**
 * Hai cột 00–23 và phút; AM/PM hiển thị trên tiêu đề (tránh cột thứ 3 gây nháy).
 */
export function TimePickerSheet({
  visible,
  onClose,
  initialHm,
  onConfirm,
  title,
  headerIconName = "time-outline",
  sheetStyle,
  syncKey,
  showPeriodInTitle = true,
}: TimePickerSheetProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();

  const parsed = useMemo(() => parseTimeHm(initialHm), [initialHm]);
  const [hour24, setHour24] = useState(parsed?.h ?? 12);
  const [minute, setMinute] = useState(parsed?.m ?? 0);

  const wheelSyncKey = syncKey ?? `${String(visible)}-${initialHm ?? ""}`;

  useEffect(() => {
    if (!visible) return;
    const p = parseTimeHm(initialHm);
    setHour24(p?.h ?? 12);
    setMinute(p?.m ?? 0);
  }, [visible, initialHm]);

  const titleWithPeriod = useMemo(() => {
    if (!showPeriodInTitle) return title;
    const p = hour24ToAmPm(hour24);
    return `${title} (${p})`;
  }, [title, hour24, showPeriodInTitle]);

  const confirm = useCallback(() => {
    const hh = `${hour24}`.padStart(2, "0");
    const mm = `${minute}`.padStart(2, "0");
    onConfirm(`${hh}:${mm}`);
    onClose();
  }, [hour24, minute, onConfirm, onClose]);

  return (
    <PickerModalOverlay visible={visible} onRequestClose={onClose}>
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.surface.default,
            borderTopColor: colors.border.subtle,
            paddingBottom: insets.bottom + 12,
          },
          sheetStyle,
        ]}
      >
        <View style={styles.headerRow}>
          <View
            style={[
              styles.headerIconBox,
              {
                backgroundColor: colors.brand.muted,
                borderColor: colors.border.subtle,
              },
            ]}
          >
            <Ionicons
              name={headerIconName}
              size={22}
              color={colors.brand.default}
            />
          </View>
          <AppText
            style={[styles.headerTitle, { color: colors.text.primary }]}
            numberOfLines={2}
          >
            {titleWithPeriod}
          </AppText>
          <Pressable
            onPress={onClose}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Đóng"
            style={styles.closeHit}
          >
            <Ionicons name="close" size={26} color={colors.text.secondary} />
          </Pressable>
        </View>

        <View style={styles.wheelSection}>
          <View style={styles.wheelLabels}>
            <AppText
              style={[
                styles.wheelLabel,
                { flex: 1, color: colors.text.tertiary },
              ]}
            >
              Giờ
            </AppText>
            <AppText
              style={[
                styles.wheelLabel,
                { flex: 1, color: colors.text.tertiary },
              ]}
            >
              Phút
            </AppText>
          </View>

          <View
            style={[
              styles.wheelWrap,
              { borderColor: colors.border.subtle },
            ]}
          >
            <View
              pointerEvents="none"
              style={[
                styles.selectionBar,
                {
                  backgroundColor: colors.surface.sunken,
                  borderColor: colors.border.subtle,
                },
              ]}
            />
            <View style={styles.wheelRow}>
              <View style={styles.wheelColZ}>
                <SnappingWheelColumn
                  count={24}
                  selectedIndex={hour24}
                  onSelectIndex={setHour24}
                  formatLabel={(i) => `${i}`.padStart(2, "0")}
                  textColor={colors.text.primary}
                  syncKey={wheelSyncKey}
                />
              </View>
              <View style={styles.wheelColZ}>
                <SnappingWheelColumn
                  count={60}
                  selectedIndex={minute}
                  onSelectIndex={setMinute}
                  formatLabel={(i) => `${i}`.padStart(2, "0")}
                  textColor={colors.text.primary}
                  syncKey={wheelSyncKey}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Pressable
            onPress={onClose}
            style={[
              styles.btnOutline,
              { borderColor: colors.border.strong },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Hủy"
          >
            <AppText
              style={[styles.btnOutlineText, { color: colors.text.primary }]}
            >
              HỦY
            </AppText>
          </Pressable>
          <Pressable
            onPress={confirm}
            style={[
              styles.btnSolid,
              { backgroundColor: colors.brand.default },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Chọn"
          >
            <AppText
              style={[styles.btnSolidText, { color: colors.text.onBrand }]}
            >
              CHỌN
            </AppText>
          </Pressable>
        </View>
      </View>
    </PickerModalOverlay>
  );
}

const styles = StyleSheet.create({
  sheet: {
    width: "100%",
    alignSelf: "stretch",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  headerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: { flex: 1, fontSize: 17, fontWeight: "800" },
  closeHit: { padding: 4 },
  wheelSection: {
    marginBottom: 16,
  },
  wheelLabels: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  wheelLabel: {
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase" as "uppercase",
    letterSpacing: 0.6,
  },
  wheelWrap: {
    height: PICKER_H,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  wheelRow: { flex: 1, flexDirection: "row" },
  wheelColZ: { flex: 1, zIndex: 1 },
  selectionBar: {
    position: "absolute",
    left: 8,
    right: 8,
    top: (PICKER_H - ITEM_H) / 2,
    height: ITEM_H,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    zIndex: 0,
  },
  footerRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  btnOutline: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  btnOutlineText: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  btnSolid: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  btnSolidText: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
