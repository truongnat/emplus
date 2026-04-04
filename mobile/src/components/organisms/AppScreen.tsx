/**
 * AppScreen - Base screen layout component
 * Provides consistent padding, safe area handling, and background
 */

import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { useTheme } from "@/src/theme";
import { useEntranceAnimation } from "@/src/animations/presets";

export interface AppScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scroll?: boolean;
  /** Fade + slide nhẹ khi mount (tab / màn stack) */
  animatedEntrance?: boolean;
  /**
   * When false, content extends under the status bar (no paddingTop).
   * Use for full-bleed backgrounds; apply insets manually where needed.
   */
  applyTopSafeAreaPadding?: boolean;
  /**
   * When false, không bọc TouchableWithoutFeedback (Keyboard.dismiss).
   * Cần cho màn có ScrollView full màn — wrapper có thể chặn pan vuốt trên iOS/Android.
   */
  wrapWithKeyboardDismiss?: boolean;
}

export function AppScreen({
  children,
  style,
  contentContainerStyle,
  animatedEntrance = true,
  applyTopSafeAreaPadding = true,
  wrapWithKeyboardDismiss = true,
}: AppScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const entranceStyle = useEntranceAnimation();

  const inner = (
    <View
      style={[
        styles.container,
        {
          paddingTop: applyTopSafeAreaPadding ? insets.top : 0,
          backgroundColor: theme.colors.background.default,
        },
        style,
      ]}
    >
      {animatedEntrance ? (
        <Animated.View style={[styles.content, contentContainerStyle, entranceStyle]}>
          {children}
        </Animated.View>
      ) : (
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      )}
    </View>
  );

  if (!wrapWithKeyboardDismiss) {
    return inner;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {inner}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
