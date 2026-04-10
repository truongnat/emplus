---
title: "deploy/k8s-prod/overlays/staging/configmap.yaml"
description: "YAML source file with 1 symbol."
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
  page: "reference/files/deploy/k8s-prod/overlays/staging/configmap.yaml.md"
  relativePath: "deploy/k8s-prod/overlays/staging/configmap.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/overlays/staging/configmap.yaml"
  module: "deploy/k8s-prod/overlays/staging"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s-prod/overlays/staging/configmap.yaml

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [deploy/k8s-prod/overlays/staging](../../../../../modules/deploy/k8s-prod/overlays/staging.md)
- Workspace: [emplus](../../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/overlays/staging/configmap.yaml`
- Lines: 12
- Symbols: 1

## Public API

- `Plain-text index (12 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (12 lines)`
- Lines: 1-12
- Exported: yes

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: emplus-api-config
data:
  DATA_STORE: postgres
  NODE_ENV: production
  PORT: "3000"
  SWAGGER_ENABLED: "false"
  SWAGGER_PATH: /v1/docs


```
