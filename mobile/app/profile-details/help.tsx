import { useCallback, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText } from "@/src/ui-kit";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { useThemeColors, useThemeMode } from "@/src/theme";
import type { SemanticColors } from "@/src/theme/tokens/semantic";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FaqItem = { id: string; question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "pair",
    question: "Làm thế nào để ghép đôi với người ấy?",
    answer:
      "Mở màn Ghép đôi (sau đăng nhập nếu chưa kết nối bạn thường được chuyển tới đây; khi đã vào app có thể vào từ Trang chủ khi cần). Một người tạo mã (6 ký tự, có thể xem dạng QR), sao chép hoặc gửi cho đối phương. Người còn lại nhập mã vào ô “Dán mã tại đây” — khi mã đúng, hai tài khoản sẽ được kết nối.",
  },
  {
    id: "profile",
    question: "Chỉnh sửa tên, ngày sinh hoặc ảnh đại diện ở đâu?",
    answer:
      "Vào tab Tài khoản → Thông tin tài khoản để cập nhật họ tên, tên hiển thị, ngày sinh, giới tính và các thông tin khác. Ảnh đại diện và ảnh bìa có thể đổi trên cùng màn Tài khoản (nút camera trên avatar hoặc icon chỉnh ảnh bìa).",
  },
  {
    id: "notify",
    question: "Bật hoặc tắt thông báo đẩy và email?",
    answer:
      "Tài khoản → Thông báo. Tại đây bạn bật/tắt thông báo đẩy (cần cấp quyền hệ thống) và thông báo qua email. Nếu đã từ chối quyền, hãy mở Cài đặt hệ thống của điện thoại để bật lại cho Em+.",
  },
  {
    id: "privacy",
    question: "Hồ sơ riêng tư và trạng thái online hoạt động thế nào?",
    answer:
      "Tài khoản → Quyền riêng tư. Bạn có thể bật hồ sơ riêng tư và chọn có hiển thị trạng thái online hay không. Các tùy chọn được lưu trên tài khoản; phần hiển thị cho người khác sẽ được hoàn thiện dần qua các bản cập nhật.",
  },
  {
    id: "password",
    question: "Tôi quên mật khẩu thì làm sao?",
    answer:
      "Ở màn hình đăng nhập, chọn Quên mật khẩu, nhập email đã đăng ký và làm theo hướng dẫn (mã OTP gửi qua email) để đặt mật khẩu mới.",
  },
  {
    id: "logout",
    question: "Đăng xuất tài khoản?",
    answer:
      "Tab Tài khoản, kéo xuống cuối trang → Đăng xuất. Bạn có thể đăng nhập lại bất cứ lúc nào.",
  },
  {
    id: "delete",
    question: "Tôi muốn xóa tài khoản và dữ liệu?",
    answer:
      "Vui lòng gửi email tới địa chỉ hỗ trợ bên dưới. Chúng tôi sẽ hướng dẫn thủ tục theo chính sách bảo vệ dữ liệu cá nhân (xem thêm mục Điều khoản & quyền riêng tư).",
  },
];

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
      paddingHorizontal: 4,
      paddingVertical: 4,
      marginHorizontal: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
    },
    cardPadded: {
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
    },
    introText: { fontSize: 15, color: c.text.secondary, lineHeight: 22 },
    tipTitle: {
      fontSize: 14,
      fontWeight: "800",
      color: c.text.primary,
      marginBottom: 10,
    },
    tipLine: {
      fontSize: 14,
      color: c.text.secondary,
      lineHeight: 22,
      marginBottom: 6,
      paddingLeft: 4,
    },
    faqHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    faqHeaderBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.border.subtle,
    },
    faqQuestion: {
      flex: 1,
      fontSize: 15,
      fontWeight: "700",
      color: c.text.primary,
      lineHeight: 22,
    },
    faqAnswerWrap: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 0,
    },
    faqAnswer: { fontSize: 15, color: c.text.secondary, lineHeight: 22 },
    linkRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.border.subtle,
    },
    linkRowLast: { borderBottomWidth: 0 },
    linkLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
    linkIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    linkTitle: { fontSize: 15, fontWeight: "700", color: c.text.primary },
    linkSubtitle: {
      fontSize: 13,
      color: c.text.secondary,
      marginTop: 2,
    },
    versionText: {
      fontSize: 13,
      fontWeight: "600",
      color: c.text.tertiary,
      textAlign: "center",
      marginTop: 8,
      marginBottom: 4,
    },
  });
}

function appDisplayVersion(): string {
  return (
    Constants.nativeApplicationVersion ??
    Constants.expoConfig?.version ??
    "—"
  );
}

export default function HelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenFaqId((prev) => (prev === id ? null : id));
  }, []);

  const handleEmailPress = useCallback(() => {
    void Linking.openURL("mailto:support@emplus.app?subject=H%E1%BB%97%20tr%E1%BB%A3%20Em%2B");
  }, []);

  const scrollPadBottom = Math.max(insets.bottom + 32, 48);
  const version = appDisplayVersion();

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
            <View style={[styles.cardPadded, { marginBottom: 12 }]}>
              <AppText style={styles.introText}>
                Tìm nhanh câu trả lời bên dưới, xem điều khoản sử dụng hoặc gửi
                email cho đội Em+ nếu bạn cần hỗ trợ trực tiếp.
              </AppText>
            </View>

            <View style={styles.section}>
              <AppText style={styles.sectionLabel}>Mẹo nhanh</AppText>
            </View>
            <View style={styles.cardPadded}>
              <AppText style={styles.tipTitle}>Điều hướng trong app</AppText>
              <AppText style={styles.tipLine}>
                • Trang chủ: tổng quan cho cặp đôi đã ghép đôi.
              </AppText>
              <AppText style={styles.tipLine}>
                • Ghép đôi: màn hình mã mời (thường mở sau đăng nhập nếu chưa kết
                nối; có thể vào lại từ Trang chủ khi cần).
              </AppText>
              <AppText style={styles.tipLine}>
                • Tài khoản: thông tin cá nhân, thông báo, giao diện, quyền riêng
                tư và trợ giúp.
              </AppText>
            </View>

            <View style={styles.section}>
              <AppText style={styles.sectionLabel}>Câu hỏi thường gặp</AppText>
            </View>

            <View style={styles.card}>
              {FAQ_ITEMS.map((item, index) => {
                const open = openFaqId === item.id;
                const isLast = index === FAQ_ITEMS.length - 1;
                const headerDivider = !isLast || open;
                return (
                  <View key={item.id}>
                    <Pressable
                      onPress={() => toggleFaq(item.id)}
                      style={[
                        styles.faqHeader,
                        headerDivider ? styles.faqHeaderBorder : null,
                      ]}
                      accessibilityRole="button"
                      accessibilityState={{ expanded: open }}
                      accessibilityLabel={item.question}
                    >
                      <AppText style={styles.faqQuestion}>{item.question}</AppText>
                      <Ionicons
                        name={open ? "chevron-up" : "chevron-down"}
                        size={22}
                        color={colors.text.tertiary}
                      />
                    </Pressable>
                    {open ? (
                      <View style={styles.faqAnswerWrap}>
                        <AppText style={styles.faqAnswer}>{item.answer}</AppText>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>

            <View style={styles.section}>
              <AppText style={styles.sectionLabel}>Tài liệu & liên hệ</AppText>
            </View>

            <View style={styles.card}>
              <TouchableOpacity
                style={styles.linkRow}
                onPress={() => router.push("/policy")}
                accessibilityRole="button"
                accessibilityLabel="Mở điều khoản và quyền riêng tư"
              >
                <View style={styles.linkLeft}>
                  <View
                    style={[
                      styles.linkIcon,
                      { backgroundColor: colors.surface.sunken },
                    ]}
                  >
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color={colors.brand.default}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText style={styles.linkTitle}>
                      Điều khoản & quyền riêng tư
                    </AppText>
                    <AppText style={styles.linkSubtitle}>
                      Chính sách dữ liệu và quyền của bạn
                    </AppText>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.text.tertiary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.linkRow, styles.linkRowLast]}
                onPress={handleEmailPress}
                accessibilityRole="button"
                accessibilityLabel="Gửi email tới hỗ trợ"
              >
                <View style={styles.linkLeft}>
                  <View
                    style={[
                      styles.linkIcon,
                      { backgroundColor: colors.brand.muted },
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={colors.brand.default}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText style={styles.linkTitle}>Email hỗ trợ</AppText>
                    <AppText style={styles.linkSubtitle}>
                      support@emplus.app
                    </AppText>
                  </View>
                </View>
                <Ionicons
                  name="open-outline"
                  size={18}
                  color={colors.text.tertiary}
                />
              </TouchableOpacity>
            </View>

            <AppText style={styles.versionText}>Phiên bản {version}</AppText>
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
}
