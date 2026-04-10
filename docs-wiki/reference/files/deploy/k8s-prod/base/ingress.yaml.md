---
title: "deploy/k8s-prod/base/ingress.yaml"
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
  page: "reference/files/deploy/k8s-prod/base/ingress.yaml.md"
  relativePath: "deploy/k8s-prod/base/ingress.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/base/ingress.yaml"
  module: "deploy/k8s-prod/base"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s-prod/base/ingress.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s-prod/base](../../../../modules/deploy/k8s-prod/base.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/base/ingress.yaml`
- Lines: 25
- Symbols: 1

## Public API

- `Plain-text index (25 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (25 lines)`
- Lines: 1-25
- Exported: yes

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: emplus-api
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: traefik
  tls:
    - hosts:
        - api.example.com
      secretName: emplus-api-tls
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: emplus-api
                port:
                  number: 3000


```
