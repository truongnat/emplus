---
title: "api/src/utils/logger.ts"
description: "Logger API functions for log processing and Loki integration."
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
  page: "reference/files/api/src/utils/logger.ts.md"
  relativePath: "api/src/utils/logger.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/utils/logger.ts"
  module: "api/src/utils"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 6
---

# api/src/utils/logger.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/utils](../../../../modules/api/src/utils.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/utils/logger.ts`
- Lines: 94
- Symbols: 6

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.

## AI Summary

Logger API functions for log processing and Loki integration.

## Public API

- `function log(level: string, message: string, meta?: Record<string, unknown>)`
- `async function flushLogs()`

## Symbols

### function `log`

- Signature: `function log(level: string, message: string, meta?: Record<string, unknown>)`
- Lines: 58-75
- Exported: yes

```ts
function log(level: string, message: string, meta?: Record<string, unknown>) {
  const timestamp = Date.now() * 1_000_000; // nanoseconds
  const line = meta
    ? JSON.stringify({ level, message, ...meta })
    : JSON.stringify({ level, message });

  BATCH.push({
    timestamp: timestamp.toString(),
    line,
    labels: {
      app: 'emplus-api',
      env: process.env.NODE_ENV || 'development',
      level,
    },
  });

  scheduleFlush();
}
```

### function `flushLogs`

- Signature: `async function flushLogs()`
- Lines: 84-93
- Exported: yes

```ts
async function flushLogs() {
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
  if (BATCH.length > 0) {
    await sendToLoki([...BATCH]);
    BATCH.length = 0;
  }
}
```

### interface `LogEntry`

- Signature: `interface LogEntry`
- Lines: 3-7
- Exported: no

```ts
interface LogEntry {
  timestamp: string;
  line: string;
  labels: Record<string, string>;
}
```

### function `formatLabels`

- Signature: `function formatLabels(labels: Record<string, string>): string`
- Lines: 9-13
- Exported: no

```ts
function formatLabels(labels: Record<string, string>): string {
  return Object.entries(labels)
    .map(([k, v]) => `${k}="${v}"`)
    .join(',');
}
```

### function `sendToLoki`

- Signature: `async function sendToLoki(logs: LogEntry[])`
- Lines: 15-42
- Exported: no

```ts
async function sendToLoki(logs: LogEntry[]) {
  const streams = new Map<string, LogEntry[]>();

  for (const entry of logs) {
    const key = formatLabels(entry.labels);
    if (!streams.has(key)) {
      streams.set(key, []);
    }
    streams.get(key)!.push(entry);
  }

  const payload = {
    streams: Array.from(streams.entries()).map(([labels, entries]) => ({
      stream: entries[0].labels,
      values: entries.map((e) => [e.timestamp, e.line]),
    })),
  };

  try {
    await fetch(`${LOKI_URL}/loki/api/v1/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Failed to send logs to Loki:', err);
  }
}
```

### function `scheduleFlush`

- Signature: `function scheduleFlush()`
- Lines: 47-56
- Exported: no

```ts
function scheduleFlush() {
  if (flushTimeout) return;
  flushTimeout = setTimeout(async () => {
    flushTimeout = null;
    if (BATCH.length > 0) {
      await sendToLoki([...BATCH]);
      BATCH.length = 0;
    }
  }, 1000);
}
```
