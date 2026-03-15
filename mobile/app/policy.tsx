import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

import { AppScreen, AppText, GlassCard, Reveal } from "../src/ui-kit";
import { palette } from "../src/theme";

const styles = StyleSheet.create({
  sectionWrap: { marginBottom: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  sectionTitle: { fontSize: 15, fontWeight: "bold", color: palette.zinc800 },
  sectionContent: {
    marginTop: 8,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 12,
  },
  contentText: { fontSize: 15, color: palette.zinc600, lineHeight: 22 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    textTransform: "uppercase" as "uppercase",
    letterSpacing: 1,
  },
  card: { marginBottom: 16 },
});

interface SectionProps {
  icon: string;
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  color: string;
}

function PolicySection({
  icon,
  title,
  content,
  isOpen,
  onToggle,
  color,
}: SectionProps) {
  return (
    <View style={styles.sectionWrap}>
      <Pressable onPress={onToggle} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name={icon as any} size={22} color={color} />
          <AppText style={styles.sectionTitle}>{title}</AppText>
        </View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={palette.zinc400}
        />
      </Pressable>
      {isOpen && (
        <View style={styles.sectionContent}>
          <AppText style={styles.contentText}>{content}</AppText>
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

  const sections = [
    {
      key: "collect",
      icon: "datacontainers-outline",
      title: "Thu thập dữ liệu",
      color: palette.violet600,
      content:
        "Chúng tôi chỉ thu thập những thông tin cần thiết để cung cấp dịch vụ Em Plus, bao gồm: email, mật khẩu (mã hóa), giới tính, và ID người dùng. Không thu thập dữ liệu cá nhân nhạy cảm khác.",
    },
    {
      key: "use",
      icon: "settings-outline",
      title: "Sử dụng thông tin",
      color: palette.violet500,
      content:
        "Thông tin được sử dụng để: (1) Xác thực tài khoản, (2) Ghép đôi giữa hai người dùng, (3) Cá nhân hóa trải nghiệm, (4) Sao lưu dữ liệu đám mây (tùy chọn).",
    },
    {
      key: "share",
      icon: "share-outline",
      title: "Chia sẻ dữ liệu",
      color: palette.violet400,
      content:
        "Chúng tôi KHÔNG bán hoặc chia sẻ dữ liệu của bạn cho bên thứ ba. Dữ liệu chỉ được chia sẻ giữa hai tài khoản đã ghép đôi và với nhà cung cấp dịch vụ đám mây (Firebase) để sao lưu.",
    },
    {
      key: "security",
      icon: "shield-checkmark-outline",
      title: "Bảo mật",
      color: palette.green500,
      content:
        "Mật khẩu được mã hóa bcrypt. Dữ liệu truyền qua HTTPS. Bạn có thể xóa toàn bộ dữ liệu bất cứ lúc nào bằng cách hủy tài khoản trong phần Cài đặt.",
    },
    {
      key: "rights",
      icon: "person-outline",
      title: "Quyền của bạn",
      color: palette.blue500,
      content:
        "Bạn có quyền: (1) Truy cập dữ liệu cá nhân, (2) Sửa thông tin, (3) Xóa tài khoản và dữ liệu, (4) Ngừng sử dụng dịch vụ bất cứ lúc nào.",
    },
  ];

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Reveal>
          <View style={styles.headerRow}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={palette.violet600}
            />
            <AppText style={styles.headerText}>Chính sách bảo mật</AppText>
          </View>
        </Reveal>

        <GlassCard style={styles.card}>
          <AppText
            style={{
              fontSize: 15,
              color: palette.zinc700,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            Em Plus cam kết bảo vệ quyền riêng tư của bạn. Ứng dụng được thiết
            kế với nguyên tắc "quyền riêng tư từ đầu" (privacy by design), chỉ
            thu thập dữ liệu tối thiểu cần thiết.
          </AppText>
        </GlassCard>

        {sections.map((section) => (
          <PolicySection
            key={section.key}
            icon={section.icon}
            title={section.title}
            content={section.content}
            isOpen={openSection === section.key}
            onToggle={() => toggleSection(section.key)}
            color={section.color}
          />
        ))}

        <GlassCard style={{ marginTop: 24 }}>
          <View style={styles.headerRow}>
            <Ionicons name="mail-outline" size={20} color={palette.zinc600} />
            <AppText
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: palette.zinc800,
              }}
            >
              Liên hệ
            </AppText>
          </View>
          <AppText
            style={{
              fontSize: 15,
              color: palette.zinc600,
              lineHeight: 22,
              marginTop: 8,
            }}
          >
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên
            hệ: support@emplus.app
          </AppText>
        </GlassCard>
      </ScrollView>
    </AppScreen>
  );
}
