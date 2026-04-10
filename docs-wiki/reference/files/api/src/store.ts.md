---
title: "api/src/store.ts"
description: "Creates a new DataStore instance based on environment settings."
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
  page: "reference/files/api/src/store.ts.md"
  relativePath: "api/src/store.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/store.ts"
  module: "api/src"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 1
---

# api/src/store.ts

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [api/src](../../../modules/api/src.md)
- Workspace: [@emplus/api](../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/store.ts`
- Lines: 23
- Symbols: 1

## Related Features

- [Search Create](../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

Creates a new DataStore instance based on environment settings.

### Usage Notes

- The store can be created using either a database URL or a memory store configuration.

## Symbols

### function `createStore`

- Signature: `function createStore(): DataStore`
- Lines: 6-20
- Exported: no

```ts
function createStore(): DataStore {
  if (env.storeMode === "postgres") {
    if (!env.databaseUrl) {
      throw new Error("Thiếu DATABASE_URL khi DATA_STORE=postgres.");
    }

    return createPostgresStore(env.databaseUrl, env.redisUrl, env.readDatabaseUrl);
  }

  if (env.nodeEnv !== "test") {
    throw new Error("DATA_STORE=memory bị tắt ở môi trường chạy thực tế. Hãy dùng DATA_STORE=postgres.");
  }

  return new InMemoryStore();
}
```
