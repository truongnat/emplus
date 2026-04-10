---
title: "deploy/k8s-prod/cluster/clusterissuer.yaml"
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
  page: "reference/files/deploy/k8s-prod/cluster/clusterissuer.yaml.md"
  relativePath: "deploy/k8s-prod/cluster/clusterissuer.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/cluster/clusterissuer.yaml"
  module: "deploy/k8s-prod/cluster"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/k8s-prod/cluster/clusterissuer.yaml

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [deploy/k8s-prod/cluster](../../../../modules/deploy/k8s-prod/cluster.md)
- Workspace: [emplus](../../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/k8s-prod/cluster/clusterissuer.yaml`
- Lines: 16
- Symbols: 1

## Public API

- `Plain-text index (16 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (16 lines)`
- Lines: 1-16
- Exported: yes

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: you@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: traefik


```
