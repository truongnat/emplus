---
title: "Module mobile/src/features/home"
description: "13 files and 23 symbols under mobile/src/features/home."
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
  page: "reference/modules/mobile/src/features/home.md"
  directory: "mobile/src/features/home"
  fileCount: 13
  symbolCount: 23
  workspace: "mobile"
  languages:
    - "TypeScript"
---

# Module mobile/src/features/home

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module index: [All modules](../../../index.md)
- Workspace index: [All workspaces](../../../../../workspaces/index.md)

## Snapshot

- Path: `mobile/src/features/home`
- Descendant files: 13
- Descendant symbols: 23
- Languages: `TypeScript`
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.

## Business Capability

The FocusCard component structure and its properties.

## Basic Design

Home is inferred as a authentication and access control area. The visible implementation layers are Entry point, UI surface. State is likely persisted in primary database. The module also integrates with @, @expo, expo-router, react, react-native, expo-linear-gradient.

### Boundaries

- Entry points: `mobile/src/features/home/components/HeroCard.tsx`, `mobile/src/features/home/components/HomeClock.tsx`, `mobile/src/features/home/components/HomeDecorations.tsx`, `mobile/src/features/home/components/HomeHeader.tsx`, `mobile/src/features/home/homeScreen.styles.ts`, `mobile/src/features/home/index.ts`
- Data stores: Primary database
- External interfaces: `@`, `@expo`, `expo-router`, `react`, `react-native`, `expo-linear-gradient`

## Detail Design

Primary flow coverage includes Auth listing. Representative files are mobile/src/features/home/components/FocusCard.tsx, mobile/src/features/home/components/HeroCard.tsx, mobile/src/features/home/components/HomeChromeNotificationButton.tsx, mobile/src/features/home/components/HomeClock.tsx, mobile/src/features/home/components/HomeDecorations.tsx. Observed behavior hints: Represents the properties of a HeroCard component.

### Components

- UI surface: mobile/src/features/home/components/HeroCard.tsx
- UI surface: mobile/src/features/home/components/HomeClock.tsx
- UI surface: mobile/src/features/home/components/HomeDecorations.tsx
- UI surface: mobile/src/features/home/components/HomeHeader.tsx
- UI surface: mobile/src/features/home/homeScreen.styles.ts
- UI surface: mobile/src/features/home/index.ts
- Entry point: mobile/src/features/home/components/FocusCard.tsx
- Entry point: mobile/src/features/home/components/HomeChromeNotificationButton.tsx

## Inferred Business Flows

### Auth listing

Execute the module's listing use case inside authentication and access control.

#### Steps

- The user or operator enters the flow through mobile/src/features/home/components/HeroCard.tsx, which surfaces the listing interaction. It then hands off to HomeClock.tsx.
- The user or operator enters the flow through mobile/src/features/home/components/HomeClock.tsx, which surfaces the listing interaction.
- The user or operator enters the flow through mobile/src/features/home/components/HomeDecorations.tsx, which surfaces the listing interaction.
- The user or operator enters the flow through mobile/src/features/home/components/HomeHeader.tsx, which surfaces the listing interaction.
- The user or operator enters the flow through mobile/src/features/home/homeScreen.styles.ts, which surfaces the listing interaction.
- The user or operator enters the flow through mobile/src/features/home/index.ts, which surfaces the listing interaction.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_HeroCard_tsx["mobile/src/features/home/components/HeroCard.tsx\nUI surface"]
  n2_HomeClock_tsx["mobile/src/features/home/components/HomeClock.tsx\nUI surface"]
  n3_HomeDecorations_tsx["mobile/src/features/home/components/HomeDecorations.tsx\nUI surface"]
  n4_HomeHeader_tsx["mobile/src/features/home/components/HomeHeader.tsx\nUI surface"]
  n5_homeScreen_styles_ts["mobile/src/features/home/homeScreen.styles.ts\nUI surface"]
  n6_index_ts["mobile/src/features/home/index.ts\nUI surface"]
  caller --> n1_HeroCard_tsx
  caller --> n3_HomeDecorations_tsx
  caller --> n4_HomeHeader_tsx
  caller --> n5_homeScreen_styles_ts
  caller --> n6_index_ts
  n1_HeroCard_tsx --> n2_HomeClock_tsx
  store["State / data store"]
  n6_index_ts --> store
  ext["External dependency"]
  n6_index_ts --> ext
  outcome["Auth listing outcome"]
  n6_index_ts --> outcome
```


## Child Modules

- [mobile/src/features/home/components](home/components.md) - 10 files, 21 symbols
- [mobile/src/features/home/hooks](home/hooks.md) - 1 file, 2 symbols

## Direct Files

- [mobile/src/features/home/homeScreen.styles.ts](../../../../files/mobile/src/features/home/homeScreen.styles.ts.md) — Feature home screen styles sheet for the mobile app.
- [mobile/src/features/home/index.ts](../../../../files/mobile/src/features/home/index.ts.md) — Feature index for mobile application's home page, responsible for presenting the user with a list of features.
