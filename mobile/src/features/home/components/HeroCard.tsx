import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { PulseStar } from "./HomeDecorations";
import { NumberTicker, ClockTicker } from "./HomeClock";
import { palette } from "@/src/theme";
import { AppText } from "@/src/ui-kit";

interface HeroCardProps {
  loveDays: number;
  startDateLabel: string;
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, borderRadius: 32, backgroundColor: "#fff" },
  content: {
    position: "relative",
    minHeight: 320,
    borderRadius: 32,
    padding: 32,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: { position: "absolute", inset: 0 },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.violet600,
    letterSpacing: 2,
    marginBottom: 8,
    zIndex: 10,
    opacity: 0.8,
    textTransform: "uppercase",
  },
  tickerContainer: { position: "relative", marginBottom: 4, zIndex: 10 },
  badge: {
    marginBottom: 12,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(244,63,94,0.15)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: palette.zinc700,
    zIndex: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 24,
    zIndex: 10,
  },
});

export const HeroCard = React.memo(function HeroCard({
  loveDays,
  startDateLabel,
}: HeroCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LinearGradient
          colors={[palette.violet600, palette.violet800]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
        <View style={styles.overlay} />

        <AppText style={styles.subtitle}>NGÀY TRỌNG ĐẠI</AppText>
        <View style={styles.tickerContainer}>
          <PulseStar
            right={-30}
            top={-5}
            size={32}
            color={palette.amber500}
            delay={0}
            icon="sparkles"
          />
          <PulseStar
            left={-20}
            bottom={10}
            size={24}
            color={palette.violet100}
            delay={600}
            icon="star"
          />
          <PulseStar
            left={25}
            top={-30}
            size={16}
            color={palette.amber500}
            delay={300}
            icon="sparkles"
          />
          <NumberTicker value={loveDays} />
        </View>
        <View style={styles.badge}>
          <ClockTicker />
        </View>
        <AppText style={styles.title}>Ngày cho đến Mãi mãi</AppText>

        <View style={styles.dateContainer}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={palette.violet600}
          />
          <AppText
            style={{ fontSize: 13, fontWeight: "bold", color: palette.zinc800 }}
          >
            {startDateLabel}
          </AppText>
        </View>
      </View>
    </View>
  );
});
