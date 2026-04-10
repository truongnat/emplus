---
title: "deploy/k8s/base/kustomization.yaml"
description: "A Kustomization file for deploying kubernetes applications."
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
  page: "reference/files/deploy/k8s/base/kustomization.yaml.md"
  relativePath: "deploy/k8s/base/kustomization.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/kustomization.yaml"
  module: "deploy/k8s/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/base/kustomization.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/base](../../../../modules/deploy/k8s/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/kustomization.yaml`
- Lines: 13
- Symbols: 1

## AI Summary

A Kustomization file for deploying kubernetes applications.

## Public API

- `Plain-text index (13 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (13 lines)`
- Lines: 1-13
- Exported: yes

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - namespace.yaml
  - secret.yaml
  - configmap-api.yaml
  - postgres.yaml
  - redis.yaml
  - mailpit.yaml
  - minio.yaml
  - api.yaml

```
