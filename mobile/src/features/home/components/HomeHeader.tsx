import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";
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
  const avatarBg = auraPalette.terracotta100;

  return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: avatarBg,
                borderColor: colors.border.default,
              },
            ]}
          >
            <AppText
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.text.secondary,
              }}
            >
              {userInitial}
            </AppText>
          </View>

          <View style={styles.textContainer}>
            <AppText
              numberOfLines={1}
              accessibilityRole="header"
              style={[
                typographyRoles.title,
                {
                  color: colors.text.primary,
                  fontFamily: typographyRoles.title.fontFamily,
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
                  color={colors.text.tertiary}
                  style={{ marginRight: 5 }}
                />
              ) : null}
              <AppText
                numberOfLines={1}
                accessibilityRole="text"
                style={[
                  typographyRoles.body,
                  {
                    fontSize: fontSize.sm,
                    fontFamily: typographyRoles.body.fontFamily,
                    color: colors.text.secondary,
                    letterSpacing: 0,
                  },
                ]}
              >
                {subGreeting}
              </AppText>
            </View>
          </View>
        </View>
      </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    paddingTop: 0,
    paddingBottom: 16,
    zIndex: 10,
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    overflow: "hidden",
    flex: 1,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  textContainer: { justifyContent: "center", flex: 1, gap: 4 },
  subRow: { flexDirection: "row", alignItems: "center" },
  lottieContainer: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 64,
    height: 64,
  },
});
