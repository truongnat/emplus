---
title: "mobile/app/profile-details/personal-info.tsx"
description: "PersonalInfoScreen function generates and manages user profile information data."
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
  page: "reference/files/mobile/app/profile-details/personal-info.tsx.md"
  relativePath: "mobile/app/profile-details/personal-info.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/personal-info.tsx"
  module: "mobile/app/profile-details"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/app/profile-details/personal-info.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/profile-details](../../../../modules/mobile/app/profile-details.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/personal-info.tsx`
- Lines: 397
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

PersonalInfoScreen function generates and manages user profile information data.

### Responsibilities

- createStyles
- useThemeColors
- calculate DobIso

### Usage Notes

- The PersonalInfoScreen handles the main profile details page, managing state variables for user input and data calculations.

## Public API

- `function PersonalInfoScreen()`

## Symbols

### function `PersonalInfoScreen`

- Signature: `function PersonalInfoScreen()`
- Lines: 119-396
- Exported: yes

```tsx
function PersonalInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { session, setSession, hydrated } = useSession();
  const { showToast } = useToast();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  /** Ngày sinh gửi API: YYYY-MM-DD */
  const [dobIso, setDobIso] = useState("");
  const [birthTimeHm, setBirthTimeHm] = useState("");
  const [dateSheetOpen, setDateSheetOpen] = useState(false);
  const [timeSheetOpen, setTimeSheetOpen] = useState(false);

  useEffect(() => {
    const u = session?.user;
    if (!u || !hydrated) return;
    setFullName(u.fullName ?? "");
    setNickname(u.nickname ?? "");
    setEmail(u.email ?? "");
    setDobIso(u.dob ?? "");
    setBirthTimeHm(u.birthTime ?? "");
  }, [session?.user, hydrated]);

  const scrollPadBottom = Math.max(insets.bottom + 32, 48);

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: async () => {
      const body: UserModule.UpdateProfileRequest = {
        fullName: fullName.trim(),
        nickname: nickname.trim() || undefined,
        dob: dobIso.trim() || undefined,
        birthTime: birthTimeHm.trim() || undefined,
      };
      return dependencies.auth.updateProfile.execute(body);
    },
    onSuccess: (user) => {
      setSession((prev) => (prev ? { ...prev, user } : null));
      showToast("Đã lưu hồ sơ", "success");
      router.back();
    },
    onError: (err: unknown) => {
      showToast(toDisplayError(err), "error");
    },
  });

  const onConfirmTime = useCallback((hm: string) => {
    setBirthTimeHm(hm);
  }, []);

  const onConfirmDate = useCallback((iso: string) => {
    setDobIso(iso);
  }, []);

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
        <KeyboardAvoidingView
          style={styles.screenRoot}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={insets.top}
        >
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
            <View style={styles.headerCenter}>
              <AppText style={styles.headerTitle}>Chỉnh sửa hồ sơ</AppText>
            </View>
            <View style={styles.headerSideSpacer} />
          </View>

          <ScrollView
            style={{ flex: 1, backgroundColor: "transparent" }}
            contentContainerStyle={{ paddingBottom: scrollPadBottom }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AppText style={styles.hint}>
              Tên hiển thị là tên chính trên tab Hồ sơ (có thể để trống để dùng
              họ tên). Ngày sinh hiển thị D/M/YYYY. Giờ sinh lưu HH:mm (24h).
            </AppText>

            <View style={styles.section}>
              <AppText style={styles.sectionLabel}>Thông tin cơ bản</AppText>
            </View>

            <View style={styles.fieldContainer}>
              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Họ và tên</AppText>
                  <TextInput
                    style={styles.fieldInput}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor={colors.text.tertiary}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="at-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Tên hiển thị</AppText>
                  <TextInput
                    style={styles.fieldInput}
                    value={nickname}
                    onChangeText={setNickname}
                    placeholder="Ví dụ: Mèo, Anh yêu…"
                    placeholderTextColor={colors.text.tertiary}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Email</AppText>
                  <TextInput
                    style={[styles.fieldInput, styles.fieldInputReadonly]}
                    value={email}
                    editable={false}
                    placeholderTextColor={colors.text.tertiary}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Ngày sinh</AppText>
                  <Pressable
                    onPress={() => setDateSheetOpen(true)}
                    accessibilityRole="button"
                    accessibilityLabel="Chọn ngày sinh"
                    style={styles.dobValueRow}
                  >
                    <AppText
                      style={[
                        styles.dobValueText,
                        ...(dobIso.trim() ? [] : [styles.dobPlaceholder]),
                      ]}
                    >
                      {dobIso.trim()
                        ? formatDobDisplayVn(dobIso)
                        : "Chọn ngày sinh"}
                    </AppText>
                    <Ionicons
                      name="calendar-outline"
                      size={22}
                      color={colors.text.secondary}
                    />
                  </Pressable>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Giờ sinh</AppText>
                  <Pressable
                    onPress={() => setTimeSheetOpen(true)}
                    accessibilityRole="button"
                    accessibilityLabel="Chọn giờ sinh"
                    style={styles.dobValueRow}
                  >
                    <AppText
                      style={[
                        styles.dobValueText,
                        ...(birthTimeHm.trim() ? [] : [styles.dobPlaceholder]),
                      ]}
                    >
                      {birthTimeHm.trim() ? birthTimeHm : "Chọn giờ sinh"}
                    </AppText>
                    <Ionicons
                      name="time-outline"
                      size={22}
                      color={colors.text.secondary}
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
              {isPending ? (
                <ActivityIndicator color={colors.brand.default} />
              ) : (
                <AppButton
                  label="Lưu thay đổi"
                  onPress={() => saveProfile()}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <BirthDatePickerSheet
        visible={dateSheetOpen}
        onClose={() => setDateSheetOpen(false)}
        initialIso={dobIso || null}
        onConfirm={onConfirmDate}
      />
      <BirthTimePickerSheet
        visible={timeSheetOpen}
        onClose={() => setTimeSheetOpen(false)}
        initialHm={birthTimeHm || null}
        onConfirm={onConfirmTime}
      />
    </AppScreen>
  );
}
```

### function `createStyles`

- Signature: `function createStyles(c: SemanticColors)`
- Lines: 35-117
- Exported: no

```tsx
function createStyles(c: SemanticColors) {
  return StyleSheet.create({
    screenRoot: { flex: 1, zIndex: 1 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    headerCenter: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    headerSideSpacer: { width: 40, height: 40 },
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
    fieldContainer: {
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
    },
    fieldRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 12,
    },
    fieldIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: c.surface.sunken,
      alignItems: "center",
      justifyContent: "center",
    },
    fieldContainer2: { flex: 1 },
    fieldLabel: {
      fontSize: 13,
      fontWeight: "bold",
      color: c.text.tertiary,
      marginBottom: 4,
    },
    fieldInput: { fontSize: 15, color: c.text.primary, padding: 8 },
    fieldInputReadonly: { opacity: 0.75 },
    divider: { height: 1, backgroundColor: c.border.subtle, marginVertical: 8 },
    hint: {
      fontSize: 12,
      color: c.text.tertiary,
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    dobValueRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 4,
    },
    dobValueText: { fontSize: 15, color: c.text.primary, fontWeight: "600" },
    dobPlaceholder: { color: c.text.tertiary, fontWeight: "500" },
  });
}
```
