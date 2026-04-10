---
title: "mobile/src/components/glass/LiquidGlassView.tsx"
description: "The LiquidGlassView component renders a glassy view with customizable properties and behavior."
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
  page: "reference/files/mobile/src/components/glass/LiquidGlassView.tsx.md"
  relativePath: "mobile/src/components/glass/LiquidGlassView.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/glass/LiquidGlassView.tsx"
  module: "mobile/src/components/glass"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/src/components/glass/LiquidGlassView.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/glass](../../../../../modules/mobile/src/components/glass.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/glass/LiquidGlassView.tsx`
- Lines: 107
- Symbols: 4

## AI Summary

The LiquidGlassView component renders a glassy view with customizable properties and behavior.

### Responsibilities

- To render a glassy view with a custom style, children, effect, and interaction, the LiquidGlassView function is responsible for encapsulating these components.

### Usage Notes

- The LiquidGlassContainer function is used to wrap the LiquidGlassView component and handle its lifespan.

## Public API

- `LiquidGlassView`

```tsx
function LiquidGlassView({ children, style, glassStyle, effect, tintColor = "rgba(255, 255, 255, 0.3)", colorScheme = "auto", isInteractive, interactive, animate = true, animationDuration = 500, }: LiquidGlassViewProps)
```

- `function LiquidGlassContainer({ children, style, spacing = 20, }: LiquidGlassContainerProps)`

## Symbols

### function `LiquidGlassView`

- Signature:

```tsx
function LiquidGlassView({ children, style, glassStyle, effect, tintColor = "rgba(255, 255, 255, 0.3)", colorScheme = "auto", isInteractive, interactive, animate = true, animationDuration = 500, }: LiquidGlassViewProps)
```
- Lines: 30-64
- Exported: yes

```tsx
function LiquidGlassView({
  children,
  style,
  glassStyle,
  effect,
  tintColor = "rgba(255, 255, 255, 0.3)",
  colorScheme = "auto",
  isInteractive,
  interactive,
  animate = true,
  animationDuration = 500,
}: LiquidGlassViewProps) {
  const finalStyle = glassStyle || effect || "regular";
  const finalInteractive = isInteractive ?? interactive ?? false;

  if (!isLiquidGlassSupported) {
    return <View style={[styles.fallback, style]}>{children}</View>;
  }

  return (
    <GlassView
      style={[styles.glass, style]}
      glassEffectStyle={{
        style: finalStyle,
        animate: animate,
        animationDuration: animationDuration,
      }}
      tintColor={tintColor}
      colorScheme={colorScheme}
      isInteractive={finalInteractive}
    >
      {children}
    </GlassView>
  );
}
```

### function `LiquidGlassContainer`

- Signature: `function LiquidGlassContainer({ children, style, spacing = 20, }: LiquidGlassContainerProps)`
- Lines: 75-89
- Exported: yes

```tsx
function LiquidGlassContainer({
  children,
  style,
  spacing = 20,
}: LiquidGlassContainerProps) {
  if (!isLiquidGlassSupported) {
    return <View style={[styles.container, style]}>{children}</View>;
  }

  return (
    <GlassContainer style={[styles.container, style]} spacing={spacing}>
      {children}
    </GlassContainer>
  );
}
```

### interface `LiquidGlassViewProps`

- Signature: `interface LiquidGlassViewProps`
- Lines: 11-23
- Exported: no

```tsx
interface LiquidGlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glassStyle?: "regular" | "clear" | "none";
  tintColor?: string;
  colorScheme?: "auto" | "light" | "dark";
  isInteractive?: boolean;
  animate?: boolean;
  animationDuration?: number;
  // Compatibility props
  interactive?: boolean;
  effect?: "regular" | "clear" | "none";
}
```

### interface `LiquidGlassContainerProps`

- Signature: `interface LiquidGlassContainerProps`
- Lines: 66-70
- Exported: no

```tsx
interface LiquidGlassContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  spacing?: number;
}
```
