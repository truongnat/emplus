---
title: "api/loki/config.yml"
description: "LOKI configuration file syntax and usage"
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
  page: "reference/files/api/loki/config.yml.md"
  relativePath: "api/loki/config.yml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/loki/config.yml"
  module: "api/loki"
  workspace: "api"
  language: "YAML"
  symbolCount: 1
---

# api/loki/config.yml

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [api/loki](../../../modules/api/loki.md)
- Workspace: [@emplus/api](../../../../workspaces/api.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/loki/config.yml`
- Lines: 34
- Symbols: 1

## AI Summary

LOKI configuration file syntax and usage

### Usage Notes

- See file for detailed documentation

## Public API

- `Plain-text index (34 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (34 lines)`
- Lines: 1-34
- Exported: yes

```yaml
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: 127.0.0.1
  path_prefix: /tmp/loki
  storage:
    filesystem:
      chunks_directory: /tmp/loki/chunks
      rules_directory: /tmp/loki/rules
  replication_factor: 1
  ring:
    instance_addr: 127.0.0.1
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2024-01-01
      store: boltdb-shipper
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

limits_config:
  reject_old_samples: true
  reject_old_samples_max_age: 168h
  allow_structured_metadata: false

```
