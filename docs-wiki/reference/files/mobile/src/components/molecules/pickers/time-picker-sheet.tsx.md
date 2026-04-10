---
title: "mobile/src/components/molecules/pickers/time-picker-sheet.tsx"
description: "TimePickerSheet component code."
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
  page: "reference/files/mobile/src/components/molecules/pickers/time-picker-sheet.tsx.md"
  relativePath: "mobile/src/components/molecules/pickers/time-picker-sheet.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/time-picker-sheet.tsx"
  module: "mobile/src/components/molecules/pickers"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 5
---

# mobile/src/components/molecules/pickers/time-picker-sheet.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/components/molecules/pickers](../../../../../../modules/mobile/src/components/molecules/pickers.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/time-picker-sheet.tsx`
- Lines: 342
- Symbols: 5

## AI Summary

TimePickerSheet component code.

### Responsibilities

- to12hParts function
- from12hParts function
- hour24ToAmPm function

### Usage Notes

- To interact with the TimePickerSheet component, use its API functions (to12hParts, from12hParts, hour24ToAmPm).

## Public API

- `function to12hParts(h24: number): { h12: number; isPm: boolean }`
- `function from12hParts(h12: number, isPm: boolean): number`
- `function hour24ToAmPm(h24: number): "AM" | "PM"`
- `interface TimePickerSheetProps`
- `function TimePickerSheet({ visible, onClose, initialHm, onConfirm, title, headerIconName = "time-outline", sheetStyle, syncKey, showPeriodInTitle = true, }: TimePickerSheetProps)`

## Symbols

### function `to12hParts`

- Signature: `function to12hParts(h24: number): { h12: number; isPm: boolean }`
- Lines: 25-30
- Exported: yes

```tsx
function to12hParts(h24: number): { h12: number; isPm: boolean } {
  if (h24 === 0) return { h12: 12, isPm: false };
  if (h24 < 12) return { h12: h24, isPm: false };
  if (h24 === 12) return { h12: 12, isPm: true };
  return { h12: h24 - 12, isPm: true };
}
```

### function `from12hParts`

- Signature: `function from12hParts(h12: number, isPm: boolean): number`
- Lines: 32-39
- Exported: yes

```tsx
function from12hParts(h12: number, isPm: boolean): number {
  if (isPm) {
    if (h12 === 12) return 12;
    return h12 + 12;
  }
  if (h12 === 12) return 0;
  return h12;
}
```

### function `hour24ToAmPm`

- Signature: `function hour24ToAmPm(h24: number): "AM" | "PM"`
- Lines: 42-44
- Exported: yes

```tsx
function hour24ToAmPm(h24: number): "AM" | "PM" {
  return h24 >= 12 ? "PM" : "AM";
}
```

### interface `TimePickerSheetProps`

- Signature: `interface TimePickerSheetProps`
- Lines: 46-61
- Exported: yes

```tsx
interface TimePickerSheetProps {
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
```

### function `TimePickerSheet`

- Signature: `function TimePickerSheet({ visible, onClose, initialHm, onConfirm, title, headerIconName = "time-outline", sheetStyle, syncKey, showPeriodInTitle = true, }: TimePickerSheetProps)`
- Lines: 66-248
- Exported: yes

```tsx
function TimePickerSheet({
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
```
