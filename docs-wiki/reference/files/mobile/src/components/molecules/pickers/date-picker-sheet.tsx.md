---
title: "mobile/src/components/molecules/pickers/date-picker-sheet.tsx"
description: "DatePickerSheet function component responsible for managing a date picker sheet with picker steps, selected date model, and header icon."
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
  page: "reference/files/mobile/src/components/molecules/pickers/date-picker-sheet.tsx.md"
  relativePath: "mobile/src/components/molecules/pickers/date-picker-sheet.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/date-picker-sheet.tsx"
  module: "mobile/src/components/molecules/pickers"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/src/components/molecules/pickers/date-picker-sheet.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/components/molecules/pickers](../../../../../../modules/mobile/src/components/molecules/pickers.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/date-picker-sheet.tsx`
- Lines: 587
- Symbols: 4

## AI Summary

DatePickerSheet function component responsible for managing a date picker sheet with picker steps, selected date model, and header icon.

### Responsibilities

- datePicker_sheet
- picker_step
- date_range_producer
- screen_component

## Public API

- `interface DatePickerSheetProps`
- `DatePickerSheet`

```tsx
function DatePickerSheet({ visible, onClose, initialIso, onConfirm, title, headerIconName = "calendar-outline", sheetStyle, minYear: minYearProp, maxYear: maxYearProp, showLunar = true, }: DatePickerSheetProps)
```


## Symbols

### interface `DatePickerSheetProps`

- Signature: `interface DatePickerSheetProps`
- Lines: 48-62
- Exported: yes

```tsx
interface DatePickerSheetProps {
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
```

### function `DatePickerSheet`

- Signature:

```tsx
function DatePickerSheet({ visible, onClose, initialIso, onConfirm, title, headerIconName = "calendar-outline", sheetStyle, minYear: minYearProp, maxYear: maxYearProp, showLunar = true, }: DatePickerSheetProps)
```
- Lines: 80-457
- Exported: yes

```tsx
function DatePickerSheet({
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
```

### type `PickerStep`

- Signature: `type PickerStep = "day" | "monthYear";`
- Lines: 46-46
- Exported: no

```tsx
type PickerStep = "day" | "monthYear";
```

### interface `CellModel`

- Signature: `interface CellModel`
- Lines: 64-74
- Exported: no

```tsx
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
```
