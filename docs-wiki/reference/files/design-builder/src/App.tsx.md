---
title: "design-builder/src/App.tsx"
description: "The main application component, handling the user interface layout and toaster notifications."
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
  page: "reference/files/design-builder/src/App.tsx.md"
  relativePath: "design-builder/src/App.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/App.tsx"
  module: "design-builder/src"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 1
---

# design-builder/src/App.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [design-builder/src](../../../modules/design-builder/src.md)
- Workspace: [@emplus/design-builder](../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/App.tsx`
- Lines: 14
- Symbols: 1

## AI Summary

The main application component, handling the user interface layout and toaster notifications.

### Usage Notes

- No explicit usage notes are provided in this snippet

## Symbols

### function `App`

- Signature: `function App()`
- Lines: 4-11
- Exported: no

```tsx
function App() {
  return (
    <>
      <BuilderPage />
      <Toaster richColors position="top-right" />
    </>
  )
}
```
