import React, { useEffect, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withSequence,
  withRepeat,
  interpolate,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, RadialGradient, Stop, Rect } from "react-native-svg";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const ICON_SIZE = 140;

interface OrbConfig {
  cx: number;
  cy: number;
  size: number;
  color: string;
  delay: number;
  driftX: number;
  driftY: number;
}

const ORBS: OrbConfig[] = [
  { cx: SCREEN_W * 0.18, cy: SCREEN_H * 0.22, size: 200, color: "#FF8FA3", delay: 0, driftX: 30, driftY: -20 },
  { cx: SCREEN_W * 0.82, cy: SCREEN_H * 0.18, size: 160, color: "#A5B4FC", delay: 400, driftX: -25, driftY: 15 },
  { cx: SCREEN_W * 0.7, cy: SCREEN_H * 0.72, size: 180, color: "#5EEAD4", delay: 200, driftX: -20, driftY: -25 },
  { cx: SCREEN_W * 0.25, cy: SCREEN_H * 0.68, size: 150, color: "#C4B5FD", delay: 600, driftX: 25, driftY: 20 },
  { cx: SCREEN_W * 0.5, cy: SCREEN_H * 0.4, size: 220, color: "#FDA4AF", delay: 100, driftX: -15, driftY: -30 },
  { cx: SCREEN_W * 0.1, cy: SCREEN_H * 0.45, size: 120, color: "#FDE68A", delay: 500, driftX: 20, driftY: -10 },
];

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

interface SparkleConfig {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  color: string;
}

const SPARKLES: SparkleConfig[] = [
  { cx: SCREEN_W * 0.2, cy: SCREEN_H * 0.3, r: 4, delay: 400, color: "#FF8FA3" },
  { cx: SCREEN_W * 0.8, cy: SCREEN_H * 0.26, r: 3, delay: 700, color: "#A5B4FC" },
  { cx: SCREEN_W * 0.12, cy: SCREEN_H * 0.52, r: 3.5, delay: 500, color: "#5EEAD4" },
  { cx: SCREEN_W * 0.88, cy: SCREEN_H * 0.46, r: 4.5, delay: 900, color: "#C4B5FD" },
  { cx: SCREEN_W * 0.35, cy: SCREEN_H * 0.2, r: 3, delay: 300, color: "#FDE68A" },
  { cx: SCREEN_W * 0.65, cy: SCREEN_H * 0.65, r: 3.5, delay: 1100, color: "#FF8FA3" },
  { cx: SCREEN_W * 0.5, cy: SCREEN_H * 0.15, r: 4, delay: 800, color: "#A78BFA" },
  { cx: SCREEN_W * 0.28, cy: SCREEN_H * 0.72, r: 3, delay: 600, color: "#5EEAD4" },
  { cx: SCREEN_W * 0.75, cy: SCREEN_H * 0.75, r: 3.5, delay: 1000, color: "#FDA4AF" },
  { cx: SCREEN_W * 0.92, cy: SCREEN_H * 0.36, r: 2.5, delay: 450, color: "#FDE68A" },
  { cx: SCREEN_W * 0.42, cy: SCREEN_H * 0.82, r: 3, delay: 850, color: "#C4B5FD" },
  { cx: SCREEN_W * 0.58, cy: SCREEN_H * 0.08, r: 2.5, delay: 350, color: "#FDA4AF" },
];

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

interface AnimatedSplashScreenProps {
  onFinish: () => void;
  isReady: boolean;
}

export function AnimatedSplashScreen({ onFinish, isReady }: AnimatedSplashScreenProps) {
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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  glowRing: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconShadow: {
    shadowColor: "#FF8FA3",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 16,
  },
  iconShadowDark: {
    shadowColor: "#A78BFA",
    shadowOpacity: 0.35,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: 32,
  },
});
