import React from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import LottieView, { LottieViewProps } from "lottie-react-native";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";

export interface EmplusLottieProps extends Omit<LottieViewProps, "source"> {
  source: LottieViewProps["source"];
  /** Khi reduce motion: chỉ hiện frame đầu, không loop */
  staticOnReduceMotion?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Lottie bọc reduce-motion + kích thước ổn định.
 */
export function EmplusLottie({
  source,
  loop = true,
  autoPlay = true,
  speed = 1,
  staticOnReduceMotion = true,
  style,
  containerStyle,
  ...rest
}: EmplusLottieProps) {
  const reduced = useReducedMotion();
  const freeze = reduced && staticOnReduceMotion;

  return (
    <View style={[styles.wrap, containerStyle]}>
      <LottieView
        source={source}
        style={style}
        loop={freeze ? false : loop}
        autoPlay={freeze ? false : autoPlay}
        speed={speed}
        {...(freeze ? { progress: 0 as const } : {})}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
