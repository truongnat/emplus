import { tws } from "@/src/utils/tws";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppButton, Reveal, AppText, PressableScale } from "@/src/ui-kit";
import { useToast } from "@/src/toast-context";
import { palette } from "@/src/theme";

export interface FocusCardProps {
    focusTitle: string;
    focusSubtitle: string;
    showFocusCard: boolean;
    setShowFocusCard: (v: boolean) => void;
}

export const FocusCard = React.memo(function FocusCard({
    focusTitle,
    focusSubtitle,
    showFocusCard,
    setShowFocusCard
}: FocusCardProps) {
    const router = useRouter();
    const { showToast } = useToast();

    const handleDismiss = useCallback(() => {
        setShowFocusCard(false);
        showToast("Nhắc lại bạn vào ngày mai nhé 💛", "info");
    }, [setShowFocusCard, showToast]);

    const handleRecord = useCallback(() => {
        router.push("/(tabs)/care");
    }, [router]);

    if (!showFocusCard) return null;

    return (
        <Reveal delay={550}>
            <View style={tws("mb-6 rounded-[32px] bg-white shadow-glass")}>
                <View style={tws("relative rounded-[32px] p-6 bg-white/45 border border-white/60 overflow-hidden")}>
                    <View style={tws("absolute -right-10 -top-10 w-[120px] h-[120px] rounded-full bg-rose-600/5")} />

                    <View style={tws("flex-row items-center justify-between mb-4 z-10")}>
                        <AppText variant="h3" color="slate-900">Trọng tâm hôm nay</AppText>
                        <View style={tws("bg-rose-500/10 px-3 py-1 rounded-[12px]")}>
                            <AppText variant="captionBold" color="rose-600">Ưu tiên cao</AppText>
                        </View>
                    </View>

                    <View style={tws("flex-row gap-4 mb-6 z-10")}>
                        <View style={tws("w-14 h-14 rounded-2xl bg-white/60 items-center justify-center border border-white/60 shadow-sm")}>
                            <Ionicons name="mic-outline" size={24} color={(palette as any)['orange-500']} />
                        </View>
                        <View style={tws("flex-1")}>
                            <AppText variant="h3" color="slate-800" style={tws("leading-[24px]")}>{focusTitle}</AppText>
                            <AppText variant="body" color="slate-500" style={tws("mt-1.5")}>{focusSubtitle}</AppText>
                            <View style={tws("flex-row items-center mt-2.5")}>
                                <Ionicons name="time-outline" size={16} color={(palette as any)['slate-600']} />
                                <AppText variant="body" color="slate-600" style={tws("ml-1")}> Hôm nay</AppText>
                            </View>
                        </View>
                    </View>

                    <View style={tws("flex-row items-center gap-4 z-10 w-full mt-4")}>
                        <AppButton
                            label="Để sau"
                            variant="ghost"
                            fullWidth={false}
                            className="px-0"
                            style={tws("min-w-[80px]")}
                            onPress={handleDismiss}
                        />
                        <AppButton
                            label="Ghi lại tâm trạng"
                            variant="primary"
                            style={tws("flex-1")}
                            onPress={handleRecord}
                        />
                    </View>
                </View>
            </View>
        </Reveal>
    );
});
