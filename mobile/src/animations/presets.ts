import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "../theme";
import { withSpringRM, withTimingRM, withDelayRM } from "./hooks";

/**
 * usePressAnimation — 100% UI-thread press feedback.
 */
export function usePressAnimation() {
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

/**
 * useEntranceAnimation — standard Fade + Slide entrance.
 */
export function useEntranceAnimation(config?: { delay?: number }) {
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
