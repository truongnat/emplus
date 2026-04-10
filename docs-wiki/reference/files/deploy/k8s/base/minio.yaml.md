---
title: "deploy/k8s/base/minio.yaml"
description: "The main deployment definition for MinIO."
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
  page: "reference/files/deploy/k8s/base/minio.yaml.md"
  relativePath: "deploy/k8s/base/minio.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/minio.yaml"
  module: "deploy/k8s/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/base/minio.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/base](../../../../modules/deploy/k8s/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/minio.yaml`
- Lines: 78
- Symbols: 1

## AI Summary

The main deployment definition for MinIO.

### Responsibilities

- The MinIO deployment is responsible for running a single replica of the MinIO container in a deployed state.

### Usage Notes

- The MinIO deployment is typically referenced as part of a larger kubernetes deployment configuration.

## Public API

- `Plain-text index (78 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (78 lines)`
- Lines: 1-78
- Exported: yes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: minio
  namespace: emplus-local
spec:
  replicas: 1
  selector:
    matchLabels:
      app: minio
  template:
    metadata:
      labels:
        app: minio
    spec:
      containers:
        - name: minio
          image: minio/minio:RELEASE.2025-02-18T16-25-55Z
          imagePullPolicy: IfNotPresent
          args: ["server", "/data", "--console-address", ":9001"]
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
          ports:
            - containerPort: 9000
              name: api
            - containerPort: 9001
              name: console
          readinessProbe:
            httpGet:
              path: /minio/health/live
              port: 9000
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /minio/health/live
              port: 9000
            initialDelaySeconds: 30
            periodSeconds: 10
          resources:
            requests:
              cpu: 50m
              memory: 128Mi
            limits:
              cpu: 300m
              memory: 512Mi
          volumeMounts:
            - name: minio-data
              mountPath: /data
      volumes:
        - name: minio-data
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: minio
  namespace: emplus-local
spec:
  selector:
    app: minio
  ports:
    - name: api
      port: 9000
      targetPort: 9000
    - name: console
      port: 9001
      targetPort: 9001

```
