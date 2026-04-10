---
title: "api/src/config/env.ts"
description: "Environment configuration variables and functions for various StoreModes."
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
  page: "reference/files/api/src/config/env.ts.md"
  relativePath: "api/src/config/env.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/config/env.ts"
  module: "api/src/config"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 6
---

# api/src/config/env.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/config](../../../../modules/api/src/config.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/config/env.ts`
- Lines: 129
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

Environment configuration variables and functions for various StoreModes.

### Responsibilities

- environment configuration.
- functions.
- variable access.
- store mode selection.

### Usage Notes

- The following information is used to determine if a variable belongs to this EnvironmentConfig object and if it's the correct store mode. https://docs.microsoft.com/en-us/azure/storage/emulation/config-env-usage

## Public API

- `type StoreMode = "memory" | "postgres";`
- `interface EnvConfig`

## Symbols

### type `StoreMode`

- Signature: `type StoreMode = "memory" | "postgres";`
- Lines: 1-1
- Exported: yes

```ts
type StoreMode = "memory" | "postgres";
```

### interface `EnvConfig`

- Signature: `interface EnvConfig`
- Lines: 37-71
- Exported: yes

```ts
interface EnvConfig {
  nodeEnv: string;
  storeMode: StoreMode;
  corsAllowedOrigins: string[];
  databaseUrl?: string;
  readDatabaseUrl?: string;
  redisUrl?: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser?: string;
  smtpPass?: string;
  smtpFrom: string;
  minioEndpoint?: string;
  minioRegion: string;
  minioAccessKey?: string;
  minioSecretKey?: string;
  minioBucket: string;
  minioUseSsl: boolean;
  /** URL gốc mà app mobile truy cập được (vd. http://192.168.1.5:9000). Mặc định lấy origin của MINIO_ENDPOINT. */
  minioPublicBaseUrl?: string;
  swaggerEnabled: boolean;
  swaggerPath: string;
  allowMockOAuth: boolean;
  googleClientIds: string[];
  appleAudiences: string[];
  appleIssuer?: string;
  defaultBudgetAmount: number;
  fallbackQuotes: string[];
  /** Khi true: user chưa có thông báo nào thì GET /v1/notifications seed vài bản ghi demo (chỉ dev mặc định). */
  fakeInAppNotifications: boolean;
  /** Khi true: couple chưa có memory nào thì GET /v1/timeline/memories seed 10 demo (dev mặc định). */
  fakeTimelineMemories: boolean;
  /** 32-byte hex key for AES-256-GCM encryption at rest. Required in production. */
  dataEncryptionKey?: string;
}
```

### function `boolFromEnv`

- Signature: `function boolFromEnv(value: string | undefined, fallback: boolean): boolean`
- Lines: 3-10
- Exported: no

```ts
function boolFromEnv(value: string | undefined, fallback: boolean): boolean {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}
```

### function `numberFromEnv`

- Signature: `function numberFromEnv(value: string | undefined, fallback: number): number`
- Lines: 12-19
- Exported: no

```ts
function numberFromEnv(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
```

### function `listFromEnv`

- Signature: `function listFromEnv(value: string | undefined): string[]`
- Lines: 21-30
- Exported: no

```ts
function listFromEnv(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
```

### function `isTestEnvironment`

- Signature: `function isTestEnvironment(): boolean`
- Lines: 32-35
- Exported: no

```ts
function isTestEnvironment(): boolean {
  const nodeEnv = (process.env.NODE_ENV ?? "").trim().toLowerCase();
  return nodeEnv === "test";
}
```
