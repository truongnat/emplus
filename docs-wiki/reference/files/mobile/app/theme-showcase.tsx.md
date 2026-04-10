---
title: "mobile/app/theme-showcase.tsx"
description: "The ThemeShowcaseScreen function represents the main screen of the app, designed to showcase different themes and allow users to switch between them."
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
  page: "reference/files/mobile/app/theme-showcase.tsx.md"
  relativePath: "mobile/app/theme-showcase.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/theme-showcase.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/theme-showcase.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/theme-showcase.tsx`
- Lines: 526
- Symbols: 1

## AI Summary

The ThemeShowcaseScreen function represents the main screen of the app, designed to showcase different themes and allow users to switch between them.

### Responsibilities

- __DEV__
- useRouter()
- useTheme()
- useToast()
- useThemeMode()

### Usage Notes

- This function is responsible for rendering the theme options and updating the app's theme. It also handles the transition between themes by showing toast notifications.

## Public API

- `function ThemeShowcaseScreen()`

## Symbols

### function `ThemeShowcaseScreen`

- Signature: `function ThemeShowcaseScreen()`
- Lines: 31-370
- Exported: yes

```tsx
function ThemeShowcaseScreen() {
  if (!__DEV__) {
    const { Redirect } = require("expo-router");
    return <Redirect href="/" />;
  }

  const router = useRouter();
  const theme = useTheme();
  const colors = useThemeColors();
  const { showToast } = useToast();
  const { isDark, setColorScheme, themeName, setThemeName } = useThemeMode();

  const handleThemeChange = (name: ThemeName) => {
    setThemeName(name);
    showToast(
      name === "telegram"
        ? "Switched to Telegram theme"
        : "Switched to Aura theme",
      "success",
    );
  };

  const handleModeChange = (mode: "light" | "dark") => {
    setColorScheme(mode);
    showToast(`Switched to ${mode} mode`, "info");
  };

  return (
    <AppScreen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.brand.default }]}>
            Theme Showcase
          </Text>
          <Text style={styles.subtitle}>Switch between design systems</Text>
        </View>

        {/* Theme Selector */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Design System</Text>
          <View style={styles.themeButtons}>
            <TouchableOpacity
              style={[
                styles.themeButton,
                {
                  borderColor:
                    themeName === "telegram" ? colors.brand.default : "transparent",
                },
              ]}
              onPress={() => handleThemeChange("telegram")}
            >
              <Text
                style={[
                  styles.themeButtonText,
                  {
                    color:
                      themeName === "telegram"
                        ? colors.brand.default
                        : palette.zinc600,
                  },
                ]}
              >
                Telegram
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeButton,
                {
                  borderColor:
                    themeName === "aura" ? auraPalette.rose400 : "transparent",
                },
              ]}
              onPress={() => handleThemeChange("aura")}
            >
              <Text
                style={[
                  styles.themeButtonText,
                  {
                    color:
                      themeName === "aura"
                        ? auraPalette.rose400
                        : palette.zinc600,
                  },
                ]}
              >
                Aura Dating
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.currentTheme}>
            <Text style={styles.currentThemeLabel}>Theme:</Text>
            <Badge variant={themeName === "telegram" ? "info" : "primary"}>
              {themeName === "telegram" ? "Telegram Blue" : "Aura Rose"}
            </Badge>
          </View>

        </Card>

        {/* Dark/Light Mode Toggle */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Color Mode</Text>
          <View style={styles.modeButtons}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                {
                  backgroundColor: !isDark
                    ? colors.brand.muted
                    : palette.zinc100,
                  borderWidth: !isDark ? 2 : 0,
                  borderColor: !isDark ? colors.brand.default : "transparent",
                },
              ]}
              onPress={() => handleModeChange("light")}
            >
              <Text style={styles.modeButtonText}>☀️ Light</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeButton,
                {
                  backgroundColor: isDark ? colors.brand.muted : palette.zinc800,
                  borderWidth: isDark ? 2 : 0,
                  borderColor: isDark ? colors.brand.default : "transparent",
                },
              ]}
              onPress={() => handleModeChange("dark")}
            >
              <Text
                style={[
                  styles.modeButtonText,
                  { color: isDark ? "#fff" : undefined },
                ]}
              >
                🌙 Dark
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.currentTheme}>
            <Text style={styles.currentThemeLabel}>Current:</Text>
            <Badge variant={isDark ? "default" : "info"}>
              {isDark ? "Dark Mode" : "Light Mode"}
            </Badge>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Motion & Lottie</Text>
          <Text style={[styles.subtitle, { marginBottom: 12 }]}>
            Preset: screen {motionPresets.screenEnter.durationMs}ms · stagger{" "}
            {motionPresets.stagger.delayMs}ms — asset JSON trong{" "}
            <RNText style={{ fontFamily: "Courier" }}>assets/lottie/</RNText>
          </Text>
          <View style={styles.lottieRow}>
            <View style={styles.lottieCell}>
              <EmplusLottie
                source={lottieInventory.loader}
                style={{ width: 72, height: 72 }}
                loop
              />
              <Text style={styles.lottieLabel}>loader</Text>
            </View>
            <View style={styles.lottieCell}>
              <EmplusLottie
                source={lottieInventory.empty}
                style={{ width: 72, height: 72 }}
                loop
              />
              <Text style={styles.lottieLabel}>empty</Text>
            </View>
            <View style={styles.lottieCell}>
              <EmplusLottie
                source={lottieInventory.success}
                style={{ width: 72, height: 72 }}
                loop
              />
              <Text style={styles.lottieLabel}>success</Text>
            </View>
            <View style={styles.lottieCell}>
              <EmplusLottie
                source={lottieInventory.careHeart}
                style={{ width: 72, height: 72 }}
                loop
                speed={0.85}
              />
              <Text style={styles.lottieLabel}>care</Text>
            </View>
          </View>
        </Card>

        {/* Color Comparison */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Accent Colors</Text>
          <View style={styles.colorGrid}>
            <View
              style={[
                styles.colorSwatch,
                {
                  backgroundColor:
                    themeName === "telegram" ? "#8B5CF6" : "#E8547A",
                },
              ]}
            />
            <View
              style={[
                styles.colorSwatch,
                {
                  backgroundColor:
                    themeName === "telegram" ? "#A78BFA" : "#FF8FAB",
                },
              ]}
            />
            <View
              style={[
                styles.colorSwatch,
                {
                  backgroundColor:
                    themeName === "telegram" ? "#7C3AED" : "#C73D60",
                },
              ]}
            />
          </View>
          <Text style={styles.colorLabel}>
            {themeName === "telegram" ? "Telegram Violet" : "Aura Rose"}
          </Text>
        </Card>

        {/* Avatar Preview */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Avatar Gradients</Text>
          <View style={styles.avatarRow}>
            <Avatar name="John" size="md" />
            <Avatar name="Jane" size="md" />
            <Avatar name="Bob" size="md" />
            <Avatar name="Alice" size="md" />
          </View>
          <Text style={styles.colorLabel}>
            {themeName === "telegram"
              ? "Cool gradients"
              : "Warm romantic gradients"}
          </Text>
        </Card>

        {/* Buttons */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <View style={styles.buttonGrid}>
            <Button
              label="Primary"
              variant="primary"
              fullWidth
              onPress={() => {}}
            />
            <Button
              label="Outline"
              variant="outline"
              fullWidth
              onPress={() => {}}
            />
            <Button
              label="Ghost"
              variant="ghost"
              fullWidth
              onPress={() => {}}
            />
          </View>
        </Card>

        {/* Glass Effect Demo with Liquid Glass */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Liquid Glass Effect</Text>
          <Text style={styles.sectionSubtitle}>
            {isLiquidGlassSupported
              ? "✨ Native iOS blur"
              : "⚠️ Fallback (not supported)"}
          </Text>

          <View style={styles.glassContainer}>
            {isLiquidGlassSupported ? (
              <>
                <LiquidGlassView
                  style={[styles.glassBox, styles.glassLight]}
                  interactive
                  effect="clear"
                  colorScheme="light"
                >
                  <RNText style={styles.glassText}>Light Glass</RNText>
                  <RNText style={styles.glassSubtext}>Native iOS Blur</RNText>
                </LiquidGlassView>

                <LiquidGlassView
                  style={[styles.glassBox, styles.glassDark]}
                  interactive
                  effect="regular"
                  colorScheme="dark"
                >
                  <RNText style={[styles.glassText, { color: "#fff" }]}>
                    Dark Glass
                  </RNText>
                  <RNText style={[styles.glassSubtext, { color: "#aaa" }]}>
                    Native iOS Blur
                  </RNText>
                </LiquidGlassView>
              </>
            ) : (
              <>
                <View style={[styles.glassBox, styles.glassLight]}>
                  <RNText style={styles.glassText}>Light Glass</RNText>
                  <RNText style={styles.glassSubtext}>Fallback Mode</RNText>
                </View>
                <View style={[styles.glassBox, styles.glassDark]}>
                  <RNText style={[styles.glassText, { color: "#fff" }]}>
                    Dark Glass
                  </RNText>
                  <RNText style={[styles.glassSubtext, { color: "#aaa" }]}>
                    Fallback Mode
                  </RNText>
                </View>
              </>
            )}
          </View>

          <Text style={styles.colorLabel}>
            {isLiquidGlassSupported
              ? "Real iOS glass blur effect! ✨"
              : "Glass effect requires iOS with native blur support"}
          </Text>
        </Card>

        {/* Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </AppScreen>
  );
}
```
