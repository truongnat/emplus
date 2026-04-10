---
title: "api/src/engines/anniversary.ts"
description: "Compute and return upcoming anniversary events for couples"
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
  page: "reference/files/api/src/engines/anniversary.ts.md"
  relativePath: "api/src/engines/anniversary.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/engines/anniversary.ts"
  module: "api/src/engines"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 4
---

# api/src/engines/anniversary.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/engines](../../../../modules/api/src/engines.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/engines/anniversary.ts`
- Lines: 87
- Symbols: 4

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

Compute and return upcoming anniversary events for couples

### Usage Notes

- This function computes and returns upcoming anniversary events for couples.

## Public API

- `function computeUpcomingEvents(couple: Couple, today: Date, windowDays = 30): UpcomingEvent[]`

## Symbols

### function `computeUpcomingEvents`

- Signature: `function computeUpcomingEvents(couple: Couple, today: Date, windowDays = 30): UpcomingEvent[]`
- Lines: 23-86
- Exported: yes

```ts
function computeUpcomingEvents(couple: Couple, today: Date, windowDays = 30): UpcomingEvent[] {
  if (!couple.loveStartDate) {
    return [];
  }

  const loveStartDate = parseDate(couple.loveStartDate);
  const currentLoveDays = diffDays(loveStartDate, today) + 1;
  const events: UpcomingEvent[] = [];

  for (const milestone of getDayMilestoneCandidates(currentLoveDays, windowDays)) {
    if (milestone <= currentLoveDays) {
      continue;
    }

    const eventDate = addDays(loveStartDate, milestone - 1);
    const daysLeft = daysUntil(eventDate, today);

    if (!withinWindow(daysLeft, windowDays)) {
      continue;
    }

    events.push({
      id: `system-day-${couple.id}-${milestone}`,
      title: `Kỷ niệm ${milestone} ngày yêu`,
      date: formatDate(eventDate),
      daysLeft,
      category: "LOVE",
      isSystem: true,
      priority: dayMilestonePriority(milestone),
    });
  }

  const thisYear = today.getUTCFullYear();
  const yearsSince = thisYear - loveStartDate.getUTCFullYear();

  for (const [yearOffset, numberTitle] of [
    [0, yearsSince],
    [1, yearsSince + 1],
  ] as const) {
    const anniversaryDate = setYearSafe(loveStartDate, thisYear + yearOffset);
    const daysLeft = daysUntil(anniversaryDate, today);

    if (!withinWindow(daysLeft, windowDays)) {
      continue;
    }

    if (numberTitle <= 0) {
      continue;
    }

    events.push({
      id: `system-year-${couple.id}-${numberTitle}`,
      title: `Kỷ niệm ${numberTitle} năm yêu`,
      date: formatDate(anniversaryDate),
      daysLeft,
      category: "LOVE",
      isSystem: true,
      priority: "HIGH",
    });
  }

  events.sort((a, b) => a.daysLeft - b.daysLeft);
  return events;
}
```

### function `withinWindow`

- Signature: `function withinWindow(daysLeft: number, windowDays: number): boolean`
- Lines: 4-6
- Exported: no

```ts
function withinWindow(daysLeft: number, windowDays: number): boolean {
  return daysLeft >= 0 && daysLeft <= windowDays;
}
```

### function `dayMilestonePriority`

- Signature: `function dayMilestonePriority(daysMilestone: number): "MEDIUM" | "HIGH"`
- Lines: 8-10
- Exported: no

```ts
function dayMilestonePriority(daysMilestone: number): "MEDIUM" | "HIGH" {
  return daysMilestone >= 500 ? "HIGH" : "MEDIUM";
}
```

### function `getDayMilestoneCandidates`

- Signature: `function getDayMilestoneCandidates(currentLoveDays: number, windowDays: number): number[]`
- Lines: 12-21
- Exported: no

```ts
function getDayMilestoneCandidates(currentLoveDays: number, windowDays: number): number[] {
  const candidates = new Set<number>([30, 60, 100, 200, 300]);

  const maxDaysToInspect = currentLoveDays + windowDays + 500;
  for (let milestone = 500; milestone <= maxDaysToInspect; milestone += 500) {
    candidates.add(milestone);
  }

  return Array.from(candidates.values()).sort((a, b) => a - b);
}
```
