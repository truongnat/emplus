---
title: "mobile/src/components/atoms/EmplusLottie.tsx"
description: "Provides 2 documented symbols in mobile/src/components/atoms/EmplusLottie.tsx."
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
  page: "reference/files/mobile/src/components/atoms/EmplusLottie.tsx.md"
  relativePath: "mobile/src/components/atoms/EmplusLottie.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/EmplusLottie.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/atoms/EmplusLottie.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/EmplusLottie.tsx`
- Lines: 50
- Symbols: 2

## AI Summary

Provides 2 documented symbols in mobile/src/components/atoms/EmplusLottie.tsx.

## Public API

- `interface EmplusLottieProps extends Omit<LottieViewProps, "source">`
- `function EmplusLottie({ source, loop = true, autoPlay = true, speed = 1, staticOnReduceMotion = true, style, containerStyle, ...rest }: EmplusLottieProps)`

## Symbols

### interface `EmplusLottieProps`

- Signature: `interface EmplusLottieProps extends Omit<LottieViewProps, "source">`
- Lines: 6-11
- Exported: yes

```tsx
interface EmplusLottieProps extends Omit<LottieViewProps, "source"> {
  source: LottieViewProps["source"];
  /** Khi reduce motion: chỉ hiện frame đầu, không loop */
  staticOnReduceMotion?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
```

### function `EmplusLottie`

- Signature: `function EmplusLottie({ source, loop = true, autoPlay = true, speed = 1, staticOnReduceMotion = true, style, containerStyle, ...rest }: EmplusLottieProps)`
- Lines: 16-42
- Exported: yes

```tsx
function EmplusLottie({
  source,
  loop = true,
  autoPlay = true,
  speed = 1,
  staticOnReduceMotion = true,
  style,
  containerStyle,
  ...rest
}: EmplusLottieProps) {
  const reduced = useReducedMotion();
  const freeze = reduced && staticOnReduceMotion;

  return (
    <View style={[styles.wrap, containerStyle]}>
      <LottieView
        source={source}
        style={style}
        loop={freeze ? false : loop}
        autoPlay={freeze ? false : autoPlay}
        speed={speed}
        {...(freeze ? { progress: 0 as const } : {})}
        {...rest}
      />
    </View>
  );
}
```
