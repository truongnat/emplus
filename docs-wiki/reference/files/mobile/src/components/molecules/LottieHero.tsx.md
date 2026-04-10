---
title: "mobile/src/components/molecules/LottieHero.tsx"
description: "LottieHero component props"
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
  page: "reference/files/mobile/src/components/molecules/LottieHero.tsx.md"
  relativePath: "mobile/src/components/molecules/LottieHero.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/LottieHero.tsx"
  module: "mobile/src/components/molecules"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/molecules/LottieHero.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/molecules](../../../../../modules/mobile/src/components/molecules.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/LottieHero.tsx`
- Lines: 69
- Symbols: 2

## AI Summary

LottieHero component props

### Responsibilities

- __required LottieHeroProps

### Usage Notes

- source: required EmplusLottieProps, children: optional ReactNode, lottieHeight: optional number, style: optional ViewStyle

## Public API

- `interface LottieHeroProps`
- `function LottieHero({ source, children, lottieHeight = 200, style, }: LottieHeroProps)`

## Symbols

### interface `LottieHeroProps`

- Signature: `interface LottieHeroProps`
- Lines: 8-14
- Exported: yes

```tsx
interface LottieHeroProps {
  source: EmplusLottieProps["source"];
  children?: ReactNode;
  /** Chiều cao vùng Lottie (pt) */
  lottieHeight?: number;
  style?: ViewStyle;
}
```

### function `LottieHero`

- Signature: `function LottieHero({ source, children, lottieHeight = 200, style, }: LottieHeroProps)`
- Lines: 19-50
- Exported: yes

```tsx
function LottieHero({
  source,
  children,
  lottieHeight = 200,
  style,
}: LottieHeroProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMeta();
  const grad = getScreenGradientColors(isDark);

  return (
    <LinearGradient
      colors={[...grad.hero]}
      locations={[...gradientLocations.hero]}
      style={[styles.gradient, style]}
    >
      <View style={[styles.lottieBlock, { height: lottieHeight }]}>
        <EmplusLottie
          source={source}
          style={{ width: lottieHeight, height: lottieHeight }}
          loop
          speed={0.9}
        />
      </View>
      {children ? (
        <View style={[styles.sheet, { backgroundColor: colors.surface.default }]}>
          {children}
        </View>
      ) : null}
    </LinearGradient>
  );
}
```
