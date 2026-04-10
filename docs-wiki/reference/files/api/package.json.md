---
title: "api/package.json"
description: "@emplus/api"
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
  page: "reference/files/api/package.json.md"
  relativePath: "api/package.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/package.json"
  module: "api"
  workspace: "api"
  language: "JSON"
  symbolCount: 1
---

# api/package.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [api](../../modules/api.md)
- Workspace: [@emplus/api](../../../workspaces/api.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/package.json`
- Lines: 45
- Symbols: 1

## AI Summary

@emplus/api

### Responsibilities

- script

## Public API

- `Plain-text index (45 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (45 lines)`
- Lines: 1-45
- Exported: yes

```json
{
  "name": "@emplus/api",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bash ./scripts/dev-api.sh",
    "dev:all": "bash ./scripts/dev-all.sh",
    "start": "bun src/index.ts",
    "test": "NODE_ENV=test DATA_STORE=memory ALLOW_MOCK_OAUTH=true bun test",
    "lint": "bun x tsc --noEmit",
    "format": "bun x prettier --write .",
    "typecheck": "bun x tsc --noEmit",
    "db:init": "bun src/db/migrate.ts",
    "db:migrate": "bun src/db/migrate.ts",
    "db:migrate:status": "bun src/db/migrate.ts --status",
    "db:seed": "bun src/db/seed.ts",
    "infra:up": "docker compose -f ../docker-compose.yml up -d postgres postgres-slave redis mailpit minio minio-init",
    "infra:down": "docker compose -f ../docker-compose.yml down",
    "logging:up": "docker compose -f docker-compose.logging.yml up -d",
    "logging:down": "docker compose -f docker-compose.logging.yml down",
    "logging:logs": "docker compose -f docker-compose.logging.yml logs -f"
  },
  "dependencies": {
    "@grafana/faro-core": "^1.10.0",
    "@grafana/faro-web-sdk": "^1.10.0",
    "@hono/node-ws": "1.3.0",
    "@hono/swagger-ui": "^0.5.2",
    "@types/nodemailer": "7.0.11",
    "google-auth-library": "^10.5.0",
    "hono": "^4.10.3",
    "ioredis": "^5.8.1",
    "jose": "^6.1.2",
    "minio": "8.0.3",
    "nodemailer": "8.0.1",
    "postgres": "^3.4.7",
    "zod": "4.3.6"
  },
  "devDependencies": {
    "@faker-js/faker": "10.3.0",
    "@types/bun": "latest",
    "typescript": "^5.9.2"
  }
}

```
