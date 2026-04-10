---
title: "design-builder/package.json"
description: "The @emplus/design-builder/package.json file holds metadata and dependencies for the design-builder project."
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
  page: "reference/files/design-builder/package.json.md"
  relativePath: "design-builder/package.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/package.json"
  module: "design-builder"
  workspace: "design-builder"
  language: "JSON"
  symbolCount: 1
---

# design-builder/package.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [design-builder](../../modules/design-builder.md)
- Workspace: [@emplus/design-builder](../../../workspaces/design-builder.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/package.json`
- Lines: 40
- Symbols: 1

## AI Summary

The @emplus/design-builder/package.json file holds metadata and dependencies for the design-builder project.

### Responsibilities

- The package.json file provides detailed information about a JavaScript module or library.
- It serves as the central location for project metadata, such as dependencies, scripts, and configurations.

### Usage Notes

- This JSON object is generated from the provided snippet of @emplus/design-builder/package.json.

## Public API

- `Plain-text index (40 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (40 lines)`
- Lines: 1-40
- Exported: yes

```json
{
  "name": "@emplus/design-builder",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "lucide-react": "^0.474.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.5.0",
    "class-variance-authority": "^0.7.1",
    "tailwindcss-animate": "^1.0.7",
    "zustand": "^5.0.3",
    "react-colorful": "^5.6.1",
    "sonner": "^2.0.1"
  },
  "devDependencies": {
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.8.3",
    "vite": "^6.2.2",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.5.3",
    "autoprefixer": "^10.4.21"
  }
}

```
