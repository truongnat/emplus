---
title: "mobile/src/features/auth/components/LoginMeshBackground.tsx"
description: "LoginMeshBackground function returns a LoginMeshVariant type representing the variant of the mesh component."
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
  page: "reference/files/mobile/src/features/auth/components/LoginMeshBackground.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginMeshBackground.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginMeshBackground.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/auth/components/LoginMeshBackground.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginMeshBackground.tsx`
- Lines: 101
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

LoginMeshBackground function returns a LoginMeshVariant type representing the variant of the mesh component.

## Public API

- `function LoginMeshBackground({ isDark, variant = "mesh", }: { isDark: boolean; variant?: LoginMeshVariant; })`

## Symbols

### function `LoginMeshBackground`

- Signature: `function LoginMeshBackground({ isDark, variant = "mesh", }: { isDark: boolean; variant?: LoginMeshVariant; })`
- Lines: 11-78
- Exported: yes

```tsx
function LoginMeshBackground({
  isDark,
  variant = "mesh",
}: {
  isDark: boolean;
  variant?: LoginMeshVariant;
}) {
  if (isDark) {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#0C080A", "#141018", "#1A1218"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <LinearGradient
          colors={["rgba(244, 63, 94, 0.35)", "rgba(244, 63, 94, 0)", "transparent"]}
          locations={[0, 0.45, 1]}
          style={styles.blobTopRight}
          start={{ x: 0.8, y: 0 }}
          end={{ x: 0, y: 0.9 }}
        />
        <LinearGradient
          colors={["rgba(168, 85, 247, 0.12)", "transparent"]}
          style={styles.blobBottomLeft}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    );
  }

  if (variant === "flat") {
    return (
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: "#FFFFFF" }]}
        pointerEvents="none"
      />
    );
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={["#FFF5F3", "#FFECE8", "#FFD6DD", "#FFF0F2"]}
        locations={[0, 0.35, 0.72, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
      />
      <LinearGradient
        colors={["rgba(255, 182, 193, 0.55)", "rgba(255, 160, 176, 0.15)", "transparent"]}
        locations={[0, 0.5, 1]}
        style={styles.blobTopRight}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0.8 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(253, 186, 116, 0.2)", "rgba(244, 63, 94, 0.08)"]}
        locations={[0, 0.55, 1]}
        style={styles.blobBottomLeft}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
    </View>
  );
}
```

### type `LoginMeshVariant`

- Signature: `type LoginMeshVariant = "mesh" | "flat";`
- Lines: 6-6
- Exported: no

```tsx
type LoginMeshVariant = "mesh" | "flat";
```
