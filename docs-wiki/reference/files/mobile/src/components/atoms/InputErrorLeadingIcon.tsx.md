---
title: "mobile/src/components/atoms/InputErrorLeadingIcon.tsx"
description: "A reusable InputErrorLeadingIcon component that renders an Ionicons alert-circle icon when the provided error string is empty."
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
  page: "reference/files/mobile/src/components/atoms/InputErrorLeadingIcon.tsx.md"
  relativePath: "mobile/src/components/atoms/InputErrorLeadingIcon.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/InputErrorLeadingIcon.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/components/atoms/InputErrorLeadingIcon.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/InputErrorLeadingIcon.tsx`
- Lines: 18
- Symbols: 1

## AI Summary

A reusable InputErrorLeadingIcon component that renders an Ionicons alert-circle icon when the provided error string is empty.

### Responsibilities

- render an Ionicons alert-circle icon

### Usage Notes

- The icon is only rendered if no error string is provided

## Public API

- `function InputErrorLeadingIcon({ error }: { error?: string })`

## Symbols

### function `InputErrorLeadingIcon`

- Signature: `function InputErrorLeadingIcon({ error }: { error?: string })`
- Lines: 5-17
- Exported: yes

```tsx
function InputErrorLeadingIcon({ error }: { error?: string }) {
  const colors = useThemeColors();
  if (!error) return null;
  return (
    <Ionicons
      name="alert-circle"
      size={20}
      color={colors.status.error.icon}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}
```
