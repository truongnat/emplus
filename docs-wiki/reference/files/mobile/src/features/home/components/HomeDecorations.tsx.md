---
title: "mobile/src/features/home/components/HomeDecorations.tsx"
description: "A PulseStar component for decorating screens with a custom star shape."
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
  page: "reference/files/mobile/src/features/home/components/HomeDecorations.tsx.md"
  relativePath: "mobile/src/features/home/components/HomeDecorations.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/HomeDecorations.tsx"
  module: "mobile/src/features/home/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/features/home/components/HomeDecorations.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/home/components](../../../../../../modules/mobile/src/features/home/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/HomeDecorations.tsx`
- Lines: 167
- Symbols: 3

## AI Summary

A PulseStar component for decorating screens with a custom star shape.

### Responsibilities

- Custom Star Decoration

### Usage Notes

- Used to decorate mobile home screens with a pulse animation and scale animation.

## Public API

- `interface PulseStarProps`
- `function PulseStar({ delay = 0, size = 18, color = palette.amber500, top, left, right, bottom, icon = "star", }: PulseStarProps)`
- `function RingingBell()`

## Symbols

### interface `PulseStarProps`

- Signature: `interface PulseStarProps`
- Lines: 17-26
- Exported: yes

```tsx
interface PulseStarProps {
  delay?: number;
  size?: number;
  color?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
}
```

### function `PulseStar`

- Signature: `function PulseStar({ delay = 0, size = 18, color = palette.amber500, top, left, right, bottom, icon = "star", }: PulseStarProps)`
- Lines: 28-102
- Exported: yes

```tsx
function PulseStar({
  delay = 0,
  size = 18,
  color = palette.amber500,
  top,
  left,
  right,
  bottom,
  icon = "star",
}: PulseStarProps) {
  const opacity = useSharedValue(0.4);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Start with delay
    const timeout = setTimeout(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.4, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        false,
      );

      scale.value = withRepeat(
        withSequence(
          withTiming(1.25, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.8, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        false,
      );
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimation(opacity);
      cancelAnimation(scale);
    };
  }, [delay, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top,
          left,
          right,
          bottom,
        },
        animatedStyle,
      ]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Animated.View>
  );
}
```

### function `RingingBell`

- Signature: `function RingingBell()`
- Lines: 104-153
- Exported: yes

```tsx
function RingingBell() {
  const colors = useThemeColors();
  const rotation = useSharedValue(0);

  useEffect(() => {
    const ring = () => {
      rotation.value = withSequence(
        withTiming(1, { duration: 60, easing: Easing.linear }),
        withTiming(-1, { duration: 60, easing: Easing.linear }),
        withTiming(1, { duration: 60, easing: Easing.linear }),
        withTiming(-1, { duration: 60, easing: Easing.linear }),
        withTiming(0, { duration: 60, easing: Easing.linear }),
      );
    };

    // Ring immediately
    ring();

    // Then every 3 seconds
    const interval = setInterval(ring, 3000);

    return () => {
      clearInterval(interval);
      cancelAnimation(rotation);
    };
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = rotation.value * 15;
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name="notifications-outline"
        size={24}
        color={colors.brand.default}
      />
      <View
        style={[
          styles.notificationDot,
          { borderColor: colors.surface.default },
        ]}
      />
    </Animated.View>
  );
}
```
