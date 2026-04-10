---
title: "api/src/services/dependencies.ts"
description: "Dependency services for monitoring database, Redis and Minio health"
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
  page: "reference/files/api/src/services/dependencies.ts.md"
  relativePath: "api/src/services/dependencies.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/dependencies.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 10
---

# api/src/services/dependencies.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/dependencies.ts`
- Lines: 197
- Symbols: 10

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Dependency services for monitoring database, Redis and Minio health

## Public API

- `type DependencyStatus = "up" | "down" | "skipped";`
- `interface DependencyHealth`
- `interface DependencyReport`
- `async function getDependencyReport(): Promise<DependencyReport>`

## Symbols

### type `DependencyStatus`

- Signature: `type DependencyStatus = "up" | "down" | "skipped";`
- Lines: 6-6
- Exported: yes

```ts
type DependencyStatus = "up" | "down" | "skipped";
```

### interface `DependencyHealth`

- Signature: `interface DependencyHealth`
- Lines: 8-12
- Exported: yes

```ts
interface DependencyHealth {
  status: DependencyStatus;
  latencyMs?: number;
  details?: string;
}
```

### interface `DependencyReport`

- Signature: `interface DependencyReport`
- Lines: 14-20
- Exported: yes

```ts
interface DependencyReport {
  database: DependencyHealth;
  readDatabase: DependencyHealth;
  redis: DependencyHealth;
  mail: DependencyHealth;
  minio: DependencyHealth;
}
```

### function `getDependencyReport`

- Signature: `async function getDependencyReport(): Promise<DependencyReport>`
- Lines: 173-196
- Exported: yes

```ts
async function getDependencyReport(): Promise<DependencyReport> {
  const [database, readDatabase, redis, mail, minio] = await Promise.all([
    checkDatabase(env.databaseUrl, "DATABASE_URL"),
    env.readDatabaseUrl && env.readDatabaseUrl !== env.databaseUrl
      ? checkDatabase(env.readDatabaseUrl, "READ_DATABASE_URL")
      : Promise.resolve<DependencyHealth>({
          status: "skipped",
          details: env.readDatabaseUrl
            ? "READ_DATABASE_URL đang trỏ cùng máy chủ với cơ sở dữ liệu chính."
            : "Chưa cấu hình READ_DATABASE_URL.",
        }),
    checkRedis(env.redisUrl),
    checkMail(env.smtpHost, env.smtpPort),
    checkMinio(env.minioEndpoint, env.minioUseSsl),
  ]);

  return {
    database,
    readDatabase,
    redis,
    mail,
    minio,
  };
}
```

### function `elapsedMs`

- Signature: `function elapsedMs(start: number): number`
- Lines: 22-24
- Exported: no

```ts
function elapsedMs(start: number): number {
  return Number((performance.now() - start).toFixed(2));
}
```

### function `normalizeHttpEndpoint`

- Signature: `function normalizeHttpEndpoint(input: string, forceSsl: boolean): string`
- Lines: 26-34
- Exported: no

```ts
function normalizeHttpEndpoint(input: string, forceSsl: boolean): string {
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed.replace(/\/+$/, "");
  }

  const protocol = forceSsl ? "https" : "http";
  return `${protocol}://${trimmed}`.replace(/\/+$/, "");
}
```

### function `checkDatabase`

- Signature: `async function checkDatabase(url: string | undefined, name: string): Promise<DependencyHealth>`
- Lines: 36-62
- Exported: no

```ts
async function checkDatabase(url: string | undefined, name: string): Promise<DependencyHealth> {
  if (!url) {
    return {
      status: "skipped",
      details: `Chưa cấu hình URL cho ${name}.`,
    };
  }

  const sql = postgres(url, { max: 1, connect_timeout: 3 });
  const start = performance.now();

  try {
    await sql`SELECT 1`;
    return {
      status: "up",
      latencyMs: elapsedMs(start),
    };
  } catch (error) {
    return {
      status: "down",
      latencyMs: elapsedMs(start),
      details: error instanceof Error ? error.message : "Lỗi không xác định khi kết nối cơ sở dữ liệu.",
    };
  } finally {
    await sql.end({ timeout: 1 }).catch(() => undefined);
  }
}
```

### function `checkRedis`

- Signature: `async function checkRedis(url: string | undefined): Promise<DependencyHealth>`
- Lines: 64-98
- Exported: no

```ts
async function checkRedis(url: string | undefined): Promise<DependencyHealth> {
  if (!url) {
    return {
      status: "skipped",
      details: "Chưa cấu hình REDIS_URL.",
    };
  }

  const client = new Redis(url, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy: () => null,
    connectTimeout: 3000,
  });

  const start = performance.now();

  try {
    await client.connect();
    await client.ping();
    return {
      status: "up",
      latencyMs: elapsedMs(start),
    };
  } catch (error) {
    return {
      status: "down",
      latencyMs: elapsedMs(start),
      details: error instanceof Error ? error.message : "Lỗi không xác định khi kết nối Redis.",
    };
  } finally {
    client.disconnect();
  }
}
```

### function `checkMail`

- Signature: `async function checkMail(host: string, port: number): Promise<DependencyHealth>`
- Lines: 100-136
- Exported: no

```ts
async function checkMail(host: string, port: number): Promise<DependencyHealth> {
  const start = performance.now();

  return await new Promise<DependencyHealth>((resolve) => {
    const socket = createConnection({ host, port });
    socket.setTimeout(3000);

    const complete = (result: DependencyHealth): void => {
      socket.removeAllListeners();
      socket.end();
      resolve(result);
    };

    socket.once("connect", () => {
      complete({
        status: "up",
        latencyMs: elapsedMs(start),
      });
    });

    socket.once("timeout", () => {
      complete({
        status: "down",
        latencyMs: elapsedMs(start),
        details: `Kết nối SMTP ${host}:${port} bị quá thời gian chờ.`,
      });
    });

    socket.once("error", (error) => {
      complete({
        status: "down",
        latencyMs: elapsedMs(start),
        details: error.message,
      });
    });
  });
}
```

### function `checkMinio`

- Signature: `async function checkMinio(endpoint: string | undefined, useSsl: boolean): Promise<DependencyHealth>`
- Lines: 138-171
- Exported: no

```ts
async function checkMinio(endpoint: string | undefined, useSsl: boolean): Promise<DependencyHealth> {
  if (!endpoint) {
    return {
      status: "skipped",
      details: "Chưa cấu hình MINIO_ENDPOINT.",
    };
  }

  const normalizedEndpoint = normalizeHttpEndpoint(endpoint, useSsl);
  const start = performance.now();

  try {
    const response = await fetch(`${normalizedEndpoint}/minio/health/live`, { method: "GET" });

    if (!response.ok) {
      return {
        status: "down",
        latencyMs: elapsedMs(start),
        details: `MinIO trả về mã kiểm tra sức khỏe ${response.status}.`,
      };
    }

    return {
      status: "up",
      latencyMs: elapsedMs(start),
    };
  } catch (error) {
    return {
      status: "down",
      latencyMs: elapsedMs(start),
      details: error instanceof Error ? error.message : "Lỗi không xác định khi kết nối MinIO.",
    };
  }
}
```
