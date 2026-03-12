import { View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen, Reveal, AppText } from "@/src/ui-kit";
import { palette } from "@/src/theme";
import { tws } from "@/src/utils/tws";

export default function HelpScreen() {
    const router = useRouter();

    const HelpItem = ({ icon, label, onPress }: any) => (
        <TouchableOpacity style={tws("flex-row items-center justify-between py-3.5 px-4")} onPress={onPress}>
            <View style={tws("flex-row items-center flex-1")}>
                <View style={tws("w-9 h-9 rounded-full items-center justify-center mr-3 bg-white/60")}>
                    <Ionicons name={icon} size={18} color={(palette as any)['slate-500']} />
                </View>
                <AppText variant="bodyBold" color="slate-700">{label}</AppText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={(palette as any)['slate-300']} />
        </TouchableOpacity>
    );

    const FAQItem = ({ question, answer }: any) => (
        <View style={tws("p-4")}>
            <AppText variant="bodyBold" color="slate-800" style={tws("mb-1.5")}>{question}</AppText>
            <AppText variant="caption" color="slate-500" style={tws("leading-5")}>{answer}</AppText>
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
                <AppText variant="h2" color="slate-800">Hỗ trợ</AppText>
                <View style={tws("w-10")} />
            </View>

            <ScrollView style={tws("flex-1")} contentContainerStyle={tws("p-5")}>
                <Reveal delay={100}>
                    <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                        Liên hệ chúng tôi
                    </AppText>
                    <View style={tws("bg-white/45 rounded-[32px] py-1 border border-white/60 shadow-glass")}>
                        <HelpItem
                            icon="mail-outline"
                            label="Gửi email hỗ trợ"
                            onPress={() => Linking.openURL('mailto:support@emplus.app')}
                        />
                        <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                        <HelpItem
                            icon="chatbubbles-outline"
                            label="Chat với chúng tôi"
                            onPress={() => { }}
                        />
                        <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                        <HelpItem
                            icon="logo-facebook"
                            label="Cộng đồng Em Plus"
                            onPress={() => Linking.openURL('https://facebook.com/emplus')}
                        />
                    </View>
                </Reveal>

                <Reveal delay={200}>
                    <View style={tws("mt-8")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Câu hỏi thường gặp
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] py-1 border border-white/60 shadow-glass")}>
                            <FAQItem
                                question="Làm thế nào để ghép đôi?"
                                answer="Vào mục Hồ sơ, chọn 'Mã cặp đôi' và gửi mã này cho đối phương để họ nhập vào ứng dụng."
                            />
                            <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                            <FAQItem
                                question="Dữ liệu của tôi có được bảo mật không?"
                                answer="Tất cả kỷ niệm và hình ảnh của bạn đều được mã hóa và chỉ có hai bạn mới có quyền truy cập."
                            />
                            <View style={tws("h-[1px] bg-slate-100/40 mx-4")} />
                            <FAQItem
                                question="Tôi có thể dùng trên nhiều thiết bị không?"
                                answer="Có, bạn chỉ cần đăng nhập bằng cùng một email trên bất kỳ thiết bị nào."
                            />
                        </View>
                    </View>
                </Reveal>

                <Reveal delay={300}>
                    <View style={tws("items-center mt-10 mb-5")}>
                        <AppText variant="caption" color="slate-300" style={tws("leading-5 text-center")}>
                            Version 1.0.0 (Build 20260305){"\n"}
                            © 2026 Em Plus Team
                        </AppText>
                    </View>
                </Reveal>
            </ScrollView>
        </AppScreen>
    );
}


