---
title: "Module mobile/ios/Em/Images.xcassets"
description: "4 files and 4 symbols under mobile/ios/Em/Images.xcassets."
layout: "doc"
outline:
  - 2
  - 3
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--module"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "module"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/modules/mobile/ios/Em/Images.xcassets.md"
  directory: "mobile/ios/Em/Images.xcassets"
  fileCount: 4
  symbolCount: 4
  workspace: "mobile"
  languages:
    - "JSON"
---

# Module mobile/ios/Em/Images.xcassets

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module index: [All modules](../../../index.md)
- Workspace index: [All workspaces](../../../../../workspaces/index.md)

## Snapshot

- Path: `mobile/ios/Em/Images.xcassets`
- Descendant files: 4
- Descendant symbols: 4
- Languages: `JSON`
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Business Capability

File structure summary of the AppIcon.appiconset/Contents.json file in an Expo project

## Basic Design

Images.xcassets is inferred as a files and storage area. The visible implementation layers are UI surface, Utility.

### Boundaries

- Entry points: `mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json`, `mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json`

## Detail Design

Primary flow coverage includes Files &amp; storage flow. Representative files are mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json, mobile/ios/Em/Images.xcassets/Contents.json, mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json, mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json. Observed behavior hints: Contents file for EmImages.xcassets in an iOS project.

### Components

- UI surface: mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json
- UI surface: mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json
- Utility: mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json
- Utility: mobile/ios/Em/Images.xcassets/Contents.json

## Inferred Business Flows

### Files &amp; storage flow

Handle the main files and storage use case exposed by this module.

#### Steps

- The user or operator enters the flow through mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json, which surfaces the request handling interaction.
- The user or operator enters the flow through mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json, which surfaces the request handling interaction.
- mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json provides helper logic used during the flow.
- mobile/ios/Em/Images.xcassets/Contents.json provides helper logic used during the flow.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_Contents_json["mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json\nUI surface"]
  n2_Contents_json["mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json\nUI surface"]
  n3_Contents_json["mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json\nUtility"]
  n4_Contents_json["mobile/ios/Em/Images.xcassets/Contents.json\nUtility"]
  caller --> n1_Contents_json
  n1_Contents_json --> n2_Contents_json
  n2_Contents_json --> n3_Contents_json
  n3_Contents_json --> n4_Contents_json
  outcome["Files & storage flow outcome"]
  n4_Contents_json --> outcome
```


## Child Modules

- [mobile/ios/Em/Images.xcassets/AppIcon.appiconset](Images.xcassets/AppIcon.appiconset.md) - 1 file, 1 symbol
- [mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset](Images.xcassets/SplashScreenBackground.colorset.md) - 1 file, 1 symbol
- [mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset](Images.xcassets/SplashScreenLegacy.imageset.md) - 1 file, 1 symbol

## Direct Files

- [mobile/ios/Em/Images.xcassets/Contents.json](../../../../files/mobile/ios/Em/Images.xcassets/Contents.json.md) — Contents file for EmImages.xcassets in an iOS project.
