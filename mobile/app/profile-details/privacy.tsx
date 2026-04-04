import { useMemo, useState } from "react";
import { View, ScrollView, Switch, StyleSheet, TouchableOpacity } from "react-native";
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
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
    },
    settingLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
    settingText: { fontSize: 15, fontWeight: "bold", color: c.text.primary },
    settingSubtext: { fontSize: 13, color: c.text.secondary, marginTop: 2 },
    bodyText: { fontSize: 15, color: c.text.secondary, lineHeight: 22 },
  });
}

export default function PrivacyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [profilePrivate, setProfilePrivate] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);

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
            <AppText style={styles.headerTitle}>Quyền riêng tư</AppText>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1, backgroundColor: "transparent" }}
            contentContainerStyle={{ paddingBottom: scrollPadBottom }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <AppText style={styles.sectionLabel}>Tùy chọn hiển thị</AppText>
            </View>

            <View style={styles.card}>
              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <Ionicons
                    name="eye-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                  <View>
                    <AppText style={styles.settingText}>Hồ sơ riêng tư</AppText>
                    <AppText style={styles.settingSubtext}>
                      Chỉ người ghép đôi mới xem được
                    </AppText>
                  </View>
                </View>
                <Switch
                  value={profilePrivate}
                  onValueChange={setProfilePrivate}
                  trackColor={{
                    false: colors.border.subtle,
                    true: colors.brand.default,
                  }}
                  thumbColor={colors.text.inverse}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <Ionicons name="wifi" size={20} color={colors.text.secondary} />
                  <View>
                    <AppText style={styles.settingText}>
                      Hiển thị trạng thái online
                    </AppText>
                    <AppText style={styles.settingSubtext}>
                      Cho phép người khác thấy khi bạn online
                    </AppText>
                  </View>
                </View>
                <Switch
                  value={showOnlineStatus}
                  onValueChange={setShowOnlineStatus}
                  trackColor={{
                    false: colors.border.subtle,
                    true: colors.brand.default,
                  }}
                  thumbColor={colors.text.inverse}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                  <View>
                    <AppText style={styles.settingText}>Cho phép nhắn tin</AppText>
                    <AppText style={styles.settingSubtext}>
                      Nhận tin nhắn từ người lạ
                    </AppText>
                  </View>
                </View>
                <Switch
                  value={allowMessages}
                  onValueChange={setAllowMessages}
                  trackColor={{
                    false: colors.border.subtle,
                    true: colors.brand.default,
                  }}
                  thumbColor={colors.text.inverse}
                />
              </View>
            </View>

            <View style={styles.section}>
              <AppText style={styles.sectionLabel}>Dữ liệu</AppText>
            </View>

            <View style={styles.card}>
              <AppText style={styles.bodyText}>
                Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn. Dữ liệu được mã
                hóa và lưu trữ an toàn trên đám mây.
              </AppText>
            </View>
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
}
