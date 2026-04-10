---
title: "mobile/src/features/timeline/components/TimelineMemoryRow.tsx"
description: "TimelineMemoryRow component props"
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
  page: "reference/files/mobile/src/features/timeline/components/TimelineMemoryRow.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineMemoryRow.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineMemoryRow.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/timeline/components/TimelineMemoryRow.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineMemoryRow.tsx`
- Lines: 31
- Symbols: 1

## AI Summary

TimelineMemoryRow component props

## Public API

- `interface TimelineMemoryRowProps`

## Symbols

### interface `TimelineMemoryRowProps`

- Signature: `interface TimelineMemoryRowProps`
- Lines: 5-10
- Exported: yes

```tsx
interface TimelineMemoryRowProps {
  item: MemoryItem;
  onOpenViewer: (images: string[], index: number) => void;
  onTitlePressById: (id: string) => void;
  onDeleteItem: (item: MemoryItem) => void;
}
```
