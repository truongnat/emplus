---
title: "design-builder/components.json"
description: "JSON schema definition for components file"
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
  page: "reference/files/design-builder/components.json.md"
  relativePath: "design-builder/components.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/components.json"
  module: "design-builder"
  workspace: "design-builder"
  language: "JSON"
  symbolCount: 1
---

# design-builder/components.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [design-builder](../../modules/design-builder.md)
- Workspace: [@emplus/design-builder](../../../workspaces/design-builder.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/components.json`
- Lines: 21
- Symbols: 1

## AI Summary

JSON schema definition for components file

### Responsibilities

- description of purpose, responsibilities, and boundaries in this file

### Usage Notes

- strings describing the usage or examples for this symbol

## Public API

- `Plain-text index (21 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (21 lines)`
- Lines: 1-21
- Exported: yes

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}

```
