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
    sectionLabel: {
      fontSize: 13,
      fontWeight: "bold",
      color: c.text.tertiary,
      textTransform: "uppercase" as "uppercase",
      letterSpacing: 1,
      paddingHorizontal: 20,
      marginTop: 8,
      marginBottom: 8,
    },
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.border.subtle,
    },
    settingLeft: { flexDirection: "row", alignItems: "center", gap: 16, flex: 1 },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: c.surface.sunken,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: c.border.subtle,
    },
    settingText: { fontSize: 15, fontWeight: "bold", color: c.text.primary },
    settingSubtext: { fontSize: 13, color: c.text.secondary, marginTop: 2 },
  });
}

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);

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
            <AppText style={styles.headerTitle}>Thông báo</AppText>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1, backgroundColor: "transparent" }}
            contentContainerStyle={{ paddingBottom: scrollPadBottom }}
            showsVerticalScrollIndicator={false}
          >
            <AppText style={styles.sectionLabel}>Tùy chọn</AppText>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="phone-portrait-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View>
                  <AppText style={styles.settingText}>Thông báo đẩy</AppText>
                  <AppText style={styles.settingSubtext}>
                    Thông báo đẩy từ ứng dụng
                  </AppText>
                </View>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{
                  false: colors.border.subtle,
                  true: colors.brand.default,
                }}
                thumbColor={colors.text.inverse}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View>
                  <AppText style={styles.settingText}>Thông báo email</AppText>
                  <AppText style={styles.settingSubtext}>
                    Thông báo qua email
                  </AppText>
                </View>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{
                  false: colors.border.subtle,
                  true: colors.brand.default,
                }}
                thumbColor={colors.text.inverse}
              />
            </View>

            <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View>
                  <AppText style={styles.settingText}>Nhắc nhở</AppText>
                  <AppText style={styles.settingSubtext}>
                    Nhắc nhở sự kiện quan trọng
                  </AppText>
                </View>
              </View>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{
                  false: colors.border.subtle,
                  true: colors.brand.default,
                }}
                thumbColor={colors.text.inverse}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
}
