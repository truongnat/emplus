import { tws } from "@/src/utils/tws";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, Reveal, AppText } from "@/src/ui-kit";
import { palette } from "@/src/theme";

export interface QuickActionsProps {
    cycleLabel: string;
    nextDateLabel: string;
}

export const QuickActions = React.memo(function QuickActions({ cycleLabel, nextDateLabel }: QuickActionsProps) {
    const router = useRouter();

    const handleCarePress = useCallback(() => {
        router.push("/care");
    }, [router]);

    const handleTimelinePress = useCallback(() => {
        router.push("/timeline");
    }, [router]);

    return (
        <Reveal delay={350}>
            <View style={tws("flex-col mb-8 gap-y-3 px-1")}>
                <PressableScale
                    scaleTo={0.96}
                    style={tws("flex-row items-center bg-white/45 rounded-[32px] p-4 border border-white/60 shadow-glass")}
                    onPress={handleCarePress}
                >
                    <View style={tws("w-11 h-11 rounded-full items-center justify-center bg-white/60 mr-4")}>
                        <Ionicons name="happy-outline" size={22} color={(palette as any).primary} />
                    </View>
                    <View style={tws("flex-1 justify-center gap-y-0.5")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("tracking-widest uppercase")}>Chu kỳ hiện tại</AppText>
                        <AppText variant="bodyBold" color="slate-800" numberOfLines={1}>{cycleLabel}</AppText>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={(palette as any)['slate-300']} />
                </PressableScale>

                <PressableScale
                    scaleTo={0.96}
                    style={tws("flex-row items-center bg-white/45 rounded-[32px] p-4 border border-white/60 shadow-glass")}
                    onPress={handleTimelinePress}
                >
                    <View style={tws("w-11 h-11 rounded-full items-center justify-center bg-white/60 mr-4")}>
                        <Ionicons name="calendar-outline" size={22} color={(palette as any)['purple-600']} />
                    </View>
                    <View style={tws("flex-1 justify-center gap-y-0.5")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("tracking-widest uppercase")}>Sắp diễn ra</AppText>
                        <AppText variant="bodyBold" color="slate-800" numberOfLines={1}>{nextDateLabel}</AppText>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={(palette as any)['slate-300']} />
                </PressableScale>
            </View>
        </Reveal>
    );
});
