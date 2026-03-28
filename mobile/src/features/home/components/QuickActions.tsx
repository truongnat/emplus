import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, Reveal, AppText } from "@/src/ui-kit";
import { palette, useThemeColors } from "@/src/theme";

interface QuickActionsProps {
  cycleLabel: string;
  nextDateLabel: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 32,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(244, 63, 94, 0.08)", // Slight rose tint
    marginRight: 16,
  },
  iconContainerEvents: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(168, 85, 247, 0.08)", // Slight amethyst tint
    marginRight: 16,
  },
  textContainer: { flex: 1, justifyContent: "center", gap: 4 },
  subTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#A8A29E", // taupe400
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1C1917", // taupe900
  },
});

export const QuickActions = React.memo(function QuickActions({
  cycleLabel,
  nextDateLabel,
}: QuickActionsProps) {
  const router = useRouter();
  const { brand } = useThemeColors();

  const handleCarePress = useCallback(() => {
    router.push("/care");
  }, [router]);

  const handleTimelinePress = useCallback(() => {
    router.push("/timeline");
  }, [router]);

  return (
    <Reveal delay={350}>
      <View style={styles.container}>
        <PressableScale
          scaleTo={0.96}
          style={styles.actionButton as any}
          onPress={handleCarePress}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles" size={20} color="#F43F5E" />
          </View>
          <View style={styles.textContainer}>
            <AppText style={styles.subTitle}>Chu kỳ hiện tại</AppText>
            <AppText numberOfLines={1} style={styles.title}>
              {cycleLabel}
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#D6D3D1" />
        </PressableScale>

        <PressableScale
          scaleTo={0.96}
          style={styles.actionButton as any}
          onPress={handleTimelinePress}
        >
          <View style={styles.iconContainerEvents}>
            <Ionicons name="calendar-clear" size={20} color="#A855F7" />
          </View>
          <View style={styles.textContainer}>
            <AppText style={styles.subTitle}>Sắp diễn ra</AppText>
            <AppText numberOfLines={1} style={styles.title}>
              {nextDateLabel}
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#D6D3D1" />
        </PressableScale>
      </View>
    </Reveal>
  );
});
