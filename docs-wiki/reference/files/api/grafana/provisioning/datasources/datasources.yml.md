---
title: "api/grafana/provisioning/datasources/datasources.yml"
description: "API Datasource configuration for Loki source in Grafana"
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
  page: "reference/files/api/grafana/provisioning/datasources/datasources.yml.md"
  relativePath: "api/grafana/provisioning/datasources/datasources.yml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/grafana/provisioning/datasources/datasources.yml"
  module: "api/grafana/provisioning/datasources"
  workspace: "api"
  language: "YAML"
  symbolCount: 1
---

# api/grafana/provisioning/datasources/datasources.yml

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [api/grafana/provisioning/datasources](../../../../../modules/api/grafana/provisioning/datasources.md)
- Workspace: [@emplus/api](../../../../../../workspaces/api.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/grafana/provisioning/datasources/datasources.yml`
- Lines: 14
- Symbols: 1

## AI Summary

API Datasource configuration for Loki source in Grafana

## Public API

- `Plain-text index (14 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (14 lines)`
- Lines: 1-14
- Exported: yes

```yaml
apiVersion: 1

datasources:
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    isDefault: true
    jsonData:
      httpMethod: POST
      manageAlerts: true
      prometheusType: Loki
      prometheusVersion: 3.2.0

```
