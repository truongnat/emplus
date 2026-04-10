---
title: "api/src/services/media-storage.ts"
description: "Minio Client and Public Object URL Builder"
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
  page: "reference/files/api/src/services/media-storage.ts.md"
  relativePath: "api/src/services/media-storage.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/media-storage.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 6
---

# api/src/services/media-storage.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/media-storage.ts`
- Lines: 74
- Symbols: 6

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

Minio Client and Public Object URL Builder

### Responsibilities

- defines Minio client for media uploads

### Usage Notes

- builds public object url from base on MINIO_PUBLIC_BASE_URL

## Public API

- `function isMediaUploadEnabled(): boolean`
- `function getMinioPublicBaseUrl(): string`
- `function buildPublicObjectUrl(objectKey: string): string`
- `async function putTimelineObject( objectKey: string, buffer: Buffer, contentType: string, ): Promise<void>`

## Symbols

### function `isMediaUploadEnabled`

- Signature: `function isMediaUploadEnabled(): boolean`
- Lines: 18-24
- Exported: yes

```ts
function isMediaUploadEnabled(): boolean {
  return Boolean(
    env.minioEndpoint?.trim() &&
      env.minioAccessKey?.trim() &&
      env.minioSecretKey?.trim(),
  );
}
```

### function `getMinioPublicBaseUrl`

- Signature: `function getMinioPublicBaseUrl(): string`
- Lines: 45-52
- Exported: yes

```ts
function getMinioPublicBaseUrl(): string {
  const raw =
    env.minioPublicBaseUrl?.trim() || env.minioEndpoint?.trim() || "";
  if (!raw) {
    throw new Error("MINIO_ENDPOINT hoặc MINIO_PUBLIC_BASE_URL bắt buộc khi upload.");
  }
  return new URL(raw).origin.replace(/\/$/, "");
}
```

### function `buildPublicObjectUrl`

- Signature: `function buildPublicObjectUrl(objectKey: string): string`
- Lines: 54-57
- Exported: yes

```ts
function buildPublicObjectUrl(objectKey: string): string {
  const base = getMinioPublicBaseUrl();
  return `${base}/${env.minioBucket}/${objectKey}`;
}
```

### function `putTimelineObject`

- Signature: `async function putTimelineObject( objectKey: string, buffer: Buffer, contentType: string, ): Promise<void>`
- Lines: 61-73
- Exported: yes

```ts
async function putTimelineObject(
  objectKey: string,
  buffer: Buffer,
  contentType: string,
): Promise<void> {
  if (buffer.length > MAX_BYTES) {
    throw new Error("FILE_TOO_LARGE");
  }
  const c = getClient();
  await c.putObject(env.minioBucket, objectKey, buffer, buffer.length, {
    "Content-Type": contentType,
  });
}
```

### function `parseEndpoint`

- Signature: `function parseEndpoint(raw: string): { endPoint: string; port: number; useSSL: boolean; }`
- Lines: 6-16
- Exported: no

```ts
function parseEndpoint(raw: string): {
  endPoint: string;
  port: number;
  useSSL: boolean;
} {
  const u = new URL(raw);
  const useSSL = u.protocol === "https:";
  const defaultPort = useSSL ? 443 : 80;
  const port = u.port ? Number(u.port) : defaultPort;
  return { endPoint: u.hostname, port, useSSL };
}
```

### function `getClient`

- Signature: `function getClient(): Minio.Client`
- Lines: 26-42
- Exported: no
- Summary: Minio Client instance

```ts
function getClient(): Minio.Client {
  if (!isMediaUploadEnabled()) {
    throw new Error("MinIO chưa được cấu hình.");
  }
  if (!client) {
    const { endPoint, port, useSSL } = parseEndpoint(env.minioEndpoint!.trim());
    client = new Minio.Client({
      endPoint,
      port,
      useSSL,
      accessKey: env.minioAccessKey!,
      secretKey: env.minioSecretKey!,
      region: env.minioRegion,
    });
  }
  return client;
}
```
