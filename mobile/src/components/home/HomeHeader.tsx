import { tws } from "@/src/utils/tws";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, Reveal, AppText } from "@/src/ui-kit";
import { RingingBell } from "./HomeDecorations";
import { palette } from "@/src/theme";

export interface HomeHeaderProps {
    userInitial: string;
    greeting: string;
    subGreeting: string;
    iconName: React.ComponentProps<typeof Ionicons>["name"];
}

export const HomeHeader = React.memo(function HomeHeader({ userInitial, greeting, subGreeting, iconName }: HomeHeaderProps) {
    const router = useRouter();

    const handlePress = useCallback(() => {
        router.push("/notifications");
    }, [router]);

    return (
        <Reveal>
            <View style={tws("flex-row items-center justify-between px-5 pt-3 pb-3 z-10 w-full")}>
                <View style={tws("flex-row items-center gap-3 overflow-hidden flex-1")}>
                    <View style={tws("relative w-15 h-9 justify-center")}>
                        <View style={tws("w-9 h-9 rounded-full border-2 border-white bg-white/60 items-center justify-center absolute z-20 left-0 shadow-sm")}>
                            <AppText variant="captionBold" color="slate-400">
                                {userInitial}
                            </AppText>
                            <View style={tws("absolute bottom-0 right-0 z-30 w-2.5 h-2.5 rounded-full border border-white bg-success")} />
                        </View>
                        <View style={tws("w-9 h-9 rounded-full border-2 border-white bg-white items-center justify-center absolute z-10 left-6 opacity-90 shadow-sm")}>
                            <Ionicons name="person" size={16} color={(palette as any)['slate-300']} />
                        </View>
                    </View>

                    <View style={tws("justify-center flex-1")}>
                        <AppText variant="bodyBold" color="slate-900" style={tws("text-[15px]")} numberOfLines={1}>
                            {greeting}
                        </AppText>
                        <View style={tws("flex-row items-center mt-0")}>
                            <Ionicons name={iconName} size={12} color={(palette as any)['amber-500']} />
                            <AppText variant="captionBold" color="slate-400" style={tws("ml-1 uppercase tracking-widest text-[9px]")} numberOfLines={1}>
                                {subGreeting}
                            </AppText>
                        </View>
                    </View>
                </View>
                <PressableScale
                    style={tws("w-9 h-9 items-center justify-center bg-white/45 rounded-full border border-white/60 shadow-glass ml-2")}
                    onPress={handlePress}
                >
                    <RingingBell />
                </PressableScale>
            </View>
        </Reveal>
    );
});
