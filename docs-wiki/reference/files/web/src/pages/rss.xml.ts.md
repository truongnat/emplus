---
title: "web/src/pages/rss.xml.ts"
description: "Defines a promise-bound fetch request to retrieve RSS data."
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
  page: "reference/files/web/src/pages/rss.xml.ts.md"
  relativePath: "web/src/pages/rss.xml.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/web/src/pages/rss.xml.ts"
  module: "web/src/pages"
  workspace: "web"
  language: "TypeScript"
  symbolCount: 1
---

# web/src/pages/rss.xml.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [web/src/pages](../../../../modules/web/src/pages.md)
- Workspace: [@emplus/web](../../../../../workspaces/web.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/web/src/pages/rss.xml.ts`
- Lines: 26
- Symbols: 1

## Related Features

- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Web](../../../../../features/web.md) - Web captures the main web behavior discovered in the codebase. Key flows include Web operations flow, Web Operations listing.

## AI Summary

Defines a promise-bound fetch request to retrieve RSS data.

### Responsibilities

- fetch request operation

### Usage Notes

- Requires an existing 'siteUrl' function.

## Public API

- `async function GET(context: { site?: URL | string })`

## Symbols

### function `GET`

- Signature: `async function GET(context: { site?: URL | string })`
- Lines: 5-25
- Exported: yes

```ts
async function GET(context: { site?: URL | string }) {
  const posts = (
    await getCollection('blog', ({ data }) => data.published)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const site = context.site ?? siteUrl().href;

  return rss({
    title: siteName,
    description: siteDescription,
    site,
    items: posts.map((post) => ({
      link: `/blog/${post.id}/`,
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>vi-vn</language>`,
  });
}
```
