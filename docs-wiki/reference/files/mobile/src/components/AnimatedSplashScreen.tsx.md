---
title: "mobile/src/components/AnimatedSplashScreen.tsx"
description: "AnimatedSplashScreen component"
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
  page: "reference/files/mobile/src/components/AnimatedSplashScreen.tsx.md"
  relativePath: "mobile/src/components/AnimatedSplashScreen.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/AnimatedSplashScreen.tsx"
  module: "mobile/src/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 6
---

# mobile/src/components/AnimatedSplashScreen.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/components](../../../../modules/mobile/src/components.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/AnimatedSplashScreen.tsx`
- Lines: 409
- Symbols: 6

## AI Summary

AnimatedSplashScreen component

## Public API

- `function AnimatedSplashScreen({ onFinish, isReady }: AnimatedSplashScreenProps)`

## Symbols

### function `AnimatedSplashScreen`

- Signature: `function AnimatedSplashScreen({ onFinish, isReady }: AnimatedSplashScreenProps)`
- Lines: 215-374
- Exported: yes

```tsx
function AnimatedSplashScreen({ onFinish, isReady }: AnimatedSplashScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const iconScale = useSharedValue(0.3);
  const iconOpacity = useSharedValue(0);
  const glowScale = useSharedValue(0.5);
  const glowOpacity = useSharedValue(0);
  const sparkleProgress = useSharedValue(0);
  const exitProgress = useSharedValue(1);
  const iconPulse = useSharedValue(1);
  const orbProgress = useSharedValue(0);

  useEffect(() => {
    orbProgress.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) });

    iconOpacity.value = withDelay(200, withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) }));
    iconScale.value = withDelay(
      200,
      withSpring(1, { damping: 12, stiffness: 100, mass: 0.8 }),
    );

    glowOpacity.value = withDelay(400, withTiming(0.7, { duration: 800 }));
    glowScale.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1.25, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.85, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );

    sparkleProgress.value = withDelay(500, withTiming(1, { duration: 600 }));

    iconPulse.value = withDelay(
      900,
      withRepeat(
        withSequence(
          withTiming(1.04, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.97, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const handleExit = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    if (isReady) {
      exitProgress.value = withTiming(
        0,
        { duration: 500, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) runOnJS(handleExit)();
        },
      );
    }
  }, [isReady]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: exitProgress.value,
    transform: [
      { scale: interpolate(exitProgress.value, [1, 0], [1, 1.08]) },
    ],
  }));

  const iconAnimStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [
      { scale: iconScale.value * iconPulse.value },
    ],
  }));

  const glowAnimStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value * exitProgress.value,
    transform: [{ scale: glowScale.value }],
  }));

  const gradientColors = isDark
    ? (["#1A1416", "#1E1520", "#1A1517", "#181318"] as const)
    : (["#FFF7F3", "#FFF0F5", "#F0F7FA", "#F5F0FF"] as const);

  const glowStroke = isDark ? "rgba(255,143,163,0.15)" : "rgba(255,143,163,0.22)";
  const glowFill = isDark ? "rgba(165,180,252,0.08)" : "rgba(165,180,252,0.1)";
  const innerGlow = isDark ? "rgba(255,143,163,0.04)" : "rgba(255,143,163,0.06)";

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <LinearGradient
        colors={[...gradientColors]}
        locations={[0, 0.3, 0.65, 1]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />

      {ORBS.map((orb, i) => (
        <FloatingOrb key={`orb-${i}`} config={orb} masterProgress={orbProgress} />
      ))}

      {SPARKLES.map((s, i) => (
        <Sparkle key={`sparkle-${i}`} config={s} masterProgress={sparkleProgress} />
      ))}

      <Animated.View style={[styles.glowRing, glowAnimStyle]}>
        <Svg width={ICON_SIZE * 2.6} height={ICON_SIZE * 2.6}>
          <Defs>
            <RadialGradient id="iconGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={isDark ? "#A78BFA" : "#FF8FA3"} stopOpacity={isDark ? "0.12" : "0.15"} />
              <Stop offset="60%" stopColor={isDark ? "#A78BFA" : "#FF8FA3"} stopOpacity="0.04" />
              <Stop offset="100%" stopColor={isDark ? "#A78BFA" : "#FF8FA3"} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect
            x={0} y={0}
            width={ICON_SIZE * 2.6} height={ICON_SIZE * 2.6}
            fill="url(#iconGlow)"
          />
          <Circle
            cx={ICON_SIZE * 1.3}
            cy={ICON_SIZE * 1.3}
            r={ICON_SIZE * 1.05}
            fill="none"
            stroke={glowStroke}
            strokeWidth={1.5}
          />
          <Circle
            cx={ICON_SIZE * 1.3}
            cy={ICON_SIZE * 1.3}
            r={ICON_SIZE * 0.82}
            fill={glowFill}
          />
          <Circle
            cx={ICON_SIZE * 1.3}
            cy={ICON_SIZE * 1.3}
            r={ICON_SIZE * 0.6}
            fill={innerGlow}
          />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.iconWrap, iconAnimStyle]}>
        <View style={[styles.iconShadow, isDark && styles.iconShadowDark]}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
```

### interface `OrbConfig`

- Signature: `interface OrbConfig`
- Lines: 27-35
- Exported: no

```tsx
interface OrbConfig {
  cx: number;
  cy: number;
  size: number;
  color: string;
  delay: number;
  driftX: number;
  driftY: number;
}
```

### function `FloatingOrb`

- Signature: `function FloatingOrb({ config, masterProgress }: { config: OrbConfig; masterProgress: ReturnType<typeof useSharedValue<number>>; })`
- Lines: 46-115
- Exported: no

```tsx
function FloatingOrb({ config, masterProgress }: {
  config: OrbConfig;
  masterProgress: ReturnType<typeof useSharedValue<number>>;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);

  useEffect(() => {
    opacity.value = withDelay(config.delay, withTiming(1, { duration: 1200, easing: Easing.out(Easing.quad) }));
    scale.value = withDelay(config.delay, withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) }));

    translateX.value = withDelay(
      config.delay,
      withRepeat(
        withSequence(
          withTiming(config.driftX, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
          withTiming(-config.driftX * 0.6, { duration: 3500, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );
    translateY.value = withDelay(
      config.delay,
      withRepeat(
        withSequence(
          withTiming(config.driftY, { duration: 3800, easing: Easing.inOut(Easing.sin) }),
          withTiming(-config.driftY * 0.7, { duration: 4200, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value * masterProgress.value * 0.35,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: config.cx - config.size / 2,
          top: config.cy - config.size / 2,
          width: config.size,
          height: config.size,
        },
        style,
      ]}
    >
      <View
        style={{
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          backgroundColor: config.color,
        }}
      />
    </Animated.View>
  );
}
```

### interface `SparkleConfig`

- Signature: `interface SparkleConfig`
- Lines: 117-123
- Exported: no

```tsx
interface SparkleConfig {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  color: string;
}
```

### function `Sparkle`

- Signature: `function Sparkle({ config, masterProgress }: { config: SparkleConfig; masterProgress: ReturnType<typeof useSharedValue<number>>; })`
- Lines: 140-208
- Exported: no

```tsx
function Sparkle({ config, masterProgress }: {
  config: SparkleConfig;
  masterProgress: ReturnType<typeof useSharedValue<number>>;
}) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      config.delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) }),
          withTiming(0.1, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      ),
    );
    scale.value = withDelay(
      config.delay,
      withRepeat(
        withSequence(
          withTiming(1.3, { duration: 900, easing: Easing.out(Easing.quad) }),
          withTiming(0.5, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      ),
    );
    translateY.value = withDelay(
      config.delay,
      withRepeat(
        withSequence(
          withTiming(-16, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
          withTiming(16, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value * masterProgress.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: config.cx - config.r,
          top: config.cy - config.r,
          width: config.r * 2,
          height: config.r * 2,
          borderRadius: config.r,
          backgroundColor: config.color,
        },
        style,
      ]}
    />
  );
}
```

### interface `AnimatedSplashScreenProps`

- Signature: `interface AnimatedSplashScreenProps`
- Lines: 210-213
- Exported: no

```tsx
interface AnimatedSplashScreenProps {
  onFinish: () => void;
  isReady: boolean;
}
```
