---
title: "Module mobile/src/core/config"
description: "3 files and 1 symbol under mobile/src/core/config."
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
  page: "reference/modules/mobile/src/core/config.md"
  directory: "mobile/src/core/config"
  fileCount: 3
  symbolCount: 1
  workspace: "mobile"
  languages:
    - "TypeScript"
---

# Module mobile/src/core/config

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module index: [All modules](../../../index.md)
- Workspace index: [All workspaces](../../../../../workspaces/index.md)

## Snapshot

- Path: `mobile/src/core/config`
- Descendant files: 3
- Descendant symbols: 1
- Languages: `TypeScript`
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Business Capability

File configuration data for the mobile mobile application.

## Basic Design

Config is inferred as a files and storage area. The visible implementation layers are Configuration. The module also integrates with zod.

### Boundaries

- External interfaces: `zod`

## Detail Design

Primary flow coverage includes Files &amp; storage flow. Representative files are mobile/src/core/config/app-config.ts, mobile/src/core/config/env.ts, mobile/src/core/config/live-ws-url.ts. Observed behavior hints: Environment configuration and settings file

### Components

- Configuration: mobile/src/core/config/app-config.ts
- Configuration: mobile/src/core/config/env.ts
- Configuration: mobile/src/core/config/live-ws-url.ts

## Module Interactions

- `mobile/src/core/api` -> `mobile/src/core/config` (1 dependencies)
- `mobile/src/core/common` -> `mobile/src/core/config` (1 dependencies)

### Interaction Diagram

```mermaid
flowchart LR
  mobile_src_core_api["mobile/src/core/api"]
  mobile_src_core_common["mobile/src/core/common"]
  mobile_src_core_config["mobile/src/core/config"]
  mobile_src_core_api -->|"1 dep"| mobile_src_core_config
  mobile_src_core_common -->|"1 dep"| mobile_src_core_config
```


## Inferred Business Flows

### Files &amp; storage flow

Handle the main files and storage use case exposed by this module.

#### Steps

- mobile/src/core/config/live-ws-url.ts supplies runtime configuration that shapes how the flow behaves. It then hands off to app-config.ts.
- mobile/src/core/config/app-config.ts supplies runtime configuration that shapes how the flow behaves. It then hands off to env.ts.
- mobile/src/core/config/env.ts supplies runtime configuration that shapes how the flow behaves.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_live_ws_url_ts["mobile/src/core/config/live-ws-url.ts\nConfiguration"]
  n2_app_config_ts["mobile/src/core/config/app-config.ts\nConfiguration"]
  n3_env_ts["mobile/src/core/config/env.ts\nConfiguration"]
  caller --> n1_live_ws_url_ts
  n1_live_ws_url_ts -->|"appConfig"| n2_app_config_ts
  n2_app_config_ts --> n3_env_ts
  ext["External dependency"]
  n3_env_ts --> ext
  outcome["Files & storage flow outcome"]
  n3_env_ts --> outcome
```


## Child Modules

No child modules.

## Direct Files

- [mobile/src/core/config/app-config.ts](../../../../files/mobile/src/core/config/app-config.ts.md) — File configuration data for the mobile mobile application.
- [mobile/src/core/config/env.ts](../../../../files/mobile/src/core/config/env.ts.md) — Environment configuration and settings file
- [mobile/src/core/config/live-ws-url.ts](../../../../files/mobile/src/core/config/live-ws-url.ts.md) — Constructs a WebSocket URL for live websockets with the given token and couple ID
