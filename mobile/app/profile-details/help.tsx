import { useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText } from "@/src/ui-kit";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { useThemeColors, useThemeMode } from "@/src/theme";
import type { SemanticColors } from "@/src/theme/tokens/semantic";

function createStyles(c: SemanticColors) {
  return StyleSheet.create({
    screenRoot: { flex: 1, zIndex: 1 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
    },
    headerTitle: { fontSize: 18, fontWeight: "800", color: c.text.primary },
    section: { marginTop: 8, marginBottom: 8, paddingHorizontal: 20 },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "bold",
      color: c.text.tertiary,
      textTransform: "uppercase" as "uppercase",
      letterSpacing: 1,
    },
    card: {
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
    },
    introText: { fontSize: 15, color: c.text.secondary, lineHeight: 22 },
    faqItem: {
      paddingVertical: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.border.subtle,
    },
    faqQuestion: {
      fontSize: 15,
      fontWeight: "bold",
      color: c.text.primary,
      marginBottom: 8,
    },
    faqAnswer: { fontSize: 15, color: c.text.secondary, lineHeight: 22 },
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
    contactText: { fontSize: 15, fontWeight: "bold", color: c.text.primary },
  });
}

export default function HelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleEmailPress = () => {
    Linking.openURL("mailto:support@emplus.app");
  };

  const scrollPadBottom = Math.max(insets.bottom + 32, 48);

  return (
    <AppScreen
      applyTopSafeAreaPadding={false}
      wrapWithKeyboardDismiss={false}
      style={{
        ...loginScreenStyles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={loginScreenStyles.appContent}
      animatedEntrance={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={homeScreenStyles.layerRoot}>
        <LoginGridAnimatedBackground isDark={isDark} />
        <View style={styles.screenRoot}>
          <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Quay lại"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={colors.text.primary}
              />
            </TouchableOpacity>
            <AppText style={styles.headerTitle}>Trợ giúp</AppText>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1, backgroundColor: "transparent" }}
            contentContainerStyle={{ paddingBottom: scrollPadBottom }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <AppText style={styles.introText}>
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
                  Nhấn &quot;Quên mật khẩu&quot; ở màn hình đăng nhập và làm theo hướng dẫn để
                  đặt lại mật khẩu.
                </AppText>
              </View>
              <View style={[styles.faqItem, { borderBottomWidth: 0 }]}>
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
              <TouchableOpacity
                style={styles.contactRow}
                onPress={handleEmailPress}
                accessibilityRole="button"
                accessibilityLabel="Gửi email tới hỗ trợ"
              >
                <View
                  style={[
                    styles.contactIcon,
                    { backgroundColor: colors.brand.muted },
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.brand.default}
                  />
                </View>
                <AppText style={styles.contactText}>support@emplus.app</AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
}
