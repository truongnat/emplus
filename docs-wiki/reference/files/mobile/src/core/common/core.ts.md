---
title: "mobile/src/core/common/core.ts"
description: "The `scrollPadBottomWithTabBar` function takes an optional number of insets at the bottom of a screen."
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
  page: "reference/files/mobile/src/core/common/core.ts.md"
  relativePath: "mobile/src/core/common/core.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/common/core.ts"
  module: "mobile/src/core/common"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/src/core/common/core.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/common](../../../../../modules/mobile/src/core/common.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/common/core.ts`
- Lines: 38
- Symbols: 4

## AI Summary

The `scrollPadBottomWithTabBar` function takes an optional number of insets at the bottom of a screen.

### Usage Notes

- For example, to calculate the distance from the bottom of the screen with default inset settings, call scrollPadBottomWithTabBar(0).

## Public API

- `type Gender = (typeof GENDER)[keyof typeof GENDER];`
- `type EventPriority = (typeof EVENT_PRIORITY)[keyof typeof EVENT_PRIORITY];`
- `type EventCategory = (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];`
- `function scrollPadBottomWithTabBar(insetsBottom: number): number`

## Symbols

### type `Gender`

- Signature: `type Gender = (typeof GENDER)[keyof typeof GENDER];`
- Lines: 8-8
- Exported: yes

```ts
type Gender = (typeof GENDER)[keyof typeof GENDER];
```

### type `EventPriority`

- Signature: `type EventPriority = (typeof EVENT_PRIORITY)[keyof typeof EVENT_PRIORITY];`
- Lines: 15-16
- Exported: yes

```ts
type EventPriority =
  (typeof EVENT_PRIORITY)[keyof typeof EVENT_PRIORITY];
```

### type `EventCategory`

- Signature: `type EventCategory = (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];`
- Lines: 25-26
- Exported: yes

```ts
type EventCategory =
  (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];
```

### function `scrollPadBottomWithTabBar`

- Signature: `function scrollPadBottomWithTabBar(insetsBottom: number): number`
- Lines: 32-37
- Exported: yes

```ts
function scrollPadBottomWithTabBar(insetsBottom: number): number {
  return Math.max(
    SCROLL_BOTTOM_TAB_CLEARANCE,
    insetsBottom + SCROLL_BOTTOM_INSET_EXTRA,
  );
}
```
