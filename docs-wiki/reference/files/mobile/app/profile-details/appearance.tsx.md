---
title: "mobile/app/profile-details/appearance.tsx"
description: "AppearanceScreen function returns a styled application layout with customizable themes, colors, and styling."
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
  page: "reference/files/mobile/app/profile-details/appearance.tsx.md"
  relativePath: "mobile/app/profile-details/appearance.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/appearance.tsx"
  module: "mobile/app/profile-details"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/app/profile-details/appearance.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/profile-details](../../../../modules/mobile/app/profile-details.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/profile-details/appearance.tsx`
- Lines: 366
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

AppearanceScreen function returns a styled application layout with customizable themes, colors, and styling.

### Responsibilities

- Create styled app layouts with theme and color customization options

### Usage Notes

- This function uses various hooks and functions from the mobile/app/profile-details/appearance.tsx file to achieve its goal. It assumes a certain set of dependencies are imported and used.

## Public API

- `function AppearanceScreen()`

## Symbols

### function `AppearanceScreen`

- Signature: `function AppearanceScreen()`
- Lines: 84-365
- Exported: yes

```tsx
function AppearanceScreen() {
  const themeColors = useThemeColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    colorScheme,
    setThemePreference,
    themePreference,
    isDark,
  } = useThemeMode();
  useAuthGridChrome(isDark, themeColors.background.default, true);
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

  /* Tạm tắt — màu nhấn chỉ đổi state local, không ảnh hưởng app theme.
  const [accentColor, setAccentColor] = useState("#ec1334");
  const accentSwatches = [
    "#ec1334",
    "#f43f5e",
    "#8b5cf6",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
  ];
  */

  const lightSelected =
    themePreference === "light" ||
    ((themePreference === "system" || themePreference === "daylight") &&
      colorScheme === "light");
  const darkSelected =
    themePreference === "dark" ||
    ((themePreference === "system" || themePreference === "daylight") &&
      colorScheme === "dark");

  const scrollPadBottom = Math.max(insets.bottom + 32, 48);

  /** Preview “Sáng” trên nền dark: tránh trắng tinh chói; trên nền light giữ nền app sáng. */
  const lightPreviewSurface = isDark ? palette.zinc100 : palette.white;
  const lightPreviewBorder = isDark ? palette.zinc400 : palette.zinc200;
  const lightPreviewSkeleton = isDark ? palette.zinc500 : palette.zinc300;

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
                color={themeColors.text.primary}
              />
            </TouchableOpacity>
            <AppText style={styles.headerTitle}>Giao diện</AppText>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1, backgroundColor: "transparent" }}
            contentContainerStyle={{ padding: 20, paddingBottom: scrollPadBottom }}
            showsVerticalScrollIndicator={false}
          >
            <>
              <AppText style={styles.sectionLabel}>Chế độ hiển thị</AppText>
              <View style={styles.themeRow}>
                <TouchableOpacity
                  style={styles.themeButton}
                  onPress={() => setThemePreference("light")}
                  accessibilityRole="button"
                  accessibilityLabel="Chế độ sáng"
                  accessibilityState={{ selected: lightSelected }}
                >
                  <View
                    style={[
                      styles.themePreview,
                      {
                        backgroundColor: lightPreviewSurface,
                        borderColor: lightPreviewBorder,
                      },
                      isDark && {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.35,
                        shadowRadius: 3,
                        elevation: 3,
                      },
                      lightSelected && {
                        borderColor: themeColors.brand.default,
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "60%",
                        height: 6,
                        backgroundColor: lightPreviewSkeleton,
                        borderRadius: 3,
                        marginBottom: 6,
                      }}
                    />
                    <View
                      style={{
                        width: "40%",
                        height: 6,
                        backgroundColor: lightPreviewSkeleton,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                  <AppText
                    style={[
                      styles.themeLabel,
                      lightSelected
                        ? { color: themeColors.brand.default }
                        : styles.themeLabelDefault,
                    ]}
                  >
                    Sáng
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.themeButton}
                  onPress={() => setThemePreference("dark")}
                  accessibilityRole="button"
                  accessibilityLabel="Chế độ tối"
                  accessibilityState={{ selected: darkSelected }}
                >
                  <View
                    style={[
                      styles.themePreview,
                      {
                        backgroundColor: palette.zinc800,
                        borderColor: palette.zinc700,
                      },
                      darkSelected && {
                        borderColor: themeColors.brand.default,
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "60%",
                        height: 6,
                        backgroundColor: palette.zinc600,
                        borderRadius: 3,
                        marginBottom: 6,
                      }}
                    />
                    <View
                      style={{
                        width: "40%",
                        height: 6,
                        backgroundColor: palette.zinc600,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                  <AppText
                    style={[
                      styles.themeLabel,
                      darkSelected
                        ? { color: themeColors.brand.default }
                        : styles.themeLabelDefault,
                    ]}
                  >
                    Tối
                  </AppText>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 16,
                  rowGap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setThemePreference("system")}
                  style={{ paddingVertical: 8, paddingHorizontal: 4 }}
                  accessibilityRole="button"
                  accessibilityLabel="Theo cài đặt hệ thống"
                  accessibilityState={{ selected: themePreference === "system" }}
                >
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color:
                        themePreference === "system"
                          ? themeColors.brand.default
                          : themeColors.text.tertiary,
                    }}
                  >
                    Theo hệ thống
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setThemePreference("daylight")}
                  style={{ paddingVertical: 8, paddingHorizontal: 4 }}
                  accessibilityRole="button"
                  accessibilityLabel="Theo ngày và đêm theo giờ địa phương"
                  accessibilityState={{ selected: themePreference === "daylight" }}
                >
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color:
                        themePreference === "daylight"
                          ? themeColors.brand.default
                          : themeColors.text.tertiary,
                    }}
                  >
                    Theo ngày / đêm
                  </AppText>
                </TouchableOpacity>
              </View>
              {themePreference === "daylight" ? (
                <AppText
                  style={{
                    marginTop: 6,
                    textAlign: "center",
                    fontSize: 12,
                    color: themeColors.text.tertiary,
                    paddingHorizontal: 12,
                  }}
                >
                  Tự động: sáng khoảng 6:00–19:00, tối các giờ còn lại (giờ máy).
                </AppText>
              ) : null}
            </>

            {/* Tạm tắt màu nhấn — chưa nối theme engine (xem comment đầu file / createStyles).
            <>
              <AppText style={[styles.sectionLabel, { marginTop: 32 }]}>
                Màu nhấn
              </AppText>
              <View style={styles.colorRow}>
                {accentSwatches.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={styles.colorButton}
                    onPress={() => setAccentColor(color)}
                  >
                    <View
                      style={[
                        styles.colorDot,
                        { backgroundColor: color },
                        accentColor === color && styles.colorDotSelected,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </>
            */}
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
}
```

### function `createStyles`

- Signature: `function createStyles(c: SemanticColors)`
- Lines: 16-82
- Exported: no
- Summary: Generate a styled application layout with customizable theme, colors, and styling based on provided color scheme.

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
      paddingHorizontal: 4,
      marginBottom: 16,
    },
    themeRow: { flexDirection: "row", gap: 16 },
    themeButton: { flex: 1 },
    themePreview: {
      width: "100%",
      height: 72,
      borderRadius: 16,
      borderWidth: 2,
      padding: 12,
      marginBottom: 8,
    },
    themeLabel: {
      fontSize: 11,
      fontWeight: "bold",
      textTransform: "uppercase" as "uppercase",
      letterSpacing: 1,
    },
    themeLabelDefault: { color: c.text.tertiary },
    /* Tạm tắt màu nhấn — chưa nối theme engine; bật lại khi có persist + override brand.
    colorRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    colorButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
    },
    colorDot: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 3,
      borderColor: c.surface.default,
    },
    colorDotSelected: { borderColor: c.text.primary },
    */
  });
}
```
