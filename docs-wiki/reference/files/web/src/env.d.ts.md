---
title: "web/src/env.d.ts"
description: "Name of the public site URL import meta."
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
  page: "reference/files/web/src/env.d.ts.md"
  relativePath: "web/src/env.d.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/web/src/env.d.ts"
  module: "web/src"
  workspace: "web"
  language: "TypeScript"
  symbolCount: 2
---

# web/src/env.d.ts

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [web/src](../../../modules/web/src.md)
- Workspace: [@emplus/web](../../../../workspaces/web.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/web/src/env.d.ts`
- Lines: 11
- Symbols: 2

## AI Summary

Name of the public site URL import meta.

### Responsibilities

- name

### Usage Notes

- name:
- optional string

## Symbols

### interface `ImportMetaEnv`

- Signature: `interface ImportMetaEnv`
- Lines: 4-6
- Exported: no

```ts
interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
}
```

### interface `ImportMeta`

- Signature: `interface ImportMeta`
- Lines: 8-10
- Exported: no

```ts
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```
