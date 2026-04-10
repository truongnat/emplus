---
title: "api/src/shared/validators/zod.ts"
description: "Provides 10 documented symbols in api/src/shared/validators/zod.ts."
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
  page: "reference/files/api/src/shared/validators/zod.ts.md"
  relativePath: "api/src/shared/validators/zod.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/shared/validators/zod.ts"
  module: "api/src/shared/validators"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 10
---

# api/src/shared/validators/zod.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [api/src/shared/validators](../../../../../modules/api/src/shared/validators.md)
- Workspace: [@emplus/api](../../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/shared/validators/zod.ts`
- Lines: 96
- Symbols: 10

## Related Features

- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Authentication Verification](../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Notifications Verification](../../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Notify](../../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Administration Verification](../../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Notify](../../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

Provides 10 documented symbols in api/src/shared/validators/zod.ts.

### Usage Notes

- /validate/arguments

## Public API

- `interface ValidationOptions`
- `function toValidationError(error: ZodError, options: ValidationOptions = {}): AppError`
- `function parseWithSchema<TSchema extends ZodTypeAny>( schema: TSchema, input: unknown, options: ValidationOptions = {}, ): z.infer<TSchema>`
- `function requiredTrimmedString(message: string)`
- `function optionalTrimmedString()`
- `function isoDateString(message: string)`

## Symbols

### interface `ValidationOptions`

- Signature: `interface ValidationOptions`
- Lines: 10-13
- Exported: yes

```ts
interface ValidationOptions {
  code?: string;
  message?: string;
}
```

### function `toValidationError`

- Signature: `function toValidationError(error: ZodError, options: ValidationOptions = {}): AppError`
- Lines: 44-51
- Exported: yes

```ts
function toValidationError(error: ZodError, options: ValidationOptions = {}): AppError {
  return new AppError(
    400,
    options.code ?? DEFAULT_VALIDATION_CODE,
    options.message ?? DEFAULT_VALIDATION_MESSAGE,
    toIssueDetails(error),
  );
}
```

### function `parseWithSchema`

- Signature: `function parseWithSchema<TSchema extends ZodTypeAny>( schema: TSchema, input: unknown, options: ValidationOptions = {}, ): z.infer<TSchema>`
- Lines: 53-63
- Exported: yes

```ts
function parseWithSchema<TSchema extends ZodTypeAny>(
  schema: TSchema,
  input: unknown,
  options: ValidationOptions = {},
): z.infer<TSchema> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw toValidationError(parsed.error, options);
  }
  return parsed.data;
}
```

### function `requiredTrimmedString`

- Signature: `function requiredTrimmedString(message: string)`
- Lines: 65-67
- Exported: yes

```ts
function requiredTrimmedString(message: string) {
  return z.preprocess((value) => (typeof value === "string" ? value.trim() : value), z.string().min(1, message));
}
```

### function `optionalTrimmedString`

- Signature: `function optionalTrimmedString()`
- Lines: 69-78
- Exported: yes

```ts
function optionalTrimmedString() {
  return z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, z.string().optional());
}
```

### function `isoDateString`

- Signature: `function isoDateString(message: string)`
- Lines: 93-95
- Exported: yes

```ts
function isoDateString(message: string) {
  return requiredTrimmedString(message).refine(isValidIsoDateString, message);
}
```

### interface `ValidationIssueDetail`

- Signature: `interface ValidationIssueDetail`
- Lines: 15-19
- Exported: no

```ts
interface ValidationIssueDetail {
  path: string;
  code: string;
  message: string;
}
```

### function `formatIssuePath`

- Signature: `function formatIssuePath(path: PropertyKey[]): string`
- Lines: 21-34
- Exported: no

```ts
function formatIssuePath(path: PropertyKey[]): string {
  if (path.length === 0) {
    return "body";
  }

  return path
    .map((segment) => {
      if (typeof segment === "number") {
        return `[${segment}]`;
      }
      return String(segment);
    })
    .join(".");
}
```

### function `toIssueDetails`

- Signature: `function toIssueDetails(error: ZodError): ValidationIssueDetail[]`
- Lines: 36-42
- Exported: no

```ts
function toIssueDetails(error: ZodError): ValidationIssueDetail[] {
  return error.issues.map((issue) => ({
    path: formatIssuePath(issue.path),
    code: issue.code,
    message: issue.message,
  }));
}
```

### function `isValidIsoDateString`

- Signature: `function isValidIsoDateString(value: string): boolean`
- Lines: 80-91
- Exported: no

```ts
function isValidIsoDateString(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  try {
    const parsed = parseDate(value);
    return formatDate(parsed) === value;
  } catch {
    return false;
  }
}
```
