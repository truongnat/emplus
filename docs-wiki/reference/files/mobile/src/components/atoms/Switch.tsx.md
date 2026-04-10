---
title: "mobile/src/components/atoms/Switch.tsx"
description: "A component that exhibits a 'Switch' behavior, controlling an underlying state or action."
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
  page: "reference/files/mobile/src/components/atoms/Switch.tsx.md"
  relativePath: "mobile/src/components/atoms/Switch.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Switch.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/components/atoms/Switch.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Switch.tsx`
- Lines: 122
- Symbols: 1

## AI Summary

A component that exhibits a 'Switch' behavior, controlling an underlying state or action.

### Responsibilities

- Functionality of Switch component

### Usage Notes

- No specific usage notes are provided in this file. See the React documentation for detailed guidance on creating similar components.

## Public API

- `interface SwitchProps`

## Symbols

### interface `SwitchProps`

- Signature: `interface SwitchProps`
- Lines: 16-24
- Exported: yes

```tsx
interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
```
