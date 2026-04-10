---
title: "mobile/src/features/auth/components/LoginTopDecor.tsx"
description: "The LoginTopDecor component renders a string decoration at the top of the screen."
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
  page: "reference/files/mobile/src/features/auth/components/LoginTopDecor.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginTopDecor.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginTopDecor.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/features/auth/components/LoginTopDecor.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginTopDecor.tsx`
- Lines: 166
- Symbols: 3

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Login](../../../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.

## AI Summary

The LoginTopDecor component renders a string decoration at the top of the screen.

### Responsibilities

- renders string decoration

### Usage Notes

- The string decoration is used for identifying and styling UI elements
- The string decoration relies on the HangingString animation component

## Public API

- `interface LoginTopDecorProps`
- `function LoginTopDecor({ stringColor, lottieSize = 112, }: LoginTopDecorProps)`

## Symbols

### interface `LoginTopDecorProps`

- Signature: `interface LoginTopDecorProps`
- Lines: 92-97
- Exported: yes

```tsx
interface LoginTopDecorProps {
  /** Màu dây (light: trắng/rose; dark: mờ sáng) */
  stringColor: string;
  /** Chiều cao vùng Lottie (pt) */
  lottieSize?: number;
}
```

### function `LoginTopDecor`

- Signature: `function LoginTopDecor({ stringColor, lottieSize = 112, }: LoginTopDecorProps)`
- Lines: 102-138
- Exported: yes

```tsx
function LoginTopDecor({
  stringColor,
  lottieSize = 112,
}: LoginTopDecorProps) {
  const reduced = useReducedMotion();

  return (
    <View
      style={styles.wrap}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      <View style={styles.stringsRow}>
        {STRING_CONFIG.map((s, i) => (
          <HangingString
            key={i}
            length={s.length}
            delayMs={s.delay}
            width={s.width}
            swingMs={s.swing}
            color={stringColor}
            reduced={reduced}
          />
        ))}
      </View>

      <View style={[styles.lottieWrap, { height: lottieSize + 8 }]}>
        <EmplusLottie
          source={lottieInventory.careHeart}
          style={{ width: lottieSize, height: lottieSize }}
          loop
          speed={0.75}
        />
      </View>
    </View>
  );
}
```

### function `HangingString`

- Signature: `function HangingString({ length, delayMs, width, swingMs, color, reduced, }: { length: number; delayMs: number; width: number; swingMs: number; color: string; reduced: boolean; })`
- Lines: 26-90
- Exported: no

```tsx
function HangingString({
  length,
  delayMs,
  width,
  swingMs,
  color,
  reduced,
}: {
  length: number;
  delayMs: number;
  width: number;
  swingMs: number;
  color: string;
  reduced: boolean;
}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (reduced) {
      rotation.value = 0;
      return;
    }
    rotation.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(5, {
            duration: swingMs,
            easing: Easing.inOut(Easing.sin),
          }),
          withTiming(-5, {
            duration: swingMs,
            easing: Easing.inOut(Easing.sin),
          }),
        ),
        -1,
        false,
      ),
    );
  }, [delayMs, reduced, rotation, swingMs]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: length / 2 },
      { rotate: `${rotation.value}deg` },
      { translateY: -length / 2 },
    ],
  }));

  return (
    <View style={styles.stringColumn}>
      <Animated.View
        style={[
          {
            width,
            height: length,
            borderRadius: width,
            backgroundColor: color,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
```
