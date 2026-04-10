---
title: "api/src/shared/date.ts"
description: "Date utilities for formatting and calculating dates in UTF-8"
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
  page: "reference/files/api/src/shared/date.ts.md"
  relativePath: "api/src/shared/date.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/shared/date.ts"
  module: "api/src/shared"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 8
---

# api/src/shared/date.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/shared](../../../../modules/api/src/shared.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/shared/date.ts`
- Lines: 58
- Symbols: 8

## Related Features

- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

Date utilities for formatting and calculating dates in UTF-8

### Usage Notes

- See api/src/shared/date.ts for documentation

## Public API

- `function todayUtc(): Date`
- `function stripToUtcDay(input: Date): Date` — Converts a date to UTC day representation
- `function parseDate(date: string): Date`
- `function formatDate(date: Date): string`
- `function addDays(date: Date, days: number): Date` — Adds days to a given date
- `function diffDays(start: Date, end: Date): number`
- `function daysUntil(target: Date, from: Date): number`
- `function setYearSafe(date: Date, year: number): Date`

## Symbols

### function `todayUtc`

- Signature: `function todayUtc(): Date`
- Lines: 7-9
- Exported: yes

```ts
function todayUtc(): Date {
  return stripToUtcDay(new Date());
}
```

### function `stripToUtcDay`

- Signature: `function stripToUtcDay(input: Date): Date`
- Lines: 11-13
- Exported: yes
- Summary: Converts a date to UTC day representation

```ts
function stripToUtcDay(input: Date): Date {
  return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
}
```

### function `parseDate`

- Signature: `function parseDate(date: string): Date`
- Lines: 15-27
- Exported: yes

```ts
function parseDate(date: string): Date {
  const [year, month, day] = date.split("-").map((part) => Number(part));
  if (!year || !month || !day) {
    throw new Error(`Invalid date format: ${date}`);
  }

  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date value: ${date}`);
  }

  return parsed;
}
```

### function `formatDate`

- Signature: `function formatDate(date: Date): string`
- Lines: 29-31
- Exported: yes

```ts
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
```

### function `addDays`

- Signature: `function addDays(date: Date, days: number): Date`
- Lines: 33-35
- Exported: yes
- Summary: Adds days to a given date

```ts
function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}
```

### function `diffDays`

- Signature: `function diffDays(start: Date, end: Date): number`
- Lines: 37-41
- Exported: yes

```ts
function diffDays(start: Date, end: Date): number {
  const startDay = stripToUtcDay(start).getTime();
  const endDay = stripToUtcDay(end).getTime();
  return Math.floor((endDay - startDay) / DAY_MS);
}
```

### function `daysUntil`

- Signature: `function daysUntil(target: Date, from: Date): number`
- Lines: 43-45
- Exported: yes

```ts
function daysUntil(target: Date, from: Date): number {
  return diffDays(from, target);
}
```

### function `setYearSafe`

- Signature: `function setYearSafe(date: Date, year: number): Date`
- Lines: 47-57
- Exported: yes

```ts
function setYearSafe(date: Date, year: number): Date {
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const candidate = new Date(Date.UTC(year, month, day));

  if (candidate.getUTCMonth() === month) {
    return candidate;
  }

  return new Date(Date.UTC(year, month + 1, 0));
}
```
