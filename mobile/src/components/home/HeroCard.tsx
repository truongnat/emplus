import { tws } from "@/src/utils/tws";
import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { PulseStar } from "./HomeDecorations";
import { NumberTicker, ClockTicker } from "./HomeClock";
import { palette } from "@/src/theme";
import { AppText } from "@/src/ui-kit";

export interface HeroCardProps {
    loveDays: number;
    startDateLabel: string;
}

export const HeroCard = React.memo(function HeroCard({ loveDays, startDateLabel }: HeroCardProps) {
    return (
        <View style={tws("mb-5 rounded-[32px] bg-white shadow-glass")}>
            <View style={tws("relative min-h-[320px] rounded-[32px] p-8 overflow-hidden items-center justify-center")}>
                <LinearGradient
                    colors={(palette as any)['hero-gradient']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={tws("absolute inset-0")}
                />
                <View style={tws("absolute inset-0 bg-white/45")} />

                <AppText variant="captionBold" color="primary" style={tws("tracking-widest mb-2 z-10 opacity-80 uppercase")}>NGÀY TRỌNG ĐẠI</AppText>
                <View style={tws("relative mb-1 z-10")}>
                    <PulseStar right={-30} top={-5} size={32} color={(palette as any)['amber-400']} delay={0} icon="sparkles" />
                    <PulseStar left={-20} bottom={10} size={24} color={(palette as any)['primary-subtle']} delay={600} icon="star" />
                    <PulseStar left={25} top={-30} size={16} color={(palette as any)['amber-400']} delay={300} icon="sparkles" />
                    <NumberTicker value={loveDays} />
                </View>
                <View style={tws("mb-3 z-10 px-4 py-1.5 bg-white/45 rounded-full border border-rose-500/15")}>
                    <ClockTicker />
                </View>
                <AppText variant="h2" color="slate-700" style={tws("z-10")}>Ngày cho đến Mãi mãi</AppText>

                <View style={tws("flex-row items-center gap-1.5 bg-white/60 px-4 py-2 rounded-[20px] mt-6 z-10")}>
                    <Ionicons name="calendar-outline" size={14} color={(palette as any).primary} />
                    <AppText variant="bodyBold" color="slate-800">{startDateLabel}</AppText>
                </View>
            </View>
        </View>
    );
});
