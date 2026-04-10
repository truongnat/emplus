---
title: "mobile/src/components/atoms/Badge.tsx"
description: "Badge component properties and usage notes."
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
  page: "reference/files/mobile/src/components/atoms/Badge.tsx.md"
  relativePath: "mobile/src/components/atoms/Badge.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Badge.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/components/atoms/Badge.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Badge.tsx`
- Lines: 151
- Symbols: 3

## AI Summary

Badge component properties and usage notes.

## Public API

- `type BadgeVariant = | "default" | "primary" | "success" | "warning" | "error" | "info";`
- `type BadgeSize = "sm" | "md" | "lg";`
- `interface BadgeProps`

## Symbols

### type `BadgeVariant`

- Signature: `type BadgeVariant = | "default" | "primary" | "success" | "warning" | "error" | "info";`
- Lines: 10-16
- Exported: yes

```tsx
type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
```

### type `BadgeSize`

- Signature: `type BadgeSize = "sm" | "md" | "lg";`
- Lines: 17-17
- Exported: yes

```tsx
type BadgeSize = "sm" | "md" | "lg";
```

### interface `BadgeProps`

- Signature: `interface BadgeProps`
- Lines: 19-32
- Exported: yes

```tsx
interface BadgeProps {
  /** Badge text content */
  children: ReactNode;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Show as dot only (no text) */
  dot?: boolean;
  /** Additional style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
```
