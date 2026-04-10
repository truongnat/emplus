---
title: "mobile/src/components/atoms/Avatar.tsx"
description: "Retrieves a color from an avatar's name"
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
  page: "reference/files/mobile/src/components/atoms/Avatar.tsx.md"
  relativePath: "mobile/src/components/atoms/Avatar.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Avatar.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/atoms/Avatar.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Avatar.tsx`
- Lines: 120
- Symbols: 2

## Related Features

- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.

## AI Summary

Retrieves a color from an avatar's name

## Public API

- `interface AvatarProps`

## Symbols

### interface `AvatarProps`

- Signature: `interface AvatarProps`
- Lines: 11-22
- Exported: yes

```tsx
interface AvatarProps {
  /** User's name for fallback initial */
  name?: string;
  /** Avatar image URL */
  src?: string;
  /** Avatar size */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Additional style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
```

### function `getColorFromName`

- Signature: `function getColorFromName(name: string): string`
- Lines: 81-101
- Exported: no

```tsx
function getColorFromName(name: string): string {
  const colors = [
    auraPalette.rose500,
    palette.blue500,
    palette.green500,
    palette.amber500,
    palette.red500,
    palette.zinc500,
  ];

  if (!name.trim()) {
    return palette.zinc300;
  }

  const hash = name
    .trim()
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[hash % colors.length];
}
```
