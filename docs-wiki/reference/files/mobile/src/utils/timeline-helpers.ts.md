---
title: "mobile/src/utils/timeline-helpers.ts"
description: "TypeScript source file with 6 symbols."
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
  page: "reference/files/mobile/src/utils/timeline-helpers.ts.md"
  relativePath: "mobile/src/utils/timeline-helpers.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/timeline-helpers.ts"
  module: "mobile/src/utils"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 6
---

# mobile/src/utils/timeline-helpers.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/utils](../../../../modules/mobile/src/utils.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/timeline-helpers.ts`
- Lines: 76
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

## Public API

- `function toDateIso(input: Date): string`
- `function formatGroupDate(dateString: string): string`
- `function parseMediaUrls(mediaUrlsInput: any): string[]`
- `function getMemoryTime(createdAt?: string): string`
- `function getAxisMonthYear(item: MemoryItem): string`

## Symbols

### function `toDateIso`

- Signature: `function toDateIso(input: Date): string`
- Lines: 3-5
- Exported: yes

```ts
function toDateIso(input: Date): string {
  return input.toISOString().slice(0, 10);
}
```

### function `formatGroupDate`

- Signature: `function formatGroupDate(dateString: string): string`
- Lines: 7-22
- Exported: yes

```ts
function formatGroupDate(dateString: string): string {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const yesterday = new Date(now.getTime() - 86400000)
    .toISOString()
    .slice(0, 10);

  if (dateString === today) return "HÔM NAY";
  if (dateString === yesterday) return "HÔM QUA";

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [y, m, d] = dateString.split("-");
    return `${d}/${m}/${y}`;
  }
  return dateString;
}
```

### function `parseMediaUrls`

- Signature: `function parseMediaUrls(mediaUrlsInput: any): string[]`
- Lines: 35-53
- Exported: yes

```ts
function parseMediaUrls(mediaUrlsInput: any): string[] {
  let raw: unknown[] = [];
  if (Array.isArray(mediaUrlsInput)) {
    raw = mediaUrlsInput;
  } else if (typeof mediaUrlsInput === "string") {
    try {
      const parsed = JSON.parse(mediaUrlsInput);
      raw = Array.isArray(parsed) ? parsed : [];
    } catch {
      raw = [];
    }
  }
  const out: string[] = [];
  for (const entry of raw) {
    const u = coerceUrl(entry);
    if (u) out.push(u);
  }
  return out;
}
```

### function `getMemoryTime`

- Signature: `function getMemoryTime(createdAt?: string): string`
- Lines: 55-63
- Exported: yes

```ts
function getMemoryTime(createdAt?: string): string {
  if (!createdAt) return "Bây giờ";
  try {
    const dt = new Date(createdAt);
    return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "Bây giờ";
  }
}
```

### function `getAxisMonthYear`

- Signature: `function getAxisMonthYear(item: MemoryItem): string`
- Lines: 65-75
- Exported: yes

```ts
function getAxisMonthYear(item: MemoryItem): string {
  try {
    const dt = new Date(item.createdAt || item.memoryDate);
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const yy = String(dt.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  } catch {
    return "--/--/--";
  }
}
```

### function `coerceUrl`

- Signature: `function coerceUrl(entry: unknown): string | null`
- Lines: 24-33
- Exported: no

```ts
function coerceUrl(entry: unknown): string | null {
  if (typeof entry === "string" && entry.trim().length > 0) {
    return entry.trim();
  }
  if (entry && typeof entry === "object" && "url" in entry) {
    const u = (entry as { url?: unknown }).url;
    if (typeof u === "string" && u.trim().length > 0) return u.trim();
  }
  return null;
}
```
