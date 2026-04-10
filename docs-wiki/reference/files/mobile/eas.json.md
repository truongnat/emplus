---
title: "mobile/eas.json"
description: "JSON Configuration File"
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
  page: "reference/files/mobile/eas.json.md"
  relativePath: "mobile/eas.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/eas.json"
  module: "mobile"
  workspace: "mobile"
  language: "JSON"
  symbolCount: 1
---

# mobile/eas.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [mobile](../../modules/mobile.md)
- Workspace: [@emplus/mobile](../../../workspaces/mobile.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/eas.json`
- Lines: 31
- Symbols: 1

## AI Summary

JSON Configuration File

### Responsibilities

- JSON Configuration File

### Usage Notes

- A valid JSON object representing the es config.

## Public API

- `Plain-text index (31 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (31 lines)`
- Lines: 1-31
- Exported: yes

```json
{
  "cli": {
    "version": ">= 13.0.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "autoIncrement": true,
      "channel": "production"
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleTeamId": "ZG4LJ9HHX8"
      }
    }
  }
}

```
