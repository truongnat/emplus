---
title: "web/src/lib/site.ts"
description: "Site URL resolver function"
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
  page: "reference/files/web/src/lib/site.ts.md"
  relativePath: "web/src/lib/site.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/web/src/lib/site.ts"
  module: "web/src/lib"
  workspace: "web"
  language: "TypeScript"
  symbolCount: 1
---

# web/src/lib/site.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [web/src/lib](../../../../modules/web/src/lib.md)
- Workspace: [@emplus/web](../../../../../workspaces/web.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/web/src/lib/site.ts`
- Lines: 10
- Symbols: 1

## Related Features

- [Web](../../../../../features/web.md) - Web captures the main web behavior discovered in the codebase. Key flows include Web operations flow, Web Operations listing.

## AI Summary

Site URL resolver function

## Public API

- `function siteUrl(): URL`

## Symbols

### function `siteUrl`

- Signature: `function siteUrl(): URL`
- Lines: 5-9
- Exported: yes

```ts
function siteUrl(): URL {
  const raw =
    import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://emplus.app';
  return new URL(raw);
}
```
