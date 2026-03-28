import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { PulseStar } from "./HomeDecorations";
import { NumberTicker, ClockTicker } from "./HomeClock";
import { palette, useThemeColors } from "@/src/theme";
import { AppText } from "@/src/ui-kit";

interface HeroCardProps {
  loveDays: number;
  startDateLabel: string;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderRadius: 36,
    backgroundColor: "#E48B9B", // Matched pink color from screenshot
    shadowColor: "#F43F5E", // Using rose500 hex directly
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  content: {
    position: "relative",
    minHeight: 360,
    borderRadius: 36,
    padding: 32,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    zIndex: 10,
  },
  topLabel: {
    fontSize: 14,
    fontWeight: "900",
    color: "#F43F5E", // Darker rose for contrast
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  tickerContainer: {
    position: "relative",
    marginBottom: 20,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    marginBottom: 16,
    zIndex: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // White glass effect
    borderRadius: 9999,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1C1917", // Taupe 900
    zIndex: 10,
    marginBottom: 24,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9999,
    zIndex: 10,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1917", // Taupe 900
  },
  starLeft: {
    position: "absolute",
    left: -40,
    bottom: 10,
    zIndex: 10,
  },
  starRight1: {
    position: "absolute",
    right: -40,
    top: -10,
    zIndex: 10,
  },
  starRight2: {
    position: "absolute",
    right: -20,
    top: 20,
    zIndex: 10,
  },
});

export const HeroCard = React.memo(function HeroCard({
  loveDays,
  startDateLabel,
}: HeroCardProps) {
  const { brand } = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LinearGradient
          colors={["#ECA1AE", "#DF7A8B"]} // Soft pink gradient matching screenshot
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />

        <View style={styles.topLabelContainer}>
          <AppText style={styles.topLabel}>✨ NGÀY TRỌNG ĐẠI</AppText>
        </View>

        <View style={styles.tickerContainer}>
          {/* Decorative Stars */}
          <View style={styles.starLeft}>
            <Ionicons name="star" size={24} color="rgba(255, 255, 255, 0.8)" />
          </View>
          <View style={styles.starRight1}>
            <Ionicons name="sparkles" size={32} color="#FDE047" />
          </View>
          <View style={styles.starRight2}>
            <Ionicons name="sparkles" size={20} color="#FDE047" />
          </View>

          <NumberTicker value={loveDays} />
        </View>

        <View style={styles.badge}>
          <ClockTicker />
        </View>

        <AppText style={styles.title}>Ngày cho đến Mãi mãi</AppText>

        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#F43F5E" />
          <AppText style={styles.dateText}>{startDateLabel}</AppText>
        </View>
      </View>
    </View>
  );
});


