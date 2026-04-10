---
title: "api/src/shared/code.ts"
description: "Code generation functions for numeric and invite code creation using crypto library."
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
  page: "reference/files/api/src/shared/code.ts.md"
  relativePath: "api/src/shared/code.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/shared/code.ts"
  module: "api/src/shared"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 3
---

# api/src/shared/code.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/shared](../../../../modules/api/src/shared.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/shared/code.ts`
- Lines: 44
- Symbols: 3

## AI Summary

Code generation functions for numeric and invite code creation using crypto library.

### Usage Notes

- use with specified length to generate a string code

## Public API

- `function generateNumericCode(length: number): string`
- `function generateInviteCode(length: number = 8): string`
- `function generateId(): string`

## Symbols

### function `generateNumericCode`

- Signature: `function generateNumericCode(length: number): string`
- Lines: 8-22
- Exported: yes

```ts
function generateNumericCode(length: number): string {
  const digits = "0123456789";
  const firstDigits = "123456789";
  let code = "";
  const randomBytes = new Uint32Array(length);
  crypto.getRandomValues(randomBytes);

  // Ensure the first digit is not zero to maintain consistency with previous implementation
  code += firstDigits[randomBytes[0] % firstDigits.length];

  for (let i = 1; i < length; i++) {
    code += digits[randomBytes[i] % digits.length];
  }
  return code;
}
```

### function `generateInviteCode`

- Signature: `function generateInviteCode(length: number = 8): string`
- Lines: 27-36
- Exported: yes

```ts
function generateInviteCode(length: number = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  const randomBytes = new Uint32Array(length);
  crypto.getRandomValues(randomBytes);
  for (let i = 0; i < length; i++) {
    code += chars[randomBytes[i] % chars.length];
  }
  return code;
}
```

### function `generateId`

- Signature: `function generateId(): string`
- Lines: 41-43
- Exported: yes

```ts
function generateId(): string {
  return crypto.randomUUID();
}
```
