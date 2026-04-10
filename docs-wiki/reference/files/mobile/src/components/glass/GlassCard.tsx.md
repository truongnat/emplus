---
title: "mobile/src/components/glass/GlassCard.tsx"
description: "The GlassCard component is a card component that displays content and can be customized with various props."
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
  page: "reference/files/mobile/src/components/glass/GlassCard.tsx.md"
  relativePath: "mobile/src/components/glass/GlassCard.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/glass/GlassCard.tsx"
  module: "mobile/src/components/glass"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 6
---

# mobile/src/components/glass/GlassCard.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/glass](../../../../../modules/mobile/src/components/glass.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/glass/GlassCard.tsx`
- Lines: 213
- Symbols: 6

## AI Summary

The GlassCard component is a card component that displays content and can be customized with various props.

### Responsibilities

- displaying content
- customizing with props

### Usage Notes

- The default style can change depending on intensity, tint, and liquid requirements
- The darken overlay gradient is only applied when tint is 'dark'

## Public API

- `function GlassCard({ children, style, intensity = 60, tint = "default", isLiquid = false, contentStyle, darkOverlayGradient, }: GlassCardProps)`
- `function GlassButton({ children, onPress, style, isLiquid = false, }: GlassButtonProps)`
- `function GlassOrb({ size = 100, color, style }: GlassOrbProps)`

## Symbols

### function `GlassCard`

- Signature: `function GlassCard({ children, style, intensity = 60, tint = "default", isLiquid = false, contentStyle, darkOverlayGradient, }: GlassCardProps)`
- Lines: 36-89
- Exported: yes

```tsx
function GlassCard({
  children,
  style,
  intensity = 60,
  tint = "default",
  isLiquid = false,
  contentStyle,
  darkOverlayGradient,
}: GlassCardProps) {
  const darkGradient = darkOverlayGradient ?? [
    "rgba(38, 28, 32, 0.78)",
    "rgba(26, 20, 22, 0.72)",
  ];

  // Use LiquidGlassView if requested and supported
  if (isLiquid && isLiquidGlassSupported) {
    return (
      <LiquidGlassView
        style={[styles.liquidCardShell, style]}
        glassStyle={tint === "dark" ? "regular" : "clear"}
        colorScheme={tint === "dark" ? "dark" : "light"}
        tintColor={
          tint === "dark"
            ? darkOverlayGradient
              ? "rgba(255, 143, 159, 0.14)"
              : "rgba(255, 255, 255, 0.11)"
            : "rgba(255, 255, 255, 0.45)"
        }
      >
        <View style={[styles.cardContent, contentStyle]}>{children}</View>
      </LiquidGlassView>
    );
  }

  // Default expo-blur version
  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      style={[styles.blurContainer, style]}
    >
      <LinearGradient
        colors={
          tint === "dark"
            ? [...darkGradient]
            : ["rgba(255, 255, 255, 0.72)", "rgba(255, 255, 255, 0.65)"]
        }
        style={styles.gradient}
      >
        <View style={[styles.cardContent, contentStyle]}>{children}</View>
      </LinearGradient>
    </BlurView>
  );
}
```

### function `GlassButton`

- Signature: `function GlassButton({ children, onPress, style, isLiquid = false, }: GlassButtonProps)`
- Lines: 101-137
- Exported: yes

```tsx
function GlassButton({
  children,
  onPress,
  style,
  isLiquid = false,
}: GlassButtonProps) {
  if (isLiquid && isLiquidGlassSupported) {
    return (
      <Pressable onPress={onPress}>
        <LiquidGlassView
          style={[styles.button, style]}
          isInteractive
          glassStyle="clear"
        >
          {children}
        </LiquidGlassView>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <BlurView
        intensity={50}
        tint="light"
        style={[styles.blurContainer, { borderRadius: 16 }, style]}
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.5)"]}
          style={styles.gradient}
        >
          <View style={styles.buttonContent}>{children}</View>
        </LinearGradient>
      </BlurView>
    </Pressable>
  );
}
```

### function `GlassOrb`

- Signature: `function GlassOrb({ size = 100, color, style }: GlassOrbProps)`
- Lines: 148-163
- Exported: yes

```tsx
function GlassOrb({ size = 100, color, style }: GlassOrbProps) {
  return (
    <View style={[styles.orbContainer, { width: size, height: size }, style]}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={[
            color || "rgba(244, 63, 94, 0.3)",
            color || "rgba(244, 63, 94, 0.1)",
            "transparent",
          ]}
          style={StyleSheet.absoluteFill}
        />
      </BlurView>
    </View>
  );
}
```

### interface `GlassCardProps`

- Signature: `interface GlassCardProps`
- Lines: 18-31
- Exported: no

```tsx
interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: "light" | "dark" | "default";
  isLiquid?: boolean;
  /** Merged after internal `cardContent` (padding, borderColor, …). */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * expo-blur path only: custom top→bottom gradient when `tint === "dark"`.
   * Lower alpha = more grid/aura visible behind the card.
   */
  darkOverlayGradient?: readonly [string, string];
}
```

### interface `GlassButtonProps`

- Signature: `interface GlassButtonProps`
- Lines: 94-99
- Exported: no

```tsx
interface GlassButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isLiquid?: boolean;
}
```

### interface `GlassOrbProps`

- Signature: `interface GlassOrbProps`
- Lines: 142-146
- Exported: no

```tsx
interface GlassOrbProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
```
