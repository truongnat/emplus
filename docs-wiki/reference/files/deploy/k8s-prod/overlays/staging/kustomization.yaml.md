---
title: "deploy/k8s-prod/overlays/staging/kustomization.yaml"
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
  page: "reference/files/deploy/k8s-prod/overlays/staging/kustomization.yaml.md"
  relativePath: "deploy/k8s-prod/overlays/staging/kustomization.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/overlays/staging/kustomization.yaml"
  module: "deploy/k8s-prod/overlays/staging"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s-prod/overlays/staging/kustomization.yaml

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [deploy/k8s-prod/overlays/staging](../../../../../modules/deploy/k8s-prod/overlays/staging.md)
- Workspace: [emplus](../../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/overlays/staging/kustomization.yaml`
- Lines: 19
- Symbols: 1

## Public API

- `Plain-text index (19 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (19 lines)`
- Lines: 1-19
- Exported: yes

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: emplus-staging

resources:
  - ../../base
  - namespace.yaml
  - configmap.yaml

images:
  - name: ghcr.io/OWNER/emplus-api
    newName: ghcr.io/OWNER/emplus-api
    newTag: REPLACE_ME

patches:
  - path: ingress.patch.yaml


```
