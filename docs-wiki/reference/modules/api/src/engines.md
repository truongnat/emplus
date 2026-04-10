---
title: "Module api/src/engines"
description: "2 files and 10 symbols under api/src/engines."
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
  page: "reference/modules/api/src/engines.md"
  directory: "api/src/engines"
  fileCount: 2
  symbolCount: 10
  workspace: "api"
  languages:
    - "TypeScript"
---

# Module api/src/engines

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module index: [All modules](../../index.md)
- Workspace index: [All workspaces](../../../../workspaces/index.md)

## Snapshot

- Path: `api/src/engines`
- Descendant files: 2
- Descendant symbols: 10
- Languages: `TypeScript`
- Workspace: [@emplus/api](../../../../workspaces/api.md)

## Related Features

- [Authentication Read / List](../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Order Management Read / List](../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## Business Capability

Compute and return upcoming anniversary events for couples

## Basic Design

Engines is inferred as a external integrations area. The visible implementation layers are Entry point.

### Boundaries

- Entry points: `api/src/engines/anniversary.ts`, `api/src/engines/emotional.ts`

## Detail Design

Primary flow coverage includes External Integrations listing. Representative files are api/src/engines/anniversary.ts, api/src/engines/emotional.ts. Observed behavior hints: Defines and uses emotional phases and context for various interactions.

### Components

- Entry point: api/src/engines/anniversary.ts
- Entry point: api/src/engines/emotional.ts

## Module Interactions

- `api/src/modules` -> `api/src/engines` (3 dependencies)
- `api/src/engines` -> `api/src` (2 dependencies)
- `api/src/engines` -> `api/src/utils` (2 dependencies)
- `api/src/__tests__` -> `api/src/engines` (1 dependencies)

### Interaction Diagram

```mermaid
flowchart LR
  api_src["api/src"]
  api_src___tests__["api/src/__tests__"]
  api_src_engines["api/src/engines"]
  api_src_modules["api/src/modules"]
  api_src_utils["api/src/utils"]
  api_src_modules -->|"3 dep"| api_src_engines
  api_src_engines -->|"2 dep"| api_src
  api_src_engines -->|"2 dep"| api_src_utils
  api_src___tests__ -->|"1 dep"| api_src_engines
```


## Inferred Business Flows

### External Integrations listing

Execute the module's listing use case inside external integrations.

#### Steps

- api/src/engines/anniversary.ts receives the request and turns it into an application-level listing command. It then hands off to Couple, date.ts, types.ts.
- api/src/engines/emotional.ts receives the request and turns it into an application-level listing command. It then hands off to EmotionalCycle, date.ts, types.ts.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_anniversary_ts["api/src/engines/anniversary.ts\nEntry point"]
  n2_emotional_ts["api/src/engines/emotional.ts\nEntry point"]
  caller --> n1_anniversary_ts
  n1_anniversary_ts --> n2_emotional_ts
  outcome["External Integrations listing outcome"]
  n2_emotional_ts --> outcome
```


## Child Modules

No child modules.

## Direct Files

- [api/src/engines/anniversary.ts](../../../files/api/src/engines/anniversary.ts.md) — Compute and return upcoming anniversary events for couples
- [api/src/engines/emotional.ts](../../../files/api/src/engines/emotional.ts.md) — Defines and uses emotional phases and context for various interactions.
