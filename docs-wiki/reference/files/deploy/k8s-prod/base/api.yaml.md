---
title: "deploy/k8s-prod/base/api.yaml"
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
  page: "reference/files/deploy/k8s-prod/base/api.yaml.md"
  relativePath: "deploy/k8s-prod/base/api.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/base/api.yaml"
  module: "deploy/k8s-prod/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s-prod/base/api.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s-prod/base](../../../../modules/deploy/k8s-prod/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/base/api.yaml`
- Lines: 51
- Symbols: 1

## Public API

- `Plain-text index (51 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (51 lines)`
- Lines: 1-51
- Exported: yes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: emplus-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: emplus-api
  template:
    metadata:
      labels:
        app: emplus-api
    spec:
      containers:
        - name: api
          image: ghcr.io/OWNER/emplus-api:REPLACE_ME
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 3000
              name: http
          envFrom:
            - configMapRef:
                name: emplus-api-config
            - secretRef:
                name: emplus-secrets
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 20
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 6
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 60
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 6
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi


```
