import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/src/ui-kit";
import { useThemeColors, useThemeMode } from "@/src/theme";
import {
  parseIsoDate,
  toIsoDateString,
} from "@/src/utils/date-format-vn";
import {
  lunarDayMonthLabel,
  lunarDayKind,
} from "@/src/utils/lunar-label";
import { PickerModalOverlay } from "./picker-modal-overlay";
import {
  SnappingWheelColumn,
  DEFAULT_WHEEL_ITEM_H,
} from "./snapping-wheel-column";
import { CalendarDayCell, type LunarKind } from "./calendar-day-cell";
import {
  addDays,
  sameDay,
  startOfGrid,
  clampDayInMonth,
} from "./calendar-utils";

const WEEK_VI = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] as const;

const ITEM_H = DEFAULT_WHEEL_ITEM_H;
const VISIBLE_ROWS = 5;
const MY_PICKER_H = ITEM_H * VISIBLE_ROWS;

type PickerStep = "day" | "monthYear";

export interface DatePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  initialIso: string | undefined | null;
  onConfirm: (iso: string) => void;
  title: string;
  headerIconName?: React.ComponentProps<typeof Ionicons>["name"];
  sheetStyle?: StyleProp<ViewStyle>;
  /** Năm tối thiểu (mặc định 1900). */
  minYear?: number;
  /** Năm tối đa (mặc định năm hiện tại). */
  maxYear?: number;
  /** Hiện dòng âm lịch nhỏ (gọi lunar-javascript × 42 ô / tháng). */
  showLunar?: boolean;
}

interface CellModel {
  time: number;
  inMonth: boolean;
  y: number;
  mo: number;
  da: number;
  lunar: string;
  lunarKind: LunarKind;
  wd: number;
  isSelected: boolean;
}

/**
 * Sheet chọn ngày: lưới tuần T2–CN, tap tiêu đề tháng/năm → wheel tháng + năm.
 * Perf: gom tính âm lịch trong một `useMemo` / tháng; wheel tháng/năm chỉ mount khi bước `monthYear`.
 */
export function DatePickerSheet({
  visible,
  onClose,
  initialIso,
  onConfirm,
  title,
  headerIconName = "calendar-outline",
  sheetStyle,
  minYear: minYearProp,
  maxYear: maxYearProp,
  showLunar = true,
}: DatePickerSheetProps) {
  const insets = useSafeAreaInsets();
  const { width: winW } = useWindowDimensions();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();

  const effectiveMinYear = minYearProp ?? 1900;
  const effectiveMaxYear = maxYearProp ?? new Date().getFullYear();
  const yearCount = effectiveMaxYear - effectiveMinYear + 1;

  const contentW = winW - 40;
  const cellApprox = contentW / 7;
  const cellH = Math.max(48, cellApprox * 0.82);
  const colPct = `${100 / 7}%`;

  const initialDate = useMemo(() => {
    const p = parseIsoDate(initialIso);
    return p ?? new Date();
  }, [initialIso]);

  const [step, setStep] = useState<PickerStep>("day");
  const [cursor, setCursor] = useState(() => ({
    y: initialDate.getFullYear(),
    m: initialDate.getMonth(),
  }));
  const [selected, setSelected] = useState<Date>(initialDate);
  const [draftMonth, setDraftMonth] = useState(initialDate.getMonth());
  const [draftYear, setDraftYear] = useState(initialDate.getFullYear());

  useEffect(() => {
    if (!visible) return;
    setStep("day");
    const p = parseIsoDate(initialIso);
    const d = p ?? new Date();
    setSelected(d);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
    setDraftMonth(d.getMonth());
    setDraftYear(d.getFullYear());
  }, [visible, initialIso]);

  const gridStart = useMemo(
    () => startOfGrid(cursor.y, cursor.m),
    [cursor.y, cursor.m],
  );

  const cells = useMemo(() => {
    const out: Date[] = [];
    for (let i = 0; i < 42; i += 1) {
      out.push(addDays(gridStart, i));
    }
    return out;
  }, [gridStart]);

  const cellModels: CellModel[] = useMemo(() => {
    return cells.map((cell) => {
      const inMonth = cell.getMonth() === cursor.m;
      const y = cell.getFullYear();
      const mo = cell.getMonth() + 1;
      const da = cell.getDate();
      let lunar = "";
      let lunarKind: LunarKind = null;
      if (showLunar) {
        lunar = lunarDayMonthLabel(y, mo, da);
        lunarKind = lunarDayKind(y, mo, da);
      }
      const wd = cell.getDay();
      return {
        time: cell.getTime(),
        inMonth,
        y,
        mo,
        da,
        lunar,
        lunarKind,
        wd,
        isSelected: sameDay(cell, selected),
      };
    });
  }, [cells, cursor.m, selected, showLunar]);

  const onPrevMonth = useCallback(() => {
    setCursor((c) => {
      const nm = c.m - 1;
      if (nm < 0) return { y: c.y - 1, m: 11 };
      return { y: c.y, m: nm };
    });
  }, []);

  const onNextMonth = useCallback(() => {
    setCursor((c) => {
      const nm = c.m + 1;
      if (nm > 11) return { y: c.y + 1, m: 0 };
      return { y: c.y, m: nm };
    });
  }, []);

  const openMonthYear = useCallback(() => {
    setDraftMonth(cursor.m);
    setDraftYear(cursor.y);
    setStep("monthYear");
  }, [cursor.m, cursor.y]);

  const applyMonthYear = useCallback(() => {
    setCursor({ y: draftYear, m: draftMonth });
    setSelected((prev) => {
      const d = clampDayInMonth(draftYear, draftMonth, prev.getDate());
      return new Date(draftYear, draftMonth, d);
    });
    setStep("day");
  }, [draftYear, draftMonth]);

  const confirm = useCallback(() => {
    onConfirm(toIsoDateString(selected));
    onClose();
  }, [onConfirm, onClose, selected]);

  const monthYearTitle = `THÁNG ${`${cursor.m + 1}`.padStart(2, "0")} · ${cursor.y}`;

  const weekendColor = colors.brand.default;
  const mutedWeekend = isDark ? "rgba(255,143,159,0.75)" : colors.brand.strong;

  /** Không gắn draft vào key — tránh mỗi lần vuốt tháng/năm lại scrollTo (nháy). */
  const myWheelSyncKey = step === "monthYear" ? "monthYear" : "day";

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
          <AppText style={[styles.headerTitle, { color: colors.text.primary }]}>
            {title}
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

        {step === "day" ? (
          <>
            <View style={styles.monthNav}>
              <Pressable
                onPress={onPrevMonth}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Tháng trước"
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colors.text.primary}
                />
              </Pressable>
              <Pressable
                onPress={openMonthYear}
                accessibilityRole="button"
                accessibilityLabel="Chọn tháng và năm"
                style={styles.monthTitleHit}
              >
                <AppText
                  style={[styles.monthTitle, { color: colors.text.primary }]}
                >
                  {monthYearTitle}
                </AppText>
              </Pressable>
              <Pressable
                onPress={onNextMonth}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Tháng sau"
              >
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={colors.text.primary}
                />
              </Pressable>
            </View>

            <View
              style={[
                styles.weekRow,
                { borderBottomColor: colors.border.subtle },
              ]}
            >
              {WEEK_VI.map((label, i) => {
                const isWeekend = i >= 5;
                return (
                  <View
                    key={label}
                    style={{ width: colPct, alignItems: "center" }}
                  >
                    <AppText
                      style={[
                        styles.weekCell,
                        {
                          color: isWeekend
                            ? mutedWeekend
                            : colors.text.tertiary,
                        },
                      ]}
                    >
                      {label}
                    </AppText>
                  </View>
                );
              })}
            </View>

            <View style={styles.grid}>
              {cellModels.map((m) => (
                <CalendarDayCell
                  key={m.time}
                  colPct={colPct}
                  minHeight={cellH}
                  day={m.da}
                  lunarLine={m.lunar}
                  lunarKind={m.lunarKind}
                  inMonth={m.inMonth}
                  isWeekend={m.wd === 0 || m.wd === 6}
                  isSelected={m.isSelected}
                  onPress={() => setSelected(new Date(m.time))}
                  weekendColor={weekendColor}
                  textPrimary={colors.text.primary}
                  textOnBrand={colors.text.onBrand}
                  textTertiary={colors.text.tertiary}
                  successText={colors.status.success.text}
                  brandColor={colors.brand.default}
                  accessibilityLabel={`Ngày ${m.da} tháng ${m.mo}`}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.myHeader}>
              <Pressable
                onPress={applyMonthYear}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Xong chọn tháng năm"
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colors.text.primary}
                />
              </Pressable>
              <AppText
                style={[styles.myHeaderTitle, { color: colors.text.primary }]}
              >
                Chọn tháng và năm
              </AppText>
              <View style={styles.myHeaderSpacer} />
            </View>

            <View
              style={[
                styles.myWheelWrap,
                { borderColor: colors.border.subtle },
              ]}
            >
              <View
                pointerEvents="none"
                style={[
                  styles.mySelectionBar,
                  {
                    backgroundColor: colors.surface.sunken,
                    borderColor: colors.border.subtle,
                  },
                ]}
              />
              <View style={styles.myWheelRow}>
                <View style={styles.wheelColZ}>
                  <SnappingWheelColumn
                    count={12}
                    selectedIndex={draftMonth}
                    onSelectIndex={setDraftMonth}
                    formatLabel={(i) => `Tháng ${i + 1}`}
                    textColor={colors.text.primary}
                    syncKey={myWheelSyncKey}
                  />
                </View>
                <View style={styles.wheelColZ}>
                  <SnappingWheelColumn
                    count={yearCount}
                    selectedIndex={draftYear - effectiveMinYear}
                    onSelectIndex={(i) =>
                      setDraftYear(effectiveMinYear + i)
                    }
                    formatLabel={(i) => `${effectiveMinYear + i}`}
                    textColor={colors.text.primary}
                    syncKey={myWheelSyncKey}
                  />
                </View>
              </View>
            </View>
          </>
        )}

        {step === "day" ? (
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
              accessibilityLabel="Chọn ngày"
            >
              <AppText
                style={[styles.btnSolidText, { color: colors.text.onBrand }]}
              >
                CHỌN
              </AppText>
            </Pressable>
          </View>
        ) : null}
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
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
  },
  closeHit: {
    padding: 4,
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  monthTitleHit: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  weekRow: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 8,
    marginBottom: 8,
  },
  weekCell: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "800",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
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
  myHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  myHeaderTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },
  myHeaderSpacer: { width: 24 },
  myWheelWrap: {
    height: MY_PICKER_H,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
    marginBottom: 16,
  },
  myWheelRow: { flex: 1, flexDirection: "row" },
  wheelColZ: { flex: 1, zIndex: 1 },
  mySelectionBar: {
    position: "absolute",
    left: 8,
    right: 8,
    top: (MY_PICKER_H - ITEM_H) / 2,
    height: ITEM_H,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    zIndex: 0,
  },
});
