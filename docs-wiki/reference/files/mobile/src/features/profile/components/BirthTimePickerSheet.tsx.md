---
title: "mobile/src/features/profile/components/BirthTimePickerSheet.tsx"
description: "The `BirthTimePickerSheet` component renders a time picker that allows the user to select their birth time."
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
  page: "reference/files/mobile/src/features/profile/components/BirthTimePickerSheet.tsx.md"
  relativePath: "mobile/src/features/profile/components/BirthTimePickerSheet.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/profile/components/BirthTimePickerSheet.tsx"
  module: "mobile/src/features/profile/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/profile/components/BirthTimePickerSheet.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/profile/components](../../../../../../modules/mobile/src/features/profile/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/profile/components/BirthTimePickerSheet.tsx`
- Lines: 16
- Symbols: 2

## AI Summary

The `BirthTimePickerSheet` component renders a time picker that allows the user to select their birth time.

### Responsibilities

- renders a time picker

### Usage Notes

- can be used as a child components for forms or other interactive elements

## Public API

- `interface BirthTimePickerSheetProps`
- `function BirthTimePickerSheet(props: BirthTimePickerSheetProps)`

## Symbols

### interface `BirthTimePickerSheetProps`

- Signature: `interface BirthTimePickerSheetProps`
- Lines: 4-10
- Exported: yes

```tsx
interface BirthTimePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  initialHm: string | undefined | null;
  onConfirm: (hm: string) => void;
  sheetStyle?: StyleProp<ViewStyle>;
}
```

### function `BirthTimePickerSheet`

- Signature: `function BirthTimePickerSheet(props: BirthTimePickerSheetProps)`
- Lines: 13-15
- Exported: yes

```tsx
function BirthTimePickerSheet(props: BirthTimePickerSheetProps) {
  return <TimePickerSheet title="Chọn giờ sinh" {...props} />;
}
```
