---
title: "Module mobile/src/components/molecules"
description: "11 files and 27 symbols under mobile/src/components/molecules."
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
  page: "reference/modules/mobile/src/components/molecules.md"
  directory: "mobile/src/components/molecules"
  fileCount: 11
  symbolCount: 27
  workspace: "mobile"
  languages:
    - "TypeScript"
---

# Module mobile/src/components/molecules

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module index: [All modules](../../../index.md)
- Workspace index: [All workspaces](../../../../../workspaces/index.md)

## Snapshot

- Path: `mobile/src/components/molecules`
- Descendant files: 11
- Descendant symbols: 27
- Languages: `TypeScript`
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Related Features

- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.

## Business Capability

A React component representing a card layer with customizable props.

## Basic Design

Molecules is inferred as a search and discovery area. The visible implementation layers are UI surface, Utility. The module also integrates with @, react, react-native, expo-linear-gradient, @expo, react-native-safe-area-context.

### Boundaries

- Entry points: `mobile/src/components/molecules/Card.tsx`, `mobile/src/components/molecules/index.ts`, `mobile/src/components/molecules/LottieHero.tsx`, `mobile/src/components/molecules/pickers/date-picker-sheet.tsx`, `mobile/src/components/molecules/pickers/index.ts`, `mobile/src/components/molecules/pickers/picker-modal-overlay.tsx`
- External interfaces: `@`, `react`, `react-native`, `expo-linear-gradient`, `@expo`, `react-native-safe-area-context`

## Detail Design

Primary flow coverage includes Search Discovery creation, Search Discovery synchronization. Representative files are mobile/src/components/molecules/Card.tsx, mobile/src/components/molecules/index.ts, mobile/src/components/molecules/LottieHero.tsx, mobile/src/components/molecules/pickers/calendar-day-cell.tsx, mobile/src/components/molecules/pickers/calendar-utils.ts. Observed behavior hints: File containing the definition of an index molecule in a mobile-specific component.

### Components

- UI surface: mobile/src/components/molecules/Card.tsx
- UI surface: mobile/src/components/molecules/index.ts
- UI surface: mobile/src/components/molecules/LottieHero.tsx
- UI surface: mobile/src/components/molecules/pickers/date-picker-sheet.tsx
- UI surface: mobile/src/components/molecules/pickers/index.ts
- UI surface: mobile/src/components/molecules/pickers/picker-modal-overlay.tsx
- UI surface: mobile/src/components/molecules/pickers/snapping-wheel-column.tsx
- UI surface: mobile/src/components/molecules/pickers/time-picker-sheet.tsx

## Module Interactions

- `mobile/src` -> `mobile/src/components/molecules` (1 dependencies)

### Interaction Diagram

```mermaid
flowchart LR
  mobile_src["mobile/src"]
  mobile_src_components_molecules["mobile/src/components/molecules"]
  mobile_src -->|"1 dep"| mobile_src_components_molecules
```


## Inferred Business Flows

### Search Discovery creation

Execute the module's creation use case inside search and discovery.

#### Steps

- The user or operator enters the flow through mobile/src/components/molecules/Card.tsx, which surfaces the creation interaction.
- The user or operator enters the flow through mobile/src/components/molecules/index.ts, which surfaces the creation interaction.
- The user or operator enters the flow through mobile/src/components/molecules/LottieHero.tsx, which surfaces the creation interaction.
- The user or operator enters the flow through mobile/src/components/molecules/pickers/date-picker-sheet.tsx, which surfaces the creation interaction. It then hands off to CalendarDayCell, addDays, PickerModalOverlay.
- The user or operator enters the flow through mobile/src/components/molecules/pickers/index.ts, which surfaces the creation interaction.
- The user or operator enters the flow through mobile/src/components/molecules/pickers/picker-modal-overlay.tsx, which surfaces the creation interaction.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_Card_tsx["mobile/src/components/molecules/Card.tsx\nUI surface"]
  n2_index_ts["mobile/src/components/molecules/index.ts\nUI surface"]
  n3_LottieHero_tsx["mobile/src/components/molecules/LottieHero.tsx\nUI surface"]
  n4_date_picker_sheet_tsx["mobile/src/components/molecules/pickers/date-picker-sheet.tsx\nUI surface"]
  n5_index_ts["mobile/src/components/molecules/pickers/index.ts\nUI surface"]
  n6_picker_modal_overlay_tsx["mobile/src/components/molecules/pickers/picker-modal-overlay.tsx\nUI surface"]
  caller --> n1_Card_tsx
  caller --> n2_index_ts
  caller --> n3_LottieHero_tsx
  caller --> n4_date_picker_sheet_tsx
  caller --> n5_index_ts
  n4_date_picker_sheet_tsx -->|"PickerModalOverlay"| n6_picker_modal_overlay_tsx
  ext["External dependency"]
  n6_picker_modal_overlay_tsx --> ext
  outcome["Search Discovery creation outcome"]
  n6_picker_modal_overlay_tsx --> outcome
```

### Search Discovery synchronization

Execute the module's synchronization use case inside search and discovery.

#### Steps

- The user or operator enters the flow through mobile/src/components/molecules/Card.tsx, which surfaces the synchronization interaction.
- The user or operator enters the flow through mobile/src/components/molecules/index.ts, which surfaces the synchronization interaction.
- The user or operator enters the flow through mobile/src/components/molecules/LottieHero.tsx, which surfaces the synchronization interaction.
- The user or operator enters the flow through mobile/src/components/molecules/pickers/date-picker-sheet.tsx, which surfaces the synchronization interaction. It then hands off to CalendarDayCell, addDays, PickerModalOverlay.
- The user or operator enters the flow through mobile/src/components/molecules/pickers/index.ts, which surfaces the synchronization interaction.
- The user or operator enters the flow through mobile/src/components/molecules/pickers/picker-modal-overlay.tsx, which surfaces the synchronization interaction.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_Card_tsx["mobile/src/components/molecules/Card.tsx\nUI surface"]
  n2_index_ts["mobile/src/components/molecules/index.ts\nUI surface"]
  n3_LottieHero_tsx["mobile/src/components/molecules/LottieHero.tsx\nUI surface"]
  n4_date_picker_sheet_tsx["mobile/src/components/molecules/pickers/date-picker-sheet.tsx\nUI surface"]
  n5_index_ts["mobile/src/components/molecules/pickers/index.ts\nUI surface"]
  n6_picker_modal_overlay_tsx["mobile/src/components/molecules/pickers/picker-modal-overlay.tsx\nUI surface"]
  caller --> n1_Card_tsx
  caller --> n2_index_ts
  caller --> n3_LottieHero_tsx
  caller --> n4_date_picker_sheet_tsx
  caller --> n5_index_ts
  n4_date_picker_sheet_tsx -->|"PickerModalOverlay"| n6_picker_modal_overlay_tsx
  ext["External dependency"]
  n6_picker_modal_overlay_tsx --> ext
  outcome["Search Discovery synchronization outcome"]
  n6_picker_modal_overlay_tsx --> outcome
```


## Child Modules

- [mobile/src/components/molecules/pickers](molecules/pickers.md) - 7 files, 21 symbols

## Direct Files

- [mobile/src/components/molecules/Card.tsx](../../../../files/mobile/src/components/molecules/Card.tsx.md) — A React component representing a card layer with customizable props.
- [mobile/src/components/molecules/index.ts](../../../../files/mobile/src/components/molecules/index.ts.md) — File containing the definition of an index molecule in a mobile-specific component.
- [mobile/src/components/molecules/LottieHero.tsx](../../../../files/mobile/src/components/molecules/LottieHero.tsx.md) — LottieHero component props
- [mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx](../../../../files/mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx.md) — A function that generates the TabBarGridAnimatedBackground component
