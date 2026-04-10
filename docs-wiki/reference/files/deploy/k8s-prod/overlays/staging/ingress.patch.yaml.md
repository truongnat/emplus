---
title: "deploy/k8s-prod/overlays/staging/ingress.patch.yaml"
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
  page: "reference/files/deploy/k8s-prod/overlays/staging/ingress.patch.yaml.md"
  relativePath: "deploy/k8s-prod/overlays/staging/ingress.patch.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/overlays/staging/ingress.patch.yaml"
  module: "deploy/k8s-prod/overlays/staging"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s-prod/overlays/staging/ingress.patch.yaml

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [deploy/k8s-prod/overlays/staging](../../../../../modules/deploy/k8s-prod/overlays/staging.md)
- Workspace: [emplus](../../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/overlays/staging/ingress.patch.yaml`
- Lines: 22
- Symbols: 1

## Public API

- `Plain-text index (22 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (22 lines)`
- Lines: 1-22
- Exported: yes

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: emplus-api
spec:
  tls:
    - hosts:
        - api-staging.emplus.app
      secretName: emplus-api-tls
  rules:
    - host: api-staging.emplus.app
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
