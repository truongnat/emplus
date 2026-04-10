---
title: "Workspace emplus"
description: "33 files and 33 symbols in workspace emplus."
layout: "doc"
outline:
  - 2
  - 3
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--workspace"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "workspace"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "workspaces/root.md"
  directory: ""
  packageFile: "package.json"
  fileCount: 33
  symbolCount: 33
  languages:
    - "JSON"
    - "YAML"
---

# Workspace emplus

- Overview: [emplus Docs Wiki](../index.md)
- Summary: [SUMMARY](../SUMMARY.md)
- Workspace index: [All workspaces](index.md)
- Feature catalog: [All features](../features/index.md)
- Module index: [All modules](../reference/modules/index.md)

## Snapshot

- Directory: `.`
- Package file: `package.json`
- Files: 33
- Symbols: 33
- Languages: `JSON`, `YAML`
- Version: `1.0.0`

## Basic Design

emplus groups 10 modules that mostly cover authentication and access control, files and storage.

## Flow Highlights

- Auth login - Authenticate the caller, validate credentials, and establish a usable session or token.
- Files &amp; storage flow - Handle the main files and storage use case exposed by this module.
- Files &amp; storage flow - Handle the main files and storage use case exposed by this module.
- Files &amp; storage flow - Handle the main files and storage use case exposed by this module.

## Modules

- [(root)](../reference/modules/root.md) - 399 files, 1051 symbols
- [deploy/k8s-prod/base](../reference/modules/deploy/k8s-prod/base.md) - 4 files, 4 symbols
- [deploy/k8s-prod/cluster](../reference/modules/deploy/k8s-prod/cluster.md) - 1 file, 1 symbol
- [deploy/k8s-prod/jobs](../reference/modules/deploy/k8s-prod/jobs.md) - 1 file, 1 symbol
- [deploy/k8s-prod/overlays/prod](../reference/modules/deploy/k8s-prod/overlays/prod.md) - 4 files, 4 symbols
- [deploy/k8s-prod/overlays/staging](../reference/modules/deploy/k8s-prod/overlays/staging.md) - 4 files, 4 symbols
- [deploy/k8s/base](../reference/modules/deploy/k8s/base.md) - 9 files, 9 symbols
- [deploy/k8s/jobs](../reference/modules/deploy/k8s/jobs.md) - 3 files, 3 symbols
- [deploy/k8s/observability](../reference/modules/deploy/k8s/observability.md) - 3 files, 3 symbols
- [deploy/kind](../reference/modules/deploy/kind.md) - 1 file, 1 symbol

## Files

- [deploy/k8s-prod/base/api.yaml](../reference/files/deploy/k8s-prod/base/api.yaml.md)
- [deploy/k8s-prod/base/ingress.yaml](../reference/files/deploy/k8s-prod/base/ingress.yaml.md)
- [deploy/k8s-prod/base/kustomization.yaml](../reference/files/deploy/k8s-prod/base/kustomization.yaml.md)
- [deploy/k8s-prod/base/service.yaml](../reference/files/deploy/k8s-prod/base/service.yaml.md)
- [deploy/k8s-prod/cluster/clusterissuer.yaml](../reference/files/deploy/k8s-prod/cluster/clusterissuer.yaml.md)
- [deploy/k8s-prod/jobs/db-migrate-job.yaml](../reference/files/deploy/k8s-prod/jobs/db-migrate-job.yaml.md)
- [deploy/k8s-prod/overlays/prod/configmap.yaml](../reference/files/deploy/k8s-prod/overlays/prod/configmap.yaml.md)
- [deploy/k8s-prod/overlays/prod/ingress.patch.yaml](../reference/files/deploy/k8s-prod/overlays/prod/ingress.patch.yaml.md)
- [deploy/k8s-prod/overlays/prod/kustomization.yaml](../reference/files/deploy/k8s-prod/overlays/prod/kustomization.yaml.md)
- [deploy/k8s-prod/overlays/prod/namespace.yaml](../reference/files/deploy/k8s-prod/overlays/prod/namespace.yaml.md)
- [deploy/k8s-prod/overlays/staging/configmap.yaml](../reference/files/deploy/k8s-prod/overlays/staging/configmap.yaml.md)
- [deploy/k8s-prod/overlays/staging/ingress.patch.yaml](../reference/files/deploy/k8s-prod/overlays/staging/ingress.patch.yaml.md)
- [deploy/k8s-prod/overlays/staging/kustomization.yaml](../reference/files/deploy/k8s-prod/overlays/staging/kustomization.yaml.md)
- [deploy/k8s-prod/overlays/staging/namespace.yaml](../reference/files/deploy/k8s-prod/overlays/staging/namespace.yaml.md)
- [deploy/k8s/base/api.yaml](../reference/files/deploy/k8s/base/api.yaml.md) — Deployment configuration for emplus-api.
- [deploy/k8s/base/configmap-api.yaml](../reference/files/deploy/k8s/base/configmap-api.yaml.md) — ConfigMap for emplus API, containing environment variables and other data
- [deploy/k8s/base/kustomization.yaml](../reference/files/deploy/k8s/base/kustomization.yaml.md) — A Kustomization file for deploying kubernetes applications.
- [deploy/k8s/base/mailpit.yaml](../reference/files/deploy/k8s/base/mailpit.yaml.md) — DeployMailpit Deployment and Service definitions
- [deploy/k8s/base/minio.yaml](../reference/files/deploy/k8s/base/minio.yaml.md) — The main deployment definition for MinIO.
- [deploy/k8s/base/namespace.yaml](../reference/files/deploy/k8s/base/namespace.yaml.md) — Namespace definition resource in Kubernetes
- [deploy/k8s/base/postgres.yaml](../reference/files/deploy/k8s/base/postgres.yaml.md) — A deployment resource for PostgreSQL service in the emplus-local namespace.
- [deploy/k8s/base/redis.yaml](../reference/files/deploy/k8s/base/redis.yaml.md) — A Redis Deployment with a Service.
- [deploy/k8s/base/secret.yaml](../reference/files/deploy/k8s/base/secret.yaml.md) — A base secret resource in the Emplus namespace.
- [deploy/k8s/jobs/db-init-job.yaml](../reference/files/deploy/k8s/jobs/db-init-job.yaml.md) — DB Initialisation Job
- [deploy/k8s/jobs/db-seed-job.yaml](../reference/files/deploy/k8s/jobs/db-seed-job.yaml.md) — db-seed-job.yaml deployment file for Kubernetes
- [deploy/k8s/jobs/minio-bootstrap-job.yaml](../reference/files/deploy/k8s/jobs/minio-bootstrap-job.yaml.md) — This Job configuration for MinIO uses the `minio/mc` image and defines a script to wait for MinIO bucket creation.
- [deploy/k8s/observability/kube-prometheus-stack-values.yaml](../reference/files/deploy/k8s/observability/kube-prometheus-stack-values.yaml.md) — KubePrometheusStackValues.yaml file summary.
- [deploy/k8s/observability/loki-values.yaml](../reference/files/deploy/k8s/observability/loki-values.yaml.md) — Kubernetes Lobi Deploying Schema Configuration Configuration
- [deploy/k8s/observability/promtail-values.yaml](../reference/files/deploy/k8s/observability/promtail-values.yaml.md) — Observability Prometheus Configuration
- [deploy/kind/kind-config.yaml](../reference/files/deploy/kind/kind-config.yaml.md) — Config for kind Cluster with emplus-local namespace
- [docker-compose.yml](../reference/files/docker-compose.yml.md) — $(doc.summary)
- [package.json](../reference/files/package.json.md) — Contains metadata about the project and its dependencies.
- [skills-lock.json](../reference/files/skills-lock.json.md) — Skills lock API documentation
