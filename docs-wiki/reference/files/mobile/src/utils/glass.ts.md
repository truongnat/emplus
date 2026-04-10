---
title: "mobile/src/utils/glass.ts"
description: "Mobile's Glass Material Configuration Utility."
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
  page: "reference/files/mobile/src/utils/glass.ts.md"
  relativePath: "mobile/src/utils/glass.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/glass.ts"
  module: "mobile/src/utils"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 7
---

# mobile/src/utils/glass.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/utils](../../../../modules/mobile/src/utils.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/glass.ts`
- Lines: 148
- Symbols: 7

## AI Summary

Mobile's Glass Material Configuration Utility.

### Responsibilities

- Configure glass material properties (intensity, opacity, border opacity, shadow, variant)

### Usage Notes

- The GlassOptions interface defines the base styles and colors for the glass material. The ViewStyle object is generated based on these options.

## Public API

- `function glass(options: GlassOptions = {}): ViewStyle`
- `function liquidGradient(colors: string[] = []): ViewStyle`
- `function glassCard(options?: GlassOptions): ViewStyle`
- `function glassButton( options?: GlassOptions & { pressed?: boolean }, ): ViewStyle`
- `function glassInput(options?: GlassOptions): ViewStyle`
- `function glassOrb(size: number, color: string): ViewStyle`

## Symbols

### function `glass`

- Signature: `function glass(options: GlassOptions = {}): ViewStyle`
- Lines: 21-67
- Exported: yes

```ts
function glass(options: GlassOptions = {}): ViewStyle {
  const {
    intensity = 50,
    opacity = 0.7,
    borderOpacity = 0.5,
    shadow = true,
    variant = "light",
  } = options;

  const baseStyles: ViewStyle = {
    // Backdrop blur (requires expo-blur)
    // Note: Apply BlurView as parent for actual blur effect

    // Translucent background
    backgroundColor:
      variant === "dark"
        ? `rgba(20, 20, 30, ${opacity * 0.9})`
        : variant === "ultra"
          ? `rgba(255, 255, 255, ${opacity * 0.5})`
          : `rgba(255, 255, 255, ${opacity})`,

    // Subtle border
    borderWidth: 1,
    borderColor:
      variant === "dark"
        ? `rgba(255, 255, 255, ${borderOpacity * 0.3})`
        : `rgba(255, 255, 255, ${borderOpacity})`,

    // Smooth corners
    overflow: "hidden",
  };

  if (shadow) {
    return {
      ...baseStyles,
      // iOS shadow
      shadowColor: variant === "dark" ? "#000" : "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: variant === "dark" ? 0.3 : 0.1,
      shadowRadius: 24,
      // Android elevation
      elevation: 12,
    };
  }

  return baseStyles;
}
```

### function `liquidGradient`

- Signature: `function liquidGradient(colors: string[] = []): ViewStyle`
- Lines: 73-83
- Exported: yes

```ts
function liquidGradient(colors: string[] = []): ViewStyle {
  const defaultColors = [
    "rgba(244, 63, 94, 0.15)", // Rose tint
    "rgba(255, 255, 255, 0.05)", // Clear
    "rgba(244, 63, 94, 0.08)", // Soft rose
  ];

  return {
    backgroundColor: "transparent",
  };
}
```

### function `glassCard`

- Signature: `function glassCard(options?: GlassOptions): ViewStyle`
- Lines: 89-95
- Exported: yes

```ts
function glassCard(options?: GlassOptions): ViewStyle {
  return {
    ...glass({ ...options, intensity: 60, opacity: 0.75 }),
    borderRadius: 24,
    padding: 20,
  };
}
```

### function `glassButton`

- Signature: `function glassButton( options?: GlassOptions & { pressed?: boolean }, ): ViewStyle`
- Lines: 101-113
- Exported: yes

```ts
function glassButton(
  options?: GlassOptions & { pressed?: boolean },
): ViewStyle {
  const { pressed, ...rest } = options || {};

  return {
    ...glass({ ...rest, opacity: pressed ? 0.9 : 0.6 }),
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: pressed ? 1.5 : 1,
  };
}
```

### function `glassInput`

- Signature: `function glassInput(options?: GlassOptions): ViewStyle`
- Lines: 119-127
- Exported: yes

```ts
function glassInput(options?: GlassOptions): ViewStyle {
  return {
    ...glass({ ...options, opacity: 0.5 }),
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
  };
}
```

### function `glassOrb`

- Signature: `function glassOrb(size: number, color: string): ViewStyle`
- Lines: 133-147
- Exported: yes

```ts
function glassOrb(size: number, color: string): ViewStyle {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity: 0.3,
    // Soft glow
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: size / 4,
    elevation: 8,
  };
}
```

### interface `GlassOptions`

- Signature: `interface GlassOptions`
- Lines: 8-14
- Exported: no

```ts
interface GlassOptions {
  intensity?: number; // 0-100, blur intensity
  opacity?: number; // 0-1, background opacity
  borderOpacity?: number; // 0-1, border opacity
  shadow?: boolean; // Add shadow
  variant?: "light" | "dark" | "ultra";
}
```
