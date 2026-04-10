---
title: "design-builder/src/index.css"
description: "The index.css file defines constants and utilities for a design-builder component."
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
  page: "reference/files/design-builder/src/index.css.md"
  relativePath: "design-builder/src/index.css"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/index.css"
  module: "design-builder/src"
  workspace: "design-builder"
  language: "CSS"
  symbolCount: 1
---

# design-builder/src/index.css

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [design-builder/src](../../../modules/design-builder/src.md)
- Workspace: [@emplus/design-builder](../../../../workspaces/design-builder.md)

## Snapshot

- Language: CSS
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/index.css`
- Lines: 60
- Symbols: 1

## AI Summary

The index.css file defines constants and utilities for a design-builder component.

### Responsibilities

- defines constants and utilities for the design-builder component

### Usage Notes

- This file is likely used in conjunction with Tailwind CSS configuration files.

## Public API

- `Plain-text index (60 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (60 lines)`
- Lines: 1-60
- Exported: yes

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 346.8 77.2% 49.8%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 346.8 77.2% 49.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```
