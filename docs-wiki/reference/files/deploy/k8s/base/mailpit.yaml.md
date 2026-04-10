---
title: "deploy/k8s/base/mailpit.yaml"
description: "DeployMailpit Deployment and Service definitions"
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
  page: "reference/files/deploy/k8s/base/mailpit.yaml.md"
  relativePath: "deploy/k8s/base/mailpit.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/mailpit.yaml"
  module: "deploy/k8s/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s/base/mailpit.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s/base](../../../../modules/deploy/k8s/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s/base/mailpit.yaml`
- Lines: 58
- Symbols: 1

## AI Summary

DeployMailpit Deployment and Service definitions

### Usage Notes

- The `matchLabels` policy allows matching application labels ('app: mailpit') between the `name` of this Service (deployment) and specified resource names.

## Public API

- `Plain-text index (58 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (58 lines)`
- Lines: 1-58
- Exported: yes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mailpit
  namespace: emplus-local
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mailpit
  template:
    metadata:
      labels:
        app: mailpit
    spec:
      containers:
        - name: mailpit
          image: axllent/mailpit:v1.27
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 1025
              name: smtp
            - containerPort: 8025
              name: http
          readinessProbe:
            tcpSocket:
              port: 1025
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 1025
            initialDelaySeconds: 20
            periodSeconds: 10
          resources:
            requests:
              cpu: 20m
              memory: 32Mi
            limits:
              cpu: 100m
              memory: 128Mi
---
apiVersion: v1
kind: Service
metadata:
  name: mailpit
  namespace: emplus-local
spec:
  selector:
    app: mailpit
  ports:
    - name: smtp
      port: 1025
      targetPort: 1025
    - name: http
      port: 8025
      targetPort: 8025

```
