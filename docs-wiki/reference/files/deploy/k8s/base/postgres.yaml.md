---
title: "deploy/k8s/base/postgres.yaml"
description: "A deployment resource for PostgreSQL service in the emplus-local namespace."
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
  page: "reference/files/deploy/k8s/base/postgres.yaml.md"
  relativePath: "deploy/k8s/base/postgres.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/postgres.yaml"
  module: "deploy/k8s/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/base/postgres.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/base](../../../../modules/deploy/k8s/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/postgres.yaml`
- Lines: 75
- Symbols: 1

## AI Summary

A deployment resource for PostgreSQL service in the emplus-local namespace.

### Usage Notes

- The `postgres` deployment is a managed PostgreSQL server that runs on port 5432.
- 'emplus-local' is the namespace where this deployment resides, which can be customized by setting environment variables on a secret named 'empluss-secrets'.

## Public API

- `Plain-text index (75 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (75 lines)`
- Lines: 1-75
- Exported: yes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: emplus-local
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:15-alpine
          imagePullPolicy: IfNotPresent
          env:
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: emplus-secrets
                  key: POSTGRES_USER
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: emplus-secrets
                  key: POSTGRES_PASSWORD
            - name: POSTGRES_DB
              valueFrom:
                secretKeyRef:
                  name: emplus-secrets
                  key: POSTGRES_DB
          ports:
            - containerPort: 5432
              name: postgres
          readinessProbe:
            exec:
              command: ["/bin/sh", "-c", "pg_isready -U $POSTGRES_USER -d $POSTGRES_DB"]
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            exec:
              command: ["/bin/sh", "-c", "pg_isready -U $POSTGRES_USER -d $POSTGRES_DB"]
            initialDelaySeconds: 30
            periodSeconds: 10
          resources:
            requests:
              cpu: 100m
              memory: 256Mi
            limits:
              cpu: 500m
              memory: 512Mi
          volumeMounts:
            - name: postgres-data
              mountPath: /var/lib/postgresql/data
      volumes:
        - name: postgres-data
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: emplus-local
spec:
  selector:
    app: postgres
  ports:
    - name: postgres
      port: 5432
      targetPort: 5432

```
