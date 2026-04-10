---
title: "mobile/app/profile-details/privacy.tsx"
description: "The `PrivacyScreen` class is responsible for rendering the privacy settings screen in an application."
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
  page: "reference/files/mobile/app/profile-details/privacy.tsx.md"
  relativePath: "mobile/app/profile-details/privacy.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/privacy.tsx"
  module: "mobile/app/profile-details"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/app/profile-details/privacy.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/profile-details](../../../../modules/mobile/app/profile-details.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/privacy.tsx`
- Lines: 321
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

The `PrivacyScreen` class is responsible for rendering the privacy settings screen in an application.

### Usage Notes

- This class is used to display the privacy settings screen, which includes options to private profile, show online status, and sync from user.

## Public API

- `function PrivacyScreen()`

## Symbols

### function `PrivacyScreen`

- Signature: `function PrivacyScreen()`
- Lines: 82-320
- Exported: yes

```tsx
function PrivacyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { session, setSession } = useSession();
  const { showToast } = useToast();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [profilePrivate, setProfilePrivate] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  const lastPrivateNetworkEndedAtRef = useRef(0);
  const lastOnlineNetworkEndedAtRef = useRef(0);

  const syncPrivacyFromUser = useCallback(
    (user: { profilePrivate?: boolean; showOnlineStatus?: boolean }) => {
      setProfilePrivate(user.profilePrivate === true);
      setShowOnlineStatus(user.showOnlineStatus !== false);
    },
    [],
  );

  const privateProfileMutation = useMutation({
    mutationFn: (next: boolean) =>
      dependencies.auth.updateProfile.execute({ profilePrivate: next }),
    onSuccess: (user) => {
      setSession((prev) => (prev ? { ...prev, user } : null));
      syncPrivacyFromUser(user);
      showToast(
        user.profilePrivate === true ? "Đã bật hồ sơ riêng tư" : "Đã tắt hồ sơ riêng tư",
        "success",
      );
    },
    onError: (err: unknown) => {
      showToast(toDisplayError(err), "error");
      const v = session?.user?.profilePrivate === true;
      setProfilePrivate(v);
    },
  });

  const showOnlineMutation = useMutation({
    mutationFn: (next: boolean) =>
      dependencies.auth.updateProfile.execute({ showOnlineStatus: next }),
    onSuccess: (user) => {
      setSession((prev) => (prev ? { ...prev, user } : null));
      syncPrivacyFromUser(user);
      showToast(
        user.showOnlineStatus !== false
          ? "Đã bật hiển thị trạng thái online"
          : "Đã tắt hiển thị trạng thái online",
        "success",
      );
    },
    onError: (err: unknown) => {
      showToast(toDisplayError(err), "error");
      setShowOnlineStatus(session?.user?.showOnlineStatus !== false);
    },
  });

  const refreshPrivacyFromSession = useCallback(() => {
    setProfilePrivate(session?.user?.profilePrivate === true);
    setShowOnlineStatus(session?.user?.showOnlineStatus !== false);
  }, [session?.user?.profilePrivate, session?.user?.showOnlineStatus]);

  useFocusEffect(
    useCallback(() => {
      refreshPrivacyFromSession();
    }, [refreshPrivacyFromSession]),
  );

  const onPrivateToggle = useCallback(
    (next: boolean) => {
      if (privateProfileMutation.isPending) {
        return;
      }
      const sinceLast = Date.now() - lastPrivateNetworkEndedAtRef.current;
      if (
        lastPrivateNetworkEndedAtRef.current > 0 &&
        sinceLast < SETTINGS_TOGGLE_MIN_INTERVAL_MS
      ) {
        return;
      }
      privateProfileMutation.mutate(next, {
        onSettled: () => {
          lastPrivateNetworkEndedAtRef.current = Date.now();
        },
      });
    },
    [privateProfileMutation],
  );

  const onOnlineToggle = useCallback(
    (next: boolean) => {
      if (showOnlineMutation.isPending) {
        return;
      }
      const sinceLast = Date.now() - lastOnlineNetworkEndedAtRef.current;
      if (
        lastOnlineNetworkEndedAtRef.current > 0 &&
        sinceLast < SETTINGS_TOGGLE_MIN_INTERVAL_MS
      ) {
        return;
      }
      showOnlineMutation.mutate(next, {
        onSettled: () => {
          lastOnlineNetworkEndedAtRef.current = Date.now();
        },
      });
    },
    [showOnlineMutation],
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
                {privateProfileMutation.isPending ? (
                  <ActivityIndicator color={colors.brand.default} />
                ) : (
                  <Switch
                    value={profilePrivate}
                    onValueChange={onPrivateToggle}
                    disabled={privateProfileMutation.isPending}
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
                {showOnlineMutation.isPending ? (
                  <ActivityIndicator color={colors.brand.default} />
                ) : (
                  <Switch
                    value={showOnlineStatus}
                    onValueChange={onOnlineToggle}
                    disabled={showOnlineMutation.isPending}
                    trackColor={{
                      false: colors.border.subtle,
                      true: colors.brand.default,
                    }}
                    thumbColor={colors.text.inverse}
                  />
                )}
              </View>

              {/*
                Phase sau (chưa ship release này): "Cho phép nhắn tin" / tin từ người lạ.
                Cần API + policy trước khi bật lại UI.
              */}
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
```

### function `createStyles`

- Signature: `function createStyles(c: SemanticColors)`
- Lines: 31-80
- Exported: no

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
```
