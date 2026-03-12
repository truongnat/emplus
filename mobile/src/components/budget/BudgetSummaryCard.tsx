import { tws } from "@/src/utils/tws";
import React, { memo } from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { palette } from "../../theme";
import { type BudgetSummary } from "../../domain/entities/schemas";
import { BUDGET_STYLES } from "./constants";
import { LiquidProgressBar } from "./LiquidProgressBar";
import { AppText } from "@/src/ui-kit";

interface SummaryCardProps {
    summary: BudgetSummary | null;
}

export const BudgetSummaryCard = memo(({ summary }: SummaryCardProps) => {
    const usagePercent = Math.round(summary?.usagePercentage ?? 0);

    return (
        <View style={tws("px-5 pt-1 mb-2")}>
            <BlurView
                intensity={45}
                tint="light"
                style={[
                    BUDGET_STYLES.shadowSummary,
                    { borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)' }
                ]}
            >
                <LinearGradient
                    colors={[(palette as any).glass, (palette as any)['glass-light']]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 20 }}
                >
                    <LinearGradient colors={(palette as any)['hero-gradient']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={BUDGET_STYLES.heroOverlay} />
                    <View style={BUDGET_STYLES.whiteOverlay} />

                    <View style={tws("gap-px mb-4")}>
                        <AppText variant="captionBold" color="secondary" style={tws("tracking-widest uppercase")}>
                            TỔNG CHI TIÊU
                        </AppText>
                        <View style={tws("flex-row items-baseline gap-xs")}>
                            <AppText variant="h1" color="slate-900" style={tws("text-3xl")}>
                                ${summary?.totalSpent?.toLocaleString() ?? "0"}
                            </AppText>
                            <AppText variant="bodyBold" color="slate-400">
                                / ${summary?.totalBudget?.toLocaleString() ?? "0"}
                            </AppText>
                        </View>
                    </View>

                    <View style={tws("flex-row justify-between mb-2")}>
                        <AppText variant="captionBold" color="accent" style={tws("opacity-80")}>
                            {usagePercent}% Đã dùng
                        </AppText>
                        <AppText variant="captionBold" color="slate-700">
                            Còn ${summary?.remainingAmount?.toLocaleString() ?? "0"}
                        </AppText>
                    </View>

                    <LiquidProgressBar progress={summary?.usagePercentage ?? 0} />

                    <View style={tws("flex-row gap-xs mt-4")}>
                        <View style={tws("flex-1 bg-white/45 px-3 py-2.5 rounded-lg border border-white/60 items-center")}>
                            <AppText variant="caption" color="slate-500" style={tws("mb-3xs")}>Đang chờ</AppText>
                            <AppText variant="bodyBold" color="slate-800">
                                ${summary?.pendingAmount?.toLocaleString() ?? "0"}
                            </AppText>
                        </View>
                        <View style={tws("flex-1 bg-white/45 px-3 py-2.5 rounded-lg border border-white/60 items-center")}>
                            <AppText variant="caption" color="slate-500" style={tws("mb-3xs")}>Dự kiến</AppText>
                            <AppText variant="bodyBold" color="slate-800">
                                ${summary?.projectedTotal?.toLocaleString() ?? "0"}
                            </AppText>
                        </View>
                    </View>
                </LinearGradient>
            </BlurView>
        </View>
    );
});
