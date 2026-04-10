---
title: "deploy/k8s/jobs/db-seed-job.yaml"
description: "db-seed-job.yaml deployment file for Kubernetes"
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
  page: "reference/files/deploy/k8s/jobs/db-seed-job.yaml.md"
  relativePath: "deploy/k8s/jobs/db-seed-job.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/jobs/db-seed-job.yaml"
  module: "deploy/k8s/jobs"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/jobs/db-seed-job.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/jobs](../../../../modules/deploy/k8s/jobs.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/jobs/db-seed-job.yaml`
- Lines: 23
- Symbols: 1

## AI Summary

db-seed-job.yaml deployment file for Kubernetes

### Responsibilities

- deploys a DB seed job to Kubernetes

### Usage Notes

- This is the template configuration for setting up a DB seed job with Kubernetes

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
  name: db-seed
  namespace: emplus-local
spec:
  backoffLimit: 2
  ttlSecondsAfterFinished: 300
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: db-seed
          image: emplus-api:local
          imagePullPolicy: IfNotPresent
          workingDir: /app/api
          envFrom:
            - configMapRef:
                name: emplus-api-config
            - secretRef:
                name: emplus-secrets
          command: ["bun", "src/db/seed.ts"]

```
