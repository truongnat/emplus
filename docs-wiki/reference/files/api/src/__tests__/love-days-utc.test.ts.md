---
title: "api/src/__tests__/love-days-utc.test.ts"
description: "Calculates the number of days in a love day period from a start date to a current date that is UTC."
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
  page: "reference/files/api/src/__tests__/love-days-utc.test.ts.md"
  relativePath: "api/src/__tests__/love-days-utc.test.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/__tests__/love-days-utc.test.ts"
  module: "api/src/__tests__"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 1
---

# api/src/__tests__/love-days-utc.test.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/__tests__](../../../../modules/api/src/__tests__.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/__tests__/love-days-utc.test.ts`
- Lines: 28
- Symbols: 1

## AI Summary

Calculates the number of days in a love day period from a start date to a current date that is UTC.

### Responsibilities

- Function

### Usage Notes

- The function assumes a standard year and does not handle leap years or edge cases like February 29th.

## Symbols

### function `loveDaysFromStart`

- Signature: `function loveDaysFromStart(loveStartYmd: string, now: Date): number`
- Lines: 5-9
- Exported: no

```ts
function loveDaysFromStart(loveStartYmd: string, now: Date): number {
  const start = parseDate(loveStartYmd.slice(0, 10));
  const today = stripToUtcDay(now);
  return diffDays(start, today) + 1;
}
```
