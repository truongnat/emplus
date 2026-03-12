import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen, Reveal, AppText } from "@/src/ui-kit";
import { palette } from "@/src/theme";
import { tws } from "@/src/utils/tws";

export default function AppearanceScreen() {
    const router = useRouter();
    const [theme, setTheme] = useState("light");
    const [accentColor, setAccentColor] = useState("#ec1334");

    const colors = ["#ec1334", "#f43f5e", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"];

    return (
        <AppScreen>
            <View style={tws("flex-row items-center justify-between px-4 py-3")}>
                <TouchableOpacity
                    style={tws("w-10 h-10 rounded-full items-center justify-center bg-white shadow-glass")}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={(palette as any)['slate-800']} />
                </TouchableOpacity>
                <AppText variant="h2" color="slate-800">Giao diện</AppText>
                <View style={tws("w-10")} />
            </View>

            <ScrollView style={tws("flex-1")} contentContainerStyle={tws("p-5")}>
                <Reveal delay={100}>
                    <AppText variant="captionBold" color="slate-400" style={tws("mb-4 px-1 uppercase tracking-widest")}>
                        Chế độ hiển thị
                    </AppText>
                    <View style={tws("flex-row gap-4")}>
                        <TouchableOpacity
                            style={tws("flex-1 items-center")}
                            onPress={() => setTheme("light")}
                        >
                            <View style={[
                                tws("w-full h-18 rounded-2xl border-2 p-3 mb-2 bg-white/60 shadow-glass"),
                                theme === "light" ? tws("border-primary") : tws("border-white/60")
                            ]}>
                                <View style={tws("w-3/5 h-1.5 bg-slate-100 rounded-full mb-1.5")} />
                                <View style={tws("w-2/5 h-1.5 bg-slate-100 rounded-full")} />
                            </View>
                            <AppText
                                variant={theme === "light" ? "captionBold" : "caption"}
                                color={theme === "light" ? "primary" : "slate-400"}
                                style={tws("uppercase tracking-widest")}
                            >
                                Sáng
                            </AppText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tws("flex-1 items-center")}
                            onPress={() => setTheme("dark")}
                        >
                            <View style={[
                                tws("w-full h-18 rounded-2xl border-2 p-3 mb-2 bg-slate-800 shadow-glass"),
                                theme === "dark" ? tws("border-primary") : tws("border-black/60")
                            ]}>
                                <View style={tws("w-3/5 h-1.5 bg-slate-600 rounded-full mb-1.5")} />
                                <View style={tws("w-2/5 h-1.5 bg-slate-600 rounded-full")} />
                            </View>
                            <AppText
                                variant={theme === "dark" ? "captionBold" : "caption"}
                                color={theme === "dark" ? "primary" : "slate-400"}
                                style={tws("uppercase tracking-widest")}
                            >
                                Tối
                            </AppText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tws("flex-1 items-center")}
                            onPress={() => setTheme("system")}
                        >
                            <View style={[
                                tws("w-full h-18 rounded-2xl border-2 mb-2 overflow-hidden bg-white/60 shadow-glass"),
                                theme === "system" ? tws("border-primary") : tws("border-white/60")
                            ]}>
                                <View style={tws("absolute inset-0 flex-row")}>
                                    <View style={tws("flex-1 bg-white")} />
                                    <View style={tws("flex-1 bg-slate-800")} />
                                </View>
                            </View>
                            <AppText
                                variant={theme === "system" ? "captionBold" : "caption"}
                                color={theme === "system" ? "primary" : "slate-400"}
                                style={tws("uppercase tracking-widest")}
                            >
                                Hệ thống
                            </AppText>
                        </TouchableOpacity>
                    </View>
                </Reveal>

                <Reveal delay={200}>
                    <View style={tws("mt-8")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Màu chủ đạo
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] p-5 border border-white/60 shadow-glass")}>
                            <View style={tws("flex-row flex-wrap gap-3 justify-center")}>
                                {colors.map(color => (
                                    <TouchableOpacity
                                        key={color}
                                        style={[tws("w-11 h-11 rounded-full items-center justify-center shadow-sm"), { backgroundColor: color }]}
                                        onPress={() => setAccentColor(color)}
                                    >
                                        {accentColor === color && (
                                            <View style={tws("w-6 h-6 rounded-full bg-white/20 items-center justify-center border border-white/40")}>
                                                <Ionicons name="checkmark" size={16} color="#fff" />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </Reveal>

                <Reveal delay={300}>
                    <View style={tws("mt-8 mb-4")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Cỡ chữ
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] p-5 border border-white/60 shadow-glass")}>
                            <View style={tws("flex-row items-center gap-4")}>
                                <AppText color="slate-400" style={tws("text-xs")}>A</AppText>
                                <View style={tws("flex-1 h-1.5 bg-slate-100 rounded-full relative overflow-visible")}>
                                    <View style={[tws("h-full rounded-full"), { width: '40%', backgroundColor: accentColor }]} />
                                    <View style={[
                                        tws("absolute w-5 h-5 rounded-full bg-white border-2 -top-1.5 shadow-md"),
                                        { left: '40%', borderColor: accentColor }
                                    ]} />
                                </View>
                                <AppText color="slate-400" style={tws("text-xl tracking-tight")}>A</AppText>
                            </View>
                        </View>
                    </View>
                </Reveal>
            </ScrollView>
        </AppScreen>
    );
}


