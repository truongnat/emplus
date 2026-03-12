import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { AppScreen, Reveal, AppText, PressableScale } from "@/src/ui-kit";
import { palette } from "@/src/theme";
import { useSession } from "@/src/session-context";
import { tws } from "@/src/utils/tws";
import { Image } from "expo-image";

const NotificationItem = ({ icon, iconColor, iconBg, title, time, action, delay = 0, opacity = 1 }: any) => {
    return (
        <Reveal delay={delay}>
            <View style={tws("rounded-[28px] overflow-hidden mb-4 border border-white/60 shadow-glass", { opacity })}>
                <BlurView intensity={35} tint="light" style={tws("p-5")}>
                    <View style={tws("flex-row gap-4")}>
                        <View style={tws("w-12 h-12 rounded-2xl items-center justify-center shadow-sm", { backgroundColor: iconBg })}>
                            <Ionicons name={icon} size={22} color={iconColor} />
                        </View>
                        <View style={tws("flex-1 gap-2")}>
                            <View style={tws("gap-0.5")}>
                                <AppText variant="bodyBold" color="slate-800" numberOfLines={2} style={tws("leading-5")}>{title}</AppText>
                                <AppText variant="captionBold" color="slate-400" style={tws("uppercase tracking-widest text-[10px]")}>{time}</AppText>
                            </View>
                            {action && (
                                <PressableScale style={tws("bg-primary flex-row items-center gap-2 px-4 py-2 rounded-xl self-start shadow-primary/20 shadow-sm")}>
                                    <Ionicons name="chatbubble-outline" size={14} color="white" />
                                    <AppText variant="captionBold" color="white">{action}</AppText>
                                </PressableScale>
                            )}
                        </View>
                    </View>
                </BlurView>
            </View>
        </Reveal>
    );
};

export default function NotificationsScreen() {
    const { session } = useSession();

    const partnerName = useMemo(() => {
        return !!session?.user.coupleId ? "Leo" : "Bạn đồng hành";
    }, [!!session?.user.coupleId]);

    return (
        <AppScreen scroll={false}>
            <View style={tws("flex-1")}>
                <Reveal>
                    <View style={tws("flex-row items-center justify-between px-5 pt-4 pb-6 z-10")}>
                        <View style={tws("flex-1")}>
                            <AppText variant="h2" color="slate-900" style={tws("tracking-tighter")}>Thông báo</AppText>
                            <AppText variant="captionBold" color="slate-400" style={tws("uppercase tracking-[2px] mt-1")}>NHỊP ĐẬP HÔM NAY</AppText>
                        </View>
                        <View style={tws("flex-1 items-end")}>
                            <View style={tws("flex-row items-center bg-white/45 rounded-full pl-1 pr-4 py-1 gap-3 border border-white/60 shadow-glass")}>
                                <View style={tws("relative")}>
                                    <View style={tws("w-9 h-9 rounded-full border-2 border-white bg-slate-100 items-center justify-center overflow-hidden shadow-sm")}>
                                        <Ionicons name="person-circle-outline" size={28} color="#94a3b8" />
                                    </View>
                                    <View style={tws("absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-white")} />
                                </View>
                                <View style={tws("justify-center")}>
                                    <AppText variant="captionBold" color="slate-400" style={tws("text-[8px] tracking-widest uppercase")}>{partnerName.toUpperCase()} ĐANG</AppText>
                                    <AppText variant="bodyBold" color="slate-800" style={tws("text-xs -mt-1")}>bình tĩnh</AppText>
                                </View>
                            </View>
                        </View>
                    </View>
                </Reveal>

                <ScrollView contentContainerStyle={tws("px-5 pb-40")} showsVerticalScrollIndicator={false}>
                    <View style={tws("mb-8")}>
                        <View style={tws("flex-row items-center gap-2 mb-4 px-1")}>
                            <View style={tws("w-1.5 h-1.5 rounded-full bg-primary")} />
                            <AppText variant="captionBold" color="primary" style={tws("uppercase tracking-widest opacity-80")}>Mới nhất</AppText>
                        </View>
                        <NotificationItem
                            icon="heart"
                            iconColor={palette.primary}
                            iconBg={`${palette.primary}15`}
                            title="Minh Anh đã gửi cho bạn một nhịp đập yêu thương"
                            time="Vừa xong"
                            action="Phản hồi"
                            delay={100}
                        />
                        <NotificationItem
                            icon="wallet"
                            iconColor={palette.secondary}
                            iconBg={`${palette.secondary}15`}
                            title="Thanh toán cho 'Tiền đặt cọc địa điểm' đã được phê duyệt"
                            time="2 giờ trước"
                            delay={200}
                        />
                    </View>

                    <View style={tws("mb-8")}>
                        <View style={tws("flex-row items-center gap-2 mb-4 px-1")}>
                            <View style={tws("w-1.5 h-1.5 rounded-full bg-slate-400")} />
                            <AppText variant="captionBold" color="slate-400" style={tws("uppercase tracking-widest opacity-80")}>Trước đó</AppText>
                        </View>
                        <NotificationItem
                            icon="checkbox-outline"
                            iconColor={palette.info}
                            iconBg={`${palette.info}15`}
                            title="Bạn có nhiệm vụ mới: 'Chọn thực đơn thử món'"
                            time="Hôm qua"
                            delay={300}
                            opacity={0.9}
                        />
                        <NotificationItem
                            icon="gift-outline"
                            iconColor={palette.warning}
                            iconBg={`${palette.warning}15`}
                            title="Còn 142 ngày nữa đến ngày trọng đại!"
                            time="2 ngày trước"
                            delay={400}
                            opacity={0.9}
                        />
                        <NotificationItem
                            icon="sparkles-outline"
                            iconColor={(palette as any)['rose-600']}
                            iconBg={`${(palette as any)['rose-600']}15`}
                            title="Gợi ý phong cách hoa cưới dựa trên cấu trúc pha lê của bạn đã sẵn sàng"
                            time="3 ngày trước"
                            delay={500}
                            opacity={0.8}
                        />
                    </View>
                </ScrollView>
            </View>
        </AppScreen>
    );
}


