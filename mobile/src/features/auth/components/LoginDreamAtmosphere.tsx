/**
 * Nền đăng nhập phong cách mộng mơ: gradient nhiều lớp + bokeh trôi nhẹ.
 */

import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";

const { width: W, height: H } = Dimensions.get("window");

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
    phase.value = withDelay(delayMs, withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) }));
  }, [delayMs, phase]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: phase.value * 0.35,
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

export function LoginDreamAtmosphere({ isDark }: { isDark: boolean }) {
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

const blobW = Math.min(W * 1.05, 460);
const blobH = H * 0.48;

const styles = StyleSheet.create({
  blobTop: {
    position: "absolute",
    top: -blobH * 0.12,
    right: -W * 0.15,
    width: blobW,
    height: blobH,
    borderRadius: blobW / 2,
  },
  blobBottom: {
    position: "absolute",
    bottom: -H * 0.1,
    left: -W * 0.22,
    width: W * 0.95,
    height: H * 0.5,
    borderRadius: W * 0.45,
  },
  orb: {
    position: "absolute",
  },
});
