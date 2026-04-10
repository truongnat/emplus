---
title: "mobile/src/components/atoms/Skeleton.tsx"
description: "The getBorderRadius function returns a border radius based on the given SkeletonVariant."
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
  page: "reference/files/mobile/src/components/atoms/Skeleton.tsx.md"
  relativePath: "mobile/src/components/atoms/Skeleton.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Skeleton.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/components/atoms/Skeleton.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Skeleton.tsx`
- Lines: 144
- Symbols: 3

## Related Features

- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.

## AI Summary

The getBorderRadius function returns a border radius based on the given SkeletonVariant.

### Usage Notes

- Returns a border radius (between 0 and 360 degrees) based on the given SkeletonVariant.

## Public API

- `type SkeletonVariant = "text" | "circular" | "rounded" | "square";`
- `interface SkeletonProps`

## Symbols

### type `SkeletonVariant`

- Signature: `type SkeletonVariant = "text" | "circular" | "rounded" | "square";`
- Lines: 16-16
- Exported: yes

```tsx
type SkeletonVariant = "text" | "circular" | "rounded" | "square";
```

### interface `SkeletonProps`

- Signature: `interface SkeletonProps`
- Lines: 18-35
- Exported: yes

```tsx
interface SkeletonProps {
  /** Skeleton variant */
  variant?: SkeletonVariant;
  /** Skeleton width */
  width?: number | string;
  /** Skeleton height */
  height?: number;
  /** Disable animation */
  animated?: boolean;
  /** Animation duration in ms (một vòng quét) */
  duration?: number;
  /** Additional style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}
```

### function `getBorderRadius`

- Signature: `function getBorderRadius(variant: SkeletonVariant): number`
- Lines: 118-130
- Exported: no

```tsx
function getBorderRadius(variant: SkeletonVariant): number {
  switch (variant) {
    case "circular":
      return 9999;
    case "rounded":
      return 8;
    case "square":
      return 0;
    case "text":
    default:
      return 4;
  }
}
```
