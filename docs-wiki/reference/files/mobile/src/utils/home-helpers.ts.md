---
title: "mobile/src/utils/home-helpers.ts"
description: "Utility functions for handling and formatting date and time related data."
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
  page: "reference/files/mobile/src/utils/home-helpers.ts.md"
  relativePath: "mobile/src/utils/home-helpers.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/home-helpers.ts"
  module: "mobile/src/utils"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 9
---

# mobile/src/utils/home-helpers.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/utils](../../../../modules/mobile/src/utils.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/home-helpers.ts`
- Lines: 121
- Symbols: 9

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.

## AI Summary

Utility functions for handling and formatting date and time related data.

### Responsibilities

- Development of utility functions for date and time-related tasks.
- Implementation and testing of utility functions.
- Usage Notes: The following table provides an overview of the utilities' usage.
- Symbols:
  - `normalizeCycleLabel` (function): A function that normalizes a cycle label into a human-readable string.
  - `getTimeBasedGreeting` (function): A function that generates a custom greeting based on the current hour and day of the week.
  - `stripToUtcDay` (function): A utility function for stripping a date to UTC Day format.
  - `parseYmdUtc` (function): A function for parsing a string in YYYY-MM-DD format into a Date object.
  - `diffDaysUtc` (function): A function for calculating the difference between two dates in days.
  - `computeLoveDaysFromStart` (function): A function for computing the number of love days from a start date.
  - `formatLoveDate` (function): A function for formatting a date string into a human-readable format.
  - `getEventIcon` (function): A function that generates an event icon based on a category.
- symbols

## Public API

- `function normalizeCycleLabel(raw?: string): string`
- `type GreetingInfo = { greeting: string; subGreeting: string; iconName: React.ComponentProps<typeof Ionicons>["name"]; };`
- `function getTimeBasedGreeting(date: Date = new Date()): GreetingInfo`
- `function computeLoveDaysFromStart( loveStartDate: string | undefined, now: Date = new Date(), ): number | null`
- `function formatLoveDate(dateString?: string): string`
- `function getEventIcon(category?: string): { name: React.ComponentProps<typeof Ionicons>["name"]; color: string; }`

## Symbols

### function `normalizeCycleLabel`

- Signature: `function normalizeCycleLabel(raw?: string): string`
- Lines: 13-18
- Exported: yes

```ts
function normalizeCycleLabel(raw?: string): string {
  if (!raw) return "Giai đoạn năng lượng";
  const upper = raw.trim().toUpperCase();
  const found = CYCLE_LABEL_ENTRIES.find(([key]) => upper.includes(key));
  return found ? found[1] : "Giai đoạn năng lượng";
}
```

### type `GreetingInfo`

- Signature: `type GreetingInfo = { greeting: string; subGreeting: string; iconName: React.ComponentProps<typeof Ionicons>["name"]; };`
- Lines: 20-24
- Exported: yes

```ts
type GreetingInfo = {
  greeting: string;
  subGreeting: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
};
```

### function `getTimeBasedGreeting`

- Signature: `function getTimeBasedGreeting(date: Date = new Date()): GreetingInfo`
- Lines: 26-59
- Exported: yes

```ts
function getTimeBasedGreeting(date: Date = new Date()): GreetingInfo {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) {
    return {
      greeting: "Chào buổi sáng!",
      subGreeting: "Ngày mới nhiều năng lượng",
      iconName: "sunny",
    };
  } else if (hour >= 11 && hour < 14) {
    return {
      greeting: "Chào buổi trưa!",
      subGreeting: "Nghỉ ngơi một chút nhé",
      iconName: "partly-sunny",
    };
  } else if (hour >= 14 && hour < 18) {
    return {
      greeting: "Chào buổi chiều!",
      subGreeting: "Làm việc thật hiệu quả",
      iconName: "partly-sunny",
    };
  } else if (hour >= 18 && hour < 22) {
    return {
      greeting: "Chào buổi tối!",
      subGreeting: "Thời gian thư giãn tuyệt vời",
      iconName: "moon",
    };
  } else {
    return {
      greeting: "Chào buổi đêm!",
      subGreeting: "Ngủ ngon mộng đẹp nhé",
      iconName: "moon",
    };
  }
}
```

### function `computeLoveDaysFromStart`

- Signature: `function computeLoveDaysFromStart( loveStartDate: string | undefined, now: Date = new Date(), ): number | null`
- Lines: 87-96
- Exported: yes

```ts
function computeLoveDaysFromStart(
  loveStartDate: string | undefined,
  now: Date = new Date(),
): number | null {
  if (!loveStartDate) return null;
  const start = parseYmdUtc(loveStartDate);
  if (!start) return null;
  const today = stripToUtcDay(now);
  return diffDaysUtc(start, today) + 1;
}
```

### function `formatLoveDate`

- Signature: `function formatLoveDate(dateString?: string): string`
- Lines: 98-103
- Exported: yes

```ts
function formatLoveDate(dateString?: string): string {
  if (!dateString) return "Đang tải...";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "Đang tải...";
  return `${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
}
```

### function `getEventIcon`

- Signature: `function getEventIcon(category?: string): { name: React.ComponentProps<typeof Ionicons>["name"]; color: string; }`
- Lines: 106-120
- Exported: yes

```ts
function getEventIcon(category?: string): {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
} {
  switch (category) {
    case "LOVE":
      return { name: "heart", color: palette.coral600 };
    case "BIRTHDAY":
      return { name: "gift", color: palette.violet600 };
    case "HOLIDAY":
      return { name: "airplane", color: palette.teal600 };
    default:
      return { name: "calendar", color: palette.indigo500 };
  }
}
```

### function `stripToUtcDay`

- Signature: `function stripToUtcDay(input: Date): Date`
- Lines: 63-67
- Exported: no

```ts
function stripToUtcDay(input: Date): Date {
  return new Date(
    Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()),
  );
}
```

### function `parseYmdUtc`

- Signature: `function parseYmdUtc(ymd: string): Date | null`
- Lines: 69-75
- Exported: no

```ts
function parseYmdUtc(ymd: string): Date | null {
  const part = ymd.slice(0, 10);
  const [y, m, d] = part.split("-").map((x) => Number(x));
  if (!y || !m || !d) return null;
  const parsed = new Date(Date.UTC(y, m - 1, d));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
```

### function `diffDaysUtc`

- Signature: `function diffDaysUtc(start: Date, end: Date): number`
- Lines: 77-81
- Exported: no

```ts
function diffDaysUtc(start: Date, end: Date): number {
  const a = stripToUtcDay(start).getTime();
  const b = stripToUtcDay(end).getTime();
  return Math.floor((b - a) / DAY_MS);
}
```
