---
title: "mobile/src/features/auth/components/LoginFooterSlot.tsx"
description: "children: ReactNode, gardenSlot?: ReactNode, style?: ViewStyle"
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
  page: "reference/files/mobile/src/features/auth/components/LoginFooterSlot.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginFooterSlot.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginFooterSlot.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/auth/components/LoginFooterSlot.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginFooterSlot.tsx`
- Lines: 57
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

children: ReactNode, gardenSlot?: ReactNode, style?: ViewStyle

### Responsibilities

- children: ReactNode, gardenSlot?: ReactNode, style?: ViewStyle

### Usage Notes

- Function component with a single prop parameter of type LoginFooterSlotProps

## Public API

- `interface LoginFooterSlotProps` — Props object of type LoginFooterSlotProps
- `function LoginFooterSlot({ children, gardenSlot, style, }: LoginFooterSlotProps)`

## Symbols

### interface `LoginFooterSlotProps`

- Signature: `interface LoginFooterSlotProps`
- Lines: 4-10
- Exported: yes
- Summary: Props object of type LoginFooterSlotProps

```tsx
interface LoginFooterSlotProps {
  /** Hàng action (vd. đăng ký) */
  children: ReactNode;
  /** Slot phía trên — sau này gắn animation vườn hoa */
  gardenSlot?: ReactNode;
  style?: ViewStyle;
}
```

### function `LoginFooterSlot`

- Signature: `function LoginFooterSlot({ children, gardenSlot, style, }: LoginFooterSlotProps)`
- Lines: 15-32
- Exported: yes

```tsx
function LoginFooterSlot({
  children,
  gardenSlot,
  style,
}: LoginFooterSlotProps) {
  return (
    <View style={[styles.wrap, style]}>
      <View
        style={styles.gardenPlaceholder}
        accessibilityElementsHidden={!gardenSlot}
        importantForAccessibility={gardenSlot ? "yes" : "no-hide-descendants"}
      >
        {gardenSlot ?? <View style={styles.gardenSpacer} />}
      </View>
      <View style={styles.actions}>{children}</View>
    </View>
  );
}
```
