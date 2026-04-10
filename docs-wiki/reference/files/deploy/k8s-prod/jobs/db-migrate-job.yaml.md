---
title: "deploy/k8s-prod/jobs/db-migrate-job.yaml"
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
  page: "reference/files/deploy/k8s-prod/jobs/db-migrate-job.yaml.md"
  relativePath: "deploy/k8s-prod/jobs/db-migrate-job.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/jobs/db-migrate-job.yaml"
  module: "deploy/k8s-prod/jobs"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s-prod/jobs/db-migrate-job.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s-prod/jobs](../../../../modules/deploy/k8s-prod/jobs.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/jobs/db-migrate-job.yaml`
- Lines: 26
- Symbols: 1

## Public API

- `Plain-text index (26 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (26 lines)`
- Lines: 1-26
- Exported: yes

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migrate
spec:
  backoffLimit: 1
  ttlSecondsAfterFinished: 300
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: db-migrate
          image: ghcr.io/OWNER/emplus-api:REPLACE_ME
          imagePullPolicy: IfNotPresent
          workingDir: /app/api
          env:
            - name: NODE_ENV
              value: production
          envFrom:
            - configMapRef:
                name: emplus-api-config
            - secretRef:
                name: emplus-secrets
          command: ["bun", "src/db/migrate.ts"]


```
