---
title: "mobile/src/components/molecules/pickers/calendar-day-cell.tsx"
description: "void"
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
  page: "reference/files/mobile/src/components/molecules/pickers/calendar-day-cell.tsx.md"
  relativePath: "mobile/src/components/molecules/pickers/calendar-day-cell.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/calendar-day-cell.tsx"
  module: "mobile/src/components/molecules/pickers"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/components/molecules/pickers/calendar-day-cell.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/components/molecules/pickers](../../../../../../modules/mobile/src/components/molecules/pickers.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/calendar-day-cell.tsx`
- Lines: 125
- Symbols: 3

## AI Summary

void

### Responsibilities

- void

### Usage Notes

- A mobile component that represents a single day in the calendar.

## Public API

- `type LunarKind = "new" | "full" | null;`
- `interface CalendarDayCellProps`
- `CalendarDayCell`

```tsx
function CalendarDayCell({ colPct, minHeight, day, lunarLine, lunarKind, inMonth, isWeekend, isSelected, onPress, weekendColor, textPrimary, textOnBrand, textTertiary, successText, brandColor, accessibilityLabel, style, }: CalendarDayCellProps)
```


## Symbols

### type `LunarKind`

- Signature: `type LunarKind = "new" | "full" | null;`
- Lines: 10-10
- Exported: yes

```tsx
type LunarKind = "new" | "full" | null;
```

### interface `CalendarDayCellProps`

- Signature: `interface CalendarDayCellProps`
- Lines: 12-30
- Exported: yes

```tsx
interface CalendarDayCellProps {
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
```

### function `CalendarDayCell`

- Signature:

```tsx
function CalendarDayCell({ colPct, minHeight, day, lunarLine, lunarKind, inMonth, isWeekend, isSelected, onPress, weekendColor, textPrimary, textOnBrand, textTertiary, successText, brandColor, accessibilityLabel, style, }: CalendarDayCellProps)
```
- Lines: 33-104
- Exported: yes

```tsx
function CalendarDayCell({
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
```
