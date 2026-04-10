---
title: "mobile/src/theme/gradients.ts"
description: "returns string"
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
  page: "reference/files/mobile/src/theme/gradients.ts.md"
  relativePath: "mobile/src/theme/gradients.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/gradients.ts"
  module: "mobile/src/theme"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/theme/gradients.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/theme](../../../../modules/mobile/src/theme.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/gradients.ts`
- Lines: 53
- Symbols: 2

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.

## AI Summary

returns string

### Responsibilities

- returns string
- exposes isDark parameter

### Usage Notes

- uses built-in `screenGradientColors` object.
- return value depends on `isDark` boolean flag.

## Public API

- `type AuraGradientName = keyof typeof gradientLocations;`
- `function getScreenGradientColors(isDark: boolean)`

## Symbols

### type `AuraGradientName`

- Signature: `type AuraGradientName = keyof typeof gradientLocations;`
- Lines: 33-33
- Exported: yes

```ts
type AuraGradientName = keyof typeof gradientLocations;
```

### function `getScreenGradientColors`

- Signature: `function getScreenGradientColors(isDark: boolean)`
- Lines: 50-52
- Exported: yes

```ts
function getScreenGradientColors(isDark: boolean) {
  return isDark ? screenGradientColors.dark : screenGradientColors.light;
}
```
