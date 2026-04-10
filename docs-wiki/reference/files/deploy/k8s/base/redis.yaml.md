---
title: "deploy/k8s/base/redis.yaml"
description: "A Redis Deployment with a Service."
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
  page: "reference/files/deploy/k8s/base/redis.yaml.md"
  relativePath: "deploy/k8s/base/redis.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/redis.yaml"
  module: "deploy/k8s/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/base/redis.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/base](../../../../modules/deploy/k8s/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/redis.yaml`
- Lines: 54
- Symbols: 1

## AI Summary

A Redis Deployment with a Service.

### Usage Notes

- This Redis Service exposes a single Redis server on port 6379.

## Public API

- `Plain-text index (54 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (54 lines)`
- Lines: 1-54
- Exported: yes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: emplus-local
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis:7-alpine
          imagePullPolicy: IfNotPresent
          args: ["redis-server", "--appendonly", "yes"]
          ports:
            - containerPort: 6379
              name: redis
          readinessProbe:
            exec:
              command: ["redis-cli", "ping"]
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            exec:
              command: ["redis-cli", "ping"]
            initialDelaySeconds: 20
            periodSeconds: 10
          resources:
            requests:
              cpu: 50m
              memory: 64Mi
            limits:
              cpu: 300m
              memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: emplus-local
spec:
  selector:
    app: redis
  ports:
    - name: redis
      port: 6379
      targetPort: 6379

```
