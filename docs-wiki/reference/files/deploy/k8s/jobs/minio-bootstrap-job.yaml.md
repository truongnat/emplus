---
title: "deploy/k8s/jobs/minio-bootstrap-job.yaml"
description: "This Job configuration for MinIO uses the `minio/mc` image and defines a script to wait for MinIO bucket creation."
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
  page: "reference/files/deploy/k8s/jobs/minio-bootstrap-job.yaml.md"
  relativePath: "deploy/k8s/jobs/minio-bootstrap-job.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/jobs/minio-bootstrap-job.yaml"
  module: "deploy/k8s/jobs"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/jobs/minio-bootstrap-job.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/jobs](../../../../modules/deploy/k8s/jobs.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/jobs/minio-bootstrap-job.yaml`
- Lines: 39
- Symbols: 1

## AI Summary

This Job configuration for MinIO uses the `minio/mc` image and defines a script to wait for MinIO bucket creation.

### Responsibilities

- script execution
- image pull

### Usage Notes

- The job runs in a ephemeral namespace for deployment and uses ephemeral secrets for configuration.

## Public API

- `Plain-text index (39 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (39 lines)`
- Lines: 1-39
- Exported: yes

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: minio-bootstrap
  namespace: emplus-local
spec:
  backoffLimit: 4
  ttlSecondsAfterFinished: 300
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: mc
          image: minio/mc:RELEASE.2025-02-15T10-36-16Z
          imagePullPolicy: IfNotPresent
          env:
            - name: MINIO_ROOT_USER
              valueFrom:
                secretKeyRef:
                  name: emplus-secrets
                  key: MINIO_ROOT_USER
            - name: MINIO_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: emplus-secrets
                  key: MINIO_ROOT_PASSWORD
          command:
            - /bin/sh
            - -c
            - |
              set -e
              until /usr/bin/mc alias set local http://minio:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" >/dev/null 2>&1; do
                echo "Waiting for MinIO..."
                sleep 1
              done
              /usr/bin/mc mb -p local/emplus || true
              /usr/bin/mc anonymous set download local/emplus || true
              echo "MinIO bucket emplus is ready"

```
