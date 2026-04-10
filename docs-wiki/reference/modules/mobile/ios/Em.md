---
title: "Module mobile/ios/Em"
description: "5 files and 5 symbols under mobile/ios/Em."
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
  page: "reference/modules/mobile/ios/Em.md"
  directory: "mobile/ios/Em"
  fileCount: 5
  symbolCount: 5
  workspace: "mobile"
  languages:
    - "JSON"
    - "Swift"
---

# Module mobile/ios/Em

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module index: [All modules](../../index.md)
- Workspace index: [All workspaces](../../../../workspaces/index.md)

## Snapshot

- Path: `mobile/ios/Em`
- Descendant files: 5
- Descendant symbols: 5
- Languages: `JSON`, `Swift`
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Business Capability

AppDelegate class for iOS and tvOS applications using Expo.

## Basic Design

Em is inferred as a files and storage area. The visible implementation layers are Utility, UI surface.

### Boundaries

- Entry points: `mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json`, `mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json`

## Detail Design

Primary flow coverage includes Files &amp; storage flow. Representative files are mobile/ios/Em/AppDelegate.swift, mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json, mobile/ios/Em/Images.xcassets/Contents.json, mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json, mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json. Observed behavior hints: File structure summary of the AppIcon.appiconset/Contents.json file in an Expo project

### Components

- UI surface: mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json
- UI surface: mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json
- Utility: mobile/ios/Em/AppDelegate.swift
- Utility: mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json
- Utility: mobile/ios/Em/Images.xcassets/Contents.json

## Inferred Business Flows

### Files &amp; storage flow

Handle the main files and storage use case exposed by this module.

#### Steps

- The user or operator enters the flow through mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json, which surfaces the request handling interaction.
- The user or operator enters the flow through mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json, which surfaces the request handling interaction.
- mobile/ios/Em/AppDelegate.swift provides helper logic used during the flow.
- mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json provides helper logic used during the flow.
- mobile/ios/Em/Images.xcassets/Contents.json provides helper logic used during the flow.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_Contents_json["mobile/ios/Em/Images.xcassets/SplashScreenBackground.colorset/Contents.json\nUI surface"]
  n2_Contents_json["mobile/ios/Em/Images.xcassets/SplashScreenLegacy.imageset/Contents.json\nUI surface"]
  n3_AppDelegate_swift["mobile/ios/Em/AppDelegate.swift\nUtility"]
  n4_Contents_json["mobile/ios/Em/Images.xcassets/AppIcon.appiconset/Contents.json\nUtility"]
  n5_Contents_json["mobile/ios/Em/Images.xcassets/Contents.json\nUtility"]
  caller --> n1_Contents_json
  n1_Contents_json --> n2_Contents_json
  n2_Contents_json --> n3_AppDelegate_swift
  n3_AppDelegate_swift --> n4_Contents_json
  n4_Contents_json --> n5_Contents_json
  outcome["Files & storage flow outcome"]
  n5_Contents_json --> outcome
```


## Child Modules

- [mobile/ios/Em/Images.xcassets](Em/Images.xcassets.md) - 4 files, 4 symbols

## Direct Files

- [mobile/ios/Em/AppDelegate.swift](../../../files/mobile/ios/Em/AppDelegate.swift.md) — AppDelegate class for iOS and tvOS applications using Expo.
