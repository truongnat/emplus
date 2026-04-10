---
title: "mobile/src/features/auth/components/LoginDreamAtmosphere.tsx"
description: "The LoginDreamAtmosphere function is responsible for rendering a dream globe animation"
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
  page: "reference/files/mobile/src/features/auth/components/LoginDreamAtmosphere.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginDreamAtmosphere.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginDreamAtmosphere.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/auth/components/LoginDreamAtmosphere.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginDreamAtmosphere.tsx`
- Lines: 188
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The LoginDreamAtmosphere function is responsible for rendering a dream globe animation

### Responsibilities

- render animation

### Usage Notes

- This function is used to animate the login window and its components

## Public API

- `function LoginDreamAtmosphere({ isDark }: { isDark: boolean })`

## Symbols

### function `LoginDreamAtmosphere`

- Signature: `function LoginDreamAtmosphere({ isDark }: { isDark: boolean })`
- Lines: 87-162
- Exported: yes

```tsx
function LoginDreamAtmosphere({ isDark }: { isDark: boolean }) {
  const reduced = useReducedMotion();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {isDark ? (
        <>
          <LinearGradient
            colors={["#0D0609", "#1A1218", "#1E1520", "#120C10"]}
            locations={[0, 0.35, 0.7, 1]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.9, y: 1 }}
          />
          <LinearGradient
            colors={["rgba(255,107,129,0.45)", "rgba(123,97,255,0.12)", "transparent"]}
            locations={[0, 0.4, 1]}
            style={styles.blobTop}
            start={{ x: 0.9, y: 0 }}
            end={{ x: 0.1, y: 0.85 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(79,209,197,0.08)", "rgba(123,97,255,0.06)"]}
            locations={[0, 0.5, 1]}
            style={styles.blobBottom}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0.3 }}
          />
        </>
      ) : (
        <>
          <LinearGradient
            colors={["#FFF5F7", "#FFE8EE", "#F5F0FF", "#E8FAF8", "#FFF8FB"]}
            locations={[0, 0.28, 0.52, 0.78, 1]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <LinearGradient
            colors={["rgba(255,143,163,0.55)", "rgba(255,107,129,0.2)", "transparent"]}
            locations={[0, 0.45, 1]}
            style={styles.blobTop}
            start={{ x: 1, y: 0.05 }}
            end={{ x: 0.15, y: 0.9 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(142,124,255,0.18)", "rgba(79,209,197,0.12)"]}
            locations={[0, 0.55, 1]}
            style={styles.blobBottom}
            start={{ x: 0.3, y: 1 }}
            end={{ x: 0.7, y: 0.2 }}
          />
        </>
      )}

      <DreamOrb
        size={W * 0.5}
        left={W * -0.06}
        top={H * 0.14}
        color={isDark ? "rgba(255,107,129,0.16)" : "rgba(255,143,163,0.26)"}
        durationMs={12000}
        delayMs={0}
        reduced={reduced}
      />
      <DreamOrb
        size={W * 0.38}
        left={W * 0.56}
        top={H * 0.5}
        color={isDark ? "rgba(123,97,255,0.12)" : "rgba(142,124,255,0.2)"}
        durationMs={14000}
        delayMs={400}
        reduced={reduced}
      />
    </View>
  );
}
```

### function `DreamOrb`

- Signature: `function DreamOrb({ size, left, top, color, durationMs, delayMs, reduced, }: { size: number; left: number; top: number; color: string; durationMs: number; delayMs: number; reduced: boolean; })`
- Lines: 20-85
- Exported: no

```tsx
function DreamOrb({
  size,
  left,
  top,
  color,
  durationMs,
  delayMs,
  reduced,
}: {
  size: number;
  left: number;
  top: number;
  color: string;
  durationMs: number;
  delayMs: number;
  reduced: boolean;
}) {
  const phase = useSharedValue(0);

  useEffect(() => {
    if (reduced) {
      phase.value = 0.25;
      return;
    }
    phase.value = withDelay(
      delayMs,
      withRepeat(
        withTiming(1, {
          duration: durationMs,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true,
      ),
    );
  }, [delayMs, durationMs, phase, reduced]);

  const animatedStyle = useAnimatedStyle(() => {
    const p = phase.value * Math.PI * 2;
    const driftX = Math.sin(p) * 14;
    const driftY = Math.cos(p * 0.85) * 18;
    const pulse = 0.42 + Math.sin(p * 1.3) * 0.12;
    return {
      transform: [{ translateX: driftX }, { translateY: driftY }],
      opacity: reduced ? 0.35 : pulse,
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          left,
          top,
        },
        animatedStyle,
      ]}
    />
  );
}
```
