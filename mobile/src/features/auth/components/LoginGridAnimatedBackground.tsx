import React, { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { auraPalette } from "@/src/theme/aura-colors";

/** Top gradient stop — warm cream for LookAway style */
export const LOGIN_GRID_TOP_LIGHT = "#F2EBE3";
/** Khớp Aura darkBg — warm dark for LookAway style */
export const LOGIN_GRID_TOP_DARK = auraPalette.darkBg;

/**
 * Nền toàn màn: gradient chuyển động nhẹ (transition).
 */
export function LoginGridAnimatedBackground({ isDark }: { isDark: boolean }) {
  const { width: winW, height: winH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  /** Full physical bleed: tránh “lề” trái/phải/dưới khi scene nằm trong safe area + phủ vùng tab bar. */
  const bleedW = winW + insets.left + insets.right;
  const bleedH = winH + insets.top + insets.bottom;

  const reduced = useReducedMotion();
  const wash = useSharedValue(0);

  useEffect(() => {
    wash.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) });
  }, [wash]);

  const washStyle = useAnimatedStyle(() => {
    const peak = isDark ? 0.4 : 0.35;
    return {
      opacity: interpolate(wash.value, [0, 1], [0, peak]),
    };
  }, [isDark]);

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
              ]
            : [
                LOGIN_GRID_TOP_LIGHT,
                auraPalette.cream100,
              ]
        }
        locations={[0, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />

      <Animated.View
        style={[StyleSheet.absoluteFill, washStyle]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={
            isDark
              ? ["rgba(184,106,74,0.08)", "rgba(184,106,74,0.04)", "transparent"]
              : ["rgba(184,106,74,0.12)", "rgba(184,106,74,0.06)", "transparent"]
          }
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 0.6 }}
        />
      </Animated.View>
    </View>
  );
}
