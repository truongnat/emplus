---
title: "api/src/utils/password.ts"
description: "Hashes a password and returns the encoded query string, including salt and expected digest."
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
  page: "reference/files/api/src/utils/password.ts.md"
  relativePath: "api/src/utils/password.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/utils/password.ts"
  module: "api/src/utils"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/utils/password.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/utils](../../../../modules/api/src/utils.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/utils/password.ts`
- Lines: 39
- Symbols: 2

## Related Features

- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Hashes a password and returns the encoded query string, including salt and expected digest.

### Usage Notes

- The encoded query string is in the format [scheme]iterationText$salt$hash.
- '${PASSWORD_SCHEME}' must be present, followed by any number of hexadecimal digits separated by `$` signs, then

## Public API

- `function hashPassword(password: string): string`
- `function verifyPassword(password: string, encoded: string): boolean`

## Symbols

### function `hashPassword`

- Signature: `function hashPassword(password: string): string`
- Lines: 8-12
- Exported: yes

```ts
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, DEFAULT_ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  return `${PASSWORD_SCHEME}$${DEFAULT_ITERATIONS}$${salt}$${hash}`;
}
```

### function `verifyPassword`

- Signature: `function verifyPassword(password: string, encoded: string): boolean`
- Lines: 14-38
- Exported: yes

```ts
function verifyPassword(password: string, encoded: string): boolean {
  const [scheme, iterationText, salt, expectedHash] = encoded.split("$");
  if (!scheme || !iterationText || !salt || !expectedHash) {
    return false;
  }

  if (scheme !== PASSWORD_SCHEME) {
    return false;
  }

  const iterations = Number(iterationText);
  if (!Number.isInteger(iterations) || iterations <= 0) {
    return false;
  }

  const computedHash = pbkdf2Sync(password, salt, iterations, KEY_LENGTH, DIGEST).toString("hex");
  const expectedBuffer = Buffer.from(expectedHash, "hex");
  const computedBuffer = Buffer.from(computedHash, "hex");

  if (expectedBuffer.length !== computedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, computedBuffer);
}
```
