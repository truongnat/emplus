---
title: "api/src/modules/demo-timeline-memories.ts"
description: "File: api/src/modules/demo-timeline-memories.ts"
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
  page: "reference/files/api/src/modules/demo-timeline-memories.ts.md"
  relativePath: "api/src/modules/demo-timeline-memories.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/modules/demo-timeline-memories.ts"
  module: "api/src/modules"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 5
---

# api/src/modules/demo-timeline-memories.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/modules](../../../../modules/api/src/modules.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/modules/demo-timeline-memories.ts`
- Lines: 256
- Symbols: 5

## AI Summary

File: api/src/modules/demo-timeline-memories.ts

### Usage Notes

- . This file contains TypeScript code for the DemoTimelineMemories module.
- . It defines theDemoMemorySpec type and memoryDateIso function, which are used for managing demo memories.

## Public API

- `async function ensureDemoGridTestMemories( store: DataStore, coupleId: string, createdById: string, ): Promise<void>`
- `async function ensureDemoTimelineMemories( store: DataStore, coupleId: string, createdById: string, ): Promise<void>`
- `async function syncDemoTimelineMediaUrls( store: DataStore, coupleId: string, ): Promise<void>`

## Symbols

### function `ensureDemoGridTestMemories`

- Signature: `async function ensureDemoGridTestMemories( store: DataStore, coupleId: string, createdById: string, ): Promise<void>`
- Lines: 154-187
- Exported: yes

```ts
async function ensureDemoGridTestMemories(
  store: DataStore,
  coupleId: string,
  createdById: string,
): Promise<void> {
  const { items } = await store.listMemoriesByCouple(coupleId, {
    page: 1,
    limit: 500,
    order: "desc",
  });
  const existing = new Set(items.map((m) => m.title));
  const createdAt = new Date().toISOString();
  let inserted = false;
  for (const spec of DEMO_MEMORY_SPECS) {
    if (!DEMO_GRID_TEST_TITLES.has(spec.title)) continue;
    if (existing.has(spec.title)) continue;
    const memory: MemoryItem = {
      id: crypto.randomUUID(),
      coupleId,
      createdById,
      title: spec.title,
      description: spec.description,
      memoryDate: memoryDateIso(spec.daysAgo),
      mediaUrls: spec.mediaUrls,
      tags: spec.tags,
      createdAt,
    };
    await store.saveMemory(memory);
    inserted = true;
  }
  if (inserted) {
    await store.invalidateHomeCache(coupleId);
  }
}
```

### function `ensureDemoTimelineMemories`

- Signature: `async function ensureDemoTimelineMemories( store: DataStore, coupleId: string, createdById: string, ): Promise<void>`
- Lines: 192-221
- Exported: yes

```ts
async function ensureDemoTimelineMemories(
  store: DataStore,
  coupleId: string,
  createdById: string,
): Promise<void> {
  const { total } = await store.listMemoriesByCouple(coupleId, {
    page: 1,
    limit: 1,
  });
  if (total > 0) {
    return;
  }

  const createdAt = new Date().toISOString();
  for (const spec of DEMO_MEMORY_SPECS) {
    const memory: MemoryItem = {
      id: crypto.randomUUID(),
      coupleId,
      createdById,
      title: spec.title,
      description: spec.description,
      memoryDate: memoryDateIso(spec.daysAgo),
      mediaUrls: spec.mediaUrls,
      tags: spec.tags,
      createdAt,
    };
    await store.saveMemory(memory);
  }
  await store.invalidateHomeCache(coupleId);
}
```

### function `syncDemoTimelineMediaUrls`

- Signature: `async function syncDemoTimelineMediaUrls( store: DataStore, coupleId: string, ): Promise<void>`
- Lines: 230-255
- Exported: yes

```ts
async function syncDemoTimelineMediaUrls(
  store: DataStore,
  coupleId: string,
): Promise<void> {
  const titleToSpec = new Map(DEMO_MEMORY_SPECS.map((s) => [s.title, s]));
  const { items } = await store.listMemoriesByCouple(coupleId, {
    page: 1,
    limit: 100,
    order: "desc",
  });
  if (items.length === 0) {
    return;
  }
  let changed = false;
  for (const mem of items) {
    const spec = titleToSpec.get(mem.title);
    if (!spec) continue;
    const want = spec.mediaUrls;
    if (JSON.stringify(mem.mediaUrls) === JSON.stringify(want)) continue;
    await store.updateMemory({ ...mem, mediaUrls: [...want] });
    changed = true;
  }
  if (changed) {
    await store.invalidateHomeCache(coupleId);
  }
}
```

### type `DemoMemorySpec`

- Signature: `type DemoMemorySpec = { title: string; description?: string; /** Số ngày trước so với hôm nay (memory_date) */ daysAgo: number; tags: string[]; mediaUrls: string[]; };`
- Lines: 4-11
- Exported: no

```ts
type DemoMemorySpec = {
  title: string;
  description?: string;
  /** Số ngày trước so với hôm nay (memory_date) */
  daysAgo: number;
  tags: string[];
  mediaUrls: string[];
};
```

### function `memoryDateIso`

- Signature: `function memoryDateIso(daysAgo: number): string`
- Lines: 144-149
- Exported: no

```ts
function memoryDateIso(daysAgo: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}
```
