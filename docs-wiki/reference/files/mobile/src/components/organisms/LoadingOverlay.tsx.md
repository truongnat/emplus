---
title: "mobile/src/components/organisms/LoadingOverlay.tsx"
description: "A reusable loading overlay component that displays a progress indicator."
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
  page: "reference/files/mobile/src/components/organisms/LoadingOverlay.tsx.md"
  relativePath: "mobile/src/components/organisms/LoadingOverlay.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/organisms/LoadingOverlay.tsx"
  module: "mobile/src/components/organisms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/organisms/LoadingOverlay.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/organisms](../../../../../modules/mobile/src/components/organisms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/organisms/LoadingOverlay.tsx`
- Lines: 45
- Symbols: 2

## AI Summary

A reusable loading overlay component that displays a progress indicator.

### Usage Notes

- The LoadingOverlay is wrapped around an ActivityIndicator and has a customizable label.

## Public API

- `interface LoadingOverlayProps`
- `function LoadingOverlay({ visible = true, label = "Đang tải...", }: LoadingOverlayProps)`

## Symbols

### interface `LoadingOverlayProps`

- Signature: `interface LoadingOverlayProps`
- Lines: 9-12
- Exported: yes

```tsx
interface LoadingOverlayProps {
  visible?: boolean;
  label?: string;
}
```

### function `LoadingOverlay`

- Signature: `function LoadingOverlay({ visible = true, label = "Đang tải...", }: LoadingOverlayProps)`
- Lines: 14-32
- Exported: yes

```tsx
function LoadingOverlay({
  visible = true,
  label = "Đang tải...",
}: LoadingOverlayProps) {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <View
      style={[styles.overlay, { backgroundColor: theme.colors.scrim }]}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityLiveRegion="polite"
    >
      <ActivityIndicator color={theme.colors.text.onBrand} size="large" />
    </View>
  );
}
```
