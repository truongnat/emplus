import { tws } from "@/src/utils/tws";
import React, { memo } from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../theme";
import { type BudgetItem } from "../../domain/entities/schemas";
import { CATEGORY_CONFIG, STATUS_MAP } from "./constants";
import { AppText } from "@/src/ui-kit";

export const ExpenseItem = memo(({ item }: { item: BudgetItem }) => {
    const isWarning = item.status === "OVER_BUDGET";
    const config = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.other;
    const status = STATUS_MAP[item.status] ?? { label: item.status, color: (palette as any).muted };

    const gradientColors: [string, string] = isWarning
        ? ['rgba(236,19,52,0.06)', 'rgba(236,19,52,0.02)']
        : [(palette as any).glass, (palette as any)['glass-light']];

    return (
        <BlurView
            intensity={25}
            tint="light"
            style={tws("mb-4 rounded-[28px] overflow-hidden border border-white/60 shadow-sm")}
        >
            <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View style={tws("flex-row items-center justify-between p-5")}>
                    <View style={tws("flex-row items-center gap-4 flex-1 overflow-hidden")}>
                        <View style={tws("w-12 h-12 rounded-2xl items-center justify-center shadow-sm", { backgroundColor: config?.bg || "#eee" })}>
                            <Ionicons name={config?.icon || "help"} size={22} color={config?.color || "#999"} />
                        </View>
                        <View style={tws("flex-1 pr-2")}>
                            <AppText variant="bodyBold" color="slate-800" numberOfLines={1} style={tws("mb-1")}>
                                {item.title}
                            </AppText>
                            <View style={tws("flex-row items-center gap-1.5")}>
                                <AppText variant="caption" color={isWarning ? "primary" : "slate-400"} numberOfLines={1} style={tws("opacity-70")}>
                                    {item.date}
                                </AppText>
                                {item.place && (
                                    <>
                                        <View style={tws("w-px h-px rounded-full bg-slate-200")} />
                                        <AppText variant="caption" color="slate-400" numberOfLines={1} style={tws("max-w-20")}>
                                            {item.place}
                                        </AppText>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={tws("items-end gap-1.5 ml-2")}>
                        <AppText variant="bodyBold" color={isWarning ? "primary" : "slate-900"} style={tws("text-[17px]")}>
                            {item.amount?.toLocaleString() ?? "0"}đ
                        </AppText>
                        <View
                            style={tws("px-3 py-1 rounded-lg border", { backgroundColor: isWarning ? (palette as any)['rose-50'] : (palette as any)[item.status === 'PAID' ? 'success-bg' : 'warning-bg'], borderColor: isWarning ? (palette as any)['rose-500'] + '20' : (palette as any)[item.status === 'PAID' ? 'success' : 'warning'] + '30' })}
                        >
                            <AppText variant="captionBold" color={isWarning ? "primary" : (item.status === 'PAID' ? "success" : "warning")} style={tws("text-3xs uppercase tracking-wider")}>
                                {isWarning ? "Vượt hạn mức" : status.label}
                            </AppText>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </BlurView>
    );
});
