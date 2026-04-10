---
title: "mobile/src/utils/date-format-vn.ts"
description: "Utility functions to work with date strings in the Vietnamese calendar."
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
  page: "reference/files/mobile/src/utils/date-format-vn.ts.md"
  relativePath: "mobile/src/utils/date-format-vn.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/date-format-vn.ts"
  module: "mobile/src/utils"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 6
---

# mobile/src/utils/date-format-vn.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/utils](../../../../modules/mobile/src/utils.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/date-format-vn.ts`
- Lines: 67
- Symbols: 6

## AI Summary

Utility functions to work with date strings in the Vietnamese calendar.

### Responsibilities

- parseIsoDate
- toIsoDateString
- formatDobDisplayVn
- formatTimeHmFromDate
- parseTimeHm

### Usage Notes

- The `parseIsoDate` function parses a date string in the format 'AAAA-MM-DD' and returns a Date object.
- The `toIsoDateString` function formats a Date object as a string in the format 'YYYY-MM-DD'.
- The `formatDobDisplayVn` function formats a Date object in the format 'DD/MM/YYYY' to display a person's date of birth.

## Public API

- `function parseIsoDate(iso: string | undefined | null): Date | null` — Parses an ISO date string and returns a Date object if valid, otherwise returns null
- `function toIsoDateString(d: Date): string` — Formats a Date object as an ISO date string with leading zeros for minor month numbers.
- `function formatDobDisplayVn(iso: string | undefined | null): string` — Formats a Date object to display a person's date of birth in the Vietnamese calendar, taking into account the number of solar days since March 21st of the previous year.
- `function formatTimeHmFromDate(d: Date): string` — Formats a Date object as an hour and minute string with leading zeros for hours and minutes since midnight.
- `function parseTimeHm(s: string | undefined | null): { h: number; m: number; } | null` — Parses a time string in the format 'HH:MM' and returns a number of hours and minutes if valid, otherwise returns null
- `function formatTimeHmNormalized(s: string | undefined | null): string` — Normalizes a parsed Time object as an hour and minute string with leading zeros for hours and minutes since 0000.

## Symbols

### function `parseIsoDate`

- Signature: `function parseIsoDate(iso: string | undefined | null): Date | null`
- Lines: 6-22
- Exported: yes
- Summary: Parses an ISO date string and returns a Date object if valid, otherwise returns null

```ts
function parseIsoDate(iso: string | undefined | null): Date | null {
  if (!iso?.trim()) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const dt = new Date(y, mo, d);
  if (
    dt.getFullYear() !== y ||
    dt.getMonth() !== mo ||
    dt.getDate() !== d
  ) {
    return null;
  }
  return dt;
}
```

### function `toIsoDateString`

- Signature: `function toIsoDateString(d: Date): string`
- Lines: 25-30
- Exported: yes
- Summary: Formats a Date object as an ISO date string with leading zeros for minor month numbers.

```ts
function toIsoDateString(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}
```

### function `formatDobDisplayVn`

- Signature: `function formatDobDisplayVn(iso: string | undefined | null): string`
- Lines: 35-39
- Exported: yes
- Summary: Formats a Date object to display a person's date of birth in the Vietnamese calendar, taking into account the number of solar days since March 21st of the previous year.

```ts
function formatDobDisplayVn(iso: string | undefined | null): string {
  const d = parseIsoDate(iso);
  if (!d) return "";
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}
```

### function `formatTimeHmFromDate`

- Signature: `function formatTimeHmFromDate(d: Date): string`
- Lines: 42-46
- Exported: yes
- Summary: Formats a Date object as an hour and minute string with leading zeros for hours and minutes since midnight.

```ts
function formatTimeHmFromDate(d: Date): string {
  const h = `${d.getHours()}`.padStart(2, "0");
  const m = `${d.getMinutes()}`.padStart(2, "0");
  return `${h}:${m}`;
}
```

### function `parseTimeHm`

- Signature: `function parseTimeHm(s: string | undefined | null): { h: number; m: number; } | null`
- Lines: 49-60
- Exported: yes
- Summary: Parses a time string in the format 'HH:MM' and returns a number of hours and minutes if valid, otherwise returns null

```ts
function parseTimeHm(s: string | undefined | null): {
  h: number;
  m: number;
} | null {
  if (!s?.trim()) return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return { h, m: min };
}
```

### function `formatTimeHmNormalized`

- Signature: `function formatTimeHmNormalized(s: string | undefined | null): string`
- Lines: 62-66
- Exported: yes
- Summary: Normalizes a parsed Time object as an hour and minute string with leading zeros for hours and minutes since 0000.

```ts
function formatTimeHmNormalized(s: string | undefined | null): string {
  const p = parseTimeHm(s);
  if (!p) return "";
  return `${`${p.h}`.padStart(2, "0")}:${`${p.m}`.padStart(2, "0")}`;
}
```
