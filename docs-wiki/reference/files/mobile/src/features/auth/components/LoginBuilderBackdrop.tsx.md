---
title: "mobile/src/features/auth/components/LoginBuilderBackdrop.tsx"
description: "Background color for LoginBuilder component (with optional dark mode)"
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
  page: "reference/files/mobile/src/features/auth/components/LoginBuilderBackdrop.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginBuilderBackdrop.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginBuilderBackdrop.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/LoginBuilderBackdrop.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginBuilderBackdrop.tsx`
- Lines: 31
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

Background color for LoginBuilder component (with optional dark mode)

## Public API

- `function LoginBuilderBackdrop({ isDark }: { isDark: boolean })`

## Symbols

### function `LoginBuilderBackdrop`

- Signature: `function LoginBuilderBackdrop({ isDark }: { isDark: boolean })`
- Lines: 8-30
- Exported: yes

```tsx
function LoginBuilderBackdrop({ isDark }: { isDark: boolean }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {isDark ? (
        <LinearGradient
          colors={["#0c0e12", "#12151c", "#0c0e12"]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      ) : (
        <LinearGradient
          colors={["#fafafa", "#f4f4f5", "#fafafa"]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}
    </View>
  );
}
```
