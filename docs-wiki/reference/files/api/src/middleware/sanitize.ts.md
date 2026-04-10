---
title: "api/src/middleware/sanitize.ts"
description: "String sanitization handler for API requests."
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
  page: "reference/files/api/src/middleware/sanitize.ts.md"
  relativePath: "api/src/middleware/sanitize.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/middleware/sanitize.ts"
  module: "api/src/middleware"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 4
---

# api/src/middleware/sanitize.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/middleware](../../../../modules/api/src/middleware.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/middleware/sanitize.ts`
- Lines: 125
- Symbols: 4

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

String sanitization handler for API requests.

### Responsibilities

- sanitizes API request bodies and queries for HTML input

### Usage Notes

- The `sanitizeString` and `sanitizeObject` filters accept input strings with potential XSS vulnerabilities and return sanitized versions that comply with security standards such as OWASP ESAPI.

## Public API

- `function getSanitizedBody(c: any): any`
- `function getSanitizedQuery(c: any): Record<string, any>`

## Symbols

### function `getSanitizedBody`

- Signature: `function getSanitizedBody(c: any): any`
- Lines: 118-120
- Exported: yes

```ts
function getSanitizedBody(c: any): any {
  return (c.req as any).sanitizedBody;
}
```

### function `getSanitizedQuery`

- Signature: `function getSanitizedQuery(c: any): Record<string, any>`
- Lines: 122-124
- Exported: yes

```ts
function getSanitizedQuery(c: any): Record<string, any> {
  return (c.req as any).sanitizedQuery;
}
```

### function `sanitizeString`

- Signature: `function sanitizeString(value: string, maxLength: number): string`
- Lines: 22-36
- Exported: no

```ts
function sanitizeString(value: string, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  // Trim and limit length
  let sanitized = value.trim().slice(0, maxLength);

  // Remove XSS patterns
  for (const pattern of XSS_PATTERNS) {
    sanitized = sanitized.replace(pattern, "");
  }

  return sanitized;
}
```

### function `sanitizeObject`

- Signature: `function sanitizeObject(obj: any, maxDepth = 5): any`
- Lines: 38-86
- Exported: no

```ts
function sanitizeObject(obj: any, maxDepth = 5): any {
  if (maxDepth <= 0) {
    return undefined;
  }

  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    return sanitizeString(obj, MAX_LENGTHS.text);
  }

  if (typeof obj === "number" || typeof obj === "boolean") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item, maxDepth - 1));
  }

  if (typeof obj === "object") {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Determine max length based on key
      let maxLength = MAX_LENGTHS.text;
      if (key.includes("email")) {
        maxLength = MAX_LENGTHS.email;
      } else if (key.includes("password")) {
        maxLength = MAX_LENGTHS.password;
      } else if (key === "id" || key.endsWith("Id")) {
        maxLength = MAX_LENGTHS.id;
      } else if (key === "code" || key === "inviteCode") {
        maxLength = MAX_LENGTHS.code;
      } else if (key === "fullName" || key === "nickname" || key === "name") {
        maxLength = MAX_LENGTHS.name;
      }

      if (typeof value === "string") {
        sanitized[key] = sanitizeString(value, maxLength);
      } else {
        sanitized[key] = sanitizeObject(value, maxDepth - 1);
      }
    }
    return sanitized;
  }

  return obj;
}
```
