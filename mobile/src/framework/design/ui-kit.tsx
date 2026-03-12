/**
 * UI Kit - Core UI Components built with React Native primitives
 * Clean architecture, no Tamagui dependency, optimized for performance
 */

import React, { memo, forwardRef, ReactNode, ComponentProps, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';
import type { Theme } from './types';
import { useTheme, useThemedColor } from './theme-provider';
import { tokens } from './tokens';
import { getShadowStyle, getRadiusStyle } from './utils';

// ============================================================================
// Base Components
// ============================================================================

/**
 * Box - Fundamental layout component (like div/YStack)
 */
interface BoxProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: keyof typeof tokens.space;
  paddingVertical?: keyof typeof tokens.space;
  paddingHorizontal?: keyof typeof tokens.space;
  paddingTop?: keyof typeof tokens.space;
  paddingBottom?: keyof typeof tokens.space;
  paddingLeft?: keyof typeof tokens.space;
  paddingRight?: keyof typeof tokens.space;
  margin?: keyof typeof tokens.space;
  marginVertical?: keyof typeof tokens.space;
  marginHorizontal?: keyof typeof tokens.space;
  marginTop?: keyof typeof tokens.space;
  marginBottom?: keyof typeof tokens.space;
  marginLeft?: keyof typeof tokens.space;
  marginRight?: keyof typeof tokens.space;
  gap?: keyof typeof tokens.space;
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  alignSelf?: ViewStyle['alignSelf'];
  justifySelf?: ViewStyle['justifySelf'];
  flexWrap?: ViewStyle['flexWrap'];
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  position?: 'absolute' | 'relative';
  top?: number | keyof typeof tokens.space;
  left?: number | keyof typeof tokens.space;
  right?: number | keyof typeof tokens.space;
  bottom?: number | keyof typeof tokens.space;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  borderRadius?: keyof typeof tokens.radius;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  shadow?: keyof typeof tokens.shadow;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  onPress?: () => void;
}

export const Box = memo(forwardRef<View, BoxProps>(function Box(props, ref) {
  const { getColor } = useTheme();
  
  const style = useMemo(() => {
    const {
      padding, paddingVertical, paddingHorizontal, paddingTop, paddingBottom, paddingLeft, paddingRight,
      margin, marginVertical, marginHorizontal, marginTop, marginBottom, marginLeft, marginRight,
      gap, flex, flexDirection, alignItems, justifyContent, alignSelf, flexWrap, flexGrow, flexShrink, flexBasis,
      position, top, left, right, bottom,
      width, height, minWidth, minHeight, maxWidth, maxHeight,
      borderRadius, borderWidth, borderColor, backgroundColor, shadow,
    } = props;

    const resolvedStyle: ViewStyle = {};

    // Spacing
    if (padding !== undefined) resolvedStyle.padding = tokens.space[padding]?.value;
    if (paddingVertical !== undefined) resolvedStyle.paddingVertical = tokens.space[paddingVertical]?.value;
    if (paddingHorizontal !== undefined) resolvedStyle.paddingHorizontal = tokens.space[paddingHorizontal]?.value;
    if (paddingTop !== undefined) resolvedStyle.paddingTop = tokens.space[paddingTop]?.value;
    if (paddingBottom !== undefined) resolvedStyle.paddingBottom = tokens.space[paddingBottom]?.value;
    if (paddingLeft !== undefined) resolvedStyle.paddingLeft = tokens.space[paddingLeft]?.value;
    if (paddingRight !== undefined) resolvedStyle.paddingRight = tokens.space[paddingRight]?.value;

    if (margin !== undefined) resolvedStyle.margin = tokens.space[margin]?.value;
    if (marginVertical !== undefined) resolvedStyle.marginVertical = tokens.space[marginVertical]?.value;
    if (marginHorizontal !== undefined) resolvedStyle.marginHorizontal = tokens.space[marginHorizontal]?.value;
    if (marginTop !== undefined) resolvedStyle.marginTop = tokens.space[marginTop]?.value;
    if (marginBottom !== undefined) resolvedStyle.marginBottom = tokens.space[marginBottom]?.value;
    if (marginLeft !== undefined) resolvedStyle.marginLeft = tokens.space[marginLeft]?.value;
    if (marginRight !== undefined) resolvedStyle.marginRight = tokens.space[marginRight]?.value;

    if (gap !== undefined) resolvedStyle.gap = tokens.space[gap]?.value;

    // Flexbox
    if (flex !== undefined) resolvedStyle.flex = flex;
    if (flexDirection !== undefined) resolvedStyle.flexDirection = flexDirection;
    if (alignItems !== undefined) resolvedStyle.alignItems = alignItems;
    if (justifyContent !== undefined) resolvedStyle.justifyContent = justifyContent;
    if (alignSelf !== undefined) resolvedStyle.alignSelf = alignSelf;
    if (flexWrap !== undefined) resolvedStyle.flexWrap = flexWrap;
    if (flexGrow !== undefined) resolvedStyle.flexGrow = flexGrow;
    if (flexShrink !== undefined) resolvedStyle.flexShrink = flexShrink;
    if (flexBasis !== undefined) resolvedStyle.flexBasis = flexBasis;

    // Position
    if (position !== undefined) resolvedStyle.position = position;
    if (top !== undefined) resolvedStyle.top = typeof top === 'string' ? tokens.space[top]?.value : top;
    if (left !== undefined) resolvedStyle.left = typeof left === 'string' ? tokens.space[left]?.value : left;
    if (right !== undefined) resolvedStyle.right = typeof right === 'string' ? tokens.space[right]?.value : right;
    if (bottom !== undefined) resolvedStyle.bottom = typeof bottom === 'string' ? tokens.space[bottom]?.value : bottom;

    // Size
    if (width !== undefined) resolvedStyle.width = width;
    if (height !== undefined) resolvedStyle.height = height;
    if (minWidth !== undefined) resolvedStyle.minWidth = minWidth;
    if (minHeight !== undefined) resolvedStyle.minHeight = minHeight;
    if (maxWidth !== undefined) resolvedStyle.maxWidth = maxWidth;
    if (maxHeight !== undefined) resolvedStyle.maxHeight = maxHeight;

    // Border
    if (borderRadius !== undefined) resolvedStyle.borderRadius = tokens.radius[borderRadius]?.value;
    if (borderWidth !== undefined) resolvedStyle.borderWidth = borderWidth;
    if (borderColor !== undefined) resolvedStyle.borderColor = borderColor.startsWith('$') 
      ? getColor(borderColor.slice(1) as keyof Theme['colors'])
      : borderColor;
    if (backgroundColor !== undefined) resolvedStyle.backgroundColor = backgroundColor.startsWith('$')
      ? getColor(backgroundColor.slice(1) as keyof Theme['colors'])
      : backgroundColor;

    // Shadow
    if (shadow !== undefined) {
      const shadowStyle = getShadowStyle(shadow);
      Object.assign(resolvedStyle, shadowStyle);
    }

    return resolvedStyle;
  }, [props, getColor]);

  if (props.onPress) {
    return (
      <TouchableOpacity
        ref={ref}
        style={[style, props.style]}
        onPress={props.onPress}
        testID={props.testID}
        accessible={props.accessible}
        accessibilityLabel={props.accessibilityLabel}
        accessibilityRole={props.accessibilityRole}
      >
        {props.children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      ref={ref}
      style={[style, props.style]}
      testID={props.testID}
      accessible={props.accessible}
      accessibilityLabel={props.accessibilityLabel}
      accessibilityRole={props.accessibilityRole}
    >
      {props.children}
    </View>
  );
}));

// ============================================================================
// Text Component
// ============================================================================

interface AppTextProps {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodyBold' | 'caption' | 'captionBold' | 'small' | 'mono';
  color?: string;
  fontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700' | '800';
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  numberOfLines?: number;
  onPress?: () => void;
  testID?: string;
}

export const AppText = memo(forwardRef<Text, AppTextProps>(function AppText(props, ref) {
  const { theme, getColor } = useTheme();

  const style = useMemo(() => {
    const { variant = 'body', color, fontSize, fontWeight, lineHeight, letterSpacing, textAlign, textTransform } = props;

    const resolvedStyle: TextStyle = {};

    // Variant-based styles
    switch (variant) {
      case 'h1':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.heading.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['7'].value;
        resolvedStyle.fontWeight = '700';
        resolvedStyle.letterSpacing = -0.5;
        break;
      case 'h2':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.heading.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['6'].value;
        resolvedStyle.fontWeight = '700';
        break;
      case 'h3':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.heading.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['5'].value;
        resolvedStyle.fontWeight = '700';
        break;
      case 'h4':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.heading.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['4'].value;
        resolvedStyle.fontWeight = '700';
        break;
      case 'body':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.body.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['3'].value;
        resolvedStyle.fontWeight = '400';
        break;
      case 'bodyBold':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.body.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['3'].value;
        resolvedStyle.fontWeight = '700';
        break;
      case 'caption':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.body.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['2'].value;
        resolvedStyle.fontWeight = '400';
        resolvedStyle.color = theme.colors.textMuted;
        break;
      case 'captionBold':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.body.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['2'].value;
        resolvedStyle.fontWeight = '700';
        break;
      case 'small':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.body.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['1'].value;
        resolvedStyle.fontWeight = '400';
        break;
      case 'mono':
        resolvedStyle.fontFamily = tokens.typography.fontFamily.mono.value;
        resolvedStyle.fontSize = tokens.typography.fontSize['3'].value;
        resolvedStyle.fontWeight = '400';
        break;
    }

    // Override with explicit props
    if (color !== undefined) {
      resolvedStyle.color = color.startsWith('$') ? getColor(color.slice(1) as keyof Theme['colors']) : color;
    }
    if (fontSize !== undefined) resolvedStyle.fontSize = fontSize;
    if (fontWeight !== undefined) resolvedStyle.fontWeight = fontWeight;
    if (lineHeight !== undefined) resolvedStyle.lineHeight = lineHeight;
    if (letterSpacing !== undefined) resolvedStyle.letterSpacing = letterSpacing;
    if (textAlign !== undefined) resolvedStyle.textAlign = textAlign;
    if (textTransform !== undefined) resolvedStyle.textTransform = textTransform;

    return resolvedStyle;
  }, [props, theme, getColor]);

  return (
    <Text
      ref={ref}
      style={[style, props.style]}
      numberOfLines={props.numberOfLines}
      onPress={props.onPress}
      testID={props.testID}
    >
      {props.children}
    </Text>
  );
}));

// ============================================================================
// Button Component
// ============================================================================

interface ButtonProps {
  children?: ReactNode;
  label?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  testID?: string;
}

export const Button = memo(forwardRef<View, ButtonProps>(function Button(props, ref) {
  const { theme, getColor } = useTheme();
  const {
    children,
    label,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    onPress,
  } = props;

  const buttonStyle = useMemo(() => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: tokens.radius.md.value,
      borderWidth: 1,
    };

    // Size
    const height = tokens.size[size]?.value || tokens.size.md.value;
    baseStyle.minHeight = height;
    baseStyle.paddingHorizontal = tokens.space.md.value;

    // Variant
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = theme.colors.primary;
        baseStyle.borderColor = theme.colors.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = theme.colors.secondary;
        baseStyle.borderColor = theme.colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderColor = theme.colors.primary;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderColor = 'transparent';
        break;
      case 'danger':
        baseStyle.backgroundColor = theme.colors.danger;
        baseStyle.borderColor = theme.colors.danger;
        break;
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  }, [theme, variant, size, disabled, loading]);

  const textStyle = useMemo(() => {
    const style: TextStyle = {
      fontFamily: tokens.typography.fontFamily.body.value,
      fontSize: tokens.typography.fontSize['3'].value,
      fontWeight: '600',
      color: variant === 'outline' || variant === 'ghost' ? theme.colors.primary : theme.colors.textInverse,
    };

    if (disabled || loading) {
      style.opacity = 0.7;
    }

    return style;
  }, [theme, variant, disabled, loading]);

  return (
    <TouchableOpacity
      ref={ref}
      style={[buttonStyle, props.style]}
      onPress={onPress}
      disabled={disabled || loading}
      testID={props.testID}
      activeOpacity={0.7}
    >
      {leftIcon && <Box marginRight="sm">{leftIcon}</Box>}
      {loading ? (
        <ActivityIndicator color={textStyle.color} />
      ) : (
        <AppText style={[textStyle, props.textStyle]}>
          {label || children}
        </AppText>
      )}
      {rightIcon && <Box marginLeft="sm">{rightIcon}</Box>}
    </TouchableOpacity>
  );
}));

// ============================================================================
// Input Component
// ============================================================================

interface InputProps extends Omit<ComponentProps<typeof TextInput>, 'style'> {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
}

export const Input = memo(forwardRef<TextInput, InputProps>(function Input(props, ref) {
  const { theme } = useTheme();
  const { label, error, leftIcon, rightIcon, disabled, style, inputStyle, ...textInputProps } = props;

  const containerStyle = useMemo(() => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: tokens.radius.md.value,
      borderWidth: 1.5,
      borderColor: error ? theme.colors.danger : theme.colors.border,
      backgroundColor: theme.colors.background,
      minHeight: tokens.size.md.value,
      paddingHorizontal: tokens.space.md.value,
    };

    if (disabled) {
      baseStyle.opacity = 0.6;
      baseStyle.backgroundColor = theme.colors.backgroundMuted;
    }

    return baseStyle;
  }, [theme, error, disabled]);

  const textInputStyle = useMemo(() => {
    const style: TextStyle = {
      flex: 1,
      fontSize: tokens.typography.fontSize['3'].value,
      fontFamily: tokens.typography.fontFamily.body.value,
      color: theme.colors.text,
      paddingVertical: tokens.space.sm.value,
    };

    return style;
  }, [theme]);

  return (
    <Box style={style}>
      {label && (
        <AppText variant="captionBold" marginBottom="2xs" marginLeft="xs" textTransform="uppercase">
          {label}
        </AppText>
      )}
      <View style={containerStyle}>
        {leftIcon && <Box marginRight="sm">{leftIcon}</Box>}
        <TextInput
          ref={ref}
          style={[textInputStyle, inputStyle]}
          placeholderTextColor={theme.colors.textMuted}
          editable={!disabled}
          {...textInputProps}
        />
        {rightIcon && <Box marginLeft="sm">{rightIcon}</Box>}
      </View>
      {error && (
        <AppText variant="caption" color="$danger" marginTop="2xs" marginLeft="xs">
          {error}
        </AppText>
      )}
    </Box>
  );
}));

// ============================================================================
// Card Component
// ============================================================================

interface CardProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof tokens.space;
  shadow?: keyof typeof tokens.shadow;
}

export const Card = memo(forwardRef<View, CardProps>(function Card(props, ref) {
  const { theme } = useTheme();
  const { variant = 'elevated', padding = 'md', shadow = 'md' } = props;

  const cardStyle = useMemo(() => {
    const baseStyle: ViewStyle = {
      borderRadius: tokens.radius.lg.value,
      padding: tokens.space[padding]?.value,
    };

    switch (variant) {
      case 'elevated':
        baseStyle.backgroundColor = theme.colors.background;
        break;
      case 'outlined':
        baseStyle.backgroundColor = theme.colors.background;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.colors.border;
        break;
      case 'filled':
        baseStyle.backgroundColor = theme.colors.backgroundStrong;
        break;
    }

    if (variant === 'elevated' && shadow) {
      const shadowStyle = getShadowStyle(shadow);
      Object.assign(baseStyle, shadowStyle);
    }

    return baseStyle;
  }, [theme, variant, padding, shadow]);

  return (
    <View ref={ref} style={[cardStyle, props.style]}>
      {props.children}
    </View>
  );
}));

// ============================================================================
// Spinner Component
// ============================================================================

interface SpinnerProps {
  size?: 'small' | 'large' | number;
  color?: string;
  testID?: string;
}

export const Spinner = memo(function Spinner({ size = 'small', color, testID }: SpinnerProps) {
  const { theme } = useTheme();
  
  const resolvedColor = color?.startsWith('$') 
    ? theme.getColor(color.slice(1) as keyof Theme['colors'])
    : color || theme.colors.primary;

  return (
    <ActivityIndicator
      size={size}
      color={resolvedColor}
      testID={testID}
    />
  );
});

// ============================================================================
// Exports
// ============================================================================

export type { BoxProps, AppTextProps, ButtonProps, InputProps, CardProps, SpinnerProps };
