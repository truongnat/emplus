---
title: "Module api/grafana/provisioning/datasources"
description: "1 file and 1 symbol under api/grafana/provisioning/datasources."
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
  page: "reference/modules/api/grafana/provisioning/datasources.md"
  directory: "api/grafana/provisioning/datasources"
  fileCount: 1
  symbolCount: 1
  workspace: "api"
  languages:
    - "YAML"
---

# Module api/grafana/provisioning/datasources

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module index: [All modules](../../../index.md)
- Workspace index: [All workspaces](../../../../../workspaces/index.md)

## Snapshot

- Path: `api/grafana/provisioning/datasources`
- Descendant files: 1
- Descendant symbols: 1
- Languages: `YAML`
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Business Capability

API Datasource configuration for Loki source in Grafana

## Basic Design

Datasources is inferred as a files and storage area. The visible implementation layers are Entry point.

### Boundaries

- Entry points: `api/grafana/provisioning/datasources/datasources.yml`

## Detail Design

Primary flow coverage includes Files &amp; storage flow. Representative files are api/grafana/provisioning/datasources/datasources.yml.

### Components

- Entry point: api/grafana/provisioning/datasources/datasources.yml

## Inferred Business Flows

### Files &amp; storage flow

Handle the main files and storage use case exposed by this module.

#### Steps

- api/grafana/provisioning/datasources/datasources.yml receives the request and turns it into an application-level request handling command.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_datasources_yml["api/grafana/provisioning/datasources/datasources.yml\nEntry point"]
  caller --> n1_datasources_yml
  outcome["Files & storage flow outcome"]
  n1_datasources_yml --> outcome
```


## Child Modules

No child modules.

## Direct Files

- [api/grafana/provisioning/datasources/datasources.yml](../../../../files/api/grafana/provisioning/datasources/datasources.yml.md) — API Datasource configuration for Loki source in Grafana
