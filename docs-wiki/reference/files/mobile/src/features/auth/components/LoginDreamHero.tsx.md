---
title: "mobile/src/features/auth/components/LoginDreamHero.tsx"
description: "Component responsible for rendering the login screen's top part"
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
  page: "reference/files/mobile/src/features/auth/components/LoginDreamHero.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginDreamHero.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginDreamHero.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/LoginDreamHero.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginDreamHero.tsx`
- Lines: 69
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Login](../../../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.

## AI Summary

Component responsible for rendering the login screen's top part

### Responsibilities

- Rendering the login screen's top part, containing a string of color and size

### Usage Notes

- No additional usage notes are provided in this file
- The function `LoginDreamHero` uses dependencies such as `useReducedMotion`, `useSharedValue`, and `useAnimatedStyle`

## Public API

- `function LoginDreamHero({ isDark, lottieSize = 128, }: { isDark: boolean; lottieSize?: number; })`

## Symbols

### function `LoginDreamHero`

- Signature: `function LoginDreamHero({ isDark, lottieSize = 128, }: { isDark: boolean; lottieSize?: number; })`
- Lines: 18-60
- Exported: yes

```tsx
function LoginDreamHero({
  isDark,
  lottieSize = 128,
}: {
  isDark: boolean;
  lottieSize?: number;
}) {
  const reduced = useReducedMotion();
  const stringColor = isDark
    ? "rgba(255, 200, 210, 0.38)"
    : "rgba(255, 107, 129, 0.45)";

  const breath = useSharedValue(1);

  useEffect(() => {
    if (reduced) {
      breath.value = 1;
      return;
    }
    breath.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [breath, reduced]);

  const wrapStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breath.value }],
  }));

  return (
    <Animated.View
      style={[styles.wrap, wrapStyle]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      <LoginTopDecor stringColor={stringColor} lottieSize={lottieSize} />
    </Animated.View>
  );
}
```
