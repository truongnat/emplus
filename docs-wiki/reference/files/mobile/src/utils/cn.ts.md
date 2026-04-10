---
title: "mobile/src/utils/cn.ts"
description: "A function that merges an object with a class."
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
  page: "reference/files/mobile/src/utils/cn.ts.md"
  relativePath: "mobile/src/utils/cn.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/cn.ts"
  module: "mobile/src/utils"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/utils/cn.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/utils](../../../../modules/mobile/src/utils.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/cn.ts`
- Lines: 7
- Symbols: 1

## AI Summary

A function that merges an object with a class.

### Responsibilities

- Returns a merged object.
- Mays take any number of `ClassValue` inputs.

### Usage Notes

- See cn.ts for more information.

## Public API

- `function cn(...inputs: ClassValue[])`

## Symbols

### function `cn`

- Signature: `function cn(...inputs: ClassValue[])`
- Lines: 4-6
- Exported: yes

```ts
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
