---
title: "Module api/src/store"
description: "3 files and 64 symbols under api/src/store."
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
  page: "reference/modules/api/src/store.md"
  directory: "api/src/store"
  fileCount: 3
  symbolCount: 64
  workspace: "api"
  languages:
    - "TypeScript"
---

# Module api/src/store

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module index: [All modules](../../index.md)
- Workspace index: [All workspaces](../../../../workspaces/index.md)

## Snapshot

- Path: `api/src/store`
- Descendant files: 3
- Descendant symbols: 64
- Languages: `TypeScript`
- Workspace: [@emplus/api](../../../../workspaces/api.md)

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
- [Order Management Login](../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
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
- [Authentication Password Reset](../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Order Management Read / List](../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Reporting Login](../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Notify](../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## Business Capability

API data store contract

## Basic Design

Store is inferred as a authentication and access control area. The visible implementation layers are Entry point.

### Boundaries

- Entry points: `api/src/store/contracts.ts`, `api/src/store/in-memory-store.ts`, `api/src/store/index.ts`

## Detail Design

Primary flow coverage includes Auth login. Representative files are api/src/store/contracts.ts, api/src/store/in-memory-store.ts, api/src/store/index.ts. Observed behavior hints: Provides 63 documented symbols in api/src/store/in-memory-store.ts.

### Components

- Entry point: api/src/store/contracts.ts
- Entry point: api/src/store/in-memory-store.ts
- Entry point: api/src/store/index.ts

## Module Interactions

- `api/src` -> `api/src/store` (2 dependencies)
- `api/src/modules` -> `api/src/store` (2 dependencies)
- `api/src/store` -> `api/src` (2 dependencies)
- `api/src/store` -> `api/src/shared` (1 dependencies)

### Interaction Diagram

```mermaid
flowchart LR
  api_src["api/src"]
  api_src_modules["api/src/modules"]
  api_src_shared["api/src/shared"]
  api_src_store["api/src/store"]
  api_src -->|"2 dep"| api_src_store
  api_src_modules -->|"2 dep"| api_src_store
  api_src_store -->|"2 dep"| api_src
  api_src_store -->|"1 dep"| api_src_shared
```


## Inferred Business Flows

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- api/src/store/contracts.ts receives the request and turns it into an application-level login command. It then hands off to Anniversary, types.ts.
- api/src/store/in-memory-store.ts receives the request and turns it into an application-level login command. It then hands off to generateInviteCode, Anniversary, DataStore.
- api/src/store/index.ts receives the request and turns it into an application-level login command.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_contracts_ts["api/src/store/contracts.ts\nEntry point"]
  n2_in_memory_store_ts["api/src/store/in-memory-store.ts\nEntry point"]
  n3_index_ts["api/src/store/index.ts\nEntry point"]
  caller --> n2_in_memory_store_ts
  caller --> n3_index_ts
  n2_in_memory_store_ts -->|"DataStore"| n1_contracts_ts
  outcome["Auth login outcome"]
  n3_index_ts --> outcome
```


## Child Modules

No child modules.

## Direct Files

- [api/src/store/contracts.ts](../../../files/api/src/store/contracts.ts.md) — API data store contract
- [api/src/store/in-memory-store.ts](../../../files/api/src/store/in-memory-store.ts.md) — Provides 63 documented symbols in api/src/store/in-memory-store.ts.
- [api/src/store/index.ts](../../../files/api/src/store/index.ts.md) — The main entry point of the Redux store.
