import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { type BudgetSummary } from "@/src/api";
import { useThemeColors } from "@/src/theme";
import { LiquidProgressBar } from "./LiquidProgressBar";
import { AppText } from "@/src/ui-kit";

interface SummaryCardProps {
  summary: BudgetSummary | null;
}

export const BudgetSummaryCard = memo(function BudgetSummaryCard({
  summary,
}: SummaryCardProps) {
  const colors = useThemeColors();
  const usagePercent = Math.round(summary?.usagePercentage ?? 0);

  const gradientColors = [colors.brand.muted, colors.brand.subtle] as const;

  return (
    <View style={styles.container}>
      <View
        style={[styles.card, { shadowColor: colors.brand.default, backgroundColor: colors.brand.muted }]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.headerContainer}>
            <AppText style={[styles.label, { color: colors.brand.strong }]}>
              TỔNG CHI TIÊU
            </AppText>
            <View style={styles.amountRow}>
              <AppText style={[styles.spentAmount, { color: colors.text.primary }]}>
                {summary?.totalSpent?.toLocaleString() ?? "0"}
              </AppText>
              <AppText style={[styles.budgetTotal, { color: colors.text.tertiary }]}>
                đ / {summary?.totalBudget?.toLocaleString() ?? "0"}đ
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <AppText style={[styles.usageText, { color: colors.brand.text }]}>
              {usagePercent}% Đã dùng
            </AppText>
            <AppText style={[styles.remainingText, { color: colors.text.primary }]}>
              Còn {summary?.remainingAmount?.toLocaleString() ?? "0"}đ
            </AppText>
          </View>

          <View style={styles.progressContainer}>
            <LiquidProgressBar progress={summary?.usagePercentage ?? 0} />
          </View>

          <View style={styles.statsContainer}>
            <View
              style={[
                styles.statBox,
                {
                  backgroundColor: "rgba(255, 255, 255, 0.45)",
                  borderColor: "rgba(255, 255, 255, 0.55)",
                },
              ]}
            >
              <AppText style={[styles.statLabel, { color: colors.text.tertiary }]}>
                Đang chờ
              </AppText>
              <AppText style={[styles.statValue, { color: colors.text.primary }]}>
                {summary?.pendingAmount?.toLocaleString() ?? "0"}đ
              </AppText>
            </View>
            <View
              style={[
                styles.statBox,
                {
                  backgroundColor: "rgba(255, 255, 255, 0.45)",
                  borderColor: "rgba(255, 255, 255, 0.55)",
                },
              ]}
            >
              <AppText style={[styles.statLabel, { color: colors.text.tertiary }]}>
                Dự kiến
              </AppText>
              <AppText style={[styles.statValue, { color: colors.text.primary }]}>
                {summary?.projectedTotal?.toLocaleString() ?? "0"}đ
              </AppText>
            </View>
          </View>
        </LinearGradient>

        <View style={[styles.star, { top: 20, right: 30, opacity: 0.35 }]} />
        <View style={[styles.star, { bottom: 40, left: 20, opacity: 0.2 }]} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    marginBottom: 16,
  },
  card: {
    borderRadius: 32,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 12,
  },
  gradient: {
    padding: 24,
  },
  headerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  spentAmount: {
    fontSize: 32,
    fontWeight: "900",
  },
  budgetTotal: {
    fontSize: 16,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  usageText: {
    fontSize: 14,
    fontWeight: "800",
  },
  remainingText: {
    fontSize: 14,
    fontWeight: "800",
  },
  progressContainer: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "800",
  },
  star: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 20,
    transform: [{ scale: 0.5 }],
  },
});
