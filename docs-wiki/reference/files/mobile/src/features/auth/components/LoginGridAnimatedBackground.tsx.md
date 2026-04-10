---
title: "mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx"
description: "The LoginGridAnimatedBackground component configures the user interface for a login form grid with animated background effects when the display mode changes from light to dark or …"
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
  page: "reference/files/mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx`
- Lines: 204
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The LoginGridAnimatedBackground component configures the user interface for a login form grid with animated background effects when the display mode changes from light to dark or vice versa.

### Responsibilities

- To implement login form layout and apply animations
- Handle user interactions with the login form

### Usage Notes

- This code snippet demonstrates how to create a LoginGridAnimatedBackground component that can be used in conjunction with other features to display an animated background for authenticated users when the device screen changes mode.

## Public API

- `function LoginGridAnimatedBackground({ isDark }: { isDark: boolean })`

## Symbols

### function `LoginGridAnimatedBackground`

- Signature: `function LoginGridAnimatedBackground({ isDark }: { isDark: boolean })`
- Lines: 28-196
- Exported: yes

```tsx
function LoginGridAnimatedBackground({ isDark }: { isDark: boolean }) {
  const { width: winW, height: winH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  /** Full physical bleed: tránh “lề” trái/phải/dưới khi scene nằm trong safe area + phủ vùng tab bar. */
  const bleedW = winW + insets.left + insets.right;
  const bleedH = winH + insets.top + insets.bottom;

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
      withTiming(1, { duration: 14000, easing: Easing.linear }),
      -1,
      false,
    );
    wash.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 5200, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 5200, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [drift, reduced, wash]);

  const gridWrapStyle = useAnimatedStyle(() => {
    const tx = interpolate(drift.value, [0, 1], [0, G]);
    const ty = interpolate(drift.value, [0, 1], [0, G * 0.55]);
    return {
      transform: [{ translateX: tx }, { translateY: ty }],
    };
  });

  const washAStyle = useAnimatedStyle(() => {
    const peak = isDark ? 0.55 : 0.42;
    const trough = isDark ? 0.2 : 0.12;
    return {
      opacity: interpolate(wash.value, [0, 1], [peak, trough]),
    };
  }, [isDark]);

  const washBStyle = useAnimatedStyle(() => {
    const peak = isDark ? 0.42 : 0.34;
    const trough = isDark ? 0.18 : 0.14;
    return {
      opacity: interpolate(wash.value, [0, 1], [trough, peak]),
    };
  }, [isDark]);

  const pad = G * 4;
  const W = bleedW + pad * 2;
  const H = bleedH + pad * 2;
  const stroke = isDark
    ? "rgba(244,240,230,0.055)"
    : "rgba(91,71,199,0.26)";
  /** Light: nét dày hơn hairline — lưới mới đọc được trên nền sáng. */
  const gridStrokeWidth = isDark
    ? StyleSheet.hairlineWidth * 2
    : Math.max(1, StyleSheet.hairlineWidth * 3);

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: -insets.top,
        left: -insets.left,
        width: bleedW,
        height: bleedH,
      }}
    >
      <LinearGradient
        colors={
          isDark
            ? [
                LOGIN_GRID_TOP_DARK,
                auraPalette.darkSurf,
                auraPalette.taupe900,
              ]
            : [
                LOGIN_GRID_TOP_LIGHT,
                "#ede4ff",
                "#dff7f2",
              ]
        }
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />

      <Animated.View
        style={[styles.gridClip, gridWrapStyle]}
        pointerEvents="none"
      >
        <Svg
          width={W}
          height={H}
          style={{ marginLeft: -pad, marginTop: -pad }}
        >
          <Defs>
            <Pattern
              id="emplusLoginGrid"
              patternUnits="userSpaceOnUse"
              width={G}
              height={G}
            >
              <Path
                d={`M ${G} 0 L 0 0 0 ${G}`}
                stroke={stroke}
                strokeWidth={gridStrokeWidth}
                fill="none"
              />
            </Pattern>
          </Defs>
          <Rect width={W} height={H} fill="url(#emplusLoginGrid)" />
        </Svg>
      </Animated.View>

      <Animated.View
        style={[StyleSheet.absoluteFill, washAStyle]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={
            isDark
              ? ["rgba(255,107,129,0.16)", "transparent", "transparent"]
              : ["rgba(255,107,129,0.28)", "transparent", "transparent"]
          }
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 0.6 }}
        />
      </Animated.View>
      <Animated.View
        style={[StyleSheet.absoluteFill, washBStyle]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={
            isDark
              ? [
                  "transparent",
                  "rgba(168,85,247,0.10)",
                  "rgba(45,212,191,0.07)",
                ]
              : [
                  "transparent",
                  "rgba(123,97,255,0.22)",
                  "rgba(45,212,191,0.18)",
                ]
          }
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}
```
