import { useCallback, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  View,
  ScrollView,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText } from "@/src/ui-kit";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { useThemeColors, useThemeMode } from "@/src/theme";
import type { SemanticColors } from "@/src/theme/tokens/semantic";
import {
  getPushNotificationsPreference,
  setPushNotificationsPreference,
} from "@/src/features/notifications/push-notifications-preference";
import {
  clearExpoPushTokenOnServer,
  enableExpoPushOnServer,
} from "@/src/lib/sync-expo-push-token";
import { useToast } from "@/src/toast-context";
import { toDisplayError } from "@/src/api";
import { useSession } from "@/src/session-context";
import { dependencies } from "@/src/framework/di/dependencies";

/** Khoảng cách tối thiểu giữa hai lần gọi mạng (sau khi lần trước đã xong) — tránh spam toggle. */
const SETTINGS_TOGGLE_MIN_INTERVAL_MS = 450;

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
  const { showToast } = useToast();
  const { session, setSession } = useSession();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [pushHydrated, setPushHydrated] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushBusy, setPushBusy] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const lastPushNetworkEndedAtRef = useRef(0);
  const lastEmailNetworkEndedAtRef = useRef(0);

  const emailPrefMutation = useMutation({
    mutationFn: (emailNotificationsEnabled: boolean) =>
      dependencies.auth.updateProfile.execute({ emailNotificationsEnabled }),
    onSuccess: (user) => {
      setSession((prev) => (prev ? { ...prev, user } : null));
      setEmailEnabled(user.emailNotificationsEnabled !== false);
      showToast(
        user.emailNotificationsEnabled !== false
          ? "Đã bật thông báo qua email"
          : "Đã tắt thông báo qua email",
        "success",
      );
    },
    onError: (err: unknown) => {
      showToast(toDisplayError(err), "error");
    },
  });

  const refreshPushSwitch = useCallback(async () => {
    const pref = await getPushNotificationsPreference();
    const { status } = await Notifications.getPermissionsAsync();
    const granted = status === "granted";
    if (pref && status === "denied") {
      await setPushNotificationsPreference(false);
      setPushEnabled(false);
    } else {
      setPushEnabled(pref && granted);
    }
    setPushHydrated(true);
  }, []);

  const refreshEmailSwitch = useCallback(() => {
    const v = session?.user?.emailNotificationsEnabled;
    setEmailEnabled(v !== false);
  }, [session?.user?.emailNotificationsEnabled]);

  useFocusEffect(
    useCallback(() => {
      void refreshPushSwitch();
      refreshEmailSwitch();
    }, [refreshPushSwitch, refreshEmailSwitch]),
  );

  const onPushToggle = useCallback(
    async (next: boolean) => {
      if (pushBusy) {
        return;
      }
      const sinceLast =
        Date.now() - lastPushNetworkEndedAtRef.current;
      if (
        lastPushNetworkEndedAtRef.current > 0 &&
        sinceLast < SETTINGS_TOGGLE_MIN_INTERVAL_MS
      ) {
        return;
      }
      if (!next) {
        setPushBusy(true);
        try {
          await clearExpoPushTokenOnServer();
          await setPushNotificationsPreference(false);
          setPushEnabled(false);
          showToast("Đã tắt thông báo đẩy", "success");
        } catch (err: unknown) {
          showToast(toDisplayError(err), "error");
        } finally {
          setPushBusy(false);
          lastPushNetworkEndedAtRef.current = Date.now();
        }
        return;
      }

      setPushBusy(true);
      try {
        const result = await enableExpoPushOnServer();
        if (result.ok) {
          await setPushNotificationsPreference(true);
          setPushEnabled(true);
          showToast("Đã bật thông báo đẩy", "success");
          return;
        }
        await setPushNotificationsPreference(false);
        setPushEnabled(false);
        if (result.reason === "permission_denied") {
          showToast(
            "Cần quyền thông báo. Bạn có thể bật trong Cài đặt hệ thống.",
            "error",
          );
        } else if (result.reason === "not_device") {
          showToast(
            "Thông báo đẩy chỉ hoạt động trên điện thoại thật.",
            "error",
          );
        } else if (result.reason === "no_project_id") {
          showToast(
            "Thiếu cấu hình EAS (projectId), không lấy được token đẩy.",
            "error",
          );
        } else {
          showToast("Không lấy được token đẩy. Thử lại sau.", "error");
        }
      } catch (err: unknown) {
        showToast(toDisplayError(err), "error");
      } finally {
        setPushBusy(false);
        lastPushNetworkEndedAtRef.current = Date.now();
      }
    },
    [pushBusy, showToast],
  );

  const onEmailToggle = useCallback(
    (next: boolean) => {
      if (emailPrefMutation.isPending) {
        return;
      }
      const sinceLast = Date.now() - lastEmailNetworkEndedAtRef.current;
      if (
        lastEmailNetworkEndedAtRef.current > 0 &&
        sinceLast < SETTINGS_TOGGLE_MIN_INTERVAL_MS
      ) {
        return;
      }
      emailPrefMutation.mutate(next, {
        onSettled: () => {
          lastEmailNetworkEndedAtRef.current = Date.now();
        },
      });
    },
    [emailPrefMutation],
  );

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
              {pushBusy || !pushHydrated ? (
                <ActivityIndicator color={colors.brand.default} />
              ) : (
                <Switch
                  value={pushEnabled}
                  onValueChange={onPushToggle}
                  disabled={pushBusy}
                  trackColor={{
                    false: colors.border.subtle,
                    true: colors.brand.default,
                  }}
                  thumbColor={colors.text.inverse}
                />
              )}
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
              {emailPrefMutation.isPending ? (
                <ActivityIndicator color={colors.brand.default} />
              ) : (
                <Switch
                  value={emailEnabled}
                  onValueChange={onEmailToggle}
                  disabled={emailPrefMutation.isPending}
                  trackColor={{
                    false: colors.border.subtle,
                    true: colors.brand.default,
                  }}
                  thumbColor={colors.text.inverse}
                />
              )}
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
