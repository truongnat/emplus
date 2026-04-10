---
title: "mobile/src/theme/aura-colors.ts"
description: "A function to retrieve the gradient for an aura avatar."
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
  page: "reference/files/mobile/src/theme/aura-colors.ts.md"
  relativePath: "mobile/src/theme/aura-colors.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/aura-colors.ts"
  module: "mobile/src/theme"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/theme/aura-colors.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/theme](../../../../modules/mobile/src/theme.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/aura-colors.ts`
- Lines: 127
- Symbols: 1

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.

## AI Summary

A function to retrieve the gradient for an aura avatar.

### Responsibilities

- returns a string
- a single identifier or number

### Usage Notes

- See [getAuraAvatarGradient](#getauraavatargrade) for documentation.

## Public API

- `function getAuraAvatarGradient(id: string | number): [string, string]`

## Symbols

### function `getAuraAvatarGradient`

- Signature: `function getAuraAvatarGradient(id: string | number): [string, string]`
- Lines: 123-126
- Exported: yes

```ts
function getAuraAvatarGradient(id: string | number): [string, string] {
  const index = typeof id === 'number' ? id : (id.length % auraAvatarGradients.length);
  return auraAvatarGradients[index % auraAvatarGradients.length];
}
```
