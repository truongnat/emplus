import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen, Reveal, AppText } from "@/src/ui-kit";
import { palette } from "@/src/theme";
import { tws } from "@/src/utils/tws";

export default function PrivacyScreen() {
    const router = useRouter();
    const [profileVisible, setProfileVisible] = useState(true);
    const [shareBudget, setShareBudget] = useState(true);
    const [biometricLock, setBiometricLock] = useState(false);

    const PrivacyToggle = ({ icon, label, description, value, onValueChange }: any) => (
        <View style={tws("flex-row items-center justify-between py-3 px-4")}>
            <View style={tws("flex-row items-center flex-1")}>
                <View style={tws("w-10 h-10 rounded-full items-center justify-center mr-3 bg-white/60")}>
                    <Ionicons name={icon} size={18} color={(palette as any)['slate-500']} />
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
                <AppText variant="h2" color="slate-800">Bảo mật</AppText>
                <View style={tws("w-10")} />
            </View>

            <ScrollView style={tws("flex-1")} contentContainerStyle={tws("p-5")}>
                <Reveal delay={100}>
                    <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                        Chia sẻ dữ liệu
                    </AppText>
                    <View style={tws("bg-white/45 rounded-[32px] py-1 border border-white/60 shadow-glass")}>
                        <PrivacyToggle
                            icon="eye-outline"
                            label="Công khai hồ sơ"
                            description="Cho phép người khác tìm thấy bạn qua email"
                            value={profileVisible}
                            onValueChange={setProfileVisible}
                        />
                        <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                        <PrivacyToggle
                            icon="wallet-outline"
                            label="Chia sẻ ngân sách"
                            description="Cho phép đối phương xem chi tiết chi tiêu của bạn"
                            value={shareBudget}
                            onValueChange={setShareBudget}
                        />
                    </View>
                </Reveal>

                <Reveal delay={200}>
                    <View style={tws("mt-8")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Bảo mật ứng dụng
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] py-1 border border-white/60 shadow-glass")}>
                            <PrivacyToggle
                                icon="finger-print-outline"
                                label="Khóa bằng FaceID/Vân tay"
                                description="Yêu cầu xác thực khi mở ứng dụng"
                                value={biometricLock}
                                onValueChange={setBiometricLock}
                            />
                            <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                            <TouchableOpacity style={tws("flex-row items-center justify-between py-3 px-4")}>
                                <View style={tws("flex-row items-center flex-1")}>
                                    <View style={tws("w-10 h-10 rounded-full items-center justify-center mr-3 bg-white/60")}>
                                        <Ionicons name="key-outline" size={18} color={(palette as any)['slate-500']} />
                                    </View>
                                    <View style={tws("flex-1")}>
                                        <AppText variant="bodyBold" color="slate-700">Thay đổi mật khẩu</AppText>
                                        <AppText variant="caption" color="slate-400" style={tws("mt-0.5")}>Cập nhật mật khẩu định kỳ để an toàn hơn</AppText>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color={(palette as any)['slate-300']} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Reveal>

                <Reveal delay={300}>
                    <View style={tws("mt-8 mb-4")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Dữ liệu cá nhân
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] py-1 border border-white/60 shadow-glass")}>
                            <TouchableOpacity style={tws("flex-row items-center py-3.5 px-4")}>
                                <View style={tws("w-10 h-10 rounded-full items-center justify-center mr-3 bg-white/60")}>
                                    <Ionicons name="trash-outline" size={18} color={(palette as any).primary} />
                                </View>
                                <View style={tws("flex-1")}>
                                    <AppText variant="bodyBold" color="primary">Xóa tài khoản</AppText>
                                    <AppText variant="captionBold" color="slate-400" style={tws("mt-0.5 tracking-wide")}>Xóa vĩnh viễn mọi dữ liệu và lịch sử yêu</AppText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Reveal>
            </ScrollView>
        </AppScreen>
    );
}


