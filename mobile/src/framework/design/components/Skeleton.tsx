/**
 * Skeleton Component - Shadcn-style
 * Loading placeholder for content
 */

import React, { memo } from 'react';
import { View, Animated, StyleSheet, ViewStyle, Easing } from 'react-native';
import { tokens } from './tokens';
import { useTheme } from './theme-provider';
import { useEffect, useRef } from 'react';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  shape?: 'default' | 'circle' | 'rounded' | 'square';
  style?: ViewStyle;
  animate?: boolean;
}

export const Skeleton = memo(function Skeleton({
  width,
  height,
  shape = 'default',
  style,
  animate = true,
}: SkeletonProps) {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [animate]);

  const borderRadius = shape === 'circle' 
    ? typeof height === 'number' 
      ? height / 2 
      : tokens.radius.pill.value
    : shape === 'rounded'
      ? tokens.radius.md.value
      : shape === 'square'
        ? tokens.radius.none.value
        : tokens.radius.sm.value;

  const animatedStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundMuted,
      borderRadius,
      width: width || '100%',
      height: height || tokens.space.xl.value,
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        animate && animatedStyle,
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    />
  );
});
