---
title: "mobile/app/profile-details/help.tsx"
description: "The HelpScreen function creates a component for displaying help information at the bottom of the mobile screen."
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
  page: "reference/files/mobile/app/profile-details/help.tsx.md"
  relativePath: "mobile/app/profile-details/help.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/help.tsx"
  module: "mobile/app/profile-details"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/app/profile-details/help.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/profile-details](../../../../modules/mobile/app/profile-details.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/help.tsx`
- Lines: 414
- Symbols: 4

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

The HelpScreen function creates a component for displaying help information at the bottom of the mobile screen.

### Usage Notes

- The HelpScreen function is part of the app's primary user interface.
- It provides a screen for displaying user help information.

## Public API

- `function HelpScreen()`

## Symbols

### function `HelpScreen`

- Signature: `function HelpScreen()`
- Lines: 211-413
- Exported: yes

```tsx
function HelpScreen() {
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
```

### type `FaqItem`

- Signature: `type FaqItem = { id: string; question: string; answer: string };`
- Lines: 34-34
- Exported: no

```tsx
type FaqItem = { id: string; question: string; answer: string };
```

### function `createStyles`

- Signature: `function createStyles(c: SemanticColors)`
- Lines: 81-201
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
```

### function `appDisplayVersion`

- Signature: `function appDisplayVersion(): string`
- Lines: 203-209
- Exported: no

```tsx
function appDisplayVersion(): string {
  return (
    Constants.nativeApplicationVersion ??
    Constants.expoConfig?.version ??
    "—"
  );
}
```
