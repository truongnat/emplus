---
title: "api/tsconfig.json"
description: "TSConfigFile JSON Structure"
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
  page: "reference/files/api/tsconfig.json.md"
  relativePath: "api/tsconfig.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/tsconfig.json"
  module: "api"
  workspace: "api"
  language: "JSON"
  symbolCount: 1
---

# api/tsconfig.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [api](../../modules/api.md)
- Workspace: [@emplus/api](../../../workspaces/api.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/tsconfig.json`
- Lines: 27
- Symbols: 1

## AI Summary

TSConfigFile JSON Structure

### Responsibilities

- TSConfigFile

### Usage Notes

- Provide a JSON object describing the structure and purpose of a given file

## Public API

- `Plain-text index (27 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (27 lines)`
- Lines: 1-27
- Exported: yes

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "types": [
      "bun"
    ],
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "verbatimModuleSyntax": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ],
      "#/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src/**/*.ts"
  ]
}
```
