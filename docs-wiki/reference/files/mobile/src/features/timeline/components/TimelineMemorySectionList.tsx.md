---
title: "mobile/src/features/timeline/components/TimelineMemorySectionList.tsx"
description: "Components for displaying a list of memory sections in a timeline."
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
  page: "reference/files/mobile/src/features/timeline/components/TimelineMemorySectionList.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineMemorySectionList.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineMemorySectionList.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/timeline/components/TimelineMemorySectionList.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineMemorySectionList.tsx`
- Lines: 112
- Symbols: 2

## Related Features

- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [User Management Read / List](../../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Order Management Read / List](../../../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

Components for displaying a list of memory sections in a timeline.

### Responsibilities

- uses `TimelineSection` props and provides its methods

### Usage Notes

- Must be instantiated with valid `TimelineMemorySectionListProps`

## Public API

- `interface TimelineSection`
- `interface TimelineMemorySectionListProps`

## Symbols

### interface `TimelineSection`

- Signature: `interface TimelineSection`
- Lines: 15-18
- Exported: yes

```tsx
interface TimelineSection {
  title: string;
  data: MemoryItem[];
}
```

### interface `TimelineMemorySectionListProps`

- Signature: `interface TimelineMemorySectionListProps`
- Lines: 20-28
- Exported: yes

```tsx
interface TimelineMemorySectionListProps {
  sections: TimelineSection[];
  scrollPadBottom: number;
  loadingMore: boolean;
  onEndReached: () => void;
  onOpenViewer: (images: string[], index: number) => void;
  onTitlePressById: (id: string) => void;
  onDeleteItem: (item: MemoryItem) => void;
}
```
