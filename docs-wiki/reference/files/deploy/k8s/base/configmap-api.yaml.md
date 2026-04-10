---
title: "deploy/k8s/base/configmap-api.yaml"
description: "ConfigMap for emplus API, containing environment variables and other data"
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
  page: "reference/files/deploy/k8s/base/configmap-api.yaml.md"
  relativePath: "deploy/k8s/base/configmap-api.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/configmap-api.yaml"
  module: "deploy/k8s/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/base/configmap-api.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/base](../../../../modules/deploy/k8s/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/configmap-api.yaml`
- Lines: 23
- Symbols: 1

## AI Summary

ConfigMap for emplus API, containing environment variables and other data

## Public API

- `Plain-text index (23 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (23 lines)`
- Lines: 1-23
- Exported: yes

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: emplus-api-config
  namespace: emplus-local
data:
  DATA_STORE: postgres
  DATABASE_URL: postgresql://postgres:postgres@postgres:5432/emplus
  READ_DATABASE_URL: postgresql://postgres:postgres@postgres:5432/emplus
  REDIS_URL: redis://redis:6379
  MAIL_HOST: mailpit
  MAIL_PORT: "1025"
  MAIL_FROM: no-reply@emplus.local
  MINIO_ENDPOINT: http://minio:9000
  MINIO_REGION: us-east-1
  MINIO_BUCKET: emplus
  MINIO_USE_SSL: "false"
  SWAGGER_ENABLED: "true"
  SWAGGER_PATH: /v1/docs
  ALLOW_MOCK_OAUTH: "false"
  NODE_ENV: development
  PORT: "3000"

```
