---
title: "deploy/k8s/observability/kube-prometheus-stack-values.yaml"
description: "KubePrometheusStackValues.yaml file summary."
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
  page: "reference/files/deploy/k8s/observability/kube-prometheus-stack-values.yaml.md"
  relativePath: "deploy/k8s/observability/kube-prometheus-stack-values.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/observability/kube-prometheus-stack-values.yaml"
  module: "deploy/k8s/observability"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/observability/kube-prometheus-stack-values.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/observability](../../../../modules/deploy/k8s/observability.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/observability/kube-prometheus-stack-values.yaml`
- Lines: 37
- Symbols: 1

## AI Summary

KubePrometheusStackValues.yaml file summary.

### Usage Notes

- Note: The KubePrometheusStackValues.yaml file contains configuration values for the kube-prometheus-stack deployment.

## Public API

- `Plain-text index (37 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (37 lines)`
- Lines: 1-37
- Exported: yes

```yaml
alertmanager:
  enabled: false

kubeControllerManager:
  enabled: false

kubeScheduler:
  enabled: false

kubeEtcd:
  enabled: false

kubeProxy:
  enabled: false

grafana:
  adminPassword: admin123
  defaultDashboardsTimezone: Asia/Ho_Chi_Minh
  service:
    type: NodePort
    nodePort: 30090
  additionalDataSources:
    - name: Loki
      type: loki
      access: proxy
      url: http://loki-gateway.observability.svc.cluster.local
      jsonData:
        maxLines: 5000

prometheus:
  service:
    type: NodePort
    nodePort: 30091
  prometheusSpec:
    retention: 12h
    scrapeInterval: 30s

```
