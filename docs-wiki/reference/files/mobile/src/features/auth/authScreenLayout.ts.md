---
title: "mobile/src/features/auth/authScreenLayout.ts"
description: "Calculates the starting vertical padding for the authentication grid in AuthScreenLayout."
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
  page: "reference/files/mobile/src/features/auth/authScreenLayout.ts.md"
  relativePath: "mobile/src/features/auth/authScreenLayout.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/authScreenLayout.ts"
  module: "mobile/src/features/auth"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/auth/authScreenLayout.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/features/auth](../../../../../modules/mobile/src/features/auth.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/authScreenLayout.ts`
- Lines: 40
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

Calculates the starting vertical padding for the authentication grid in AuthScreenLayout.

### Responsibilities

- authGridScrollPaddingTop
- authGridScrollPaddingTopPairing

### Usage Notes

- This function should be called from within a React component to determine the initial height of a JSX element.

## Public API

- `function authGridScrollPaddingTop(safeAreaTop: number): number`
- `function authGridScrollPaddingTopPairing(safeAreaTop: number): number`

## Symbols

### function `authGridScrollPaddingTop`

- Signature: `function authGridScrollPaddingTop(safeAreaTop: number): number`
- Lines: 28-30
- Exported: yes

```ts
function authGridScrollPaddingTop(safeAreaTop: number): number {
  return safeAreaTop + AUTH_GRID_SCROLL_PADDING_EXTRA;
}
```

### function `authGridScrollPaddingTopPairing`

- Signature: `function authGridScrollPaddingTopPairing(safeAreaTop: number): number`
- Lines: 37-39
- Exported: yes

```ts
function authGridScrollPaddingTopPairing(safeAreaTop: number): number {
  return safeAreaTop + AUTH_GRID_PAIRING_TOP_EXTRA;
}
```
