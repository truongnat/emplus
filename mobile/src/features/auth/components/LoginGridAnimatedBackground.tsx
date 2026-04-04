import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
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

const { width: W0, height: H0 } = Dimensions.get("window");
const G = 26;

/** Top gradient stop — sync StatusBar / system root background on login */
export const LOGIN_GRID_TOP_LIGHT = "#fff5f7";
/** Khớp Aura darkBg — tránh nền xanh-lạnh lệch với theme */
export const LOGIN_GRID_TOP_DARK = auraPalette.darkBg;

/**
 * Nền toàn màn: lưới + wash gradient chuyển động nhẹ (transition).
 */
export function LoginGridAnimatedBackground({ isDark }: { isDark: boolean }) {
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

  const washAStyle = useAnimatedStyle(() => ({
    opacity: interpolate(wash.value, [0, 1], [0.55, 0.2]),
  }));

  const washBStyle = useAnimatedStyle(() => ({
    opacity: interpolate(wash.value, [0, 1], [0.18, 0.42]),
  }));

  const pad = G * 3;
  const W = W0 + pad * 2;
  const H = H0 + pad * 2;
  const stroke = isDark
    ? "rgba(244,240,230,0.055)"
    : "rgba(123,97,255,0.14)";

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={
          isDark
            ? [
                LOGIN_GRID_TOP_DARK,
                auraPalette.darkSurf,
                auraPalette.taupe900,
              ]
            : [LOGIN_GRID_TOP_LIGHT, "#f8f5ff", "#f0fdf9"]
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
                strokeWidth={StyleSheet.hairlineWidth * 2}
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
              : ["rgba(255,107,129,0.22)", "transparent", "transparent"]
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
              : ["transparent", "rgba(142,124,255,0.15)", "rgba(79,209,197,0.12)"]
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
