import React, { useEffect } from "react";
import { View, StyleSheet, AccessibilityInfo } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";

const STRING_CONFIG = [
  { length: 52, delay: 0, width: 2.2, swing: 880 },
  { length: 72, delay: 120, width: 2, swing: 960 },
  { length: 88, delay: 60, width: 2.4, swing: 1040 },
  { length: 64, delay: 200, width: 1.8, swing: 920 },
  { length: 96, delay: 90, width: 2.2, swing: 1000 },
  { length: 56, delay: 150, width: 2, swing: 900 },
  { length: 78, delay: 40, width: 2.1, swing: 980 },
] as const;

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

export interface LoginTopDecorProps {
  /** Màu dây (light: trắng/rose; dark: mờ sáng) */
  stringColor: string;
  /** Chiều cao vùng Lottie (pt) */
  lottieSize?: number;
}

/**
 * Phần top login: dây treo animation + trái tim Lottie (decor — ẩn khỏi TalkBack).
 */
export function LoginTopDecor({
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

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  stringsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 320,
    paddingHorizontal: 8,
    minHeight: 100,
  },
  stringColumn: {
    alignItems: "center",
    width: 28,
    paddingTop: 4,
  },
  lottieWrap: {
    marginTop: -8,
    alignItems: "center",
    justifyContent: "center",
  },
});
