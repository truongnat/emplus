---
title: "mobile/src/features/timeline/components/timelineMap.ts"
description: "Grouping Memory Items by Date"
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
  page: "reference/files/mobile/src/features/timeline/components/timelineMap.ts.md"
  relativePath: "mobile/src/features/timeline/components/timelineMap.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/timelineMap.ts"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/timeline/components/timelineMap.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/timelineMap.ts`
- Lines: 20
- Symbols: 2

## AI Summary

Grouping Memory Items by Date

## Public API

- `type OrderDirection = "desc" | "asc";`
- `function groupMemories(items: MemoryItem[], order: OrderDirection)`

## Symbols

### type `OrderDirection`

- Signature: `type OrderDirection = "desc" | "asc";`
- Lines: 3-3
- Exported: yes

```ts
type OrderDirection = "desc" | "asc";
```

### function `groupMemories`

- Signature: `function groupMemories(items: MemoryItem[], order: OrderDirection)`
- Lines: 5-19
- Exported: yes

```ts
function groupMemories(items: MemoryItem[], order: OrderDirection) {
  const groups: Record<string, MemoryItem[]> = {};

  items.forEach((item) => {
    const dateKey = item.memoryDate;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(item);
  });

  return Object.entries(groups).sort((a, b) =>
    order === "desc" ? b[0].localeCompare(a[0]) : a[0].localeCompare(b[0]),
  );
}
```
