---
title: "design-builder/src/store/builder-store.ts"
description: "BuilderStore interface"
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
  page: "reference/files/design-builder/src/store/builder-store.ts.md"
  relativePath: "design-builder/src/store/builder-store.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/store/builder-store.ts"
  module: "design-builder/src/store"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 1
---

# design-builder/src/store/builder-store.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [design-builder/src/store](../../../../modules/design-builder/src/store.md)
- Workspace: [@emplus/design-builder](../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/store/builder-store.ts`
- Lines: 260
- Symbols: 1

## Related Features

- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

BuilderStore interface

### Responsibilities

- Provides access to project configuration and token data

### Usage Notes

- Can be used with a React or Vue application by importing it in the App component

## Symbols

### interface `BuilderStore`

- Signature: `interface BuilderStore`
- Lines: 4-18
- Exported: no

```ts
interface BuilderStore {
  config: DesignSystemConfig;
  activeCategory: TokenCategory;
  selectedToken: string | null;
  isDirty: boolean;
  previewTheme: 'light' | 'dark';
  setConfig: (config: DesignSystemConfig) => void;
  setActiveCategory: (category: TokenCategory) => void;
  setSelectedToken: (tokenPath: string | null) => void;
  updateToken: (path: string, value: any, description?: string) => void;
  deleteToken: (path: string) => void;
  resetToDefaults: () => void;
  setPreviewTheme: (theme: 'light' | 'dark') => void;
  markClean: () => void;
}
```
