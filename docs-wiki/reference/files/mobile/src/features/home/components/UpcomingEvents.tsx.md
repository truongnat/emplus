---
title: "mobile/src/features/home/components/UpcomingEvents.tsx"
description: "The UpcomingEvents component displays a list of upcoming events."
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
  page: "reference/files/mobile/src/features/home/components/UpcomingEvents.tsx.md"
  relativePath: "mobile/src/features/home/components/UpcomingEvents.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/UpcomingEvents.tsx"
  module: "mobile/src/features/home/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/features/home/components/UpcomingEvents.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/home/components](../../../../../../modules/mobile/src/features/home/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/UpcomingEvents.tsx`
- Lines: 311
- Symbols: 3

## Related Features

- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.

## AI Summary

The UpcomingEvents component displays a list of upcoming events.

## Public API

- `interface UpcomingEventItem` — An upcoming event in the format { id: string, category?: string, title: string, daysLeft: number }
- `interface UpcomingEventsProps`

## Symbols

### interface `UpcomingEventItem`

- Signature: `interface UpcomingEventItem`
- Lines: 15-20
- Exported: yes
- Summary: An upcoming event in the format { id: string, category?: string, title: string, daysLeft: number }

```tsx
interface UpcomingEventItem {
  id: string;
  category?: string;
  title: string;
  daysLeft: number;
}
```

### interface `UpcomingEventsProps`

- Signature: `interface UpcomingEventsProps`
- Lines: 22-24
- Exported: yes

```tsx
interface UpcomingEventsProps {
  upcomingEvents: UpcomingEventItem[];
}
```

### function `formatCountdown`

- Signature: `function formatCountdown(days: number): string`
- Lines: 26-30
- Exported: no

```tsx
function formatCountdown(days: number): string {
  if (days <= 0) return "Hôm nay hoặc đã qua";
  if (days === 1) return "Còn 1 ngày nữa";
  return `Còn ${days} ngày nữa`;
}
```
