---
title: "deploy/kind/kind-config.yaml"
description: "Config for kind Cluster with emplus-local namespace"
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
  page: "reference/files/deploy/kind/kind-config.yaml.md"
  relativePath: "deploy/kind/kind-config.yaml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/deploy/kind/kind-config.yaml"
  module: "deploy/kind"
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# deploy/kind/kind-config.yaml

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [deploy/kind](../../../modules/deploy/kind.md)
- Workspace: [emplus](../../../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/deploy/kind/kind-config.yaml`
- Lines: 16
- Symbols: 1

## AI Summary

Config for kind Cluster with emplus-local namespace

### Responsibilities

- Cluster

### Usage Notes

- JSON file example for Kind cluster config

## Public API

- `Plain-text index (16 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (16 lines)`
- Lines: 1-16
- Exported: yes

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: emplus-local
nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 30080
        hostPort: 30080
        protocol: TCP
      - containerPort: 30090
        hostPort: 30090
        protocol: TCP
      - containerPort: 30091
        hostPort: 30091
        protocol: TCP

```
