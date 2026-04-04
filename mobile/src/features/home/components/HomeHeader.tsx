import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Reveal, AppText } from "@/src/ui-kit";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { auraPalette } from "@/src/theme/aura-colors";
import { fontSize } from "@/src/theme/tokens";
import { typographyRoles } from "@/src/theme/typography-roles";

interface HomeHeaderProps {
  userInitial: string;
  greeting: string;
  subGreeting: string;
  iconName: string;
}

export const HomeHeader = React.memo(function HomeHeader({
  userInitial,
  greeting,
  subGreeting,
  iconName,
}: HomeHeaderProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();

  const ring = colors.surface.default;
  const avatarPartnerBg = isDark ? auraPalette.taupe800 : auraPalette.taupe100;
  const avatarMeBg = isDark ? "rgba(255, 107, 107, 0.22)" : auraPalette.coral100;

  return (
    <Reveal>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar2, { borderColor: ring, backgroundColor: avatarPartnerBg }]}>
              <Ionicons
                name="person"
                size={18}
                color={colors.secondary.default}
              />
            </View>
            <View style={[styles.avatar1, { borderColor: ring, backgroundColor: avatarMeBg }]}>
              <AppText
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: colors.brand.strong,
                }}
              >
                {userInitial}
              </AppText>
              <View
                style={[
                  styles.statusDot,
                  {
                    borderColor: ring,
                    backgroundColor: colors.status.success.icon,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.textContainer}>
            <AppText
              numberOfLines={1}
              accessibilityRole="header"
              style={[
                typographyRoles.title,
                {
                  color: colors.text.primary,
                  fontFamily: typographyRoles.display.fontFamily,
                },
              ]}
            >
              {greeting}
            </AppText>
            <View style={styles.subRow}>
              {iconName ? (
                <Ionicons
                  name={iconName as React.ComponentProps<typeof Ionicons>["name"]}
                  size={14}
                  color={colors.accent.default}
                  style={{ marginRight: 5 }}
                />
              ) : null}
              <AppText
                numberOfLines={1}
                accessibilityRole="text"
                style={[
                  typographyRoles.caption,
                  {
                    fontSize: fontSize["2xs"],
                    fontFamily: typographyRoles.titleSm.fontFamily,
                    color: colors.text.tertiary,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                  },
                ]}
              >
                {subGreeting}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Reveal>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 24,
    zIndex: 10,
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    overflow: "hidden",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    width: 64,
    height: 40,
    justifyContent: "center",
  },
  avatar2: {
    position: "absolute",
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  avatar1: {
    position: "absolute",
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  statusDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    zIndex: 30,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  textContainer: { justifyContent: "center", flex: 1, gap: 2 },
  subRow: { flexDirection: "row", alignItems: "center" },
});
