---
title: "Module mobile/src/core"
description: "16 files and 47 symbols under mobile/src/core."
layout: "doc"
outline:
  - 2
  - 3
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--module"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "module"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/modules/mobile/src/core.md"
  directory: "mobile/src/core"
  fileCount: 16
  symbolCount: 47
  workspace: "mobile"
  languages:
    - "TypeScript"
---

# Module mobile/src/core

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module index: [All modules](../../index.md)
- Workspace index: [All workspaces](../../../../workspaces/index.md)

## Snapshot

- Path: `mobile/src/core`
- Descendant files: 16
- Descendant symbols: 47
- Languages: `TypeScript`
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Notify](../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Notifications Login](../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Storage Login](../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Login](../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Notify](../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [Search Create](../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Storage Notify](../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Reporting Login](../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Notify](../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.

## Business Capability

Error class responsible for capturing and handling API errors.

## Basic Design

Core is inferred as a authentication and access control area. The visible implementation layers are Entry point, Configuration, UI surface. The module also integrates with @react-native-async-storage, expo-secure-store, zod, react, react-native.

### Boundaries

- Entry points: `mobile/src/core/common/core.ts`, `mobile/src/core/factory.tsx`, `mobile/src/core/variants.ts`, `mobile/src/core/api/api-error.ts`, `mobile/src/core/api/api-log.ts`, `mobile/src/core/api/api-types.ts`
- External interfaces: `@react-native-async-storage`, `expo-secure-store`, `zod`, `react`, `react-native`

## Detail Design

Primary flow coverage includes Auth login. Representative files are mobile/src/core/api/api-error.ts, mobile/src/core/api/api-log.ts, mobile/src/core/api/api-types.ts, mobile/src/core/api/index.ts, mobile/src/core/api/to-display-error.ts. Observed behavior hints: Provides 2 documented symbols in mobile/src/core/api/api-log.ts.

### Components

- UI surface: mobile/src/core/common/core.ts
- UI surface: mobile/src/core/factory.tsx
- UI surface: mobile/src/core/variants.ts
- Entry point: mobile/src/core/api/api-error.ts
- Entry point: mobile/src/core/api/api-log.ts
- Entry point: mobile/src/core/api/api-types.ts
- Entry point: mobile/src/core/api/index.ts
- Entry point: mobile/src/core/api/to-display-error.ts

## Module Interactions

- `mobile/src/core` -> `mobile/src/theme` (2 dependencies)

### Interaction Diagram

```mermaid
flowchart LR
  mobile_src_core["mobile/src/core"]
  mobile_src_theme["mobile/src/theme"]
  mobile_src_core -->|"2 dep"| mobile_src_theme
```


## Inferred Business Flows

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- The user or operator enters the flow through mobile/src/core/common/core.ts, which surfaces the login interaction.
- The user or operator enters the flow through mobile/src/core/factory.tsx, which surfaces the login interaction. It then hands off to index.ts, createVariants, variants.ts.
- The user or operator enters the flow through mobile/src/core/variants.ts, which surfaces the login interaction. It then hands off to index.ts.
- mobile/src/core/api/api-error.ts receives the request and turns it into an application-level login command.
- mobile/src/core/api/api-log.ts receives the request and turns it into an application-level login command.
- mobile/src/core/api/api-types.ts receives the request and turns it into an application-level login command.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_core_ts["mobile/src/core/common/core.ts\nUI surface"]
  n2_factory_tsx["mobile/src/core/factory.tsx\nUI surface"]
  n3_variants_ts["mobile/src/core/variants.ts\nUI surface"]
  n4_api_error_ts["mobile/src/core/api/api-error.ts\nEntry point"]
  n5_api_log_ts["mobile/src/core/api/api-log.ts\nEntry point"]
  n6_api_types_ts["mobile/src/core/api/api-types.ts\nEntry point"]
  caller --> n1_core_ts
  caller --> n2_factory_tsx
  caller --> n4_api_error_ts
  caller --> n5_api_log_ts
  caller --> n6_api_types_ts
  n2_factory_tsx -->|"createVariants"| n3_variants_ts
  ext["External dependency"]
  n6_api_types_ts --> ext
  outcome["Auth login outcome"]
  n6_api_types_ts --> outcome
```


## Child Modules

- [mobile/src/core/api](core/api.md) - 7 files, 35 symbols
- [mobile/src/core/common](core/common.md) - 4 files, 5 symbols
- [mobile/src/core/config](core/config.md) - 3 files, 1 symbol

## Direct Files

- [mobile/src/core/factory.tsx](../../../files/mobile/src/core/factory.tsx.md) — A factory function for creating React components.
- [mobile/src/core/variants.ts](../../../files/mobile/src/core/variants.ts.md) — The `createVariants` function generates a set of CSS variants based on a given configuration.
