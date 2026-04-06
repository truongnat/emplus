import React, { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, Pattern, Path, Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { auraPalette } from "@/src/theme/aura-colors";

const G = 26;

/** Top gradient stop — sync StatusBar / system root background on login (đủ tint để không “trắng xoá”) */
export const LOGIN_GRID_TOP_LIGHT = "#ffeef3";
/** Khớp Aura darkBg — tránh nền xanh-lạnh lệch với theme */
export const LOGIN_GRID_TOP_DARK = auraPalette.darkBg;

/**
 * Nền toàn màn: lưới + wash gradient chuyển động nhẹ (transition).
 */
export function LoginGridAnimatedBackground({ isDark }: { isDark: boolean }) {
  const { width: winW, height: winH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  /** Full physical bleed: tránh “lề” trái/phải/dưới khi scene nằm trong safe area + phủ vùng tab bar. */
  const bleedW = winW + insets.left + insets.right;
  const bleedH = winH + insets.top + insets.bottom;

  const reduced = useReducedMotion();
  const drift = useSharedValue(0);
  const wash = useSharedValue(0);

  useEffect(() => {
    if (reduced) {
      drift.value = 0.5;
      wash.value = 0.5;
      return;
    }
    drift.value = withRepeat(
      withTiming(1, { duration: 14000, easing: Easing.linear }),
      -1,
      false,
    );
    wash.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 5200, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 5200, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [drift, reduced, wash]);

  const gridWrapStyle = useAnimatedStyle(() => {
    const tx = interpolate(drift.value, [0, 1], [0, G]);
    const ty = interpolate(drift.value, [0, 1], [0, G * 0.55]);
    return {
      transform: [{ translateX: tx }, { translateY: ty }],
    };
  });

  const washAStyle = useAnimatedStyle(() => {
    const peak = isDark ? 0.55 : 0.42;
    const trough = isDark ? 0.2 : 0.12;
    return {
      opacity: interpolate(wash.value, [0, 1], [peak, trough]),
    };
  }, [isDark]);

  const washBStyle = useAnimatedStyle(() => {
    const peak = isDark ? 0.42 : 0.34;
    const trough = isDark ? 0.18 : 0.14;
    return {
      opacity: interpolate(wash.value, [0, 1], [trough, peak]),
    };
  }, [isDark]);

  const pad = G * 4;
  const W = bleedW + pad * 2;
  const H = bleedH + pad * 2;
  const stroke = isDark
    ? "rgba(244,240,230,0.055)"
    : "rgba(91,71,199,0.26)";
  /** Light: nét dày hơn hairline — lưới mới đọc được trên nền sáng. */
  const gridStrokeWidth = isDark
    ? StyleSheet.hairlineWidth * 2
    : Math.max(1, StyleSheet.hairlineWidth * 3);

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
                auraPalette.taupe900,
              ]
            : [
                LOGIN_GRID_TOP_LIGHT,
                "#ede4ff",
                "#dff7f2",
              ]
        }
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />

      <Animated.View
        style={[styles.gridClip, gridWrapStyle]}
        pointerEvents="none"
      >
        <Svg
          width={W}
          height={H}
          style={{ marginLeft: -pad, marginTop: -pad }}
        >
          <Defs>
            <Pattern
              id="emplusLoginGrid"
              patternUnits="userSpaceOnUse"
              width={G}
              height={G}
            >
              <Path
                d={`M ${G} 0 L 0 0 0 ${G}`}
                stroke={stroke}
                strokeWidth={gridStrokeWidth}
                fill="none"
              />
            </Pattern>
          </Defs>
          <Rect width={W} height={H} fill="url(#emplusLoginGrid)" />
        </Svg>
      </Animated.View>

      <Animated.View
        style={[StyleSheet.absoluteFill, washAStyle]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={
            isDark
              ? ["rgba(255,107,129,0.16)", "transparent", "transparent"]
              : ["rgba(255,107,129,0.28)", "transparent", "transparent"]
          }
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 0.6 }}
        />
      </Animated.View>
      <Animated.View
        style={[StyleSheet.absoluteFill, washBStyle]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={
            isDark
              ? [
                  "transparent",
                  "rgba(168,85,247,0.10)",
                  "rgba(45,212,191,0.07)",
                ]
              : [
                  "transparent",
                  "rgba(123,97,255,0.22)",
                  "rgba(45,212,191,0.18)",
                ]
          }
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridClip: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
});
