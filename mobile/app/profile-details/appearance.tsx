import { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen, Reveal, AppText } from "@/src/ui-kit";
import { palette, useThemeColors } from "@/src/theme";
import { useThemeMode } from "@/src/theme/theme-mode-context";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc400,
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
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 12,
    marginBottom: 8,
  },
  themeLine1: {
    width: "60%",
    height: 6,
    backgroundColor: palette.zinc100,
    borderRadius: 3,
    marginBottom: 6,
  },
  themeLine2: {
    width: "40%",
    height: 6,
    backgroundColor: palette.zinc100,
    borderRadius: 3,
  },
  themeLabel: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase" as "uppercase",
    letterSpacing: 1,
  },
  themeLabelDefault: { color: palette.zinc400 },
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
    borderColor: "#fff",
  },
  colorDotSelected: { borderColor: palette.zinc800 },
});

export default function AppearanceScreen() {
  const themeColors = useThemeColors();
  const router = useRouter();
  const {
    colorScheme,
    setThemePreference,
    themePreference,
  } = useThemeMode();
  const [accentColor, setAccentColor] = useState("#ec1334");

  const lightSelected =
    themePreference === "light" ||
    ((themePreference === "system" || themePreference === "daylight") &&
      colorScheme === "light");
  const darkSelected =
    themePreference === "dark" ||
    ((themePreference === "system" || themePreference === "daylight") &&
      colorScheme === "dark");

  const accentSwatches = [
    "#ec1334",
    "#f43f5e",
    "#8b5cf6",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
  ];

  return (
    <AppScreen>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={24} color={palette.zinc800} />
        </TouchableOpacity>
        <AppText
          style={{ fontSize: 20, fontWeight: "bold", color: palette.zinc800 }}
        >
          Giao diện
        </AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Reveal delay={100}>
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
                  lightSelected && { borderColor: themeColors.brand.default },
                ]}
              >
                <View style={styles.themeLine1} />
                <View style={styles.themeLine2} />
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
                  { backgroundColor: "rgba(39,39,46,0.8)" },
                  darkSelected && { borderColor: themeColors.brand.default },
                ]}
              >
                <View
                  style={{
                    width: "60%",
                    height: 6,
                    backgroundColor: palette.zinc700,
                    borderRadius: 3,
                    marginBottom: 6,
                  }}
                />
                <View
                  style={{
                    width: "40%",
                    height: 6,
                    backgroundColor: palette.zinc700,
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
                      : palette.zinc500,
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
                      : palette.zinc500,
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
                color: palette.zinc500,
                paddingHorizontal: 12,
              }}
            >
              Tự động: sáng khoảng 6:00–19:00, tối các giờ còn lại (giờ máy).
            </AppText>
          ) : null}
        </Reveal>

        <Reveal delay={200}>
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
        </Reveal>
      </ScrollView>
    </AppScreen>
  );
}
