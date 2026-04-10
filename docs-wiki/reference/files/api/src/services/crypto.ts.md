---
title: "api/src/services/crypto.ts"
description: "Encryption Key and Mode Resolution"
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
  page: "reference/files/api/src/services/crypto.ts.md"
  relativePath: "api/src/services/crypto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/crypto.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 4
---

# api/src/services/crypto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/crypto.ts`
- Lines: 113
- Symbols: 4

## AI Summary

Encryption Key and Mode Resolution

### Usage Notes

- Provides an encryption key suitable for cryptographic operations.
- Can be obtained dynamically either with the `key` function,

## Public API

- `function encrypt(plaintext: string): string`
- `function decrypt(ciphertext: string): string`
- `function isEncryptionEnabled(): boolean`

## Symbols

### function `encrypt`

- Signature: `function encrypt(plaintext: string): string`
- Lines: 56-70
- Exported: yes

```ts
function encrypt(plaintext: string): string {
  const key = resolveKey();
  if (!key) return plaintext;

  const iv = randomBytes(IV_LEN);
  const cipher = createCipheriv(ALGO, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}
```

### function `decrypt`

- Signature: `function decrypt(ciphertext: string): string`
- Lines: 76-105
- Exported: yes

```ts
function decrypt(ciphertext: string): string {
  const key = resolveKey();
  if (!key) return ciphertext;

  const parts = ciphertext.split(":");
  if (parts.length !== 3) return ciphertext;

  const [ivHex, authTagHex, dataHex] = parts;

  if (
    ivHex.length !== IV_LEN * 2 ||
    authTagHex.length !== AUTH_TAG_LEN * 2 ||
    !dataHex
  ) {
    return ciphertext;
  }

  try {
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const data = Buffer.from(dataHex, "hex");

    const decipher = createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);

    return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
  } catch {
    return ciphertext;
  }
}
```

### function `isEncryptionEnabled`

- Signature: `function isEncryptionEnabled(): boolean`
- Lines: 110-112
- Exported: yes

```ts
function isEncryptionEnabled(): boolean {
  return resolveKey() !== null;
}
```

### function `resolveKey`

- Signature: `function resolveKey(): Buffer | null`
- Lines: 18-50
- Exported: no

```ts
function resolveKey(): Buffer | null {
  if (encryptionKey !== null) return encryptionKey.length === 0 ? null : encryptionKey;

  const raw = process.env.DATA_ENCRYPTION_KEY?.trim();
  if (!raw) {
    const isProduction = (process.env.NODE_ENV ?? "").toLowerCase() === "production";
    if (isProduction) {
      console.error(
        "[crypto] DATA_ENCRYPTION_KEY is required in production. " +
          "Set a 64-char hex string (32 bytes).",
      );
      process.exit(1);
    }
    encryptionKey = Buffer.alloc(0);
    return null;
  }

  const buf =
    raw.length === 64 && /^[0-9a-fA-F]+$/.test(raw)
      ? Buffer.from(raw, "hex")
      : Buffer.from(raw, "base64");

  if (buf.length !== 32) {
    console.error(
      `[crypto] DATA_ENCRYPTION_KEY must be 32 bytes (got ${buf.length}). ` +
        "Provide a 64-char hex string or a 44-char base64 string.",
    );
    process.exit(1);
  }

  encryptionKey = buf;
  return buf;
}
```
