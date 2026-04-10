---
title: "package.json"
description: "Contains metadata about the project and its dependencies."
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
  page: "reference/files/package.json.md"
  relativePath: "package.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/package.json"
  module: ""
  workspace: ""
  language: "JSON"
  symbolCount: 1
---

# package.json

- Overview: [emplus Docs Wiki](../../index.md)
- Summary: [SUMMARY](../../SUMMARY.md)
- Feature catalog: [All features](../../features/index.md)
- Module: [(root)](../modules/root.md)
- Workspace: [emplus](../../workspaces/root.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/package.json`
- Lines: 58
- Symbols: 1

## AI Summary

Contains metadata about the project and its dependencies.

### Responsibilities

- Contains metadata about the project and its dependencies.

### Usage Notes

- A JSON representation of a Python dictionary containing version information, script definitions, and other project details.

## Public API

- `Plain-text index (58 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (58 lines)`
- Lines: 1-58
- Exported: yes

```json
{
  "name": "emplus",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "mobile",
    "api",
    "design-builder",
    "web"
  ],
  "scripts": {
    "dev": "bash ./scripts/dev.sh",
    "dev:api": "bun run --cwd api dev",
    "dev:local": "bash ./scripts/dev-local.sh",
    "dev:all": "bash ./api/scripts/dev-all.sh",
    "dev:mobile": "bun run --cwd mobile dev",
    "dev:builder": "bun run --cwd design-builder dev",
    "dev:web": "bun run --cwd web dev",
    "build:builder": "bun run --cwd design-builder build",
    "build:web": "bun run --cwd web build",
    "start:api": "bun run --cwd api start",
    "test:api": "bun run --cwd api test",
    "typecheck:api": "bun run --cwd api typecheck",
    "db:init": "bun run --cwd api db:init",
    "db:seed": "bun run --cwd api db:seed",
    "db:up": "docker compose -f docker-compose.yml up -d postgres postgres-slave redis minio minio-init mailpit",
    "db:down": "docker compose -f docker-compose.yml down",
    "typecheck:mobile": "bun run --cwd mobile typecheck",
    "typecheck:builder": "bun run --cwd design-builder typecheck",
    "typecheck:web": "bun run --cwd web check",
    "logging:up": "docker compose -f api/docker-compose.logging.yml up -d",
    "logging:down": "docker compose -f api/docker-compose.logging.yml down",
    "ports": "bash ./scripts/ports.sh",
    "devops:k8s:up": "bash ./deploy/k8s/scripts/k8s-up.sh",
    "devops:k8s:down": "bash ./deploy/k8s/scripts/k8s-down.sh",
    "devops:k8s:status": "bash ./deploy/k8s/scripts/k8s-status.sh",
    "ai:feature": "bash ./scripts/ai-workflow.sh feature",
    "ai:bugfix": "bash ./scripts/ai-workflow.sh bugfix",
    "ai:review": "bash ./scripts/ai-workflow.sh review",
    "api:sync": "cd api && bun run scripts/export-openapi.ts && cd ../mobile && bun run scripts/sync-api.ts"
  },
  "dependencies": {
    "clsx": "2.1.1",
    "tailwind-merge": "3.5.0"
  },
  "devDependencies": {
    "openapi-typescript": "7.13.0",
    "swagger-typescript-api": "13.4.0",
    "typescript": "5.9.3"
  },
  "overrides": {
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@types/react": "19.2.10",
    "@types/react-dom": "19.0.4"
  }
}

```
