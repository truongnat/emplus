# Telegram iOS — Design System for React Native

### Hướng dẫn đầy đủ áp dụng triết lý Telegram vào React Native App

> **Phiên bản:** Telegram iOS · Liquid Glass Update · January 2026  
> **Stack:** React Native + Expo · TypeScript · StyleSheet API  
> **Mục tiêu:** Triển khai chính xác design language của Telegram vào RN app của bạn — từ tokens, components đến animation.

---

## Mục lục

1. [Cấu trúc thư mục Design System](#1-cấu-trúc-thư-mục-design-system)
2. [Color Tokens](#2-color-tokens)
3. [Typography Tokens](#3-typography-tokens)
4. [Spacing & Layout Tokens](#4-spacing--layout-tokens)
5. [Border Radius & Shadow Tokens](#5-border-radius--shadow-tokens)
6. [useTheme Hook](#6-usetheme-hook)
7. [Liquid Glass Effect](#7-liquid-glass-effect)
8. [Button Component](#8-button-component)
9. [Input Components](#9-input-components)
10. [Avatar Component](#10-avatar-component)
11. [Badge & Tag Components](#11-badge--tag-components)
12. [Chat Bubble Component](#12-chat-bubble-component)
13. [Chat List Cell Component](#13-chat-list-cell-component)
14. [Tab Bar](#14-tab-bar)
15. [Navigation Header](#15-navigation-header)
16. [Settings Cell Component](#16-settings-cell-component)
17. [Bottom Sheet Modal](#17-bottom-sheet-modal)
18. [Context Menu](#18-context-menu)
19. [Toggle Switch Component](#19-toggle-switch-component)
20. [Segmented Control Component](#20-segmented-control-component)
21. [Animation System](#21-animation-system)
22. [Dark Mode](#22-dark-mode)
23. [Accessibility](#23-accessibility)
24. [Checklist áp dụng](#24-checklist-áp-dụng)

---

## 1. Cấu trúc thư mục Design System

Tổ chức design system tập trung — toàn bộ tokens và components trong một thư mục:

```
src/
├── design-system/
│   ├── tokens/
│   │   ├── colors.ts          ← Color palette + semantic tokens
│   │   ├── typography.ts      ← Font scale + text styles
│   │   ├── spacing.ts         ← Spacing + layout constants
│   │   └── radius.ts          ← Border radius + shadows
│   ├── hooks/
│   │   └── useTheme.ts        ← Dark/light mode hook
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── ChatListCell.tsx
│   │   ├── GlassView.tsx      ← Liquid Glass wrapper
│   │   ├── SettingsCell.tsx
│   │   ├── Toggle.tsx
│   │   └── SegmentedControl.tsx
│   └── index.ts               ← Re-export tất cả
```

---

## 2. Color Tokens

### `src/design-system/tokens/colors.ts`

```typescript
// ─── PRIMITIVE COLORS ─────────────────────────────────────
// Giá trị tuyệt đối — không dùng trực tiếp trong component
const palette = {
  // Telegram Blue
  blue50: "rgba(42, 171, 238, 0.12)",
  blue100: "#5AC8FA",
  blue400: "#2AABEE",
  blue600: "#1A8DC9",
  blue900: "#0E5E8A",

  // System colors (iOS standard)
  green: "#34C759",
  orange: "#FF9500",
  red: "#FF3B30",
  purple: "#AF52DE",
  teal: "#5AC8FA",
  pink: "#FF2D55",

  // Neutrals — Light
  white: "#FFFFFF",
  gray50: "#F2F2F7",
  gray100: "#E8E8ED",
  gray200: "#D1D1D6",
  gray400: "#9898A6",
  gray600: "#5C5C6B",
  gray900: "#111115",

  // Neutrals — Dark
  dark900: "#1C1C1E",
  dark800: "#2C2C2E",
  dark700: "#3A3A3C",
  dark600: "#48484A",
  dark400: "#636375",
  dark200: "#AEAEBB",
  dark100: "#F2F2F7",

  // Avatar gradients
  avatarBlue: ["#5AC8FA", "#2AABEE"] as [string, string],
  avatarTeal: ["#5ECFA4", "#34C07A"] as [string, string],
  avatarPurple: ["#B59CF8", "#8260E8"] as [string, string],
  avatarCoral: ["#FF7F61", "#E84B30"] as [string, string],
  avatarAmber: ["#FFD060", "#F5921F"] as [string, string],
  avatarPink: ["#FF82B0", "#E83B71"] as [string, string],
} as const;

// ─── SEMANTIC TOKENS ──────────────────────────────────────
// Dùng những token này trong component — KHÔNG dùng palette trực tiếp
export interface ColorTokens {
  // Accent
  accent: string;
  accentDeep: string;
  accentLight: string;
  accentGlow: string;

  // Backgrounds
  bg: string; // Card, elevated surface
  bg2: string; // Page background
  bg3: string; // Pressed state, input bg

  // Text
  text1: string; // Primary
  text2: string; // Secondary
  text3: string; // Muted, timestamp, placeholder

  // Bubble
  bubbleOut: string; // Outgoing message background
  bubbleOutText: string;
  bubbleIn: string; // Incoming message background
  bubbleInText: string;

  // Semantic
  success: string;
  warning: string;
  danger: string;

  // Borders & Dividers
  border: string; // Subtle — 0.5px
  borderMid: string; // Emphasis border
  divider: string; // Row separator

  // Glass
  glassBg: string;
  glassBorder: string;

  // Avatar colors
  avatarColors: [string, string][];
}

export const lightColors: ColorTokens = {
  accent: palette.blue400,
  accentDeep: palette.blue600,
  accentLight: palette.blue50,
  accentGlow: "rgba(42, 171, 238, 0.25)",

  bg: palette.white,
  bg2: palette.gray50,
  bg3: palette.gray100,

  text1: palette.gray900,
  text2: palette.gray600,
  text3: palette.gray400,

  bubbleOut: palette.blue400,
  bubbleOutText: palette.white,
  bubbleIn: palette.white,
  bubbleInText: palette.gray900,

  success: palette.green,
  warning: palette.orange,
  danger: palette.red,

  border: "rgba(0, 0, 0, 0.08)",
  borderMid: "rgba(0, 0, 0, 0.14)",
  divider: "rgba(0, 0, 0, 0.06)",

  glassBg: "rgba(255, 255, 255, 0.72)",
  glassBorder: "rgba(255, 255, 255, 0.60)",

  avatarColors: [
    palette.avatarBlue,
    palette.avatarTeal,
    palette.avatarPurple,
    palette.avatarCoral,
    palette.avatarAmber,
    palette.avatarPink,
  ],
};

export const darkColors: ColorTokens = {
  accent: palette.blue400, // Accent KHÔNG đổi trong dark mode
  accentDeep: palette.blue600,
  accentLight: "rgba(42, 171, 238, 0.18)",
  accentGlow: "rgba(42, 171, 238, 0.3)",

  bg: palette.dark900,
  bg2: palette.dark800,
  bg3: palette.dark700,

  text1: palette.dark100,
  text2: palette.dark200,
  text3: palette.dark400,

  bubbleOut: palette.blue400,
  bubbleOutText: palette.white,
  bubbleIn: palette.dark800,
  bubbleInText: palette.dark100,

  success: palette.green,
  warning: palette.orange,
  danger: palette.red,

  border: "rgba(255, 255, 255, 0.08)",
  borderMid: "rgba(255, 255, 255, 0.14)",
  divider: "rgba(255, 255, 255, 0.06)",

  glassBg: "rgba(28, 28, 30, 0.78)",
  glassBorder: "rgba(255, 255, 255, 0.10)",

  avatarColors: [
    palette.avatarBlue,
    palette.avatarTeal,
    palette.avatarPurple,
    palette.avatarCoral,
    palette.avatarAmber,
    palette.avatarPink,
  ],
};

// Helper: gán màu avatar từ userId
export function getAvatarColors(userId: number | string): [string, string] {
  const colors = lightColors.avatarColors;
  const index =
    typeof userId === "number"
      ? userId % colors.length
      : userId.charCodeAt(0) % colors.length;
  return colors[index];
}
```

---

## 3. Typography Tokens

### `src/design-system/tokens/typography.ts`

```typescript
import { TextStyle, Platform } from "react-native";

// ─── FONT FAMILY ──────────────────────────────────────────
// iOS: dùng San Francisco (hệ thống) — không cần import
// Android: dùng Roboto hoặc install custom font
export const fontFamily = {
  // -apple-system tương đương trong React Native
  sans: Platform.select({
    ios: undefined, // Dùng SF Pro (system default)
    android: "Roboto", // Hoặc custom font nếu install
  }),
  mono: Platform.select({
    ios: "Courier New",
    android: "monospace",
  }),
} as const;

// ─── TYPE SCALE ───────────────────────────────────────────
export interface TypographyTokens {
  largeTitle: TextStyle;
  title1: TextStyle;
  title2: TextStyle;
  title3: TextStyle;
  headline: TextStyle;
  bodyLarge: TextStyle;
  body: TextStyle;
  callout: TextStyle;
  subhead: TextStyle;
  footnote: TextStyle;
  caption1: TextStyle;
  caption2: TextStyle;
  label: TextStyle; // Section headers — uppercase
}

export const typography: TypographyTokens = {
  largeTitle: {
    fontSize: 34,
    fontWeight: "300",
    letterSpacing: -0.4,
    lineHeight: 41,
  },
  title1: {
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: -0.3,
    lineHeight: 34,
  },
  title2: {
    fontSize: 22,
    fontWeight: "500",
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  title3: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.1,
    lineHeight: 25,
  },
  headline: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 22,
  },
  bodyLarge: {
    fontSize: 17,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28, // Line-height thoải mái cho reading
  },
  body: {
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 24,
  },
  callout: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 20,
  },
  subhead: {
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 20,
  },
  footnote: {
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 18,
  },
  caption1: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 16,
  },
  caption2: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.7, // Uppercase tracking
    lineHeight: 16,
    textTransform: "uppercase",
  },
};
```

---

## 4. Spacing & Layout Tokens

### `src/design-system/tokens/spacing.ts`

```typescript
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// ─── SPACING SCALE (base: 4px) ────────────────────────────
export const spacing = {
  px: 1,
  0.5: 2,
  1: 4, // Icon gap nhỏ nhất
  2: 8, // Gap trong component
  3: 12, // Padding cell, bubble
  4: 16, // Margin chuẩn toàn app (iOS standard)
  5: 20, // Padding card
  6: 24, // Section gap
  7: 28,
  8: 32, // Khoảng section lớn
  10: 40,
  12: 48, // Hero padding
  16: 64,
} as const;

// ─── LAYOUT DIMENSIONS ────────────────────────────────────
export const layout = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,

  // Chat
  chatCellHeight: 72, // Chat list row height
  avatarSizeSm: 32, // Inline, reply context
  avatarSizeMd: 44, // Chat list
  avatarSizeLg: 52, // Chat header
  avatarSizeXl: 72, // Profile
  avatarSizeXxl: 96, // Profile hero

  // Bars
  tabBarHeight: 49, // + safe area inset bottom
  navBarHeight: 44, // + status bar height
  inputBarHeight: 52, // Chat input bar

  // Interactive
  touchTargetMin: 44, // Minimum touch area (Apple HIG)
  settingsCellHeight: 44,
  buttonHeightSm: 32,
  buttonHeightMd: 44,
  buttonHeightLg: 52,

  // Content
  horizontalPadding: 16, // Standard horizontal margin
  bubbleMaxWidth: SCREEN_WIDTH * 0.72, // 72% screen width
  bubbleMinWidth: 60,
} as const;
```

---

## 5. Border Radius & Shadow Tokens

### `src/design-system/tokens/radius.ts`

```typescript
import { Platform, ViewStyle } from "react-native";

// ─── BORDER RADIUS ────────────────────────────────────────
export const radius = {
  xs: 6, // Badge, small tag
  sm: 10, // Input, small card
  md: 14, // Card, context menu
  lg: 20, // Modal, chat window
  xl: 28, // Bottom sheet
  full: 999, // Pill shape — button, badge
} as const;

// ─── CHAT BUBBLE RADIUS ───────────────────────────────────
// Đặc trưng nhất của Telegram — 4px là "đuôi" bubble
export const bubbleRadius = {
  // Tin nhắn ĐI (outgoing) — đuôi góc dưới phải
  out: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4, // ← Đuôi
  },
  // Tin nhắn ĐẾN (incoming) — đuôi góc dưới trái
  in: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 4, // ← Đuôi
    borderBottomRightRadius: 18,
  },
  // Tin nhắn liên tiếp (không có đuôi)
  outGrouped: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  inGrouped: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
} as const;

// ─── SHADOWS ──────────────────────────────────────────────
// React Native: shadow props khác nhau iOS vs Android
type ShadowStyle = Pick<
  ViewStyle,
  | "shadowColor"
  | "shadowOffset"
  | "shadowOpacity"
  | "shadowRadius"
  | "elevation"
>;

export const shadows: Record<"sm" | "md" | "lg", ShadowStyle> = {
  sm: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  }) as ShadowStyle,

  md: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    android: { elevation: 6 },
  }) as ShadowStyle,

  lg: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 40,
    },
    android: { elevation: 16 },
  }) as ShadowStyle,
};

// Dark mode tăng shadow opacity
export const shadowsDark: Record<"sm" | "md" | "lg", ShadowStyle> = {
  sm: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    android: { elevation: 3 },
  }) as ShadowStyle,

  md: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
  }) as ShadowStyle,

  lg: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.5,
      shadowRadius: 40,
    },
    android: { elevation: 20 },
  }) as ShadowStyle,
};
```

---

## 6. useTheme Hook

### `src/design-system/hooks/useTheme.ts`

```typescript
import { useColorScheme } from "react-native";
import { lightColors, darkColors, ColorTokens } from "../tokens/colors";
import { typography, TypographyTokens } from "../tokens/typography";
import { spacing, layout } from "../tokens/spacing";
import { radius, shadows, shadowsDark } from "../tokens/radius";

export interface Theme {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: typeof spacing;
  layout: typeof layout;
  radius: typeof radius;
  shadows: typeof shadows;
  isDark: boolean;
}

export function useTheme(): Theme {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return {
    colors: isDark ? darkColors : lightColors,
    typography,
    spacing,
    layout,
    radius,
    shadows: isDark ? shadowsDark : shadows,
    isDark,
  };
}

// ─── USAGE EXAMPLE ────────────────────────────────────────
/*
import { useTheme } from '@/design-system/hooks/useTheme';

function MyComponent() {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={{ backgroundColor: colors.bg, padding: spacing[4] }}>
      <Text style={[typography.headline, { color: colors.text1 }]}>
        Hello World
      </Text>
    </View>
  );
}
*/
```

---

## 7. Liquid Glass Effect

React Native không có `backdrop-filter` native. Dùng `BlurView` từ `expo-blur` hoặc `@react-native-community/blur`.

### Cài đặt

```bash
# Expo
npx expo install expo-blur

# Bare React Native
npm install @react-native-community/blur
```

### `src/design-system/components/GlassView.tsx`

```typescript
import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../hooks/useTheme';

interface GlassViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;   // 0-100, mặc định 60
  tint?: 'light' | 'dark' | 'default';
  borderTop?: boolean;  // Thêm border sáng phía trên (glass edge)
}

export function GlassView({
  children,
  style,
  intensity = 60,
  tint,
  borderTop = false,
}: GlassViewProps) {
  const { colors, isDark } = useTheme();
  const resolvedTint = tint ?? (isDark ? 'dark' : 'light');

  // Android không có BlurView đủ tốt → fallback semi-transparent
  if (Platform.OS === 'android') {
    return (
      <View
        style={[
          styles.androidFallback,
          { backgroundColor: isDark
              ? 'rgba(28, 28, 30, 0.95)'
              : 'rgba(242, 242, 247, 0.95)'
          },
          borderTop && {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: colors.glassBorder,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <BlurView
      intensity={intensity}
      tint={resolvedTint}
      style={[
        styles.blur,
        borderTop && {
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.glassBorder,
        },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blur: {
    overflow: 'hidden',
  },
  androidFallback: {
    // Semi-transparent fallback cho Android
  },
});

// ─── Preset Glass Panels ───────────────────────────────────

// Tab Bar glass
export function GlassTabBar({ children, style }: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <GlassView
      intensity={80}
      borderTop
      style={[{ position: 'absolute', bottom: 0, left: 0, right: 0 }, style]}
    >
      {children}
    </GlassView>
  );
}

// Navigation bar glass
export function GlassNavBar({ children, style }: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <GlassView intensity={70} style={[{ height: 44 }, style]}>
      {children}
    </GlassView>
  );
}

// Floating panel (context menu, notification)
export function GlassPanel({ children, style }: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { radius } = useTheme();
  return (
    <GlassView
      intensity={90}
      style={[{ borderRadius: radius.md, overflow: 'hidden' }, style]}
    >
      {children}
    </GlassView>
  );
}
```

---

## 8. Button Component

### `src/design-system/components/Button.tsx`

```typescript
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children:    React.ReactNode;
  variant?:    ButtonVariant;
  size?:       ButtonSize;
  onPress?:    () => void;
  disabled?:   boolean;
  loading?:    boolean;
  icon?:       React.ReactNode;
  iconRight?:  React.ReactNode;
  fullWidth?:  boolean;
  style?:      StyleProp<ViewStyle>;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  children,
  variant = 'primary',
  size    = 'md',
  onPress,
  disabled = false,
  loading  = false,
  icon,
  iconRight,
  fullWidth = false,
  style,
}: ButtonProps) {
  const { colors, radius } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn  = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 300 });
  };

  // ─── Styles theo variant ────────────────────────────────
  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: disabled ? colors.text3 : colors.accent,
    },
    secondary: {
      backgroundColor:  colors.bg3,
      borderWidth:      StyleSheet.hairlineWidth,
      borderColor:      colors.borderMid,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: disabled ? colors.text3 : colors.danger,
    },
  };

  const variantTextStyles: Record<ButtonVariant, TextStyle> = {
    primary:   { color: '#FFFFFF' },
    secondary: { color: colors.text1 },
    ghost:     { color: colors.accent },
    danger:    { color: '#FFFFFF' },
  };

  // ─── Styles theo size ───────────────────────────────────
  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { height: 32, paddingHorizontal: 14, borderRadius: radius.full },
    md: { height: 44, paddingHorizontal: 20, borderRadius: radius.full },
    lg: { height: 52, paddingHorizontal: 28, borderRadius: radius.full },
  };

  const sizeTextStyles: Record<ButtonSize, TextStyle> = {
    sm: { fontSize: 13, fontWeight: '500' },
    md: { fontSize: 15, fontWeight: '500' },
    lg: { fontSize: 17, fontWeight: '600' },
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={1}
      style={[
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' || variant === 'ghost'
            ? colors.accent
            : '#FFFFFF'
          }
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[styles.text, variantTextStyles[variant], sizeTextStyles[size]]}>
            {children}
          </Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </AnimatedTouchable>
  );
}

// ─── Icon-only Button (tròn) ──────────────────────────────
interface IconButtonProps {
  icon:      React.ReactNode;
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  onPress?:  () => void;
  disabled?: boolean;
  style?:    StyleProp<ViewStyle>;
}

export function IconButton({ icon, variant = 'secondary', size = 'md', onPress, disabled, style }: IconButtonProps) {
  const { colors } = useTheme();
  const sizeMap = { sm: 32, md: 44, lg: 52 };
  const dim = sizeMap[size];

  const variantBg: Record<ButtonVariant, string> = {
    primary:   colors.accent,
    secondary: colors.bg3,
    ghost:     'transparent',
    danger:    colors.danger,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        {
          width: dim, height: dim,
          borderRadius: dim / 2,
          backgroundColor: variantBg[variant],
          alignItems: 'center', justifyContent: 'center',
        },
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
}

// ─── Send Button (đặc trưng Telegram) ────────────────────
export function SendButton({ onPress }: { onPress: () => void }) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={()  => { scale.value = withSpring(1.08, { damping: 12, stiffness: 400 }); }}
      onPressOut={() => { scale.value = withSpring(1,    { damping: 10, stiffness: 300 }); }}
      activeOpacity={1}
      style={[
        {
          width: 38, height: 38,
          borderRadius: 19,
          backgroundColor: colors.accent,
          alignItems: 'center', justifyContent: 'center',
        },
        animStyle,
      ]}
    >
      {/* Paper plane icon — thêm react-native-svg icon vào đây */}
      <Text style={{ color: 'white', fontSize: 16 }}>➤</Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems:      'center',
    justifyContent:  'center',
    flexDirection:   'row',
  },
  content: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:            6,
  },
  text: {
    letterSpacing: 0,
  },
  iconLeft:  { marginRight: 2 },
  iconRight: { marginLeft: 2 },
  fullWidth: { alignSelf: 'stretch' },
});
```

---

## 9. Input Components

```typescript
// src/design-system/components/Input.tsx
import React, { useState, useRef } from 'react';
import {
  View, TextInput, Text, StyleSheet,
  TextInputProps, ViewStyle, StyleProp,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

interface InputProps extends TextInputProps {
  label?:       string;
  error?:       string;
  leftIcon?:    React.ReactNode;
  rightIcon?:   React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label, error, leftIcon, rightIcon,
  containerStyle, style, ...props
}: InputProps) {
  const { colors, typography, spacing, radius } = useTheme();
  const [focused, setFocused] = useState(false);

  // Animated border glow khi focus
  const glowOpacity = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({ opacity: glowOpacity.value }));

  const handleFocus = () => {
    setFocused(true);
    glowOpacity.value = withTiming(1, { duration: 200 });
    props.onFocus?.(undefined as any);
  };
  const handleBlur = () => {
    setFocused(false);
    glowOpacity.value = withTiming(0, { duration: 200 });
    props.onBlur?.(undefined as any);
  };

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[typography.callout, { color: colors.text2, marginBottom: spacing[1], fontWeight: '500' }]}>
          {label}
        </Text>
      )}

      <View style={{ position: 'relative' }}>
        {/* Focus glow ring */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: radius.sm + 3,
              borderWidth: 3,
              borderColor: colors.accentLight,
              margin: -3,
            },
            animStyle,
          ]}
          pointerEvents="none"
        />

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor:  colors.bg2,
              borderRadius:     radius.sm,
              borderWidth:      StyleSheet.hairlineWidth,
              borderColor:      focused ? colors.accent : colors.borderMid,
            },
            leftIcon  && { paddingLeft: spacing[5] },
            rightIcon && { paddingRight: spacing[5] },
          ]}
        >
          {leftIcon && (
            <View style={[styles.iconWrapper, { left: spacing[3] }]}>
              {leftIcon}
            </View>
          )}

          <TextInput
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.text3}
            style={[
              styles.input,
              typography.body,
              { color: colors.text1 },
              style,
            ]}
          />

          {rightIcon && (
            <View style={[styles.iconWrapper, { right: spacing[3] }]}>
              {rightIcon}
            </View>
          )}
        </View>
      </View>

      {error && (
        <Text style={[typography.caption1, { color: colors.danger, marginTop: spacing[1] }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

// ─── Chat Input Bar ────────────────────────────────────────
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatInputBarProps {
  value:         string;
  onChangeText:  (text: string) => void;
  onSend:        () => void;
  onAttach?:     () => void;
  placeholder?:  string;
}

export function ChatInputBar({
  value, onChangeText, onSend, onAttach,
  placeholder = 'Message...',
}: ChatInputBarProps) {
  const { colors, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.chatBar,
        {
          paddingBottom:   Math.max(insets.bottom, spacing[2]),
          borderTopWidth:  StyleSheet.hairlineWidth,
          borderTopColor:  colors.border,
          backgroundColor: colors.glassBg, // Dùng GlassView nếu muốn blur
        },
      ]}
    >
      {onAttach && (
        <TouchableOpacity onPress={onAttach} style={styles.chatBarIcon}>
          <Text style={{ color: colors.accent, fontSize: 22 }}>📎</Text>
        </TouchableOpacity>
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text3}
        multiline
        style={[
          styles.chatInput,
          {
            backgroundColor: colors.bg2,
            color:           colors.text1,
            borderRadius:    radius.full,
            borderWidth:     StyleSheet.hairlineWidth,
            borderColor:     colors.border,
            fontSize:        15,
            maxHeight:       120,
            paddingHorizontal: spacing[4],
            paddingVertical:   spacing[2],
          },
        ]}
      />

      <TouchableOpacity style={styles.chatBarIcon}>
        <Text style={{ fontSize: 22 }}>😊</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSend}
        disabled={!value.trim()}
        style={[
          styles.sendBtn,
          { backgroundColor: value.trim() ? colors.accent : colors.bg3 },
        ]}
      >
        <Text style={{ color: value.trim() ? 'white' : colors.text3, fontSize: 16 }}>➤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { height: 44, justifyContent: 'center', paddingHorizontal: 14 },
  input:          { flex: 1, paddingVertical: 0 },
  iconWrapper:    { position: 'absolute', zIndex: 1, justifyContent: 'center' },
  chatBar: {
    flexDirection:  'row',
    alignItems:     'flex-end',
    gap:            8,
    paddingHorizontal: 12,
    paddingTop:     10,
  },
  chatBarIcon: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  chatInput:  { flex: 1 },
  sendBtn: {
    width: 38, height: 38,
    borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
});
```

---

## 10. Avatar Component

```typescript
// src/design-system/components/Avatar.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { getAvatarColors } from '../tokens/colors';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface AvatarProps {
  name?:      string;   // Dùng lấy initials
  uri?:       string;   // Ảnh URL
  userId?:    number | string;  // Để gán màu deterministic
  size?:      AvatarSize;
  online?:    boolean;
  style?:     StyleProp<ViewStyle>;
}

const sizeDimensions: Record<AvatarSize, number> = {
  sm:  32,
  md:  44,
  lg:  52,
  xl:  72,
  xxl: 96,
};

const sizeFontSizes: Record<AvatarSize, number> = {
  sm: 13, md: 17, lg: 20, xl: 28, xxl: 36,
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

export function Avatar({
  name = '',
  uri,
  userId,
  size = 'md',
  online = false,
  style,
}: AvatarProps) {
  const { colors } = useTheme();
  const dim        = sizeDimensions[size];
  const fontSize   = sizeFontSizes[size];
  const initials   = getInitials(name) || '?';
  const id         = userId ?? name;
  const [colorA, colorB] = getAvatarColors(typeof id === 'string' ? id.charCodeAt(0) : id);

  // Online indicator size
  const onlineSize   = dim * 0.22;
  const onlineOffset = dim * 0.03;

  return (
    <View style={[{ width: dim, height: dim }, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: dim, height: dim, borderRadius: dim / 2 }}
        />
      ) : (
        <LinearGradient
          colors={[colorA, colorB]}
          start={{ x: 0.15, y: 0.15 }}
          end={{ x: 0.85, y: 0.85 }}
          style={{
            width: dim, height: dim,
            borderRadius: dim / 2,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize, fontWeight: '600', letterSpacing: 0.5 }}>
            {initials}
          </Text>
        </LinearGradient>
      )}

      {online && (
        <View
          style={{
            position:        'absolute',
            bottom:          onlineOffset,
            right:           onlineOffset,
            width:           onlineSize,
            height:          onlineSize,
            borderRadius:    onlineSize / 2,
            backgroundColor: colors.success,
            borderWidth:     Math.max(2, dim * 0.04),
            borderColor:     colors.bg,
          }}
        />
      )}
    </View>
  );
}
```

---

## 11. Badge & Tag Components

```typescript
// src/design-system/components/Badge.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type BadgeVariant = 'accent' | 'success' | 'muted' | 'danger' | 'outline';

interface BadgeProps {
  count?:   number;
  label?:   string;
  variant?: BadgeVariant;
  style?:   StyleProp<ViewStyle>;
}

export function Badge({ count, label, variant = 'accent', style }: BadgeProps) {
  const { colors, radius } = useTheme();

  const display = count !== undefined
    ? count > 99 ? '99+' : String(count)
    : label ?? '';

  const bgColors: Record<BadgeVariant, string> = {
    accent:  colors.accent,
    success: colors.success,
    muted:   colors.text3,
    danger:  colors.danger,
    outline: 'transparent',
  };
  const textColors: Record<BadgeVariant, string> = {
    accent:  '#fff',
    success: '#fff',
    muted:   '#fff',
    danger:  '#fff',
    outline: colors.accent,
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColors[variant],
          borderRadius:    radius.full,
          borderWidth:     variant === 'outline' ? 1.5 : 0,
          borderColor:     variant === 'outline' ? colors.accent : undefined,
          minWidth:        20,
          height:          20,
          paddingHorizontal: display.length > 2 ? 5 : 4,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: textColors[variant] }]}>
        {display}
      </Text>
    </View>
  );
}

// ─── Tag / Chip ────────────────────────────────────────────
type TagVariant = 'blue' | 'green' | 'orange' | 'red' | 'gray';

interface TagProps {
  label:    string;
  variant?: TagVariant;
  style?:   StyleProp<ViewStyle>;
}

export function Tag({ label, variant = 'blue', style }: TagProps) {
  const { colors, radius } = useTheme();

  const configs: Record<TagVariant, { bg: string; text: string }> = {
    blue:   { bg: colors.accentLight,              text: colors.accentDeep },
    green:  { bg: 'rgba(52, 199, 89, 0.12)',       text: '#1A7D35' },
    orange: { bg: 'rgba(255, 149, 0, 0.12)',       text: '#C06800' },
    red:    { bg: 'rgba(255, 59, 48, 0.10)',       text: colors.danger },
    gray:   { bg: colors.bg3,                      text: colors.text2 },
  };

  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: configs[variant].bg,
          borderRadius:    radius.full,
        },
        style,
      ]}
    >
      <Text style={[styles.tagText, { color: configs[variant].text }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center', justifyContent: 'center',
  },
  text: {
    fontSize: 12, fontWeight: '600',
  },
  tag: {
    paddingHorizontal: 10, paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 12, fontWeight: '500',
  },
});
```

---

## 12. Chat Bubble Component

```typescript
// src/design-system/components/ChatBubble.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, withTiming, runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { bubbleRadius } from '../tokens/radius';

type BubbleType = 'in' | 'out';

interface ChatBubbleProps {
  text:        string;
  type:        BubbleType;
  timestamp:   string;
  isRead?:     boolean;     // Outgoing: ✓ xám hay ✓✓ xanh
  isGrouped?:  boolean;     // Tin nhắn liên tiếp — ẩn avatar, bỏ đuôi
  showAvatar?: boolean;
  senderName?: string;      // Trong group chat
}

export function ChatBubble({
  text, type, timestamp,
  isRead = false,
  isGrouped = false,
  showAvatar = false,
  senderName,
}: ChatBubbleProps) {
  const { colors, typography, spacing, layout } = useTheme();

  // Spring animation khi bubble xuất hiện
  const scale   = useSharedValue(0.88);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(6);

  React.useEffect(() => {
    opacity.value    = withTiming(1, { duration: 180 });
    scale.value      = withSpring(1, { damping: 14, stiffness: 280 });
    translateY.value = withSpring(0, { damping: 14, stiffness: 280 });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity:   opacity.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const isOut = type === 'out';
  const radii = isGrouped
    ? (isOut ? bubbleRadius.outGrouped : bubbleRadius.inGrouped)
    : (isOut ? bubbleRadius.out        : bubbleRadius.in);

  return (
    <View style={[styles.row, isOut ? styles.rowOut : styles.rowIn]}>
      <Animated.View style={animStyle}>
        <View
          style={[
            styles.bubble,
            radii,
            {
              backgroundColor: isOut ? colors.bubbleOut : colors.bubbleIn,
              maxWidth:        layout.bubbleMaxWidth,
              minWidth:        layout.bubbleMinWidth,
              // Border chỉ cho incoming bubble
              borderWidth:     isOut ? 0 : StyleSheet.hairlineWidth,
              borderColor:     isOut ? undefined : colors.border,
            },
          ]}
        >
          {/* Sender name trong group */}
          {senderName && !isOut && (
            <Text style={[typography.caption1, { color: colors.accent, fontWeight: '600', marginBottom: 2 }]}>
              {senderName}
            </Text>
          )}

          {/* Message text */}
          <Text
            style={[
              typography.body,
              { color: isOut ? colors.bubbleOutText : colors.bubbleInText },
            ]}
          >
            {text}
          </Text>

          {/* Timestamp + read receipt (trong bubble đi) */}
          {isOut && (
            <View style={styles.meta}>
              <Text style={[typography.caption2, { color: 'rgba(255,255,255,0.7)' }]}>
                {timestamp}
              </Text>
              <Text style={{ fontSize: 11, color: isRead ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)' }}>
                {isRead ? '✓✓' : '✓'}
              </Text>
            </View>
          )}
        </View>

        {/* Timestamp ngoài (cho incoming) */}
        {!isOut && (
          <Text style={[typography.caption2, { color: colors.text3, marginTop: 2, paddingLeft: 4 }]}>
            {timestamp}
          </Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 2,
    paddingHorizontal: 14,
  },
  rowIn:  { alignItems: 'flex-start' },
  rowOut: { alignItems: 'flex-end' },
  bubble: {
    paddingHorizontal: 13,
    paddingVertical:    9,
  },
  meta: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'flex-end',
    gap:             3,
    marginTop:       3,
  },
});
```

---

## 13. Chat List Cell Component

```typescript
// src/design-system/components/ChatListCell.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Avatar } from './Avatar';
import { Badge } from './Badge';

interface ChatListCellProps {
  name:        string;
  preview:     string;
  timestamp:   string;
  userId?:     number;
  avatarUri?:  string;
  unread?:     number;
  muted?:      boolean;
  pinned?:     boolean;
  online?:     boolean;
  onPress?:    () => void;
}

export function ChatListCell({
  name, preview, timestamp,
  userId, avatarUri,
  unread = 0, muted = false, pinned = false,
  online = false, onPress,
}: ChatListCellProps) {
  const { colors, typography, spacing, layout } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.cell,
        {
          height:            layout.chatCellHeight,
          paddingHorizontal: layout.horizontalPadding,
          backgroundColor:   colors.bg,
        },
      ]}
    >
      {/* Avatar */}
      <Avatar
        name={name}
        uri={avatarUri}
        userId={userId}
        size="md"
        online={online}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Top row: Name + Timestamp */}
        <View style={styles.topRow}>
          <View style={styles.nameRow}>
            {pinned && (
              <Text style={{ fontSize: 14, marginRight: 4 }}>📌</Text>
            )}
            <Text
              style={[typography.subhead, { color: colors.text1, fontWeight: '600' }]}
              numberOfLines={1}
            >
              {name}
            </Text>
          </View>
          <Text style={[typography.caption1, { color: colors.text3, flexShrink: 0 }]}>
            {timestamp}
          </Text>
        </View>

        {/* Bottom row: Preview + Badge */}
        <View style={styles.bottomRow}>
          <Text
            style={[
              typography.callout,
              { color: muted ? colors.text3 : colors.text2, flex: 1 },
            ]}
            numberOfLines={1}
          >
            {preview}
          </Text>
          {unread > 0 && (
            <Badge
              count={unread}
              variant={muted ? 'muted' : 'accent'}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Separator ────────────────────────────────────────────
export function ChatListSeparator() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height:           StyleSheet.hairlineWidth,
        backgroundColor:  colors.divider,
        marginLeft:       16 + 44 + 12, // Indent sau avatar
      }}
    />
  );
}

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});
```

---

## 14. Tab Bar

Dùng với React Navigation `@react-navigation/bottom-tabs`:

```typescript
// src/navigation/TabBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/design-system/hooks/useTheme';

const TAB_ICONS: Record<string, string> = {
  Chats:    '💬',
  Contacts: '👥',
  Saved:    '🔖',
  Settings: '⚙️',
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const Inner = (
    <View style={[styles.inner, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const label = String(options.tabBarLabel ?? options.title ?? route.name);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            style={styles.tab}
          >
            <Text style={{ fontSize: 24 }}>
              {TAB_ICONS[route.name] ?? '●'}
            </Text>
            <Text
              style={[
                styles.label,
                { color: isFocused ? colors.accent : colors.text3 },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  // Glass effect trên iOS
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={80}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.tabBar,
          { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
        ]}
      >
        {Inner}
      </BlurView>
    );
  }

  // Opaque fallback Android
  return (
    <View
      style={[
        styles.tabBar,
        { backgroundColor: colors.bg },
        { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
      ]}
    >
      {Inner}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    overflow: 'hidden',
  },
  inner: {
    flexDirection:   'row',
    height:          49,
    alignItems:      'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 6,
  },
  label: {
    fontSize: 10, fontWeight: '600',
  },
});
```

---

## 15. Navigation Header

```typescript
// src/navigation/NavigationHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system/hooks/useTheme';

interface NavHeaderProps {
  title:          string;
  subtitle?:      string;
  showBack?:      boolean;
  onBack?:        () => void;
  rightAction?:   React.ReactNode;
  avatar?:        React.ReactNode;
}

export function NavigationHeader({
  title, subtitle, showBack, onBack, rightAction, avatar,
}: NavHeaderProps) {
  const { colors, typography, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const content = (
    <View style={[styles.bar, { paddingTop: statusBarHeight, height: 44 + statusBarHeight }]}>
      {/* Left */}
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={[styles.backArrow, { color: colors.accent }]}>‹</Text>
            <Text style={[typography.body, { color: colors.accent }]}>Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Center */}
      <View style={styles.center}>
        {avatar && <View style={{ marginRight: 8 }}>{avatar}</View>}
        <View>
          <Text style={[typography.headline, { color: colors.text1 }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[typography.caption1, { color: colors.accent, textAlign: 'center' }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Right */}
      <View style={[styles.side, { alignItems: 'flex-end' }]}>
        {rightAction}
      </View>
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={70}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.container,
          { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
        ]}
      >
        {content}
      </BlurView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  side:    { width: 100, flexDirection: 'row', alignItems: 'center' },
  center:  { flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 8, paddingVertical: 4 },
  backArrow: { fontSize: 28, lineHeight: 32, fontWeight: '300' },
});
```

---

## 16. Settings Cell Component

```typescript
// src/design-system/components/SettingsCell.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Toggle } from './Toggle';

type SettingsIconColor = 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal' | 'pink';

interface SettingsCellProps {
  icon:        string;          // Emoji icon
  iconColor?:  SettingsIconColor;
  name:        string;
  subtitle?:   string;
  value?:      string;          // Right-side value text
  showChevron?: boolean;
  toggle?:     boolean;         // Dùng switch thay chevron
  toggleValue?:boolean;
  onToggle?:   (v: boolean) => void;
  onPress?:    () => void;
  danger?:     boolean;
}

const iconBgColors: Record<SettingsIconColor, string> = {
  blue:   'rgba(0, 122, 255, 0.15)',
  green:  'rgba(52, 199, 89, 0.15)',
  orange: 'rgba(255, 149, 0, 0.15)',
  red:    'rgba(255, 59, 48, 0.15)',
  purple: 'rgba(175, 82, 222, 0.15)',
  teal:   'rgba(90, 200, 250, 0.15)',
  pink:   'rgba(255, 45, 85, 0.15)',
};

export function SettingsCell({
  icon, iconColor = 'blue', name, subtitle,
  value, showChevron = true, toggle, toggleValue,
  onToggle, onPress, danger = false,
}: SettingsCellProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={toggle || !onPress}
      activeOpacity={0.7}
      style={[
        styles.cell,
        {
          backgroundColor:  colors.bg,
          paddingHorizontal: spacing[4],
          paddingVertical:   spacing[3],
          minHeight:         44,
        },
      ]}
    >
      {/* Icon */}
      <View
        style={[
          styles.iconBox,
          { backgroundColor: iconBgColors[iconColor] },
        ]}
      >
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      </View>

      {/* Text */}
      <View style={styles.textBlock}>
        <Text
          style={[
            typography.body,
            { color: danger ? colors.danger : colors.text1 },
          ]}
        >
          {name}
        </Text>
        {subtitle && (
          <Text style={[typography.caption1, { color: colors.text3, marginTop: 1 }]}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right side */}
      {toggle ? (
        <Toggle value={toggleValue ?? false} onChange={onToggle ?? (() => {})} />
      ) : (
        <View style={styles.right}>
          {value && (
            <Text style={[typography.body, { color: colors.text3 }]}>
              {value}
            </Text>
          )}
          {showChevron && (
            <Text style={{ fontSize: 18, color: colors.text3, opacity: 0.5, marginLeft: 4 }}>
              ›
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─── Settings Group Container ─────────────────────────────
interface SettingsGroupProps {
  title?:    string;
  footer?:   string;
  children:  React.ReactNode;
}

export function SettingsGroup({ title, footer, children }: SettingsGroupProps) {
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <View style={{ marginBottom: spacing[5] }}>
      {title && (
        <Text
          style={[
            typography.label,
            { color: colors.text3, paddingHorizontal: spacing[4], marginBottom: spacing[2] },
          ]}
        >
          {title}
        </Text>
      )}
      <View
        style={{
          borderRadius: radius.lg,
          overflow:     'hidden',
          borderWidth:  StyleSheet.hairlineWidth,
          borderColor:  colors.border,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <View key={index}>
            {child}
            {index < React.Children.count(children) - 1 && (
              <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.divider, marginLeft: 16 + 30 + 13 }} />
            )}
          </View>
        ))}
      </View>
      {footer && (
        <Text
          style={[
            typography.footnote,
            { color: colors.text3, paddingHorizontal: spacing[4], marginTop: spacing[2] },
          ]}
        >
          {footer}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  iconBox: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  textBlock: { flex: 1 },
  right: { flexDirection: 'row', alignItems: 'center' },
});
```

---

## 17. Bottom Sheet Modal

Cài `@gorhom/bottom-sheet` — thư viện chuẩn nhất cho React Native:

```bash
npm install @gorhom/bottom-sheet @gorhom/portal
npm install react-native-reanimated react-native-gesture-handler
```

```typescript
// src/design-system/components/ActionSheet.tsx
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '../hooks/useTheme';

type ActionItem = {
  label:   string;
  icon?:   string;
  onPress: () => void;
  danger?: boolean;
};

interface ActionSheetProps {
  isOpen:    boolean;
  onClose:   () => void;
  title?:    string;
  subtitle?: string;
  actions:   ActionItem[];
}

export function ActionSheet({
  isOpen, onClose, title, subtitle, actions,
}: ActionSheetProps) {
  const { colors, typography, spacing, radius } = useTheme();
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => {
    const itemHeight = 52;
    const headerHeight = title ? 70 : 0;
    const totalHeight = headerHeight + actions.length * itemHeight + 60;
    return [totalHeight];
  }, [actions.length, title]);

  React.useEffect(() => {
    if (isOpen) sheetRef.current?.expand();
    else sheetRef.current?.close();
  }, [isOpen]);

  const renderBackdrop = useCallback((props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.4}
    />
  ), []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      onClose={onClose}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.bg }}
      handleIndicatorStyle={{ backgroundColor: colors.bg3, width: 36 }}
      handleStyle={{ paddingTop: 10, paddingBottom: 0 }}
    >
      <BottomSheetView>
        {/* Header */}
        {title && (
          <View
            style={[
              styles.header,
              { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider },
            ]}
          >
            <Text style={[typography.headline, { color: colors.text1, textAlign: 'center' }]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[typography.callout, { color: colors.text2, textAlign: 'center', marginTop: 3 }]}>
                {subtitle}
              </Text>
            )}
          </View>
        )}

        {/* Actions */}
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => { action.onPress(); onClose(); }}
            activeOpacity={0.7}
            style={[
              styles.action,
              {
                paddingHorizontal: spacing[5],
                height: 52,
                borderBottomWidth: index < actions.length - 1 ? StyleSheet.hairlineWidth : 0,
                borderBottomColor: colors.divider,
              },
            ]}
          >
            {action.icon && (
              <Text style={{ fontSize: 20, width: 28, textAlign: 'center' }}>
                {action.icon}
              </Text>
            )}
            <Text
              style={[
                typography.bodyLarge,
                { color: action.danger ? colors.danger : colors.text1 },
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: spacing[6] }} />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingVertical: 14 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 14 },
});
```

---

## 18. Context Menu

Dùng `react-native-context-menu-view` hoặc build custom với long press:

```typescript
// src/design-system/components/ContextMenu.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal,
  StyleSheet, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme } from '../hooks/useTheme';

const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

type ContextAction = {
  label:   string;
  icon:    string;
  onPress: () => void;
  danger?: boolean;
};

interface ContextMenuProps {
  children:    React.ReactNode;
  actions:     ContextAction[];
  onReaction?: (emoji: string) => void;
}

export function ContextMenu({ children, actions, onReaction }: ContextMenuProps) {
  const { colors, typography, radius, isDark } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onLongPress={() => setVisible(true)}
        delayLongPress={350}
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <Animated.View
            entering={FadeIn.duration(180)}
            exiting={FadeOut.duration(150)}
            style={[StyleSheet.absoluteFillObject, styles.backdrop]}
          >
            <BlurView
              intensity={4}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <Animated.View
          entering={ZoomIn.duration(180).springify().damping(14)}
          exiting={ZoomOut.duration(120)}
          style={[
            styles.menu,
            {
              backgroundColor: colors.glassBg,
              borderRadius:     radius.md,
              borderWidth:      StyleSheet.hairlineWidth,
              borderColor:      colors.borderMid,
            },
          ]}
        >
          <BlurView
            intensity={90}
            tint={isDark ? 'dark' : 'light'}
            style={{ borderRadius: radius.md, overflow: 'hidden' }}
          >
            {/* Reaction bar */}
            {onReaction && (
              <View
                style={[
                  styles.reactions,
                  { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider },
                ]}
              >
                {REACTION_EMOJIS.map(emoji => (
                  <TouchableOpacity
                    key={emoji}
                    onPress={() => { onReaction(emoji); setVisible(false); }}
                    style={styles.reactionBtn}
                  >
                    <Text style={{ fontSize: 26 }}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Actions */}
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => { action.onPress(); setVisible(false); }}
                activeOpacity={0.7}
                style={[
                  styles.action,
                  index < actions.length - 1 && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.divider,
                  },
                ]}
              >
                <Text style={[
                  typography.body,
                  { color: action.danger ? colors.danger : colors.text1 },
                ]}>
                  {action.label}
                </Text>
                <Text style={{ fontSize: 18 }}>{action.icon}</Text>
              </TouchableOpacity>
            ))}
          </BlurView>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1 },
  menu: {
    position:   'absolute',
    top:        '30%',
    alignSelf:  'center',
    minWidth:   200,
    overflow:   'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 20,
  },
  reactions: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 2,
  },
  reactionBtn: {
    width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
});
```

---

## 19. Toggle Switch Component

```typescript
// src/design-system/components/Toggle.tsx
import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

interface ToggleProps {
  value:     boolean;
  onChange:  (value: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ value, onChange, disabled = false }: ToggleProps) {
  const { colors } = useTheme();
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, {
      damping:   15,
      stiffness: 300,
      mass:      0.8,
    });
  }, [value]);

  // Track background color animation
  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.bg3, colors.success]
    ),
  }));

  // Thumb translation animation
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: withSpring(progress.value * 20, {
        damping: 15, stiffness: 300,
      }),
    }],
  }));

  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange(!value)}
      activeOpacity={0.9}
      disabled={disabled}
    >
      <Animated.View style={[styles.track, trackStyle, disabled && styles.disabled]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width:        51,
    height:       31,
    borderRadius: 15.5,
    padding:       2,
    justifyContent: 'center',
  },
  thumb: {
    width:        27,
    height:       27,
    borderRadius: 13.5,
    backgroundColor: '#FFFFFF',
    shadowColor:  '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius:  4,
    elevation:    3,
  },
  disabled: { opacity: 0.5 },
});
```

---

## 20. Segmented Control Component

```typescript
// src/design-system/components/SegmentedControl.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

interface SegmentedControlProps {
  options:  string[];
  value:    string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const { colors, radius, shadows } = useTheme();
  const activeIndex = options.indexOf(value);
  const translateX  = useSharedValue(0);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const segWidth = containerWidth / options.length;

  React.useEffect(() => {
    if (segWidth > 0) {
      translateX.value = withSpring(activeIndex * segWidth + 3, {
        damping: 16, stiffness: 300,
      });
    }
  }, [activeIndex, segWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: segWidth - 6,
  }));

  return (
    <View
      style={[styles.container, { backgroundColor: colors.bg3, borderRadius: radius.sm }]}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {/* Animated active indicator */}
      <Animated.View
        style={[
          styles.indicator,
          indicatorStyle,
          {
            backgroundColor: colors.bg,
            borderRadius: radius.sm - 2,
            ...shadows.sm,
          },
        ]}
      />

      {/* Tabs */}
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onChange(option)}
          activeOpacity={0.7}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              { color: option === value ? colors.text1 : colors.text2 },
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding:        3,
    position:      'relative',
    height:         36,
  },
  indicator: {
    position:  'absolute',
    top:        3,
    bottom:     3,
    left:       0,
    zIndex:     0,
  },
  tab: {
    flex:            1,
    alignItems:      'center',
    justifyContent:  'center',
    zIndex:          1,
  },
  tabText: {
    fontSize:    13,
    fontWeight: '500',
  },
});
```

---

## 21. Animation System

### Cài đặt

```bash
npm install react-native-reanimated react-native-gesture-handler
```

### Easing & Spring Config

```typescript
// src/design-system/tokens/animation.ts
import {
  WithSpringConfig,
  WithTimingConfig,
  Easing,
} from "react-native-reanimated";

// ─── TIMING ───────────────────────────────────────────────
export const timings: Record<string, WithTimingConfig> = {
  fast: { duration: 120, easing: Easing.out(Easing.quad) },
  normal: { duration: 200, easing: Easing.bezier(0.4, 0, 0.2, 1) },
  slow: { duration: 350, easing: Easing.bezier(0.4, 0, 0.2, 1) },
  fade: { duration: 150, easing: Easing.out(Easing.ease) },
};

// ─── SPRING ───────────────────────────────────────────────
// Spring physics tạo cảm giác iOS "bouncy"
export const springs: Record<string, WithSpringConfig> = {
  // Button press — nhanh, snappy
  button: {
    damping: 15,
    stiffness: 400,
    mass: 0.8,
  },
  // Modal, bottom sheet — mượt hơn
  modal: {
    damping: 20,
    stiffness: 250,
    mass: 1,
  },
  // Bubble appear — bouncy nhẹ
  bubble: {
    damping: 14,
    stiffness: 280,
    mass: 0.9,
  },
  // Toggle switch
  toggle: {
    damping: 15,
    stiffness: 300,
    mass: 0.8,
  },
  // Context menu pop
  contextMenu: {
    damping: 12,
    stiffness: 350,
    mass: 0.7,
  },
};

// ─── DURATION MAP ─────────────────────────────────────────
export const durations = {
  buttonPress: 120,
  contextMenu: 180,
  bottomSheet: 300,
  screenTransition: 350,
  bubbleAppear: 220,
  toggle: 250,
  tabSwitch: 200,
  fadeInOut: 150,
} as const;
```

### Reusable Animated Hooks

```typescript
// src/design-system/hooks/useButtonAnimation.ts
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { springs } from "../tokens/animation";

export function useButtonAnimation() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96, springs.button);
  };
  const onPressOut = () => {
    scale.value = withSpring(1, springs.button);
  };

  return { animatedStyle, onPressIn, onPressOut };
}

// Dùng trong component:
// const { animatedStyle, onPressIn, onPressOut } = useButtonAnimation();
// <Animated.View style={animatedStyle}>
//   <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut} ... />
// </Animated.View>
```

---

## 22. Dark Mode

### Strategy trong React Native

```typescript
// src/design-system/hooks/useColorScheme.ts
import { useColorScheme as _useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

export function useAppColorScheme() {
  const systemScheme = _useColorScheme() ?? "light";
  const [userTheme, setUserTheme] = useState<Theme>("system");

  useEffect(() => {
    AsyncStorage.getItem("theme").then((v) => {
      if (v) setUserTheme(v as Theme);
    });
  }, []);

  const resolved = userTheme === "system" ? systemScheme : userTheme;
  const isDark = resolved === "dark";

  const setTheme = async (theme: Theme) => {
    setUserTheme(theme);
    await AsyncStorage.setItem("theme", theme);
  };

  return { isDark, theme: resolved, userTheme, setTheme };
}
```

### NavigationContainer theming

```typescript
// src/App.tsx
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '@/design-system/hooks/useTheme';

export default function App() {
  const { isDark, colors } = useTheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary:    colors.accent,
      background: colors.bg2,
      card:       colors.bg,
      text:       colors.text1,
      border:     colors.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      {/* ... */}
    </NavigationContainer>
  );
}
```

### Quy tắc dark mode

```typescript
// ✅ ĐÚNG — dùng token từ useTheme
const { colors } = useTheme();
<View style={{ backgroundColor: colors.bg }}>

// ❌ SAI — hardcode hex
<View style={{ backgroundColor: '#FFFFFF' }}>

// ✅ ĐÚNG — accent giữ nguyên cả 2 mode
<View style={{ backgroundColor: colors.accent }}>  // #2AABEE — không đổi

// ✅ ĐÚNG — border dùng rgba
<View style={{ borderColor: colors.border }}>
// light: rgba(0,0,0,0.08) | dark: rgba(255,255,255,0.08)
```

---

## 23. Accessibility

### Touch Targets

```typescript
// Tất cả interactive element tối thiểu 44×44px
// Dùng hitSlop để mở rộng vùng chạm mà không thay đổi visual
<TouchableOpacity
  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  style={{ width: 28, height: 28 }}  // Visual nhỏ
>
  ...
</TouchableOpacity>
```

### Accessibility Labels

```typescript
// Mọi icon button cần accessibilityLabel
<TouchableOpacity
  accessibilityLabel="Gửi tin nhắn"
  accessibilityRole="button"
  accessibilityState={{ disabled: !canSend }}
>
  <SendIcon />
</TouchableOpacity>

// Chat bubble
<View
  accessibilityRole="text"
  accessibilityLabel={`${senderName} nói: ${messageText}. Lúc ${timestamp}`}
>
  <ChatBubble ... />
</View>
```

### Reduce Motion

```typescript
import { AccessibilityInfo } from "react-native";

// Kiểm tra reduce motion setting
const [reduceMotion, setReduceMotion] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  const sub = AccessibilityInfo.addEventListener(
    "reduceMotionChanged",
    setReduceMotion,
  );
  return () => sub.remove();
}, []);

// Tắt animation nếu user bật reduce motion
const animDuration = reduceMotion ? 0 : 220;
```

### Dynamic Type Support

```typescript
// Dùng useWindowDimensions để responsive
import { useWindowDimensions } from "react-native";

function useResponsiveFont(base: number) {
  const { fontScale } = useWindowDimensions();
  // Respect system font scale nhưng giới hạn để không vỡ layout
  return Math.min(base * fontScale, base * 1.3);
}
```

---

## 24. Checklist áp dụng

Trước khi ship một màn hình mới trong React Native app, kiểm tra:

### Tokens & Theme

- [ ] Tất cả màu sắc lấy từ `useTheme().colors` — không hardcode hex
- [ ] Dark mode test thủ công trên cả iOS và Android
- [ ] Accent `#2AABEE` chỉ dùng cho primary action
- [ ] `StyleSheet.hairlineWidth` thay vì `1` cho border mỏng

### Typography

- [ ] Font scale dùng đúng từ `typography` token
- [ ] `numberOfLines` trên text có thể overflow
- [ ] Timestamp và metadata dùng `caption1` + `colors.text3`

### Spacing & Layout

- [ ] Khoảng cách là bội số của `spacing[1]` (4px)
- [ ] `horizontalPadding: 16` nhất quán
- [ ] Touch target ≥ 44px (dùng `hitSlop` nếu cần)
- [ ] `useSafeAreaInsets()` cho tab bar và input bar

### Components

- [ ] Bubble radius: 18-18-4-18 (out) / 18-18-18-4 (in)
- [ ] Chat cell height đúng `layout.chatCellHeight` (72px)
- [ ] `StyleSheet.hairlineWidth` cho divider (không phải 0.5)
- [ ] Avatar dùng gradient deterministic từ userId

### Animation

- [ ] Button có scale(0.96) khi `onPressIn`
- [ ] Spring config từ `springs` token — không tự chọn số
- [ ] Bubble dùng `ZoomIn.springify()` khi appear
- [ ] `AccessibilityInfo.isReduceMotionEnabled()` được check

### Glass Effect

- [ ] `BlurView` chỉ dùng trên iOS — Android dùng opaque fallback
- [ ] Glass chỉ cho floating/overlay surface
- [ ] `intensity` tab bar: 80, nav bar: 70, context menu: 90

### Performance

- [ ] FlatList với `keyExtractor` và `getItemLayout` cho chat list
- [ ] `memo` cho `ChatBubble` và `ChatListCell`
- [ ] Image dùng `FastImage` (react-native-fast-image)
- [ ] `InteractionManager.runAfterInteractions` cho heavy task

---

## Tổng kết

Triết lý của Telegram iOS gói gọn trong một câu: **UI biến mất để nội dung xuất hiện.** Khi áp dụng vào React Native:

1. **Định nghĩa tokens trước** trong `colors.ts`, `typography.ts`, `spacing.ts` — không bao giờ viết số trực tiếp trong component
2. **`useTheme()` là single source of truth** — mọi component đều lấy giá trị từ đây
3. **Dark mode từ ngày đầu** — không phải "thêm sau"
4. **`react-native-reanimated` cho mọi animation** — tránh `Animated` API cũ
5. **iOS và Android cần code khác nhau** tại một số điểm (Glass, Shadow) — dùng `Platform.select()`

> _"Complexity is the enemy of reliability."_  
> Bắt đầu đơn giản, thêm detail sau — không phải ngược lại.

---

_Design System này được tổng hợp từ phân tích Telegram iOS phiên bản Liquid Glass (January 2026). Cập nhật định kỳ theo các bản release mới của Telegram và React Native ecosystem._
