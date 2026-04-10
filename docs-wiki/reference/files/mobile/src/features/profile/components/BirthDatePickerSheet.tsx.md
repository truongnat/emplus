---
title: "mobile/src/features/profile/components/BirthDatePickerSheet.tsx"
description: "A component representing a date picker sheet with customizable options."
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
  page: "reference/files/mobile/src/features/profile/components/BirthDatePickerSheet.tsx.md"
  relativePath: "mobile/src/features/profile/components/BirthDatePickerSheet.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/profile/components/BirthDatePickerSheet.tsx"
  module: "mobile/src/features/profile/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/profile/components/BirthDatePickerSheet.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/profile/components](../../../../../../modules/mobile/src/features/profile/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/profile/components/BirthDatePickerSheet.tsx`
- Lines: 16
- Symbols: 2

## AI Summary

A component representing a date picker sheet with customizable options.

## Public API

- `interface BirthDatePickerSheetProps`
- `function BirthDatePickerSheet(props: BirthDatePickerSheetProps)`

## Symbols

### interface `BirthDatePickerSheetProps`

- Signature: `interface BirthDatePickerSheetProps`
- Lines: 4-10
- Exported: yes

```tsx
interface BirthDatePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  initialIso: string | undefined | null;
  onConfirm: (iso: string) => void;
  sheetStyle?: StyleProp<ViewStyle>;
}
```

### function `BirthDatePickerSheet`

- Signature: `function BirthDatePickerSheet(props: BirthDatePickerSheetProps)`
- Lines: 13-15
- Exported: yes

```tsx
function BirthDatePickerSheet(props: BirthDatePickerSheetProps) {
  return <DatePickerSheet title="Chọn ngày sinh" {...props} />;
}
```
