import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { type BudgetSummary } from "@/src/api";
import { LiquidProgressBar } from "./LiquidProgressBar";
import { AppText } from "@/src/ui-kit";

interface SummaryCardProps {
  summary: BudgetSummary | null;
}

export const BudgetSummaryCard = memo(({ summary }: SummaryCardProps) => {
  const usagePercent = Math.round(summary?.usagePercentage ?? 0);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient
          colors={["#FFD6E0", "#FFB6C1"]} // Soft pink gradient for budget context
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.headerContainer}>
            <AppText style={styles.label}>TỔNG CHI TIÊU</AppText>
            <View style={styles.amountRow}>
              <AppText style={styles.spentAmount}>
                {summary?.totalSpent?.toLocaleString() ?? "0"}
              </AppText>
              <AppText style={styles.budgetTotal}>
                đ / {summary?.totalBudget?.toLocaleString() ?? "0"}đ
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <AppText style={styles.usageText}>{usagePercent}% Đã dùng</AppText>
            <AppText style={styles.remainingText}>
              Còn {summary?.remainingAmount?.toLocaleString() ?? "0"}đ
            </AppText>
          </View>

          <View style={styles.progressContainer}>
            <LiquidProgressBar progress={summary?.usagePercentage ?? 0} />
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <AppText style={styles.statLabel}>Đang chờ</AppText>
              <AppText style={styles.statValue}>
                {summary?.pendingAmount?.toLocaleString() ?? "0"}đ
              </AppText>
            </View>
            <View style={styles.statBox}>
              <AppText style={styles.statLabel}>Dự kiến</AppText>
              <AppText style={styles.statValue}>
                {summary?.projectedTotal?.toLocaleString() ?? "0"}đ
              </AppText>
            </View>
          </View>
        </LinearGradient>

        {/* Decorative elements similar to HeroCard */}
        <View style={[styles.star, { top: 20, right: 30, opacity: 0.4 }]} />
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
    backgroundColor: "#FFD6E0",
    shadowColor: "#E48B9B",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
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
    color: "#E48B9B",
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
    color: "#1C1917",
  },
  budgetTotal: {
    fontSize: 16,
    fontWeight: "700",
    color: "#A8A29E",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  usageText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#E11D48", // rose600
  },
  remainingText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1C1917",
  },
  progressContainer: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A8A29E",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1C1917",
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
