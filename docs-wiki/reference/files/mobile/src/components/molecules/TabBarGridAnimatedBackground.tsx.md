---
title: "mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx"
description: "A function that generates the TabBarGridAnimatedBackground component"
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
  page: "reference/files/mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx.md"
  relativePath: "mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx"
  module: "mobile/src/components/molecules"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/molecules](../../../../../modules/mobile/src/components/molecules.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/TabBarGridAnimatedBackground.tsx`
- Lines: 164
- Symbols: 2

## Related Features

- [Search Create](../../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.

## AI Summary

A function that generates the TabBarGridAnimatedBackground component

### Responsibilities

- create a TabBarGridAnimatedBackground component

### Usage Notes

- The TabBarGridAnimatedBackground component is used in mobile interfaces to render an animated background.

## Public API

- `TabBarGridAnimatedBackgroundProps`

```tsx
type TabBarGridAnimatedBackgroundProps = { isDark: boolean; width: number; height: number; /** * `strip` — full-bleed gradient (legacy dock under bar). * `embed` — transparent base so parent glass tint shows; grid + light wash sit *inside* pill/button under BlurView. */ variant?: "strip" | "embed"; /** Unique SVG pattern id when multiple instances mount (e.g. pill + care). */ patternIdSuffix?: string; };
```

- `function TabBarGridAnimatedBackground({ isDark, width: W0, height: H0, variant = "strip", patternIdSuffix = "a", }: TabBarGridAnimatedBackgroundProps)`

## Symbols

### type `TabBarGridAnimatedBackgroundProps`

- Signature:

```tsx
type TabBarGridAnimatedBackgroundProps = { isDark: boolean; width: number; height: number; /** * `strip` — full-bleed gradient (legacy dock under bar). * `embed` — transparent base so parent glass tint shows; grid + light wash sit *inside* pill/button under BlurView. */ variant?: "strip" | "embed"; /** Unique SVG pattern id when multiple instances mount (e.g. pill + care). */ patternIdSuffix?: string; };
```
- Lines: 19-30
- Exported: yes

```tsx
type TabBarGridAnimatedBackgroundProps = {
  isDark: boolean;
  width: number;
  height: number;
  /**
   * `strip` — full-bleed gradient (legacy dock under bar).
   * `embed` — transparent base so parent glass tint shows; grid + light wash sit *inside* pill/button under BlurView.
   */
  variant?: "strip" | "embed";
  /** Unique SVG pattern id when multiple instances mount (e.g. pill + care). */
  patternIdSuffix?: string;
};
```

### function `TabBarGridAnimatedBackground`

- Signature: `function TabBarGridAnimatedBackground({ isDark, width: W0, height: H0, variant = "strip", patternIdSuffix = "a", }: TabBarGridAnimatedBackgroundProps)`
- Lines: 35-156
- Exported: yes

```tsx
function TabBarGridAnimatedBackground({
  isDark,
  width: W0,
  height: H0,
  variant = "strip",
  patternIdSuffix = "a",
}: TabBarGridAnimatedBackgroundProps) {
  const reduced = useReducedMotion();
  const drift = useSharedValue(0);
  const wash = useSharedValue(0);

  useEffect(() => {
    if (reduced) {
      drift.value = 0.5;
      wash.value = 0.5;
      return;
    }
    drift.value = withRepeat(
      withTiming(1, { duration: 18_000, easing: Easing.linear }),
      -1,
      false,
    );
    wash.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 7200, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 7200, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [drift, reduced, wash]);

  const gridWrapStyle = useAnimatedStyle(() => {
    const tx = interpolate(drift.value, [0, 1], [0, G]);
    const ty = interpolate(drift.value, [0, 1], [0, G * 0.42]);
    return {
      transform: [{ translateX: tx }, { translateY: ty }],
    };
  });

  const washStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      wash.value,
      [0, 1],
      variant === "embed" ? [0.2, 0.05] : [0.32, 0.1],
    ),
  }));

  const pad = G * 2;
  const W = W0 + pad * 2;
  const H = H0 + pad * 2;
  const stroke =
    variant === "embed"
      ? isDark
        ? "rgba(255,255,255,0.1)"
        : "rgba(123,97,255,0.14)"
      : isDark
        ? "rgba(255,255,255,0.075)"
        : "rgba(123,97,255,0.1)";

  const patternId = `${PATTERN_ID_BASE}_${patternIdSuffix}`;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {variant === "strip" ? (
        <LinearGradient
          colors={
            isDark
              ? ["transparent", "rgba(26, 20, 22, 0.82)", "rgba(16, 12, 14, 0.94)"]
              : [
                  "transparent",
                  "rgba(252, 249, 248, 0.58)",
                  "rgba(255, 245, 247, 0.85)",
                ]
          }
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      ) : null}

      <Animated.View style={[styles.gridClip, gridWrapStyle]} pointerEvents="none">
        <Svg width={W} height={H} style={{ marginLeft: -pad, marginTop: -pad }}>
          <Defs>
            <Pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              width={G}
              height={G}
            >
              <Path
                d={`M ${G} 0 L 0 0 0 ${G}`}
                stroke={stroke}
                strokeWidth={StyleSheet.hairlineWidth * 2}
                fill="none"
              />
            </Pattern>
          </Defs>
          <Rect width={W} height={H} fill={`url(#${patternId})`} />
        </Svg>
      </Animated.View>

      <Animated.View style={[StyleSheet.absoluteFill, washStyle]} pointerEvents="none">
        <LinearGradient
          colors={
            isDark
              ? ["transparent", variant === "embed" ? "rgba(255,107,129,0.1)" : "rgba(255,107,129,0.14)"]
              : [
                  "transparent",
                  variant === "embed" ? "rgba(255,107,129,0.06)" : "rgba(255,107,129,0.09)",
                ]
          }
          locations={[0.25, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.35, y: 0 }}
          end={{ x: 0.75, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}
```
