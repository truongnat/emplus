---
title: "mobile/src/features/mood/mood-band.ts"
description: "A function that maps numeric values to MoodBand types"
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
  page: "reference/files/mobile/src/features/mood/mood-band.ts.md"
  relativePath: "mobile/src/features/mood/mood-band.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/mood/mood-band.ts"
  module: "mobile/src/features/mood"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/mood/mood-band.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/features/mood](../../../../../modules/mobile/src/features/mood.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/mood/mood-band.ts`
- Lines: 18
- Symbols: 2

## AI Summary

A function that maps numeric values to MoodBand types

## Public API

- `type MoodBand = "calm" | "steady" | "worried" | "tense";`
- `function moodBandFromValue(value: number): MoodBand`

## Symbols

### type `MoodBand`

- Signature: `type MoodBand = "calm" | "steady" | "worried" | "tense";`
- Lines: 2-2
- Exported: yes

```ts
type MoodBand = "calm" | "steady" | "worried" | "tense";
```

### function `moodBandFromValue`

- Signature: `function moodBandFromValue(value: number): MoodBand`
- Lines: 4-10
- Exported: yes

```ts
function moodBandFromValue(value: number): MoodBand {
  const v = Math.min(100, Math.max(0, value));
  if (v < 25) return "calm";
  if (v < 50) return "steady";
  if (v < 75) return "worried";
  return "tense";
}
```
