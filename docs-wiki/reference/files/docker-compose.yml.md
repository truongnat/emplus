---
title: "docker-compose.yml"
description: "$(doc.summary)"
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
  page: "reference/files/docker-compose.yml.md"
  relativePath: "docker-compose.yml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/docker-compose.yml"
  module: ""
  workspace: ""
  language: "YAML"
  symbolCount: 1
---

# docker-compose.yml

- Overview: [emplus Docs Wiki](../../index.md)
- Summary: [SUMMARY](../../SUMMARY.md)
- Feature catalog: [All features](../../features/index.md)
- Module: [(root)](../modules/root.md)
- Workspace: [emplus](../../workspaces/root.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/docker-compose.yml`
- Lines: 105
- Symbols: 1

## AI Summary

$(doc.summary)

### Responsibilities

- $(doc responsibiilities)

### Usage Notes

- $(func.usageNotes)

## Public API

- `Plain-text index (105 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (105 lines)`
- Lines: 1-105
- Exported: yes

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: emplus-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: emplus
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "${EMPLUS_POSTGRES_PORT:-5432}:5432"
    volumes:
      - emplus_postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d emplus"]
      interval: 5s
      timeout: 5s
      retries: 10

  postgres-slave:
    image: postgres:15-alpine
    container_name: emplus-postgres-slave
    restart: unless-stopped
    environment:
      POSTGRES_DB: emplus
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "${EMPLUS_POSTGRES_SLAVE_PORT:-5433}:5432"
    volumes:
      - emplus_postgres_slave_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d emplus"]
      interval: 5s
      timeout: 5s
      retries: 10

  redis:
    image: redis:7-alpine
    container_name: emplus-redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes"]
    ports:
      - "${EMPLUS_REDIS_PORT:-6379}:6379"
    volumes:
      - emplus_redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 10

  mailpit:
    image: axllent/mailpit:v1.27
    container_name: emplus-mailpit
    restart: unless-stopped
    ports:
      - "${EMPLUS_MAIL_SMTP_PORT:-1025}:1025"
      - "${EMPLUS_MAIL_UI_PORT:-8025}:8025"

  minio:
    image: minio/minio:RELEASE.2025-02-18T16-25-55Z
    container_name: emplus-minio
    restart: unless-stopped
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    command: ["server", "/data", "--console-address", ":9001"]
    ports:
      - "${EMPLUS_MINIO_API_PORT:-9000}:9000"
      - "${EMPLUS_MINIO_CONSOLE_PORT:-9001}:9001"
    volumes:
      - emplus_minio_data:/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 5s
      timeout: 3s
      retries: 10

  minio-init:
    image: minio/mc:RELEASE.2025-02-15T10-36-16Z
    container_name: emplus-minio-init
    depends_on:
      minio:
        condition: service_healthy
    entrypoint:
      - /bin/sh
      - -c
      - |
        set -e
        until /usr/bin/mc alias set local http://minio:9000 minioadmin minioadmin >/dev/null 2>&1; do
          echo "Waiting for MinIO..."
          sleep 1
        done
        /usr/bin/mc mb -p local/emplus || true
        /usr/bin/mc anonymous set download local/emplus || true
        echo "MinIO bucket emplus is ready"
    restart: "no"

volumes:
  emplus_postgres_data:
  emplus_postgres_slave_data:
  emplus_redis_data:
  emplus_minio_data:

```
