---
title: "deploy/k8s/jobs/db-init-job.yaml"
description: "DB Initialisation Job"
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
  page: "reference/files/deploy/k8s/jobs/db-init-job.yaml.md"
  relativePath: "deploy/k8s/jobs/db-init-job.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/jobs/db-init-job.yaml"
  module: "deploy/k8s/jobs"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/jobs/db-init-job.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/jobs](../../../../modules/deploy/k8s/jobs.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/jobs/db-init-job.yaml`
- Lines: 23
- Symbols: 1

## AI Summary

DB Initialisation Job

### Responsibilities

- Job resource
- Job specification
- Container image

### Usage Notes

- Creates a Database Initialisation job that runs the "db/migrate.ts" script.

## Public API

- `Plain-text index (23 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (23 lines)`
- Lines: 1-23
- Exported: yes

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-init
  namespace: emplus-local
spec:
  backoffLimit: 2
  ttlSecondsAfterFinished: 300
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: db-init
          image: emplus-api:local
          imagePullPolicy: IfNotPresent
          workingDir: /app/api
          envFrom:
            - configMapRef:
                name: emplus-api-config
            - secretRef:
                name: emplus-secrets
          command: ["bun", "src/db/migrate.ts"]

```
