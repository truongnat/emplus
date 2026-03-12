import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen, Reveal, AppText } from "@/src/ui-kit";
import { palette } from "@/src/theme";
import { tws } from "@/src/utils/tws";

export default function NotificationsScreen() {
    const router = useRouter();
    const [dailyReminders, setDailyReminders] = useState(true);
    const [anniversaries, setAnniversaries] = useState(true);
    const [partnerMood, setPartnerMood] = useState(true);
    const [budgetAlerts, setBudgetAlerts] = useState(false);

    const NotificationToggle = ({ icon, label, description, value, onValueChange, iconColor = (palette as any).primary }: any) => (
        <View style={tws("flex-row items-center justify-between py-3 px-4")}>
            <View style={tws("flex-row items-center flex-1")}>
                <View style={tws("w-10 h-10 rounded-full items-center justify-center mr-3 bg-white/60")}>
                    <Ionicons name={icon} size={18} color={iconColor} />
                </View>
                <View style={tws("flex-1")}>
                    <AppText variant="bodyBold" color="slate-700">{label}</AppText>
                    <AppText variant="caption" color="slate-400" style={tws("mt-0.5")}>{description}</AppText>
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: (palette as any)['slate-200'], true: (palette as any)['primary-soft'] }}
                thumbColor={value ? (palette as any).primary : (palette as any).white}
            />
        </View>
    );

    return (
        <AppScreen>
            <View style={tws("flex-row items-center justify-between px-4 py-3")}>
                <TouchableOpacity
                    style={tws("w-10 h-10 rounded-full items-center justify-center bg-white shadow-glass")}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={(palette as any)['slate-800']} />
                </TouchableOpacity>
                <AppText variant="h2" color="slate-800">Thông báo</AppText>
                <View style={tws("w-10")} />
            </View>

            <ScrollView style={tws("flex-1")} contentContainerStyle={tws("p-5")}>
                <Reveal delay={100}>
                    <View style={tws("mb-6")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Cài đặt thông báo
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] py-1 border border-white/60 shadow-glass")}>
                            <NotificationToggle
                                icon="calendar-outline"
                                label="Nhắc nhở hàng ngày"
                                description="Các nhiệm vụ và kế hoạch trong ngày"
                                value={dailyReminders}
                                onValueChange={setDailyReminders}
                            />
                            <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                            <NotificationToggle
                                icon="heart-outline"
                                label="Kỷ niệm & Ngày lễ"
                                description="Thông báo trước 1 ngày cho các dịp đặc biệt"
                                value={anniversaries}
                                onValueChange={setAnniversaries}
                            />
                            <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                            <NotificationToggle
                                icon="sparkles-outline"
                                label="Cảm xúc đối phương"
                                description="Khi đối phương cập nhật trạng thái mới"
                                value={partnerMood}
                                onValueChange={setPartnerMood}
                                iconColor={(palette as any).secondary}
                            />
                            <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                            <NotificationToggle
                                icon="wallet-outline"
                                label="Quản lý ngân sách"
                                description="Thông báo khi chi tiêu vượt hạn mức"
                                value={budgetAlerts}
                                onValueChange={setBudgetAlerts}
                                iconColor={(palette as any).success}
                            />
                        </View>
                    </View>
                </Reveal>

                <Reveal delay={200}>
                    <View style={tws("mb-6")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Âm thanh & Rung
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] py-1 border border-white/60 shadow-glass")}>
                            <TouchableOpacity style={tws("flex-row items-center justify-between py-3.5 px-4")}>
                                <AppText variant="bodyBold" color="slate-700">Âm thanh thông báo</AppText>
                                <AppText variant="body" color="slate-400">Mặc định</AppText>
                            </TouchableOpacity>
                            <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                            <View style={tws("flex-row items-center justify-between py-3 px-4")}>
                                <AppText variant="bodyBold" color="slate-700">Rung</AppText>
                                <Switch
                                    value={true}
                                    trackColor={{ false: (palette as any)['slate-200'], true: (palette as any)['primary-soft'] }}
                                    thumbColor={(palette as any).primary}
                                />
                            </View>
                        </View>
                    </View>
                </Reveal>
            </ScrollView>
        </AppScreen>
    );
}


