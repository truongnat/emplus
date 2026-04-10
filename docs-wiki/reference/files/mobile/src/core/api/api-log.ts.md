---
title: "mobile/src/core/api/api-log.ts"
description: "Provides 2 documented symbols in mobile/src/core/api/api-log.ts."
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
  page: "reference/files/mobile/src/core/api/api-log.ts.md"
  relativePath: "mobile/src/core/api/api-log.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/api-log.ts"
  module: "mobile/src/core/api"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/core/api/api-log.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/api](../../../../../modules/mobile/src/core/api.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/api-log.ts`
- Lines: 45
- Symbols: 2

## AI Summary

Provides 2 documented symbols in mobile/src/core/api/api-log.ts.

## Public API

- `function startLog( url: string, method: string, path: string, init?: RequestInit, )`
- `function endLog( method: string, path: string, response: Response, payload: unknown, duration: number, )`

## Symbols

### function `startLog`

- Signature: `function startLog( url: string, method: string, path: string, init?: RequestInit, )`
- Lines: 1-26
- Exported: yes

```ts
function startLog(
  url: string,
  method: string,
  path: string,
  init?: RequestInit,
) {
  console.log(`\n╭────────────────────────────────────────────────────────`);
  console.log(`│ 🌐 API REQUEST: [${method}] ${path}`);
  console.log(`├────────────────────────────────────────────────────────`);
  console.log(`│ URL:     ${url}`);
  if (init?.headers) {
    console.log(`│ HEADERS: ${JSON.stringify(init.headers)}`);
  }
  if (init?.body) {
    try {
      const parsedBody =
        typeof init.body === "string" ? JSON.parse(init.body) : init.body;
      console.log(
        `│ BODY:    ${JSON.stringify(parsedBody, null, 2).replace(/\n/g, "\n│          ")}`,
      );
    } catch {
      console.log(`│ BODY:    ${init.body}`);
    }
  }
  console.log(`╰────────────────────────────────────────────────────────\n`);
}
```

### function `endLog`

- Signature: `function endLog( method: string, path: string, response: Response, payload: unknown, duration: number, )`
- Lines: 28-44
- Exported: yes

```ts
function endLog(
  method: string,
  path: string,
  response: Response,
  payload: unknown,
  duration: number,
) {
  const statusColor = response.ok ? "✅" : "❌";
  console.log(`\n╭────────────────────────────────────────────────────────`);
  console.log(`│ ${statusColor} API RESPONSE: [${method}] ${path}`);
  console.log(`├────────────────────────────────────────────────────────`);
  console.log(`│ STATUS:   ${response.status} (${duration}ms)`);
  console.log(
    `│ PAYLOAD:  ${JSON.stringify(payload, null, 2).replace(/\n/g, "\n│           ")}`,
  );
  console.log(`╰────────────────────────────────────────────────────────\n`);
}
```
