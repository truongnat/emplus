---
title: "api/src/services/session-cleanup.ts"
description: "Session cleanup function."
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
  page: "reference/files/api/src/services/session-cleanup.ts.md"
  relativePath: "api/src/services/session-cleanup.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/session-cleanup.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 3
---

# api/src/services/session-cleanup.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/session-cleanup.ts`
- Lines: 48
- Symbols: 3

## AI Summary

Session cleanup function.

### Responsibilities

- takes a callback as an argument.
- starts cleaning up expiration dates on sessions.
- stops the session cleanup.
- returns the number of cleaned-up sessions in batches if available otherwise returns 0

### Usage Notes

- The `startSessionCleanup` and `stopSessionCleanup` functions are asynchronous and return a promise.

## Public API

- `function startSessionCleanup(): void`
- `function stopSessionCleanup(): void`

## Symbols

### function `startSessionCleanup`

- Signature: `function startSessionCleanup(): void`
- Lines: 22-40
- Exported: yes

```ts
function startSessionCleanup(): void {
  if (timer) return;

  runCleanup().catch((err) =>
    console.error("[session-cleanup] initial run failed:", err),
  );

  timer = setInterval(() => {
    runCleanup()
      .then((count) => {
        if (count > 0) {
          console.log(`[session-cleanup] removed ${count} expired sessions`);
        }
      })
      .catch((err) =>
        console.error("[session-cleanup] run failed:", err),
      );
  }, CLEANUP_INTERVAL_MS);
}
```

### function `stopSessionCleanup`

- Signature: `function stopSessionCleanup(): void`
- Lines: 42-47
- Exported: yes

```ts
function stopSessionCleanup(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
```

### function `runCleanup`

- Signature: `async function runCleanup(): Promise<number>`
- Lines: 13-20
- Exported: no

```ts
async function runCleanup(): Promise<number> {
  const dataStore = store as unknown as Record<string, unknown>;
  if (typeof dataStore.cleanupExpiredSessions !== "function") {
    return 0;
  }
  return (dataStore as unknown as { cleanupExpiredSessions: (batch: number) => Promise<number> })
    .cleanupExpiredSessions(BATCH_SIZE);
}
```
