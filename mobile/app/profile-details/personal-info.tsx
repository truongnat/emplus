import { useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen, Reveal, AppText } from "@/src/ui-kit";
import { useSession } from "@/src/session-context";
import { tws } from "@/src/utils/tws";
import { fonts, palette } from "@/src/theme";

export default function PersonalInfoScreen() {
    const router = useRouter();
    const { session } = useSession();
    const [fullName, setFullName] = useState(session?.user.fullName || "");
    const [gender, setGender] = useState(session?.user.gender || "MALE");

    return (
        <AppScreen>
            <View style={tws("flex-row items-center justify-between px-4 py-3")}>
                <TouchableOpacity
                    style={tws("w-10 h-10 rounded-full items-center justify-center bg-white shadow-glass")}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={(palette as any)['slate-800']} />
                </TouchableOpacity>
                <AppText variant="h2" color="slate-800">Cá nhân</AppText>
                <TouchableOpacity style={tws("h-10 px-4 items-center justify-center")} onPress={() => router.back()}>
                    <AppText variant="bodyBold" color="primary">Lưu</AppText>
                </TouchableOpacity>
            </View>

            <ScrollView style={tws("flex-1")} contentContainerStyle={tws("p-5")}>
                <Reveal delay={100}>
                    <View style={tws("mb-6")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Thông tin cơ bản
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] p-5 border border-white/60 shadow-glass")}>
                            <View style={tws("mb-5")}>
                                <AppText variant="captionBold" color="slate-500" style={tws("mb-2 uppercase tracking-wide")}>Họ và tên</AppText>
                                <TextInput
                                    style={[tws("h-12 bg-white/50 rounded-xl px-4 border border-slate-100/50"), { fontFamily: fonts.body, color: (palette as any)['slate-700'] }]}
                                    value={fullName}
                                    onChangeText={setFullName}
                                    placeholder="Nhập họ tên của bạn"
                                    placeholderTextColor={(palette as any).placeholder}
                                />
                            </View>

                            <View style={tws("mb-5")}>
                                <AppText variant="captionBold" color="slate-500" style={tws("mb-2 uppercase tracking-wide")}>Email</AppText>
                                <TextInput
                                    style={[tws("h-12 bg-slate-100/40 rounded-xl px-4"), { fontFamily: fonts.body, color: (palette as any)['slate-400'] }]}
                                    value={session?.user.email}
                                    editable={false}
                                />
                                <AppText variant="caption" color="slate-400" style={tws("mt-1 px-1 opacity-70")}>Email không thể thay đổi</AppText>
                            </View>

                            <View>
                                <AppText variant="captionBold" color="slate-500" style={tws("mb-2 uppercase tracking-wide")}>Giới tính</AppText>
                                <View style={tws("flex-row gap-3")}>
                                    <TouchableOpacity
                                        style={tws(
                                            "flex-1 h-11 rounded-xl items-center justify-center border",
                                            gender === 'MALE' ? "bg-primary/5 border-primary" : "bg-white/50 border-slate-100"
                                        )}
                                        onPress={() => setGender('MALE')}
                                    >
                                        <AppText variant={gender === 'MALE' ? "bodyBold" : "body"} color={gender === 'MALE' ? "primary" : "slate-500"}>
                                            Nam
                                        </AppText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={tws(
                                            "flex-1 h-11 rounded-xl items-center justify-center border",
                                            gender === 'FEMALE' ? "bg-primary/5 border-primary" : "bg-white/50 border-slate-100"
                                        )}
                                        onPress={() => setGender('FEMALE')}
                                    >
                                        <AppText variant={gender === 'FEMALE' ? "bodyBold" : "body"} color={gender === 'FEMALE' ? "primary" : "slate-500"}>
                                            Nữ
                                        </AppText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Reveal>

                <Reveal delay={200}>
                    <View style={tws("mb-6")}>
                        <AppText variant="captionBold" color="slate-400" style={tws("mb-3 px-1 uppercase tracking-widest")}>
                            Ngày kỷ niệm
                        </AppText>
                        <View style={tws("bg-white/45 rounded-[32px] p-5 border border-white/60 shadow-glass")}>
                            <TouchableOpacity style={tws("flex-row items-center justify-between py-1 px-5")}>
                                <View>
                                    <AppText variant="captionBold" color="slate-400" style={tws("uppercase tracking-wide")}>Ngày sinh của bạn</AppText>
                                    <AppText variant="bodyBold" color="slate-800" style={tws("mt-0.5")}>chưa thiết lập</AppText>
                                </View>
                                <Ionicons name="calendar-outline" size={20} color={(palette as any)['slate-300']} />
                            </TouchableOpacity>

                            <View style={tws("h-[1px] bg-slate-100/40 mx-5 my-4")} />

                            <TouchableOpacity style={tws("flex-row items-center justify-between py-1 px-5")}>
                                <View>
                                    <AppText variant="captionBold" color="slate-400" style={tws("uppercase tracking-wide")}>Ngày bắt đầu yêu</AppText>
                                    <AppText variant="bodyBold" color="slate-800" style={tws("mt-0.5")}>24/12/2024</AppText>
                                </View>
                                <Ionicons name="heart-outline" size={20} color={(palette as any).primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Reveal>
            </ScrollView>
        </AppScreen>
    );
}


