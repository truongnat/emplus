---
title: "mobile/src/animations/presets.ts"
description: "The `useEntranceAnimation` function generates an animated transition effect when the user navigates to a new screen."
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
  page: "reference/files/mobile/src/animations/presets.ts.md"
  relativePath: "mobile/src/animations/presets.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/animations/presets.ts"
  module: "mobile/src/animations"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/animations/presets.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/animations](../../../../modules/mobile/src/animations.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/animations/presets.ts`
- Lines: 58
- Symbols: 2

## AI Summary

The `useEntranceAnimation` function generates an animated transition effect when the user navigates to a new screen.

### Usage Notes

- Cannot be instantiated without optional configuration props: `delay`: Number.

## Public API

- `function usePressAnimation()`
- `function useEntranceAnimation(config?: { delay?: number })`

## Symbols

### function `usePressAnimation`

- Signature: `function usePressAnimation()`
- Lines: 13-37
- Exported: yes

```ts
function usePressAnimation() {
  const { spring } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlers = {
    onPressIn: () => {
      "worklet";
      scale.value = withSpringRM(0.96, spring.snappy);
      opacity.value = withTimingRM(0.85, { duration: 100 });
    },
    onPressOut: () => {
      "worklet";
      scale.value = withSpringRM(1.0, spring.snappy);
      opacity.value = withTimingRM(1.0, { duration: 150 });
    },
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { handlers, animatedStyle };
}
```

### function `useEntranceAnimation`

- Signature: `function useEntranceAnimation(config?: { delay?: number })`
- Lines: 42-57
- Exported: yes

```ts
function useEntranceAnimation(config?: { delay?: number }) {
  const { spring } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelayRM(
      config?.delay ?? 0,
      withSpringRM(1, { damping: 18, stiffness: 250 }),
    );
  }, []);

  return useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: interpolate(progress.value, [0, 1], [12, 0]) }],
  }));
}
```
