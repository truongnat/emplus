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
    gap: 12,
    paddingHorizontal: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    marginRight: 16,
  },
  textContainer: { flex: 1, justifyContent: "center", gap: 2 },
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
            <Ionicons name="happy-outline" size={22} color={brand.default} />
          </View>
          <View style={styles.textContainer}>
            <AppText
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: palette.zinc400,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Chu kỳ hiện tại
            </AppText>
            <AppText
              numberOfLines={1}
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: palette.zinc800,
              }}
            >
              {cycleLabel}
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={16} color={palette.zinc300} />
        </PressableScale>

        <PressableScale
          scaleTo={0.96}
          style={styles.actionButton as any}
          onPress={handleTimelinePress}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="calendar-outline"
              size={22}
              color={brand.default}
            />
          </View>
          <View style={styles.textContainer}>
            <AppText
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: palette.zinc400,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Sắp diễn ra
            </AppText>
            <AppText
              numberOfLines={1}
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: palette.zinc800,
              }}
            >
              {nextDateLabel}
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={16} color={palette.zinc300} />
        </PressableScale>
      </View>
    </Reveal>
  );
});
