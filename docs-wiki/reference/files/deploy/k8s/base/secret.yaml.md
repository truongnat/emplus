---
title: "deploy/k8s/base/secret.yaml"
description: "A base secret resource in the Emplus namespace."
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
  page: "reference/files/deploy/k8s/base/secret.yaml.md"
  relativePath: "deploy/k8s/base/secret.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/secret.yaml"
  module: "deploy/k8s/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/base/secret.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/base](../../../../modules/deploy/k8s/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/secret.yaml`
- Lines: 15
- Symbols: 1

## AI Summary

A base secret resource in the Emplus namespace.

## Public API

- `Plain-text index (15 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (15 lines)`
- Lines: 1-15
- Exported: yes

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: emplus-secrets
  namespace: emplus-local
type: Opaque
stringData:
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres
  POSTGRES_DB: emplus
  MINIO_ROOT_USER: emplus_local_admin
  MINIO_ROOT_PASSWORD: emplus-local-minio-2026
  MINIO_ACCESS_KEY: emplus_local_admin
  MINIO_SECRET_KEY: emplus-local-minio-2026

```
