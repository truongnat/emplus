---
title: "mobile/src/features/auth/components/LoginScreenLoading.tsx"
description: "The LoginScreenLoading component is a JSX fragment that displays a loading animation with an Em+Lottie icon."
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
  page: "reference/files/mobile/src/features/auth/components/LoginScreenLoading.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginScreenLoading.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginScreenLoading.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/LoginScreenLoading.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginScreenLoading.tsx`
- Lines: 30
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Login](../../../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.

## AI Summary

The LoginScreenLoading component is a JSX fragment that displays a loading animation with an Em+Lottie icon.

### Responsibilities

- undefined

### Usage Notes

- This component is used to display loading animations on mobile devices.

## Public API

- `function LoginScreenLoading()`

## Symbols

### function `LoginScreenLoading`

- Signature: `function LoginScreenLoading()`
- Lines: 12-29
- Exported: yes

```tsx
function LoginScreenLoading() {
  const colors = useThemeColors();

  return (
    <AppScreen animatedEntrance={false}>
      <View style={styles.loadingContainer}>
        <EmplusLottie
          source={lottieInventory.loader}
          style={{ width: 96, height: 96 }}
          loop
        />
        <Text style={[styles.loadingText, { color: colors.text.tertiary }]}>
          Đang tải Em+...
        </Text>
      </View>
    </AppScreen>
  );
}
```
