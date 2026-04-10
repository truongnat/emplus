---
title: "api/src/utils/couple.ts"
description: "Gets the ID of the currently active couple for a given user."
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
  page: "reference/files/api/src/utils/couple.ts.md"
  relativePath: "api/src/utils/couple.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/utils/couple.ts"
  module: "api/src/utils"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 1
---

# api/src/utils/couple.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/utils](../../../../modules/api/src/utils.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/utils/couple.ts`
- Lines: 15
- Symbols: 1

## AI Summary

Gets the ID of the currently active couple for a given user.

### Usage Notes

- See `resolveActiveCoupleIdAsync` function description in comments to learn more about its usage.

## Public API

- `async function resolveActiveCoupleIdAsync(userId: string): Promise<string>`

## Symbols

### function `resolveActiveCoupleIdAsync`

- Signature: `async function resolveActiveCoupleIdAsync(userId: string): Promise<string>`
- Lines: 8-14
- Exported: yes

```ts
async function resolveActiveCoupleIdAsync(userId: string): Promise<string> {
    const couple = await store.getActiveCoupleForUser(userId);
    if (!couple) {
        throw new AppError(404, "COUPLE_NOT_FOUND", "Bạn chưa ghép đôi hoặc chưa có mối quan hệ đang hoạt động.");
    }
    return couple.id;
}
```
