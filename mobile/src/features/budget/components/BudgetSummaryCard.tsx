import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { type BudgetSummary } from "@/src/api";
import { BUDGET_STYLES } from "./constants";
import { LiquidProgressBar } from "./LiquidProgressBar";
import { AppText } from "@/src/components/atoms/Text";

interface SummaryCardProps {
  summary: BudgetSummary | null;
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 4, marginBottom: 8 },
  card: {
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
  },
  gradient: { padding: 20 },
  headerContainer: { gap: 4, marginBottom: 16 },
  amountRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statsContainer: { flexDirection: "row", gap: 4, marginTop: 16 },
  statBox: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
});

export const BudgetSummaryCard = memo(({ summary }: SummaryCardProps) => {
  const colors = useThemeColors();
  const { colorScheme } = useThemeMode();
  const isDark = colorScheme === "dark";
  const usagePercent = Math.round(summary?.usagePercentage ?? 0);

  return (
    <View style={styles.container}>
      <BlurView
        intensity={isDark ? 40 : 45}
        tint={isDark ? "dark" : "light"}
        style={[
          BUDGET_STYLES.shadowSummary, 
          styles.card,
          { borderColor: colors.border.subtle }
        ]}
      >
        <LinearGradient
          colors={[colors.brand.muted, colors.surface.sunken]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <LinearGradient
            colors={[colors.brand.default, colors.brand.strong]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={BUDGET_STYLES.heroOverlay}
          />
          <View style={[BUDGET_STYLES.whiteOverlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)' }]} />

          <View style={styles.headerContainer}>
            <AppText
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: colors.brand.text,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              TỔNG CHI TIÊU
            </AppText>
            <View style={styles.amountRow}>
              <AppText
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                ${summary?.totalSpent?.toLocaleString() ?? "0"}
              </AppText>
              <AppText
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: colors.text.tertiary,
                }}
              >
                / ${summary?.totalBudget?.toLocaleString() ?? "0"}
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <AppText
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: colors.status.warning.text,
                opacity: 0.8,
              }}
            >
              {usagePercent}% Đã dùng
            </AppText>
            <AppText
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: colors.text.secondary,
              }}
            >
              Còn ${summary?.remainingAmount?.toLocaleString() ?? "0"}
            </AppText>
          </View>

          <LiquidProgressBar progress={summary?.usagePercentage ?? 0} />

          <View style={styles.statsContainer}>
            <View style={[styles.statBox, { backgroundColor: colors.surface.sunken, borderColor: colors.border.subtle }]}>
              <AppText
                style={{
                  fontSize: 13,
                  color: colors.text.tertiary,
                  marginBottom: 2,
                }}
              >
                Đang chờ
              </AppText>
              <AppText
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: colors.text.secondary,
                }}
              >
                ${summary?.pendingAmount?.toLocaleString() ?? "0"}
              </AppText>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.surface.sunken, borderColor: colors.border.subtle }]}>
              <AppText
                style={{
                  fontSize: 13,
                  color: colors.text.tertiary,
                  marginBottom: 2,
                }}
              >
                Dự kiến
              </AppText>
              <AppText
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: colors.text.secondary,
                }}
              >
                ${summary?.projectedTotal?.toLocaleString() ?? "0"}
              </AppText>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
});
