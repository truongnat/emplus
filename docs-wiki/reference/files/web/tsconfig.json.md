---
title: "web/tsconfig.json"
description: "TSConfig"
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
  page: "reference/files/web/tsconfig.json.md"
  relativePath: "web/tsconfig.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/web/tsconfig.json"
  module: "web"
  workspace: "web"
  language: "JSON"
  symbolCount: 1
---

# web/tsconfig.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [web](../../modules/web.md)
- Workspace: [@emplus/web](../../../workspaces/web.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/web/tsconfig.json`
- Lines: 12
- Symbols: 1

## AI Summary

TSConfig

### Responsibilities

- File configuration for TypeScript projects

### Usage Notes

- Used to define compiler options and include/exclude files in a project.

## Public API

- `Plain-text index (12 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (12 lines)`
- Lines: 1-12
- Exported: yes

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}

```
