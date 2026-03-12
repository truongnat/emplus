import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

import { AppScreen, AppText, GlassCard, Reveal } from "../src/ui-kit";
import { palette } from "../src/theme";

interface SectionProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
    color: string;
}

function PolicySection({ icon, title, content, isOpen, onToggle, color }: SectionProps) {
    return (
        <View style={styles.sectionWrap}>
            <Pressable onPress={onToggle} style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                    <Ionicons name={icon} size={22} color={color} />
                    <AppText variant="bodyBold" style={styles.sectionTitle}>{title}</AppText>
                </View>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={palette['slate-400']}
                />
            </Pressable>
            {isOpen && (
                <View style={styles.sectionContent}>
                    <AppText variant="body" color={palette.muted} style={styles.contentText}>
                        {content}
                    </AppText>
                </View>
            )}
        </View>
    );
}

export default function PolicyScreen() {
    const router = useRouter();
    const [openSection, setOpenSection] = useState<string | null>("collect");

    const toggleSection = (key: string) => {
        setOpenSection(openSection === key ? null : key);
    };

    return (
        <AppScreen>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={palette.ink} />
                </Pressable>
                <AppText variant="h3" style={styles.headerTitle}>Chính sách và Bảo mật</AppText>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Reveal>
                    <AppText variant="h1" style={styles.mainTitle}>Quyền riêng tư của bạn</AppText>
                    <AppText variant="body" color={palette.muted} style={styles.intro}>
                        Chào mừng bạn đến với <AppText variant="bodyBold" color={palette.primary}>Crystal Structure</AppText>.
                        Chúng tôi cam kết bảo vệ thông tin cá nhân và quyền riêng tư của bạn trong suốt hành trình lập kế hoạch cho ngày trọng đại nhất cuộc đời.
                    </AppText>

                    <View style={styles.sectionsContainer}>
                        <GlassCard>
                            <PolicySection
                                icon="analytics-outline"
                                title="Thu thập dữ liệu"
                                color={palette.primary}
                                isOpen={openSection === "collect"}
                                onToggle={() => toggleSection("collect")}
                                content="Chúng tôi thu thập các thông tin cần thiết như tên, email, ngày cưới dự kiến và sở thích cá nhân để cá nhân hóa trải nghiệm và cung cấp những gợi ý dịch vụ cưới tốt nhất dành riêng cho bạn."
                            />
                            <View style={styles.divider} />
                            <PolicySection
                                icon="information-circle-outline"
                                title="Sử dụng thông tin"
                                color={palette.accent}
                                isOpen={openSection === "use"}
                                onToggle={() => toggleSection("use")}
                                content="Dữ liệu của bạn được sử dụng để tối ưu hóa quy trình lập kế hoạch, liên kết với các nhà cung cấp dịch vụ được bạn lựa chọn và cải thiện tính năng ứng dụng dựa trên hành vi người dùng."
                            />
                            <View style={styles.divider} />
                            <PolicySection
                                icon="shield-checkmark-outline"
                                title="Bảo mật dữ liệu"
                                color={palette.primary}
                                isOpen={openSection === "security"}
                                onToggle={() => toggleSection("security")}
                                content="Crystal Structure áp dụng các tiêu chuẩn mã hóa tiên tiến nhất để bảo vệ thông tin cá nhân của bạn khỏi các truy cập trái phép. Chúng tôi không chia sẻ dữ liệu của bạn cho bên thứ ba khi chưa có sự đồng ý."
                            />
                            <View style={styles.divider} />
                            <PolicySection
                                icon="checkmark-circle-outline"
                                title="Quyền của người dùng"
                                color={palette.accent}
                                isOpen={openSection === "rights"}
                                onToggle={() => toggleSection("rights")}
                                content="Bạn hoàn toàn có quyền truy cập, sửa đổi hoặc yêu cầu xóa bỏ vĩnh viễn dữ liệu cá nhân của mình bất kỳ lúc nào thông qua cài đặt tài khoản hoặc liên hệ trực tiếp với đội ngũ hỗ trợ của chúng tôi."
                            />
                        </GlassCard>
                    </View>

                    <View style={styles.footer}>
                        <AppText variant="h3" style={styles.footerTitle}>Bạn có thắc mắc?</AppText>
                        <AppText variant="caption" color={palette.muted} textAlign="center">
                            Liên hệ với đội ngũ pháp lý của chúng tôi tại privacy@crystalstructure.vn
                        </AppText>
                    </View>
                </Reveal>
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: palette.glass,
    },
    headerTitle: {
        fontSize: 18,
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: 32,
        marginTop: 20,
        marginBottom: 12,
    },
    intro: {
        lineHeight: 24,
        marginBottom: 32,
    },
    sectionsContainer: {
        gap: 16,
    },
    sectionWrap: {
        paddingVertical: 4,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    sectionTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    sectionTitle: {
        fontSize: 16,
    },
    sectionContent: {
        paddingLeft: 34,
        paddingBottom: 12,
    },
    contentText: {
        lineHeight: 20,
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: palette.divider,
        marginVertical: 4,
    },
    footer: {
        marginTop: 48,
        alignItems: "center",
        gap: 8,
    },
    footerTitle: {
        fontSize: 20,
    },
});
