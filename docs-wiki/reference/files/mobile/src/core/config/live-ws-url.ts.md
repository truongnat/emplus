---
title: "mobile/src/core/config/live-ws-url.ts"
description: "Constructs a WebSocket URL for live websockets with the given token and couple ID"
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
  page: "reference/files/mobile/src/core/config/live-ws-url.ts.md"
  relativePath: "mobile/src/core/config/live-ws-url.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/config/live-ws-url.ts"
  module: "mobile/src/core/config"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/core/config/live-ws-url.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/config](../../../../../modules/mobile/src/core/config.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/config/live-ws-url.ts`
- Lines: 17
- Symbols: 1

## AI Summary

Constructs a WebSocket URL for live websockets with the given token and couple ID

## Public API

- `function buildLiveWebSocketUrl(token: string, coupleId: string): string`

## Symbols

### function `buildLiveWebSocketUrl`

- Signature: `function buildLiveWebSocketUrl(token: string, coupleId: string): string`
- Lines: 7-16
- Exported: yes

```ts
function buildLiveWebSocketUrl(token: string, coupleId: string): string {
  const u = new URL(appConfig.env.apiBase);
  u.protocol = u.protocol === "https:" ? "wss:" : "ws:";
  const prefix = u.pathname.replace(/\/$/, "");
  u.pathname = `${prefix}/live/ws`;
  u.search = "";
  u.searchParams.set("token", token);
  u.searchParams.set("coupleId", coupleId);
  return u.toString();
}
```
