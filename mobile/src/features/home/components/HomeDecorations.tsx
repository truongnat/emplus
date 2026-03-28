import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  useAnimatedReaction,
  runOnJS,
  cancelAnimation,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "@/src/theme";

export interface PulseStarProps {
  delay?: number;
  size?: number;
  color?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
}

export function PulseStar({
  delay = 0,
  size = 18,
  color = palette["amber-400"],
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

export function RingingBell() {
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
        color={(palette as any)["slate-600"]}
      />
      <View style={styles.notificationDot} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  notificationDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    backgroundColor: "#f43f5e",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
  },
});
