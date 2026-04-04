import { View, ScrollView, StyleSheet, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppScreen, AppText } from "@/src/ui-kit";
import { palette, useThemeColors } from "@/src/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  section: { marginTop: 24, marginBottom: 8, paddingHorizontal: 20 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    textTransform: "uppercase" as "uppercase",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  faqItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.zinc100,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "bold",
    color: palette.zinc800,
    marginBottom: 8,
  },
  faqAnswer: { fontSize: 15, color: palette.zinc600, lineHeight: 22 },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 16,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: { fontSize: 15, fontWeight: "bold", color: palette.zinc700 },
});

export default function HelpScreen() {
  const colors = useThemeColors();
  const handleEmailPress = () => {
    Linking.openURL("mailto:support@emplus.app");
  };

  return (
    <AppScreen>
      <View style={styles.header}>
        <Ionicons
          name="help-circle-outline"
          size={24}
          color={colors.brand.default}
        />
        <AppText
          style={{ fontSize: 20, fontWeight: "bold", color: palette.zinc900 }}
        >
          Trợ giúp
        </AppText>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <AppText
            style={{ fontSize: 15, color: palette.zinc700, lineHeight: 22 }}
          >
            Tìm câu trả lời cho các câu hỏi thường gặp hoặc liên hệ với chúng
            tôi để được hỗ trợ.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionLabel}>Câu hỏi thường gặp</AppText>
        </View>

        <View style={styles.card}>
          <View style={styles.faqItem}>
            <AppText style={styles.faqQuestion}>
              Làm thế nào để ghép đôi tài khoản?
            </AppText>
            <AppText style={styles.faqAnswer}>
              Vào phần Pairing, sao chép mã QR và gửi cho người ấy. Khi họ nhập
              mã, hai tài khoản sẽ được ghép đôi.
            </AppText>
          </View>
          <View style={styles.faqItem}>
            <AppText style={styles.faqQuestion}>
              Tôi quên mật khẩu phải làm sao?
            </AppText>
            <AppText style={styles.faqAnswer}>
              Nhấn "Quên mật khẩu" ở màn hình đăng nhập và làm theo hướng dẫn để
              đặt lại mật khẩu.
            </AppText>
          </View>
          <View style={styles.faqItem}>
            <AppText style={styles.faqQuestion}>
              Làm thế nào để xóa tài khoản?
            </AppText>
            <AppText style={styles.faqAnswer}>
              Vào Cài đặt → Tài khoản → Xóa tài khoản. Lưu ý: hành động này
              không thể hoàn tác.
            </AppText>
          </View>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionLabel}>Liên hệ</AppText>
        </View>

        <View style={styles.card}>
          <View style={styles.contactRow}>
            <View
              style={[styles.contactIcon, { backgroundColor: colors.brand.muted }]}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.brand.default}
              />
            </View>
            <AppText style={styles.contactText}>support@emplus.app</AppText>
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
}
