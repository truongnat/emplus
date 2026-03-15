# Aura — Dating App Brand Design System for React Native

### Triết lý Telegram · Cảm xúc lãng mạn · Production-ready TypeScript

> **Brand:** Aura — Romantic Dating App  
> **Stack:** React Native · Expo · TypeScript · react-native-reanimated  
> **Cốt lõi:** Giữ nguyên kiến trúc token của Telegram, thay toàn bộ màu sắc và nhiệt độ sang warm romantic palette.

---

## Sự khác biệt so với Telegram

|                | Telegram                 | Aura                                            |
| -------------- | ------------------------ | ----------------------------------------------- |
| Accent         | `#2AABEE` Cool blue      | `#E8547A` Warm rose                             |
| BG light       | `#FFFFFF` Pure white     | `#FFFBF9` Warm ivory                            |
| BG page        | `#F2F2F7` Cold gray      | `#FFF3F0` Blush warm                            |
| BG dark        | `#1C1C1E` Cold dark      | `#1C1014` Warm dark (hơi đỏ)                    |
| BG2 dark       | `#2C2C2E` Cold surface   | `#28181E` Warm surface                          |
| Text secondary | `#5C5C6B` Cool muted     | `#6B4751` Warm muted                            |
| Text muted     | `#9898A6` Cold hint      | `#A8808A` Warm hint                             |
| Avatar         | 6 màu random             | 6 warm romantic gradients                       |
| Reactions      | 👍❤️😂😮😢🙏             | ♥😍🔥✨😘🌸💫                                   |
| Tab icons      | 💬👥🔖⚙️                 | ♥✦💬👤                                          |
| Glass bg       | `rgba(255,255,255,0.72)` | `rgba(255,243,240,0.85)` — rose tint            |
| Glass border   | `rgba(255,255,255,0.6)`  | `rgba(232,84,122,0.15)` — rose tint             |
| Special tokens | —                        | `gold`, `superlike`, `heartColor`, `matchColor` |

---

## Mục lục

1. [colors.ts — Brand Tokens](#1-colorsts)
2. [typography.ts](#2-typographyts)
3. [spacing.ts](#3-spacingts)
4. [radius.ts](#4-radiusts)
5. [animation.ts](#5-animationts)
6. [useTheme.ts](#6-usethemets)
7. [GlassView.tsx — Rose-tinted Glass](#7-glassviewtsx)
8. [Button.tsx](#8-buttontsx)
9. [Avatar.tsx](#9-avatartsx)
10. [ChatBubble.tsx](#10-chatbubbletsx)
11. [ChatListCell.tsx](#11-chatlistcelltsx)
12. [MatchCard.tsx](#12-matchcardtsx)
13. [HeartReactions.tsx](#13-heartreactionstsx)
14. [TabBar.tsx](#14-tabbaretsx)
15. [SettingsCell.tsx](#15-settingscelltsx)
16. [Toggle.tsx](#16-toggletsx)
17. [Badge.tsx & Tag.tsx](#17-badgetsx--tagtsx)
18. [Naming & Icon Conventions](#18-naming--icon-conventions)

---

## 1. `colors.ts`

```typescript
// src/design-system/tokens/colors.ts

// ─── PRIMITIVE PALETTE ────────────────────────────────────
const palette = {
  // ── Aura Rose (thay thế Telegram Blue) ──────────────────
  rose50: "rgba(232, 84, 122, 0.10)",
  rose100: "#FFD6E4",
  rose200: "#FF8FAB",
  rose400: "#E8547A", // ← ACCENT CHÍNH
  rose600: "#C73D60",
  rose800: "#8B2040",
  rose900: "#5C0E27",

  // ── Gold — Match / Premium / Super Like ─────────────────
  gold50: "rgba(242, 166, 90, 0.12)",
  gold200: "#FFCF91",
  gold400: "#F2A65A", // ← gold accent
  gold600: "#D4842A",

  // ── Super Like — giữ Telegram blue để tương phản ────────
  skyBlue: "#5AC8FA",

  // ── Backgrounds LIGHT (warm ivory thay cold gray) ───────
  ivoryWhite: "#FFFBF9", // bg — card, elevated
  blushLight: "#FFF3F0", // bg2 — page background
  blushMid: "#FFE8E3", // bg3 — pressed, input

  // ── Backgrounds DARK (warm dark thay cold dark) ─────────
  warmBlack: "#1C1014", // bg dark
  warmSurface: "#28181E", // bg2 dark
  warmPressed: "#351F28", // bg3 dark
  warmDepth: "#42202E", // bg4 dark — divider

  // ── Text LIGHT ──────────────────────────────────────────
  inkWarm: "#1C0F14", // text1 — primary
  dustyRose: "#6B4751", // text2 — secondary
  ashRose: "#A8808A", // text3 — muted, timestamp

  // ── Text DARK ───────────────────────────────────────────
  creamWhite: "#FAF0F2", // text1 dark
  softCream: "#C4969E", // text2 dark
  mutedRose: "#7A5860", // text3 dark

  // ── Semantic (giữ iOS standard) ─────────────────────────
  systemGreen: "#34C759",
  systemOrange: "#FF9500",
  systemRed: "#FF3B30",

  // ── Avatar Gradients — warm romantic 6 màu ──────────────
  gradRose: ["#FF8FAB", "#E8547A"] as [string, string],
  gradSunset: ["#FFB17A", "#F2784B"] as [string, string],
  gradLavender: ["#C8A4F8", "#9B72E8"] as [string, string],
  gradCoral: ["#FF9999", "#E85C5C"] as [string, string],
  gradGold: ["#FFD180", "#F2A046"] as [string, string],
  gradBerry: ["#E891C4", "#C84D9E"] as [string, string],
} as const;

// ─── SEMANTIC COLOR TOKENS ────────────────────────────────
export interface ColorTokens {
  // Accent — CỐT LÕI
  accent: string; // #E8547A — thay #2AABEE
  accentDeep: string; // #C73D60 — hover/pressed
  accentLight: string; // rgba(232,84,122,0.10)
  accentGlow: string; // rgba(232,84,122,0.28) — glow cho like button

  // Special Dating Tokens — KHÔNG CÓ TRONG TELEGRAM
  gold: string; // #F2A65A — match, premium, badge vàng
  goldLight: string; // rgba(242,166,90,0.12) — gold tinted bg
  superlike: string; // #5AC8FA — super like (giữ blue để nổi bật)
  heartColor: string; // = accent — icon ♥

  // Backgrounds
  bg: string; // Card, elevated surface
  bg2: string; // Page background (warm blush)
  bg3: string; // Pressed state, input

  // Text
  text1: string; // Primary
  text2: string; // Secondary (warm muted)
  text3: string; // Muted, timestamp, placeholder

  // Bubbles
  bubbleOut: string; // Outgoing: rose accent
  bubbleOutText: string; // White
  bubbleIn: string; // Incoming: white/dark surface
  bubbleInText: string;

  // Semantic
  success: string; // Online indicator
  warning: string;
  danger: string;

  // Borders
  border: string; // Subtle — hairline
  borderMid: string; // Emphasis
  borderRose: string; // Rose-tinted border — đặc trưng Aura
  divider: string;

  // Glass — rose-tinted thay white
  glassBg: string;
  glassBorder: string;

  // Avatars
  avatarGradients: [string, string][];
}

export const lightColors: ColorTokens = {
  accent: palette.rose400,
  accentDeep: palette.rose600,
  accentLight: palette.rose50,
  accentGlow: "rgba(232, 84, 122, 0.28)",

  gold: palette.gold400,
  goldLight: palette.gold50,
  superlike: palette.skyBlue,
  heartColor: palette.rose400,

  bg: palette.ivoryWhite,
  bg2: palette.blushLight,
  bg3: palette.blushMid,

  text1: palette.inkWarm,
  text2: palette.dustyRose,
  text3: palette.ashRose,

  bubbleOut: palette.rose400,
  bubbleOutText: "#FFFFFF",
  bubbleIn: palette.ivoryWhite,
  bubbleInText: palette.inkWarm,

  success: palette.systemGreen,
  warning: palette.systemOrange,
  danger: palette.systemRed,

  border: "rgba(232, 84, 122, 0.10)", // Rose-tinted subtle
  borderMid: "rgba(232, 84, 122, 0.20)", // Rose-tinted emphasis
  borderRose: "rgba(232, 84, 122, 0.30)", // Stronger rose border
  divider: "rgba(232, 84, 122, 0.07)",

  // ← ĐÂY LÀ ĐIỂM KHÁC BIỆT LỚN NHẤT VỚI TELEGRAM
  // Glass tinted rose thay vì neutral white
  glassBg: "rgba(255, 243, 240, 0.85)",
  glassBorder: "rgba(232, 84, 122, 0.15)",

  avatarGradients: [
    palette.gradRose,
    palette.gradSunset,
    palette.gradLavender,
    palette.gradCoral,
    palette.gradGold,
    palette.gradBerry,
  ],
};

export const darkColors: ColorTokens = {
  accent: palette.rose400, // Rose KHÔNG đổi — giống Telegram blue không đổi
  accentDeep: palette.rose600,
  accentLight: "rgba(232, 84, 122, 0.15)",
  accentGlow: "rgba(232, 84, 122, 0.35)",

  gold: palette.gold400,
  goldLight: "rgba(242, 166, 90, 0.15)",
  superlike: palette.skyBlue,
  heartColor: palette.rose400,

  bg: palette.warmBlack, // #1C1014 — warm dark
  bg2: palette.warmSurface, // #28181E
  bg3: palette.warmPressed, // #351F28

  text1: palette.creamWhite,
  text2: palette.softCream,
  text3: palette.mutedRose,

  bubbleOut: palette.rose400,
  bubbleOutText: "#FFFFFF",
  bubbleIn: palette.warmSurface,
  bubbleInText: palette.creamWhite,

  success: palette.systemGreen,
  warning: palette.systemOrange,
  danger: palette.systemRed,

  border: "rgba(232, 84, 122, 0.12)",
  borderMid: "rgba(232, 84, 122, 0.22)",
  borderRose: "rgba(232, 84, 122, 0.35)",
  divider: "rgba(232, 84, 122, 0.08)",

  glassBg: "rgba(28, 16, 20, 0.82)",
  glassBorder: "rgba(232, 84, 122, 0.18)",

  avatarGradients: lightColors.avatarGradients, // Gradient không đổi
};

// ─── HELPER: gán màu avatar deterministic ────────────────
export function getAvatarGradient(userId: number | string): [string, string] {
  const list = lightColors.avatarGradients;
  const idx =
    typeof userId === "number"
      ? userId % list.length
      : (userId.charCodeAt(0) + userId.charCodeAt(userId.length - 1)) %
        list.length;
  return list[idx];
}

// ─── SPECIAL: màu theo action dating ─────────────────────
export const actionColors = {
  pass: "#F5F5F5", // Nút bỏ qua — neutral
  like: "#E8547A", // Like — rose
  superlike: "#5AC8FA", // Super like — blue (tương phản)
  match: "#F2A65A", // Match highlight — gold
  boost: "#AF52DE", // Boost profile — purple
} as const;
```

---

## 2. `typography.ts`

Giữ nguyên type scale của Telegram, chỉ thay font:

```typescript
// src/design-system/tokens/typography.ts
import { TextStyle, Platform } from "react-native";

// Aura dùng font serif cho display titles — tạo cảm giác lãng mạn
// Body vẫn là system font — đọc mượt trên mobile
export const fontFamily = {
  // Display: Cormorant Garamond hoặc Playfair Display — cài qua expo-font
  // Nếu chưa install → fallback system serif
  display: Platform.select({
    ios: "Georgia", // → Sau install: 'PlayfairDisplay-Regular'
    android: "serif",
  }),
  // Body: system font như Telegram
  sans: Platform.select({
    ios: undefined, // SF Pro
    android: "Roboto",
  }),
  mono: Platform.select({
    ios: "Courier New",
    android: "monospace",
  }),
} as const;

export interface TypographyTokens {
  // Display — dùng serif font (profile name, hero)
  displayXl: TextStyle;
  displayLg: TextStyle;

  // Headings — system sans
  title1: TextStyle;
  title2: TextStyle;
  headline: TextStyle;

  // Body
  bodyLarge: TextStyle;
  body: TextStyle;
  callout: TextStyle;

  // Small
  footnote: TextStyle;
  caption1: TextStyle;
  caption2: TextStyle;
  label: TextStyle;
}

export const typography: TypographyTokens = {
  // Tên profile, app hero — serif tạo cảm giác sang trọng lãng mạn
  displayXl: {
    fontFamily: fontFamily.display,
    fontSize: 42,
    fontWeight: "300",
    letterSpacing: -0.5,
    lineHeight: 52,
  },
  displayLg: {
    fontFamily: fontFamily.display,
    fontSize: 34,
    fontWeight: "400",
    letterSpacing: -0.3,
    lineHeight: 42,
  },

  // Section headers, navigation — sans
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
  headline: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 22,
  },

  // Nội dung chính
  bodyLarge: {
    fontSize: 17,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28,
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

  // Nhỏ
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
    letterSpacing: 0.7,
    lineHeight: 16,
    textTransform: "uppercase",
  },
};
```

---

## 3. `spacing.ts`

Giữ nguyên 100% từ Telegram — chỉ thêm constants cho dating UX:

```typescript
// src/design-system/tokens/spacing.ts
import { Dimensions } from "react-native";

const { width: W, height: H } = Dimensions.get("window");

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const layout = {
  screenWidth: W,
  screenHeight: H,

  // Chat — giữ nguyên Telegram
  chatCellHeight: 72,
  avatarSizeSm: 32,
  avatarSizeMd: 44,
  avatarSizeLg: 52,
  avatarSizeXl: 72,
  avatarSizeXxl: 96,

  // Dating-specific
  matchCardWidth: W * 0.44, // 2 cột trong grid
  matchCardHeight: W * 0.6, // Tỉ lệ 3:4
  swipeCardWidth: W * 0.88, // Card vuốt full width
  swipeCardHeight: H * 0.58, // Chiếm 58% màn hình
  profilePhotoAspect: 4 / 5, // Tỉ lệ ảnh profile

  // Bars
  tabBarHeight: 49,
  navBarHeight: 44,
  inputBarHeight: 52,

  // Interactive
  touchTargetMin: 44,
  buttonHeightSm: 32,
  buttonHeightMd: 44,
  buttonHeightLg: 52,
  buttonHeightXl: 60, // Like/Pass CTA lớn

  // Content
  horizontalPadding: 16,
  bubbleMaxWidth: W * 0.72,
  cardBorderRadius: 20,
} as const;
```

---

## 4. `radius.ts`

```typescript
// src/design-system/tokens/radius.ts
import { Platform, ViewStyle, StyleSheet } from "react-native";

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36, // Dating card corners — mềm hơn Telegram
  full: 999,
} as const;

// Bubble radius — GIỮ NGUYÊN TELEGRAM (đây là DNA)
export const bubbleRadius = {
  out: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  in: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 18,
  },
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

// Shadows — tông ấm thay vì neutral
type ShadowStyle = Pick<
  ViewStyle,
  | "shadowColor"
  | "shadowOffset"
  | "shadowOpacity"
  | "shadowRadius"
  | "elevation"
>;

export const shadows: Record<"sm" | "md" | "lg" | "rose", ShadowStyle> = {
  sm: Platform.select({
    ios: {
      shadowColor: "#E8547A",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  }) as ShadowStyle,

  md: Platform.select({
    ios: {
      shadowColor: "#E8547A",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    android: { elevation: 6 },
  }) as ShadowStyle,

  lg: Platform.select({
    ios: {
      shadowColor: "#E8547A",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 40,
    },
    android: { elevation: 16 },
  }) as ShadowStyle,

  // Shadow đặc trưng Aura — rose glow cho like button, match card
  rose: Platform.select({
    ios: {
      shadowColor: "#E8547A",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
    },
    android: { elevation: 10 },
  }) as ShadowStyle,
};

export const shadowsDark: typeof shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: "#E8547A",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: { elevation: 3 },
  }) as ShadowStyle,
  md: Platform.select({
    ios: {
      shadowColor: "#E8547A",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
  }) as ShadowStyle,
  lg: Platform.select({
    ios: {
      shadowColor: "#E8547A",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.45,
      shadowRadius: 40,
    },
    android: { elevation: 20 },
  }) as ShadowStyle,
  rose: Platform.select({
    ios: {
      shadowColor: "#E8547A",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.55,
      shadowRadius: 24,
    },
    android: { elevation: 14 },
  }) as ShadowStyle,
};
```

---

## 5. `animation.ts`

```typescript
// src/design-system/tokens/animation.ts
import {
  WithSpringConfig,
  WithTimingConfig,
  Easing,
} from "react-native-reanimated";

export const springs: Record<string, WithSpringConfig> = {
  // Giữ nguyên Telegram springs
  button: { damping: 15, stiffness: 400, mass: 0.8 },
  modal: { damping: 20, stiffness: 250, mass: 1 },
  bubble: { damping: 14, stiffness: 280, mass: 0.9 },
  toggle: { damping: 15, stiffness: 300, mass: 0.8 },
  contextMenu: { damping: 12, stiffness: 350, mass: 0.7 },

  // Dating-specific springs
  // Like/Pass card swipe — đàn hồi thoải mái
  swipeReturn: { damping: 18, stiffness: 200, mass: 1.2 },
  // Match popup xuất hiện — bouncy hơn để gây surprise
  matchPop: { damping: 10, stiffness: 280, mass: 0.8 },
  // Heart tap animation
  heartBeat: { damping: 8, stiffness: 350, mass: 0.6 },
  // Profile scroll header
  headerCollapse: { damping: 20, stiffness: 300, mass: 1 },
};

export const timings: Record<string, WithTimingConfig> = {
  fast: { duration: 120, easing: Easing.out(Easing.quad) },
  normal: { duration: 200, easing: Easing.bezier(0.4, 0, 0.2, 1) },
  slow: { duration: 350, easing: Easing.bezier(0.4, 0, 0.2, 1) },
  fade: { duration: 150, easing: Easing.out(Easing.ease) },
  // Heart pulse — easing đặc biệt cho like animation
  heartPulse: { duration: 300, easing: Easing.bezier(0.34, 1.4, 0.64, 1) },
};
```

---

## 6. `useTheme.ts`

```typescript
// src/design-system/hooks/useTheme.ts
import { useColorScheme } from "react-native";
import { lightColors, darkColors, ColorTokens } from "../tokens/colors";
import { typography, TypographyTokens } from "../tokens/typography";
import { spacing, layout } from "../tokens/spacing";
import { radius, shadows, shadowsDark } from "../tokens/radius";
import { springs, timings } from "../tokens/animation";

export interface Theme {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: typeof spacing;
  layout: typeof layout;
  radius: typeof radius;
  shadows: typeof shadows;
  springs: typeof springs;
  timings: typeof timings;
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
    springs,
    timings,
    isDark,
  };
}
```

---

## 7. `GlassView.tsx` — Rose-tinted Glass

Điểm khác biệt lớn nhất so với Telegram: glass có **rose tint** thay vì neutral.

```typescript
// src/design-system/components/GlassView.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../hooks/useTheme';

interface GlassViewProps {
  children:    React.ReactNode;
  style?:      StyleProp<ViewStyle>;
  intensity?:  number;
  tint?:       'light' | 'dark' | 'default';
  borderTop?:  boolean;
  borderBottom?: boolean;
}

export function GlassView({
  children, style, intensity = 65,
  tint, borderTop = false, borderBottom = false,
}: GlassViewProps) {
  const { colors, isDark } = useTheme();
  const resolvedTint = tint ?? (isDark ? 'dark' : 'light');

  const borderStyles: ViewStyle = {
    ...(borderTop    && { borderTopWidth: StyleSheet.hairlineWidth,    borderTopColor: colors.glassBorder }),
    ...(borderBottom && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.glassBorder }),
  };

  if (Platform.OS === 'android') {
    return (
      <View
        style={[
          { backgroundColor: isDark ? 'rgba(28,16,20,0.95)' : 'rgba(255,243,240,0.95)' },
          borderStyles,
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
      style={[styles.blur, borderStyles, style]}
    >
      {/* Rose tint overlay — đây là điểm khác biệt với Telegram */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: isDark
              ? 'rgba(232, 84, 122, 0.05)'   // Dark: rose tint nhẹ
              : 'rgba(255, 220, 215, 0.15)'   // Light: blush overlay
          },
        ]}
        pointerEvents="none"
      />
      {children}
    </BlurView>
  );
}

// ── Presets ───────────────────────────────────────────────

export function GlassTabBar({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <GlassView intensity={80} borderTop style={[{ position: 'absolute', bottom: 0, left: 0, right: 0 }, style]}>
      {children}
    </GlassView>
  );
}

export function GlassNavBar({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <GlassView intensity={70} borderBottom style={[{ height: 44 }, style]}>
      {children}
    </GlassView>
  );
}

export function GlassChatInputBar({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <GlassView intensity={75} borderTop style={style}>
      {children}
    </GlassView>
  );
}

const styles = StyleSheet.create({ blur: { overflow: 'hidden' } });
```

---

## 8. `Button.tsx`

```typescript
// src/design-system/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'warm' | 'danger' | 'gold' | 'superlike';
type ButtonSize    = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  children:   React.ReactNode;
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  onPress?:   () => void;
  disabled?:  boolean;
  loading?:   boolean;
  icon?:      React.ReactNode;
  fullWidth?: boolean;
  style?:     StyleProp<ViewStyle>;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  children, variant = 'primary', size = 'md',
  onPress, disabled, loading, icon, fullWidth, style,
}: ButtonProps) {
  const { colors, radius } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const onPressIn  = () => { scale.value = withSpring(0.96, { damping: 15, stiffness: 400 }); };
  const onPressOut = () => { scale.value = withSpring(1,    { damping: 12, stiffness: 300 }); };

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary:   { backgroundColor: disabled ? colors.text3 : colors.accent },
    outline:   { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.accent },
    ghost:     { backgroundColor: 'transparent' },
    warm:      { backgroundColor: colors.accentLight, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.borderRose },
    danger:    { backgroundColor: disabled ? colors.text3 : colors.danger },
    gold:      { backgroundColor: disabled ? colors.text3 : colors.gold },
    superlike: { backgroundColor: colors.superlike },
  };

  const variantTextStyles: Record<ButtonVariant, TextStyle> = {
    primary:   { color: '#FFFFFF' },
    outline:   { color: colors.accent },
    ghost:     { color: colors.accent },
    warm:      { color: colors.accentDeep },
    danger:    { color: '#FFFFFF' },
    gold:      { color: '#FFFFFF' },
    superlike: { color: '#FFFFFF' },
  };

  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { height: 32, paddingHorizontal: 14, borderRadius: radius.full },
    md: { height: 44, paddingHorizontal: 20, borderRadius: radius.full },
    lg: { height: 52, paddingHorizontal: 28, borderRadius: radius.full },
    xl: { height: 60, paddingHorizontal: 36, borderRadius: radius.full },  // Dating CTA
  };

  const sizeTextStyles: Record<ButtonSize, TextStyle> = {
    sm: { fontSize: 13, fontWeight: '500' },
    md: { fontSize: 15, fontWeight: '500' },
    lg: { fontSize: 17, fontWeight: '600' },
    xl: { fontSize: 18, fontWeight: '600' },
  };

  return (
    <AnimatedTouchable
      onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}
      disabled={disabled || loading} activeOpacity={1}
      style={[styles.base, variantStyles[variant], sizeStyles[size], fullWidth && styles.fullWidth, animStyle, style]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' || variant === 'warm' ? colors.accent : '#FFF'} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={{ marginRight: 6 }}>{icon}</View>}
          <Text style={[styles.text, variantTextStyles[variant], sizeTextStyles[size]]}>
            {children}
          </Text>
        </View>
      )}
    </AnimatedTouchable>
  );
}

// ── Like / Pass Action Buttons (đặc trưng dating app) ─────
interface ActionButtonProps {
  type:     'pass' | 'like' | 'superlike';
  onPress?: () => void;
  size?:    number;
}

export function ActionButton({ type, onPress, size = 64 }: ActionButtonProps) {
  const { colors, shadows } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const onPressIn  = () => { scale.value = withSpring(0.90, { damping: 12, stiffness: 400 }); };
  const onPressOut = () => { scale.value = withSpring(1,    { damping: 10, stiffness: 280 }); };

  const config = {
    pass:      { bg: '#FFF3F5', icon: '✕', color: colors.accentDeep },
    like:      { bg: colors.accent, icon: '♥', color: '#FFFFFF' },
    superlike: { bg: colors.superlike, icon: '✦', color: '#FFFFFF' },
  };

  const c = config[type];

  return (
    <AnimatedTouchable
      onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}
      activeOpacity={1}
      style={[
        { width: size, height: size, borderRadius: size / 2,
          backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center',
          ...( type === 'like' ? shadows.rose : shadows.sm ),
        },
        animStyle,
      ]}
    >
      <Text style={{ fontSize: size * 0.4, color: c.color }}>
        {c.icon}
      </Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  base:     { alignItems: 'center', justifyContent: 'center' },
  content:  { flexDirection: 'row', alignItems: 'center' },
  text:     { letterSpacing: 0 },
  fullWidth: { alignSelf: 'stretch' },
});
```

---

## 9. `Avatar.tsx`

```typescript
// src/design-system/components/Avatar.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { getAvatarGradient } from '../tokens/colors';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface AvatarProps {
  name?:    string;
  uri?:     string;
  userId?:  number | string;
  size?:    AvatarSize;
  online?:  boolean;
  verified?: boolean;    // Dating: badge xác thực
  premium?:  boolean;    // Dating: badge vàng premium
}

const sizeDim  = { sm: 32, md: 44, lg: 52, xl: 72, xxl: 96 };
const sizeFont = { sm: 13, md: 17, lg: 20, xl: 28, xxl: 36 };

function getInitials(name: string): string {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export function Avatar({ name = '', uri, userId, size = 'md', online, verified, premium }: AvatarProps) {
  const { colors } = useTheme();
  const dim        = sizeDim[size];
  const fontSize   = sizeFont[size];
  const [colorA, colorB] = getAvatarGradient(userId ?? name);

  return (
    <View style={{ width: dim, height: dim }}>
      {uri ? (
        <Image source={{ uri }} style={{ width: dim, height: dim, borderRadius: dim / 2 }} />
      ) : (
        <LinearGradient
          colors={[colorA, colorB]}
          start={{ x: 0.15, y: 0.15 }}
          end={{ x: 0.85, y: 0.85 }}
          style={{ width: dim, height: dim, borderRadius: dim / 2, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: 'white', fontSize, fontWeight: '600' }}>
            {getInitials(name) || '?'}
          </Text>
        </LinearGradient>
      )}

      {/* Online indicator */}
      {online && (
        <View style={{
          position: 'absolute', bottom: 1, right: 1,
          width: dim * 0.22, height: dim * 0.22,
          borderRadius: dim * 0.11,
          backgroundColor: colors.success,
          borderWidth: Math.max(2, dim * 0.04),
          borderColor: colors.bg,
        }} />
      )}

      {/* Premium badge — vàng, góc trên phải */}
      {premium && (
        <View style={{
          position: 'absolute', top: -2, right: -2,
          width: 16, height: 16, borderRadius: 8,
          backgroundColor: colors.gold,
          alignItems: 'center', justifyContent: 'center',
          borderWidth: 1.5, borderColor: colors.bg,
        }}>
          <Text style={{ fontSize: 8, color: 'white' }}>✦</Text>
        </View>
      )}

      {/* Verified badge — rose, góc dưới phải */}
      {verified && !online && (
        <View style={{
          position: 'absolute', bottom: 0, right: 0,
          width: dim * 0.3, height: dim * 0.3,
          borderRadius: dim * 0.15,
          backgroundColor: colors.accent,
          alignItems: 'center', justifyContent: 'center',
          borderWidth: 1.5, borderColor: colors.bg,
        }}>
          <Text style={{ fontSize: dim * 0.14, color: 'white' }}>✓</Text>
        </View>
      )}
    </View>
  );
}
```

---

## 10. `ChatBubble.tsx`

```typescript
// src/design-system/components/ChatBubble.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { bubbleRadius } from '../tokens/radius';

type BubbleType = 'in' | 'out';

interface ChatBubbleProps {
  text:       string;
  type:       BubbleType;
  timestamp:  string;
  isRead?:    boolean;
  isGrouped?: boolean;
  senderName?: string;
  // Dating-specific
  isMatch?:   boolean;   // Tin nhắn đầu tiên sau match — highlight đặc biệt
}

export function ChatBubble({
  text, type, timestamp, isRead, isGrouped, senderName, isMatch,
}: ChatBubbleProps) {
  const { colors, typography } = useTheme();
  const isOut = type === 'out';

  const scale      = useSharedValue(0.88);
  const opacity    = useSharedValue(0);
  const translateY = useSharedValue(6);

  useEffect(() => {
    opacity.value    = withTiming(1, { duration: 180 });
    scale.value      = withSpring(1, { damping: 14, stiffness: 280 });
    translateY.value = withSpring(0, { damping: 14, stiffness: 280 });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const radii = isGrouped
    ? (isOut ? bubbleRadius.outGrouped : bubbleRadius.inGrouped)
    : (isOut ? bubbleRadius.out        : bubbleRadius.in);

  // Tin nhắn đầu tiên sau match — border vàng đặc biệt
  const matchBorderStyle = isMatch ? {
    borderWidth: 1.5,
    borderColor: colors.gold,
  } : {};

  return (
    <View style={[styles.row, isOut ? styles.rowOut : styles.rowIn]}>
      <Animated.View style={animStyle}>
        <View style={[
          styles.bubble, radii,
          {
            backgroundColor: isOut ? colors.bubbleOut : colors.bubbleIn,
            borderWidth:     isOut ? 0 : StyleSheet.hairlineWidth,
            borderColor:     isOut ? undefined : colors.borderRose,
            ...matchBorderStyle,
          },
        ]}>
          {senderName && !isOut && (
            <Text style={[typography.caption1, { color: colors.accent, fontWeight: '600', marginBottom: 2 }]}>
              {senderName}
            </Text>
          )}

          {/* Match first message label */}
          {isMatch && (
            <Text style={{ fontSize: 10, color: colors.gold, fontWeight: '600', marginBottom: 4 }}>
              ✦ Tin nhắn đầu tiên
            </Text>
          )}

          <Text style={[typography.body, { color: isOut ? colors.bubbleOutText : colors.bubbleInText }]}>
            {text}
          </Text>

          {isOut && (
            <View style={styles.meta}>
              <Text style={[typography.caption2, { color: 'rgba(255,255,255,0.7)' }]}>{timestamp}</Text>
              <Text style={{ fontSize: 11, color: isRead ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)' }}>
                {isRead ? '✓✓' : '✓'}
              </Text>
            </View>
          )}
        </View>

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
  row:    { marginVertical: 2, paddingHorizontal: 14 },
  rowIn:  { alignItems: 'flex-start' },
  rowOut: { alignItems: 'flex-end' },
  bubble: { paddingHorizontal: 13, paddingVertical: 9, maxWidth: '72%' },
  meta:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 3, marginTop: 3 },
});
```

---

## 11. `ChatListCell.tsx`

Giống Telegram — chỉ thêm match indicator:

```typescript
// src/design-system/components/ChatListCell.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Avatar } from './Avatar';

interface ChatListCellProps {
  name:       string;
  preview:    string;
  timestamp:  string;
  userId?:    number;
  avatarUri?: string;
  unread?:    number;
  online?:    boolean;
  isMatch?:   boolean;   // ← Dating: có phải match mới?
  isNew?:     boolean;   // ← Dating: match chưa nhắn tin
  verified?:  boolean;
  premium?:   boolean;
  onPress?:   () => void;
}

export function ChatListCell({
  name, preview, timestamp, userId, avatarUri,
  unread = 0, online, isMatch, isNew, verified, premium, onPress,
}: ChatListCellProps) {
  const { colors, typography, layout } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress} activeOpacity={0.7}
      style={[styles.cell, { height: layout.chatCellHeight, paddingHorizontal: layout.horizontalPadding, backgroundColor: colors.bg }]}
    >
      <Avatar name={name} uri={avatarUri} userId={userId} size="md" online={online} verified={verified} premium={premium} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.nameRow}>
            {isMatch && <Text style={{ fontSize: 13, marginRight: 4 }}>♥</Text>}
            <Text style={[typography.subhead, { color: colors.text1, fontWeight: '600' }]} numberOfLines={1}>
              {name}
            </Text>
          </View>
          <Text style={[typography.caption1, { color: isMatch ? colors.accent : colors.text3 }]}>
            {timestamp}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          {isNew ? (
            // Match mới chưa nhắn — hiện text đặc biệt thay preview
            <Text style={[typography.callout, { color: colors.accent, fontStyle: 'italic' }]} numberOfLines={1}>
              Bạn vừa match nhau! Nhắn tin đi nào ♥
            </Text>
          ) : (
            <Text style={[typography.callout, { color: colors.text2, flex: 1 }]} numberOfLines={1}>
              {preview}
            </Text>
          )}
          {unread > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.accent }]}>
              <Text style={styles.badgeText}>{unread > 99 ? '99+' : unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function ChatListSeparator() {
  const { colors } = useTheme();
  return (
    <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.divider, marginLeft: 16 + 44 + 12 }} />
  );
}

const styles = StyleSheet.create({
  cell:      { flexDirection: 'row', alignItems: 'center', gap: 12 },
  content:   { flex: 1, gap: 2 },
  topRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 },
  nameRow:   { flexDirection: 'row', alignItems: 'center', flex: 1, overflow: 'hidden' },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  badge:     { minWidth: 18, height: 18, borderRadius: 9, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: 'white', fontSize: 11, fontWeight: '700' },
});
```

---

## 12. `MatchCard.tsx`

Component đặc trưng dating app — KHÔNG có trong Telegram:

```typescript
// src/design-system/components/MatchCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withTiming,
  interpolate, runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';
import { ActionButton } from './Button';

interface MatchCardProps {
  name:        string;
  age:         number;
  location?:   string;
  distance?:   string;
  photoUri:    string;
  bio?:        string;
  tags?:       string[];
  onLike?:     () => void;
  onPass?:     () => void;
  onSuperLike?: () => void;
}

export function SwipeMatchCard({
  name, age, location, distance, photoUri, bio, tags,
  onLike, onPass, onSuperLike,
}: MatchCardProps) {
  const { colors, typography, layout, radius, shadows } = useTheme();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation   = useSharedValue(0);

  const cardWidth  = layout.swipeCardWidth;
  const cardHeight = layout.swipeCardHeight;
  const SWIPE_THRESHOLD = cardWidth * 0.35;

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  // Like / Pass overlay opacity
  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], 'clamp'),
  }));
  const passOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], 'clamp'),
  }));

  const resetCard = () => {
    translateX.value = withSpring(0, { damping: 18, stiffness: 200 });
    translateY.value = withSpring(0, { damping: 18, stiffness: 200 });
    rotation.value   = withSpring(0, { damping: 18, stiffness: 200 });
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.3;
      rotation.value   = (e.translationX / cardWidth) * 15;
    })
    .onEnd(e => {
      if (e.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(cardWidth * 1.5, { duration: 250 });
        if (onLike) runOnJS(onLike)();
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-cardWidth * 1.5, { duration: 250 });
        if (onPass) runOnJS(onPass)();
      } else {
        runOnJS(resetCard)();
      }
    });

  return (
    <View style={{ alignItems: 'center' }}>
      <GestureDetector gesture={swipeGesture}>
        <Animated.View
          style={[
            {
              width: cardWidth, height: cardHeight,
              borderRadius: radius.xxl,
              overflow: 'hidden',
              ...shadows.lg,
            },
            animStyle,
          ]}
        >
          {/* Photo */}
          <Image source={{ uri: photoUri }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />

          {/* Like overlay */}
          <Animated.View
            style={[
              styles.overlay,
              { borderColor: colors.accent, borderWidth: 4 },
              likeOpacity,
            ]}
          >
            <Text style={[styles.overlayText, { color: colors.accent }]}>♥ LIKE</Text>
          </Animated.View>

          {/* Pass overlay */}
          <Animated.View
            style={[
              styles.overlay,
              { borderColor: colors.danger, borderWidth: 4 },
              passOpacity,
            ]}
          >
            <Text style={[styles.overlayText, { color: colors.danger }]}>✕ PASS</Text>
          </Animated.View>

          {/* Bottom info */}
          <View style={[styles.cardBottom, { backgroundColor: 'rgba(28,16,20,0.55)' }]}>
            <Text style={[typography.title2, { color: 'white', fontWeight: '700' }]}>
              {name}, {age}
            </Text>
            {location && (
              <Text style={[typography.callout, { color: 'rgba(255,255,255,0.8)', marginTop: 2 }]}>
                📍 {location} {distance && `· ${distance}`}
              </Text>
            )}
            {bio && (
              <Text style={[typography.footnote, { color: 'rgba(255,255,255,0.7)', marginTop: 6 }]} numberOfLines={2}>
                {bio}
              </Text>
            )}
            {tags && tags.length > 0 && (
              <View style={styles.tags}>
                {tags.slice(0, 3).map(tag => (
                  <View key={tag} style={[styles.tag, { backgroundColor: 'rgba(232,84,122,0.35)', borderColor: 'rgba(232,84,122,0.5)', borderWidth: 1 }]}>
                    <Text style={{ color: 'white', fontSize: 11, fontWeight: '500' }}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Action buttons */}
      <View style={styles.actions}>
        <ActionButton type="pass"      size={56} onPress={onPass}      />
        <ActionButton type="superlike" size={48} onPress={onSuperLike} />
        <ActionButton type="like"      size={64} onPress={onLike}      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 36,
  },
  overlayText: {
    fontSize: 32, fontWeight: '800',
    letterSpacing: 2,
    transform: [{ rotate: '-15deg' }],
  },
  cardBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 24,
  },
  tags: {
    flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100,
  },
  actions: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 20, marginTop: 20,
  },
});
```

---

## 13. `HeartReactions.tsx`

```typescript
// src/design-system/components/HeartReactions.tsx
// Telegram dùng: 👍❤️😂😮😢🙏
// Aura thay bằng: ♥ 😍 🔥 ✨ 😘 🌸 💫

const HEART_REACTIONS = ['♥', '😍', '🔥', '✨', '😘', '🌸', '💫'] as const;

export function HeartReactionBar({ onReact }: { onReact: (emoji: string) => void }) {
  const { colors, radius, shadows } = useTheme();
  const scales = HEART_REACTIONS.map(() => useSharedValue(1));

  return (
    <View style={[
      styles.bar,
      { backgroundColor: colors.glassBg, borderRadius: radius.lg,
        borderWidth: StyleSheet.hairlineWidth, borderColor: colors.borderRose,
        ...shadows.md,
      },
    ]}>
      {HEART_REACTIONS.map((emoji, i) => {
        const animStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scales[i].value }],
        }));

        return (
          <TouchableOpacity
            key={emoji}
            onPress={() => {
              scales[i].value = withSpring(1.4, { damping: 8, stiffness: 350 }, () => {
                scales[i].value = withSpring(1, { damping: 12, stiffness: 300 });
              });
              onReact(emoji);
            }}
            activeOpacity={0.7}
          >
            <Animated.Text style={[{ fontSize: 26 }, animStyle]}>
              {emoji}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row', gap: 2,
    paddingHorizontal: 10, paddingVertical: 8,
  },
});
```

---

## 14. `TabBar.tsx`

```typescript
// Tab labels và icons — dating-specific
const TAB_CONFIG: Record<string, { icon: string; label: string }> = {
  Discover: { icon: "♥", label: "Khám phá" },
  Matches: { icon: "✦", label: "Matches" },
  Messages: { icon: "💬", label: "Tin nhắn" },
  Profile: { icon: "👤", label: "Hồ sơ" },
};

// Implementation: giữ nguyên logic GlassTabBar từ Telegram
// Chỉ thay icons, active color dùng colors.accent (rose thay blue)
// Glass tint dùng GlassView mới — rose tinted thay white tinted
```

---

## 15. `SettingsCell.tsx`

```typescript
// Icon color map cho dating app settings
const iconBgColors = {
  rose: "rgba(232, 84, 122, 0.15)", // Notifications, Match settings
  gold: "rgba(242, 166, 90, 0.15)", // Premium
  blue: "rgba(90, 200, 250, 0.15)", // Privacy, Security
  purple: "rgba(175, 82, 222, 0.15)", // Appearance
  green: "rgba(52, 199, 89, 0.15)", // Active status
  berry: "rgba(200, 77, 158, 0.15)", // Preferences
};

// Implementation: tương tự SettingsCell Telegram
// Thay border color sang borderRose token
// Divider dùng colors.divider (rose-tinted)
```

---

## 16. `Toggle.tsx`

Giữ nguyên 100% từ Telegram. Chỉ thay màu active:

```typescript
// Telegram: track ON = #34C759 (green)
// Aura:     track ON = colors.accent (#E8547A rose)
//           → Toggle rose khi bật thông báo match, show online status, etc.

// Trường hợp ngoại lệ: toggle "Online status" dùng green để rõ nghĩa hơn
const trackOnColor =
  settingType === "onlineStatus"
    ? colors.success // Green — rõ ràng hơn cho online
    : colors.accent; // Rose — tất cả toggle khác
```

---

## 17. `Badge.tsx` & `Tag.tsx`

```typescript
// src/design-system/components/Badge.tsx

// Aura Badge variants
type BadgeVariant =
  | "rose"
  | "gold"
  | "superlike"
  | "muted"
  | "success"
  | "outline";

const badgeBgColors: Record<BadgeVariant, string> = {
  rose: colors.accent, // Unread messages
  gold: colors.gold, // Premium, match highlight
  superlike: colors.superlike, // Super like count
  muted: colors.text3, // Muted chat
  success: colors.success, // Online
  outline: "transparent", // Verified
};

// Tag variants — giữ pill shape
type TagVariant = "rose" | "gold" | "lavender" | "coral" | "muted";

// Dating tags: #Cà phê ☕  #Du lịch ✈️  #Âm nhạc 🎵  etc.
```

---

## 18. Naming & Icon Conventions

### Icon Map — thay thế Telegram icons

| Context        | Telegram     | Aura             |
| -------------- | ------------ | ---------------- |
| Primary action | ➤ send       | ♥ like           |
| Tab 1          | 💬 Chats     | ♥ Discover       |
| Tab 2          | 👥 Contacts  | ✦ Matches        |
| Tab 3          | 🔖 Saved     | 💬 Messages      |
| Tab 4          | ⚙️ Settings  | 👤 Profile       |
| Reactions      | 👍❤️😂😮😢🙏 | ♥😍🔥✨😘🌸💫    |
| Online         | ● green      | ● green (giữ)    |
| Read receipt   | ✓✓ gray/blue | ✓✓ gray/rose     |
| Premium        | —            | ✦ gold           |
| Verified       | —            | ✓ rose           |
| Match          | —            | ♥ rose highlight |
| Super like     | —            | ✦ blue           |
| Boost          | —            | 🚀 purple        |

### Naming Convention

```typescript
// Giữ nguyên naming pattern Telegram — chỉ thêm dating vocab

// Colors
colors.accent        // Rose (= Telegram blue)
colors.gold          // Match/premium (không có trong Telegram)
colors.superlike     // Super like — xanh blue tương phản

// Components
<Avatar verified premium />   // Props mới cho dating
<ChatBubble isMatch />         // First message after match
<ChatListCell isMatch isNew /> // Match state
<MatchCard />                  // Component mới hoàn toàn
<ActionButton type="like" />   // Like/Pass/Superlike
<HeartReactionBar />           // Thay thế reaction bar Telegram

// Shadows
shadows.rose   // Rose glow — cho like button, match card
shadows.sm/md/lg // Giữ nguyên từ Telegram
```

---

## Tổng kết — So sánh Telegram vs Aura

```
GIỮ NGUYÊN (100% Telegram DNA):
✓ Kiến trúc token (ColorTokens interface)
✓ useTheme() hook pattern
✓ Typography scale (size, weight, line-height)
✓ Spacing grid 4px/8px
✓ Chat bubble radius (18-18-4-18 / 18-18-18-4)
✓ Chat list cell 72px height
✓ Liquid Glass (BlurView + overlay)
✓ Spring animation configs
✓ Settings grouped style
✓ Bottom sheet modal
✓ Context menu + reactions bar

THAY ĐỔI (Aura romantic palette):
→ Accent: #2AABEE → #E8547A (blue → rose)
→ BG light: #FFFFFF → #FFFBF9 (cold → warm ivory)
→ BG page: #F2F2F7 → #FFF3F0 (cold gray → warm blush)
→ BG dark: #1C1C1E → #1C1014 (cold → warm dark)
→ Glass bg: white rgba → rose-tinted rgba
→ Borders: neutral rgba → rose-tinted rgba
→ Shadows: neutral → rose-colored (shadowColor: '#E8547A')
→ Avatar: 6 cool tones → 6 warm romantic gradients
→ Font: thêm display serif cho name/hero

THÊM MỚI (Dating-specific):
+ colors.gold — match, premium
+ colors.superlike — super like action
+ colors.goldLight, accentGlow
+ shadows.rose — rose glow cho CTA
+ MatchCard component với swipe gesture
+ ActionButton (pass/like/superlike)
+ HeartReactionBar
+ Avatar props: verified, premium
+ ChatBubble prop: isMatch
+ ChatListCell props: isMatch, isNew
```

---

_Brand Design System · Aura Dating App · Telegram iOS DNA · Warm Romantic Palette_  
_React Native · TypeScript · Expo · react-native-reanimated_
