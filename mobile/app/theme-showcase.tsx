/**
 * Theme Showcase Screen
 * Switch between Telegram and Aura design systems
 */

import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
} from "react-native";
import { useRouter } from "expo-router";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Card } from "@/src/components/molecules/Card";
import { Button } from "@/src/components/atoms/Button";
import { Text } from "@/src/components/atoms/Text";
import { Badge } from "@/src/components/atoms/Badge";
import { Avatar } from "@/src/components/atoms/Avatar";
import { useThemeMode, type ThemeName } from "@/src/theme/theme-mode-context";
import { useTheme, useThemeColors } from "@/src/theme";
import { palette } from "@/src/theme/tokens";
import { auraPalette } from "@/src/theme/aura-colors";
import { useToast } from "@/src/toast-context";
import { LiquidGlassView, isLiquidGlassSupported } from "@/src/ui-kit";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import { motionPresets } from "@/src/animations/motion-presets";

export default function ThemeShowcaseScreen() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "rgba(42, 171, 238, 0.1)",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 14,
    color: palette.zinc500,
    marginTop: 4,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.zinc900,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: palette.zinc500,
    marginBottom: 16,
  },
  themeButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
  },
  themeButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  modeButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  modeButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  currentTheme: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currentThemeLabel: {
    fontSize: 14,
    color: palette.zinc600,
  },
  colorGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  colorLabel: {
    fontSize: 13,
    color: palette.zinc500,
    textAlign: "center",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
    marginBottom: 12,
  },
  buttonGrid: {
    gap: 8,
  },
  glassContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
    minHeight: 120,
  },
  glassBox: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  glassLight: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  glassDark: {
    backgroundColor: "rgba(28,28,30,0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  glassText: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  glassSubtext: {
    fontSize: 11,
    color: palette.zinc500,
  },
  lottieRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  lottieCell: {
    alignItems: "center",
    width: "22%",
    minWidth: 72,
  },
  lottieLabel: {
    marginTop: 6,
    fontSize: 11,
    color: palette.zinc500,
  },
});
