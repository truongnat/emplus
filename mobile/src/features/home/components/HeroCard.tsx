import React, { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { NumberTicker, ClockTicker } from "./HomeClock";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { heroCardGradient, gradientLocations } from "@/src/theme/gradients";
import { homeDarkGridCard } from "@/src/theme/emplus-design-tokens";
import { typographyRoles } from "@/src/theme/typography-roles";
import { AppText } from "@/src/ui-kit";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";

export interface HeroCardProps {
  loveDays: number;
}

export const HeroCard = React.memo(function HeroCard({
  loveDays,
}: HeroCardProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withSequence(
      withSpring(1.02, { damping: 16, stiffness: 240 }),
      withSpring(1, { damping: 16, stiffness: 220 }),
    );
  }, [loveDays, pulse]);

  const tickerPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const gradientColors = isDark ? heroCardGradient.dark : heroCardGradient.light;
  const counterLocations = isDark
    ? gradientLocations.heroCounterDark
    : gradientLocations.heroCounter;
  const digitColor = isDark ? colors.brand.strong : colors.brand.default;
  const shadowColor = isDark ? "#0A0809" : colors.brand.default;
  const shadowOpacity = isDark ? 0.2 : 0.15;
  const outerRing = isDark
    ? homeDarkGridCard.borderColor
    : "rgba(123, 97, 255, 0.18)";

  return (
    <View style={[styles.container, { shadowColor, shadowOpacity }]}>
      <View style={[styles.content, { borderColor: outerRing }]}>
        <LinearGradient
          pointerEvents="none"
          colors={[...gradientColors]}
          locations={[...counterLocations]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />

        <View style={styles.titleBlock}>
          <AppText
            accessibilityRole="text"
            accessibilityLabel={`Chúng ta đã bắt đầu, ${loveDays} ngày`}
            style={[
              styles.eyebrow,
              {
                color: colors.text.secondary,
                fontFamily: typographyRoles.bodyMedium.fontFamily,
              },
            ]}
          >
            Chúng ta đã bắt đầu
          </AppText>
        </View>

        <Animated.View
          style={[styles.counterBlock, tickerPulseStyle]}
          pointerEvents="none"
        >
          <View style={styles.counterColumn} pointerEvents="none">
            <NumberTicker value={loveDays} digitColor={digitColor} />
            <AppText
              style={[
                styles.unitBelow,
                {
                  color: colors.text.secondary,
                  fontFamily: typographyRoles.titleSm.fontFamily,
                },
              ]}
            >
              ngày
            </AppText>
            <View
              pointerEvents="none"
              accessibilityElementsHidden
              importantForAccessibility="no"
              style={isDark ? styles.lottieDimDark : undefined}
            >
              <EmplusLottie
                source={lottieInventory.homeCounterBirdPairSky}
                style={styles.counterLottie}
                loop
                autoPlay
                speed={0.9}
                containerStyle={styles.lottiePassthrough}
              />
            </View>
          </View>
        </Animated.View>

        <View
          pointerEvents="none"
          style={[
            styles.timeDividerWrap,
            Platform.OS === "ios"
              ? {
                  shadowColor: isDark ? "#000" : colors.brand.default,
                  shadowOpacity: isDark ? 0.25 : 0.45,
                }
              : null,
          ]}
        >
          <View
            style={[
              styles.timeDividerLine,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.14)"
                  : colors.brand.muted,
              },
            ]}
          />
        </View>

        <View style={styles.timeRow} pointerEvents="none">
          <Ionicons
            name="time-outline"
            size={18}
            color={colors.text.secondary}
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
          <ClockTicker tone="onHero" />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderRadius: 36,
    backgroundColor: "transparent",
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 8,
  },
  content: {
    position: "relative",
    minHeight: 328,
    borderRadius: 36,
    paddingVertical: 22,
    paddingHorizontal: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleBlock: {
    width: "100%",
    paddingHorizontal: 8,
    zIndex: 10,
    alignItems: "center",
    marginBottom: 4,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
    textAlign: "center",
    lineHeight: 20,
  },
  counterBlock: {
    alignItems: "center",
    zIndex: 10,
    width: "100%",
    maxWidth: 360,
  },
  /** Số → “ngày” → Lottie, căn giữa theo chiều dọc */
  counterColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 2,
  },
  unitBelow: {
    marginTop: 2,
    marginBottom: 4,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.35,
    textAlign: "center",
  },
  /** Khung gốc 350×300 — hiển thị dưới “ngày” */
  counterLottie: {
    width: 140,
    height: 120,
  },
  /** Lottie native view ăn pan — không nhận touch để ScrollView vuốt được */
  lottiePassthrough: {
    pointerEvents: "none",
  },
  lottieDimDark: {
    opacity: 0.88,
  },
  timeDividerWrap: {
    width: "78%",
    maxWidth: 280,
    height: 3,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 2,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.45,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  timeDividerLine: {
    width: "100%",
    height: StyleSheet.hairlineWidth * 2,
    borderRadius: 1,
    opacity: 0.85,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    zIndex: 10,
    paddingVertical: 6,
  },
});
