---
title: "api/src/middleware/rate-limit.ts"
description: "Rate_limitMiddleware class."
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
  page: "reference/files/api/src/middleware/rate-limit.ts.md"
  relativePath: "api/src/middleware/rate-limit.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/middleware/rate-limit.ts"
  module: "api/src/middleware"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 6
---

# api/src/middleware/rate-limit.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/middleware](../../../../modules/api/src/middleware.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/middleware/rate-limit.ts`
- Lines: 146
- Symbols: 6

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

Rate_limitMiddleware class.

### Responsibilities

- rateLimitMiddleware

### Usage Notes

- (RateLimitMiddleware config) =&gt; Promise RatelimitEntry

## Public API

- `rateLimitMiddleware = (config: RateLimitConfig) => { const windowSec = Math.ceil(config.windowMs / 1`

## Symbols

### function `rateLimitMiddleware`

- Signature: `rateLimitMiddleware = (config: RateLimitConfig) => { const windowSec = Math.ceil(config.windowMs / 1`
- Lines: 91-142
- Exported: yes

```ts
rateLimitMiddleware = (config: RateLimitConfig) => {
  const windowSec = Math.ceil(config.windowMs / 1000);
  const prefix = "rl:";

  return createMiddleware<AppEnv>(async (c, next) => {
    if (config.shouldSkip?.(c)) {
      await next();
      return;
    }

    const rawKey = config.keyGenerator ? config.keyGenerator(c) : getClientIp(c);
    const key = `${prefix}${config.keyNamespace}:${rawKey}`;
    const now = Date.now();

    let count: number;
    let resetTime: number;

    try {
      const result = await redisIncrement(key, windowSec);
      count = result.count;
      resetTime = now + result.ttl * 1000;
    } catch {
      let entry = memStore.get(key);
      if (!entry || now > entry.resetTime) {
        entry = { count: 0, resetTime: now + config.windowMs };
        memStore.set(key, entry);
      }
      entry.count++;
      count = entry.count;
      resetTime = entry.resetTime;
    }

    c.res.headers.set("X-RateLimit-Limit", String(config.max));
    c.res.headers.set("X-RateLimit-Remaining", String(Math.max(0, config.max - count)));
    c.res.headers.set("X-RateLimit-Reset", String(Math.ceil(resetTime / 1000)));

    if (count > config.max) {
      return c.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: config.message || "Quá nhiều yêu cầu.",
          },
        },
        429,
      );
    }

    await next();
  });
}
```

### interface `RateLimitEntry`

- Signature: `interface RateLimitEntry`
- Lines: 8-11
- Exported: no

```ts
interface RateLimitEntry {
  count: number;
  resetTime: number;
}
```

### function `getRedis`

- Signature: `async function getRedis(): Promise<import("ioredis").default | null>`
- Lines: 29-42
- Exported: no

```ts
async function getRedis(): Promise<import("ioredis").default | null> {
  if (redisUnavailable || !env.redisUrl) return null;
  if (redis) return redis;
  try {
    const { default: Redis } = await import("ioredis");
    redis = new Redis(env.redisUrl, { lazyConnect: true, maxRetriesPerRequest: 1 });
    await redis.connect();
    return redis;
  } catch {
    redisUnavailable = true;
    console.warn("[rate-limit] Redis unavailable — falling back to in-memory");
    return null;
  }
}
```

### function `redisIncrement`

- Signature: `async function redisIncrement(key: string, windowSec: number): Promise<{ count: number; ttl: number }>`
- Lines: 44-53
- Exported: no

```ts
async function redisIncrement(key: string, windowSec: number): Promise<{ count: number; ttl: number }> {
  const r = await getRedis();
  if (!r) throw new Error("no redis");
  const count = await r.incr(key);
  if (count === 1) {
    await r.expire(key, windowSec);
  }
  const ttl = await r.ttl(key);
  return { count, ttl: ttl > 0 ? ttl : windowSec };
}
```

### interface `RateLimitConfig`

- Signature: `interface RateLimitConfig`
- Lines: 57-66
- Exported: no

```ts
interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  /** Tách bucket Redis/memory — bắt buộc khác nhau giữa các middleware để không cộng dồn nhầm. */
  keyNamespace: string;
  keyGenerator?: (c: Context<AppEnv>) => string;
  /** Bỏ qua giới hạn (ví dụ refresh token: duy trì phiên, không phải brute-force). */
  shouldSkip?: (c: Context<AppEnv>) => boolean;
}
```

### function `getClientIp`

- Signature: `function getClientIp(c: Context<AppEnv>): string`
- Lines: 83-87
- Exported: no

```ts
function getClientIp(c: Context<AppEnv>): string {
  const forwarded = c.req.header("X-Forwarded-For");
  if (forwarded) return forwarded.split(",")[0].trim();
  return c.req.header("X-Real-IP") || "unknown";
}
```
