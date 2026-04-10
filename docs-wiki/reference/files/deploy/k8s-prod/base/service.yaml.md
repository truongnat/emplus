---
title: "deploy/k8s-prod/base/service.yaml"
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
  page: "reference/files/deploy/k8s-prod/base/service.yaml.md"
  relativePath: "deploy/k8s-prod/base/service.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/base/service.yaml"
  module: "deploy/k8s-prod/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s-prod/base/service.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s-prod/base](../../../../modules/deploy/k8s-prod/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/base/service.yaml`
- Lines: 14
- Symbols: 1

## Public API

- `Plain-text index (14 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (14 lines)`
- Lines: 1-14
- Exported: yes

```yaml
apiVersion: v1
kind: Service
metadata:
  name: emplus-api
spec:
  type: ClusterIP
  selector:
    app: emplus-api
  ports:
    - name: http
      port: 3000
      targetPort: 3000


```
