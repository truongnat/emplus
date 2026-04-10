---
title: "mobile/app/profile-details/notifications.tsx"
description: "The NotificationsScreen function provides the necessary state and functionality to display and handle notifications in a mobile app."
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/app/profile-details/notifications.tsx.md"
  relativePath: "mobile/app/profile-details/notifications.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/notifications.tsx"
  module: "mobile/app/profile-details"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/app/profile-details/notifications.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/profile-details](../../../../modules/mobile/app/profile-details.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/notifications.tsx`
- Lines: 385
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

The NotificationsScreen function provides the necessary state and functionality to display and handle notifications in a mobile app.

### Responsibilities

- NotificationsScreen

### Usage Notes

- This function is responsible for rendering the notification UI and handling user settings and notifications.

## Public API

- `function NotificationsScreen()`

## Symbols

### function `NotificationsScreen`

- Signature: `function NotificationsScreen()`
- Lines: 96-384
- Exported: yes

```tsx
function NotificationsScreen() {
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
```

### function `createStyles`

- Signature: `function createStyles(c: SemanticColors)`
- Lines: 40-94
- Exported: no
- Summary: Creates stylesheets based on provided theme colors

```tsx
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
```
