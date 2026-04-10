---
title: "web/src/styles/global.css"
description: "styles/global.css"
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
  page: "reference/files/web/src/styles/global.css.md"
  relativePath: "web/src/styles/global.css"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/web/src/styles/global.css"
  module: "web/src/styles"
  workspace: "web"
  language: "CSS"
  symbolCount: 1
---

# web/src/styles/global.css

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [web/src/styles](../../../../modules/web/src/styles.md)
- Workspace: [@emplus/web](../../../../../workspaces/web.md)

## Snapshot

- Language: CSS
- Source path: `/Users/truongdq/tx/GitHub/emplus/web/src/styles/global.css`
- Lines: 59
- Symbols: 1

## AI Summary

styles/global.css

## Public API

- `Plain-text index (59 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (59 lines)`
- Lines: 1-59
- Exported: yes

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 6% 10%;
    --card: 0 0% 100%;
    --card-foreground: 240 6% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 6% 10%;
    --primary: 353 100% 71%;
    --primary-foreground: 0 0% 100%;
    --secondary: 255 100% 69%;
    --secondary-foreground: 0 0% 100%;
    --muted: 240 5% 96%;
    --muted-foreground: 240 4% 46%;
    --accent: 174 43% 55%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 240 6% 90%;
    --input: 240 6% 90%;
    --ring: 353 100% 71%;
    --radius: 0.625rem;
  }

  .dark {
    --background: 340 12% 9%;
    --foreground: 240 5% 96%;
    --card: 340 15% 13%;
    --card-foreground: 240 5% 96%;
    --popover: 340 15% 13%;
    --popover-foreground: 240 5% 96%;
    --primary: 353 100% 71%;
    --primary-foreground: 0 0% 100%;
    --secondary: 255 100% 69%;
    --secondary-foreground: 0 0% 100%;
    --muted: 340 15% 13%;
    --muted-foreground: 240 4% 64%;
    --accent: 174 43% 55%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 62% 50%;
    --destructive-foreground: 0 0% 100%;
    --border: 340 13% 19%;
    --input: 340 13% 19%;
    --ring: 353 100% 71%;
  }

  html {
    @apply scroll-smooth;
  }

  body {
    @apply min-h-screen bg-background font-sans text-foreground antialiased;
  }
}

```
