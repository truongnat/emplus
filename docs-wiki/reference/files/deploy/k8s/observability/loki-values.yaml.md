---
title: "deploy/k8s/observability/loki-values.yaml"
description: "Kubernetes Lobi Deploying Schema Configuration Configuration"
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
  page: "reference/files/deploy/k8s/observability/loki-values.yaml.md"
  relativePath: "deploy/k8s/observability/loki-values.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/observability/loki-values.yaml"
  module: "deploy/k8s/observability"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/observability/loki-values.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/observability](../../../../modules/deploy/k8s/observability.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/observability/loki-values.yaml`
- Lines: 48
- Symbols: 1

## AI Summary

Kubernetes Lobi Deploying Schema Configuration Configuration

### Responsibilities

- k8s/observability/loki-values.yaml

### Usage Notes

- This provides a configuration for Lobi, including schema version and store options.

## Public API

- `Plain-text index (48 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (48 lines)`
- Lines: 1-48
- Exported: yes

```yaml
deploymentMode: SingleBinary

loki:
  auth_enabled: false
  commonConfig:
    replication_factor: 1
  schemaConfig:
    configs:
      - from: "2024-01-01"
        store: tsdb
        object_store: filesystem
        schema: v13
        index:
          prefix: loki_index_
          period: 24h
  storage:
    type: filesystem

singleBinary:
  replicas: 1
  persistence:
    enabled: true
    size: 5Gi

read:
  replicas: 0
write:
  replicas: 0
backend:
  replicas: 0

chunksCache:
  enabled: false
resultsCache:
  enabled: false

gateway:
  enabled: true

monitoring:
  serviceMonitor:
    enabled: true
  selfMonitoring:
    enabled: false

test:
  enabled: false

```
