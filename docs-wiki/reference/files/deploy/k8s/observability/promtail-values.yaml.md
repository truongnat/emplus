---
title: "deploy/k8s/observability/promtail-values.yaml"
description: "Observability Prometheus Configuration"
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
  page: "reference/files/deploy/k8s/observability/promtail-values.yaml.md"
  relativePath: "deploy/k8s/observability/promtail-values.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/observability/promtail-values.yaml"
  module: "deploy/k8s/observability"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/observability/promtail-values.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/observability](../../../../modules/deploy/k8s/observability.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/observability/promtail-values.yaml`
- Lines: 12
- Symbols: 1

## AI Summary

Observability Prometheus Configuration

### Usage Notes

- This file specifies the configuration for Prometheus in Observability.

## Public API

- `Plain-text index (12 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (12 lines)`
- Lines: 1-12
- Exported: yes

```yaml
config:
  clients:
    - url: http://loki-gateway.observability.svc.cluster.local/loki/api/v1/push

resources:
  requests:
    cpu: 25m
    memory: 64Mi
  limits:
    cpu: 150m
    memory: 256Mi

```
