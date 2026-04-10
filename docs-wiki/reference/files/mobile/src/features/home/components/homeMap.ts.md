---
title: "mobile/src/features/home/components/homeMap.ts"
description: "/api/features/home/components/homeMap function:mapDashboardData"
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
  page: "reference/files/mobile/src/features/home/components/homeMap.ts.md"
  relativePath: "mobile/src/features/home/components/homeMap.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/homeMap.ts"
  module: "mobile/src/features/home/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/home/components/homeMap.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/home/components](../../../../../../modules/mobile/src/features/home/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/homeMap.ts`
- Lines: 58
- Symbols: 1

## AI Summary

/api/features/home/components/homeMap function:mapDashboardData

### Responsibilities

- /Features/Home/Components/HomeMap

## Public API

- `function mapDashboardData(dashboard: DashboardPayload | null)`

## Symbols

### function `mapDashboardData`

- Signature: `function mapDashboardData(dashboard: DashboardPayload | null)`
- Lines: 12-57
- Exported: yes

```ts
function mapDashboardData(dashboard: DashboardPayload | null) {
  const now = new Date();
  const currentMinute = now.getMinutes();

  // Cache greeting per minute to avoid recalculating on every render
  if (cachedMinute !== currentMinute) {
    cachedMinute = currentMinute;
    cachedGreeting = getTimeBasedGreeting();
  }

  if (!dashboard) {
    return {
      greetingInfo: cachedGreeting,
      loveDays: 0,
      startDateLabel: formatLoveDate(undefined),
      cycleLabel: normalizeCycleLabel(undefined),
      upcomingEvents: [],
      nextDateLabel: "Chưa có sự kiện",
      focusTitle: "Kết nối hôm nay",
      focusSubtitle: "Một chạm nhỏ để hai bạn gần hơn.",
    };
  }

  const upcomingEvents = dashboard.upcomingEvents ?? [];
  const nextDateLabel =
    upcomingEvents.length > 0 ? upcomingEvents[0].title : "Chưa có sự kiện";

  const loveStart = dashboard.coupleContext?.loveStartDate;
  const recomputed = computeLoveDaysFromStart(loveStart, now);
  const loveDays =
    recomputed != null
      ? recomputed
      : (dashboard.coupleContext?.loveDays ?? 0);

  return {
    greetingInfo: cachedGreeting,
    loveDays,
    startDateLabel: formatLoveDate(dashboard.coupleContext?.loveStartDate),
    cycleLabel: normalizeCycleLabel(undefined),
    upcomingEvents,
    nextDateLabel,
    focusTitle: dashboard.careAdvice?.greeting || "Kết nối hôm nay",
    focusSubtitle:
      dashboard.careAdvice?.subGreeting || "Một chạm nhỏ để hai bạn gần hơn.",
  };
}
```
