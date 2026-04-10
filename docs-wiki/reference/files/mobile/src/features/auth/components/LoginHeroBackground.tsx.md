---
title: "mobile/src/features/auth/components/LoginHeroBackground.tsx"
description: "The LoginHeroBackground component renders a background image with color variants based on the theme mode."
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
  page: "reference/files/mobile/src/features/auth/components/LoginHeroBackground.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginHeroBackground.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginHeroBackground.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/src/features/auth/components/LoginHeroBackground.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginHeroBackground.tsx`
- Lines: 127
- Symbols: 4

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The LoginHeroBackground component renders a background image with color variants based on the theme mode.

### Responsibilities

- ["useThemeMode", "useState"]

### Usage Notes

- use the `useThemeMode` hook and `useState` to get access to the current theme mode.
- The `styles.absoluteFill` style is used to fill the entire screen with a solid color.

## Public API

- `function LoginHeroBackground()`

## Symbols

### function `LoginHeroBackground`

- Signature: `function LoginHeroBackground()`
- Lines: 13-37
- Exported: yes

```tsx
function LoginHeroBackground() {
  const { isDark } = useThemeMode();
  const [imageFailed, setImageFailed] = useState(false);

  const uri = isDark ? AUTH_HERO_IMAGE_DARK : AUTH_HERO_IMAGE_LIGHT;

  if (imageFailed) {
    return <GradientFallback isDark={isDark} />;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <ImageBackground
        source={{ uri }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        onError={() => setImageFailed(true)}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {isDark ? <DarkScrim /> : <LightScrim />}
      </ImageBackground>
    </View>
  );
}
```

### function `DarkScrim`

- Signature: `function DarkScrim()`
- Lines: 39-58
- Exported: no

```tsx
function DarkScrim() {
  return (
    <>
      <LinearGradient
        colors={["rgba(8,4,6,0.92)", "rgba(22,10,14,0.85)", "rgba(18,6,12,0.94)"]}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(244,63,94,0.08)", "transparent", "rgba(0,0,0,0.42)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </>
  );
}
```

### function `LightScrim`

- Signature: `function LightScrim()`
- Lines: 60-92
- Exported: no

```tsx
function LightScrim() {
  return (
    <>
      <LinearGradient
        colors={[
          "rgba(255,252,251,0.82)",
          "rgba(255,246,248,0.74)",
          "rgba(255,235,240,0.68)",
        ]}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(253,186,116,0.08)", "transparent", "rgba(244,63,94,0.06)"]}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Viền tối nhẹ — vignette, tăng chiều sâu */}
      <LinearGradient
        colors={["rgba(40,20,28,0.12)", "transparent", "rgba(30,10,18,0.18)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
    </>
  );
}
```

### function `GradientFallback`

- Signature: `function GradientFallback({ isDark }: { isDark: boolean })`
- Lines: 94-126
- Exported: no

```tsx
function GradientFallback({ isDark }: { isDark: boolean }) {
  if (isDark) {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#050203", "#12060A", "#1A0810", "#221018"]}
          locations={[0, 0.32, 0.68, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.4, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={["#FFF7F5", "#FFE8EC", "#FFDCE4", "#FCE7F3"]}
        locations={[0, 0.28, 0.62, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.45, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(253, 186, 116, 0.22)", "transparent", "rgba(244, 63, 94, 0.12)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
```
