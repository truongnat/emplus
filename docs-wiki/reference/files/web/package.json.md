---
title: "web/package.json"
description: "Web package file (web/package.json)"
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
  page: "reference/files/web/package.json.md"
  relativePath: "web/package.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/web/package.json"
  module: "web"
  workspace: "web"
  language: "JSON"
  symbolCount: 1
---

# web/package.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [web](../../modules/web.md)
- Workspace: [@emplus/web](../../../workspaces/web.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/web/package.json`
- Lines: 27
- Symbols: 1

## AI Summary

Web package file (web/package.json)

### Responsibilities

- required string

### Usage Notes

- a JSON object describing the web package module's properties, including its dependencies and dev dependencies.

## Public API

- `Plain-text index (27 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (27 lines)`
- Lines: 1-27
- Exported: yes

```json
{
  "name": "@emplus/web",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "@astrojs/rss": "4.0.18",
    "@astrojs/sitemap": "3.7.2",
    "@astrojs/tailwind": "6.0.2",
    "astro": "6.1.3",
    "clsx": "2.1.1",
    "tailwind-merge": "3.5.0",
    "tailwindcss": "^3.4.17"
  },
  "devDependencies": {
    "@astrojs/check": "0.9.8",
    "@tailwindcss/typography": "^0.5.19",
    "typescript": "5.9.3"
  }
}

```
