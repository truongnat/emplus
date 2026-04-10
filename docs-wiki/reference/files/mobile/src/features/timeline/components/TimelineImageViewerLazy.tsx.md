---
title: "mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx"
description: "Lazy renders a TimelineImageViewer component with fallback content."
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
  page: "reference/files/mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx`
- Lines: 27
- Symbols: 1

## AI Summary

Lazy renders a TimelineImageViewer component with fallback content.

## Public API

- `function TimelineImageViewerLazy(props: TimelineImageViewerProps)`

## Symbols

### function `TimelineImageViewerLazy`

- Signature: `function TimelineImageViewerLazy(props: TimelineImageViewerProps)`
- Lines: 14-20
- Exported: yes

```tsx
function TimelineImageViewerLazy(props: TimelineImageViewerProps) {
  return (
    <Suspense fallback={<View style={styles.fallback} pointerEvents="none" />}>
      <TimelineImageViewer {...props} />
    </Suspense>
  );
}
```
