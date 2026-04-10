---
title: "api/docker-compose.logging.yml"
description: "Logging configuration for Docker Compose services."
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
  page: "reference/files/api/docker-compose.logging.yml.md"
  relativePath: "api/docker-compose.logging.yml"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/docker-compose.logging.yml"
  module: "api"
  workspace: "api"
  language: "YAML"
  symbolCount: 1
---

# api/docker-compose.logging.yml

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [api](../../modules/api.md)
- Workspace: [@emplus/api](../../../workspaces/api.md)

## Snapshot

- Language: YAML
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/docker-compose.logging.yml`
- Lines: 31
- Symbols: 1

## AI Summary

Logging configuration for Docker Compose services.

### Usage Notes

- A YAML file containing logging configuration for Grafana Loki and Grafana services in a Docker Compose environment.

## Public API

- `Plain-text index (31 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (31 lines)`
- Lines: 1-31
- Exported: yes

```yaml
services:
  loki:
    image: grafana/loki:3.2.0
    container_name: emplus-loki
    ports:
      - "3100:3100"
    volumes:
      - ./loki/config.yml:/etc/loki/config.yml:ro
    command: -config.file=/etc/loki/config.yml
    restart: unless-stopped

  grafana:
    image: grafana/grafana:11.4.0
    container_name: emplus-grafana
    ports:
      - "3030:3000"
    volumes:
      - ./grafana/provisioning:/etc/grafana/provisioning:ro
      - ./grafana/datasources:/etc/grafana/provisioning/datasources:ro
      - grafana-data:/var/lib/grafana
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_FEATURE_TOGGLES_ENABLE=traceqlEditor
    depends_on:
      - loki
    restart: unless-stopped

volumes:
  grafana-data:

```
