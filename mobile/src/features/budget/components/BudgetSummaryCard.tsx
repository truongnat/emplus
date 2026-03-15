import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { palette } from "@/src/theme/tokens";
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
    borderColor: "rgba(255, 255, 255, 0.6)",
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
    backgroundColor: "rgba(255,255,255,0.45)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
  },
});

export const BudgetSummaryCard = memo(({ summary }: SummaryCardProps) => {
  const usagePercent = Math.round(summary?.usagePercentage ?? 0);

  return (
    <View style={styles.container}>
      <BlurView
        intensity={45}
        tint="light"
        style={[BUDGET_STYLES.shadowSummary, styles.card]}
      >
        <LinearGradient
          colors={[palette.violet50, palette.zinc50]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <LinearGradient
            colors={[palette.violet600, palette.violet800]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={BUDGET_STYLES.heroOverlay}
          />
          <View style={BUDGET_STYLES.whiteOverlay} />

          <View style={styles.headerContainer}>
            <AppText
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: palette.violet500,
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
                  color: palette.zinc900,
                }}
              >
                ${summary?.totalSpent?.toLocaleString() ?? "0"}
              </AppText>
              <AppText
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: palette.zinc400,
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
                color: palette.amber500,
                opacity: 0.8,
              }}
            >
              {usagePercent}% Đã dùng
            </AppText>
            <AppText
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: palette.zinc700,
              }}
            >
              Còn ${summary?.remainingAmount?.toLocaleString() ?? "0"}
            </AppText>
          </View>

          <LiquidProgressBar progress={summary?.usagePercentage ?? 0} />

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <AppText
                style={{
                  fontSize: 13,
                  color: palette.zinc500,
                  marginBottom: 2,
                }}
              >
                Đang chờ
              </AppText>
              <AppText
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: palette.zinc800,
                }}
              >
                ${summary?.pendingAmount?.toLocaleString() ?? "0"}
              </AppText>
            </View>
            <View style={styles.statBox}>
              <AppText
                style={{
                  fontSize: 13,
                  color: palette.zinc500,
                  marginBottom: 2,
                }}
              >
                Dự kiến
              </AppText>
              <AppText
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: palette.zinc800,
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
