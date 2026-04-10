---
title: "mobile/src/components/molecules/pickers/calendar-utils.ts"
description: "Date utilities for mobile application"
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
  page: "reference/files/mobile/src/components/molecules/pickers/calendar-utils.ts.md"
  relativePath: "mobile/src/components/molecules/pickers/calendar-utils.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/calendar-utils.ts"
  module: "mobile/src/components/molecules/pickers"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 5
---

# mobile/src/components/molecules/pickers/calendar-utils.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/components/molecules/pickers](../../../../../../modules/mobile/src/components/molecules/pickers.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/calendar-utils.ts`
- Lines: 37
- Symbols: 5

## Related Features

- [Search Create](../../../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.

## AI Summary

Date utilities for mobile application

### Responsibilities

- Utilizes methods to manipulate date and calendar-related data

### Usage Notes

- These functions provide utility methods for working with dates on a mobile app.

## Public API

- `function addDays(d: Date, n: number): Date` — Adds a specified number of days to a given Date object
- `function sameDay(a: Date, b: Date): boolean` — Checks if two Dates are the same day in the current year and month
- `function startOfGrid(year: number, monthIndex: number): Date` — Returns the start of the Gregorian calendar grid for a given year and month Index
- `function daysInMonth(year: number, monthIndex: number): number` — Calculates the number of days in a specified month
- `function clampDayInMonth( year: number, monthIndex: number, day: number, ): number` — Clamps a given day to the last day of the current month's range

## Symbols

### function `addDays`

- Signature: `function addDays(d: Date, n: number): Date`
- Lines: 3-7
- Exported: yes
- Summary: Adds a specified number of days to a given Date object

```ts
function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
```

### function `sameDay`

- Signature: `function sameDay(a: Date, b: Date): boolean`
- Lines: 9-15
- Exported: yes
- Summary: Checks if two Dates are the same day in the current year and month

```ts
function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
```

### function `startOfGrid`

- Signature: `function startOfGrid(year: number, monthIndex: number): Date`
- Lines: 17-22
- Exported: yes
- Summary: Returns the start of the Gregorian calendar grid for a given year and month Index

```ts
function startOfGrid(year: number, monthIndex: number): Date {
  const first = new Date(year, monthIndex, 1);
  const wd = first.getDay();
  const fromMonday = wd === 0 ? 6 : wd - 1;
  return new Date(year, monthIndex, 1 - fromMonday);
}
```

### function `daysInMonth`

- Signature: `function daysInMonth(year: number, monthIndex: number): number`
- Lines: 24-26
- Exported: yes
- Summary: Calculates the number of days in a specified month

```ts
function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}
```

### function `clampDayInMonth`

- Signature: `function clampDayInMonth( year: number, monthIndex: number, day: number, ): number`
- Lines: 29-36
- Exported: yes
- Summary: Clamps a given day to the last day of the current month's range

```ts
function clampDayInMonth(
  year: number,
  monthIndex: number,
  day: number,
): number {
  const max = daysInMonth(year, monthIndex);
  return Math.min(day, max);
}
```
