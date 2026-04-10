---
title: "design-builder/src/lib/utils.ts"
description: "Builds a design-builder by merging input models using twMerge."
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
  page: "reference/files/design-builder/src/lib/utils.ts.md"
  relativePath: "design-builder/src/lib/utils.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/lib/utils.ts"
  module: "design-builder/src/lib"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 1
---

# design-builder/src/lib/utils.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [design-builder/src/lib](../../../../modules/design-builder/src/lib.md)
- Workspace: [@emplus/design-builder](../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/lib/utils.ts`
- Lines: 7
- Symbols: 1

## Related Features

- [Design](../../../../../features/design.md) - Design captures the main design behavior discovered in the codebase. Key flows include Design operations flow, Design operations flow.

## AI Summary

Builds a design-builder by merging input models using twMerge.

### Responsibilities

- Builds designbuilders

### Usage Notes

- Used to combine multiple objects.
- -input objects are required -returns compiled and merged model
- twMerge is imported from src/lib/twMerge.ts

## Public API

- `function cn(...inputs: ClassValue[])`

## Symbols

### function `cn`

- Signature: `function cn(...inputs: ClassValue[])`
- Lines: 4-6
- Exported: yes

```ts
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
