---
title: "design-builder/tsconfig.json"
description: "tsconfig.json file configuration"
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
  page: "reference/files/design-builder/tsconfig.json.md"
  relativePath: "design-builder/tsconfig.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/tsconfig.json"
  module: "design-builder"
  workspace: "design-builder"
  language: "JSON"
  symbolCount: 1
---

# design-builder/tsconfig.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [design-builder](../../modules/design-builder.md)
- Workspace: [@emplus/design-builder](../../../workspaces/design-builder.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/tsconfig.json`
- Lines: 26
- Symbols: 1

## AI Summary

tsconfig.json file configuration

### Responsibilities

- file name

### Usage Notes

- configuration object for TypeScript project

## Public API

- `Plain-text index (26 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (26 lines)`
- Lines: 1-26
- Exported: yes

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```
