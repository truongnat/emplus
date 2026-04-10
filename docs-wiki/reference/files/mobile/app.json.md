---
title: "mobile/app.json"
description: "main app file for Expo EM+ project."
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
  page: "reference/files/mobile/app.json.md"
  relativePath: "mobile/app.json"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app.json"
  module: "mobile"
  workspace: "mobile"
  language: "JSON"
  symbolCount: 1
---

# mobile/app.json

- Overview: [emplus Docs Wiki](../../../index.md)
- Summary: [SUMMARY](../../../SUMMARY.md)
- Feature catalog: [All features](../../../features/index.md)
- Module: [mobile](../../modules/mobile.md)
- Workspace: [@emplus/mobile](../../../workspaces/mobile.md)

## Snapshot

- Language: JSON
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app.json`
- Lines: 93
- Symbols: 1

## AI Summary

main app file for Expo EM+ project.

### Usage Notes

- This is a main app file for an Expo project.
- It defines the application's metadata and basic settings.

## Public API

- `Plain-text index (93 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (93 lines)`
- Lines: 1-93
- Exported: yes

```json
{
  "expo": {
    "name": "Em+",
    "slug": "em-plus",
    "scheme": "emplus",
    "version": "0.1.0",
    "orientation": "portrait",
    "userInterfaceStyle": "automatic",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#fff7f3"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "associatedDomains": [
        "applinks:emplus.app"
      ],
      "bundleIdentifier": "com.truongdq.emplus",
      "appleTeamId": "ZG4LJ9HHX8"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#fff7f3"
      },
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "emplus",
              "host": "emplus.app"
            }
          ],
          "category": [
            "BROWSABLE",
            "DEFAULT"
          ]
        },
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "emplus",
              "host": "emplus.app"
            }
          ],
          "category": [
            "BROWSABLE",
            "DEFAULT"
          ]
        }
      ],
      "package": "com.truongdq.emplus"
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "expo-secure-store",
      "expo-localization",
      "expo-web-browser",
      "expo-sharing",
      [
        "expo-notifications",
        {
          "color": "#7c3aed",
          "sounds": [],
          "mode": "production"
        }
      ],
      "@react-native-community/datetimepicker",
      "expo-camera"
    ],
    "web": {
      "bundler": "metro"
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "2267f4e9-6807-4c95-b08b-c07e96dab3aa"
      }
    },
    "owner": "truongdq"
  }
}

```
