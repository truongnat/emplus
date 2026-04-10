---
title: "mobile/src/utils/lunar-label.ts"
description: "Lunar day and month labels for a given date"
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
  page: "reference/files/mobile/src/utils/lunar-label.ts.md"
  relativePath: "mobile/src/utils/lunar-label.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/lunar-label.ts"
  module: "mobile/src/utils"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/utils/lunar-label.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/utils](../../../../modules/mobile/src/utils.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/lunar-label.ts`
- Lines: 47
- Symbols: 2

## AI Summary

Lunar day and month labels for a given date

### Responsibilities

- Returns a string representation of the lunar day and month

### Usage Notes

- The function takes three arguments: year, month, and day. It returns a string in the format "D/M"
- e.g., '15/4' for the 15th day of April
- If the day is not a full moon (1-14), it returns 'new'

## Public API

- `function lunarDayMonthLabel(y: number, month: number, day: number): string`
- `function lunarDayKind( y: number, month: number, day: number, ): "new" | "full" | null`

## Symbols

### function `lunarDayMonthLabel`

- Signature: `function lunarDayMonthLabel(y: number, month: number, day: number): string`
- Lines: 21-30
- Exported: yes

```ts
function lunarDayMonthLabel(y: number, month: number, day: number): string {
  try {
    const lunar = Solar.fromYmd(y, month, day).getLunar();
    const d = lunar.getDay();
    const mo = Math.abs(lunar.getMonth());
    return `${d}/${mo}`;
  } catch {
    return "";
  }
}
```

### function `lunarDayKind`

- Signature: `function lunarDayKind( y: number, month: number, day: number, ): "new" | "full" | null`
- Lines: 33-46
- Exported: yes

```ts
function lunarDayKind(
  y: number,
  month: number,
  day: number,
): "new" | "full" | null {
  try {
    const d = Solar.fromYmd(y, month, day).getLunar().getDay();
    if (d === 1) return "new";
    if (d === 15) return "full";
    return null;
  } catch {
    return null;
  }
}
```
