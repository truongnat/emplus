import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppButton, AppText } from "@/src/ui-kit";
import { useToast } from "@/src/toast-context";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { elevation } from "@/src/theme/elevation";
import { typographyRoles } from "@/src/theme/typography-roles";
import {
  homeDarkGridCard,
  homeDarkGridInset,
} from "@/src/theme/emplus-design-tokens";

export interface FocusCardProps {
  focusTitle: string;
  focusSubtitle: string;
  showFocusCard: boolean;
  setShowFocusCard: (v: boolean) => void;
}

export const FocusCard = React.memo(function FocusCard({
  focusTitle,
  focusSubtitle,
  showFocusCard,
  setShowFocusCard,
}: FocusCardProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const router = useRouter();
  const { showToast } = useToast();

  const handleDismiss = useCallback(() => {
    setShowFocusCard(false);
    showToast("Nhắc lại bạn vào ngày mai nhé 💛", "info");
  }, [setShowFocusCard, showToast]);

  const handleRecord = useCallback(() => {
    router.push("/(tabs)/care");
  }, [router]);

  if (!showFocusCard) return null;

  const softOrb = isDark ? "rgba(255, 107, 107, 0.12)" : "rgba(255, 107, 107, 0.08)";
  const badgeBg = isDark ? "rgba(255, 107, 107, 0.18)" : "rgba(255, 107, 107, 0.12)";

  return (
      <View style={[styles.outer, elevation.floated]}>
        <View
          style={[
            styles.card,
            isDark
              ? {
                  backgroundColor: homeDarkGridCard.backgroundColor,
                  borderColor: homeDarkGridCard.borderColor,
                }
              : {
                  backgroundColor: colors.surface.raised,
                  borderColor: colors.border.subtle,
                },
          ]}
        >
          <View style={[styles.orb, { backgroundColor: softOrb }]} />

          <View style={styles.topRow}>
            <View style={styles.titleBlock}>
              <AppText
                accessibilityRole="text"
                style={[
                  styles.eyebrow,
                  {
                    color: colors.text.tertiary,
                    fontFamily: typographyRoles.caption.fontFamily,
                  },
                ]}
              >
                Gợi ý trong ngày
              </AppText>
              <AppText
                accessibilityRole="header"
                style={[
                  styles.headline,
                  {
                    color: colors.text.primary,
                    fontFamily: typographyRoles.titleSm.fontFamily,
                  },
                ]}
              >
                Một điều nhỏ cho hai đứa
              </AppText>
            </View>
            <View style={[styles.badge, { backgroundColor: badgeBg }]}>
              <AppText
                style={[
                  styles.badgeText,
                  {
                    color: colors.brand.strong,
                    fontFamily: typographyRoles.caption.fontFamily,
                  },
                ]}
              >
                Ưu tiên
              </AppText>
            </View>
          </View>

          <View style={styles.bodyRow}>
            <View
              style={[
                styles.iconTile,
                isDark
                  ? {
                      backgroundColor: homeDarkGridInset.backgroundColor,
                      borderColor: homeDarkGridInset.borderColor,
                    }
                  : {
                      backgroundColor: colors.surface.default,
                      borderColor: colors.border.subtle,
                    },
              ]}
            >
              <Ionicons
                name="mic-outline"
                size={24}
                color={colors.brand.default}
              />
            </View>
            <View style={styles.copyCol}>
              <AppText
                style={[
                  styles.focusTitle,
                  {
                    color: colors.text.primary,
                    fontFamily: typographyRoles.titleSm.fontFamily,
                  },
                ]}
              >
                {focusTitle}
              </AppText>
              <AppText
                style={[
                  styles.focusSub,
                  {
                    color: colors.text.secondary,
                    fontFamily: typographyRoles.body.fontFamily,
                  },
                ]}
              >
                {focusSubtitle}
              </AppText>
              <View style={styles.metaRow}>
                <Ionicons
                  name="time-outline"
                  size={15}
                  color={colors.text.tertiary}
                />
                <AppText
                  style={[
                    styles.metaText,
                    {
                      color: colors.text.tertiary,
                      fontFamily: typographyRoles.caption.fontFamily,
                    },
                  ]}
                >
                  Hôm nay
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <AppButton
              label="Để sau"
              variant="ghost"
              fullWidth={false}
              style={styles.dismissBtn}
              onPress={handleDismiss}
            />
            <AppButton
              label="Mở nhật ký"
              variant="primary"
              style={styles.primaryBtn}
              onPress={handleRecord}
            />
          </View>
        </View>
      </View>
  );
});

const styles = StyleSheet.create({
  outer: {
    marginBottom: 24,
    borderRadius: 26,
  },
  card: {
    position: "relative",
    borderRadius: 26,
    padding: 22,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    right: -36,
    top: -36,
    width: 112,
    height: 112,
    borderRadius: 9999,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
    zIndex: 2,
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  headline: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  bodyRow: {
    flexDirection: "row",
    gap: 14,
    zIndex: 2,
  },
  iconTile: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  copyCol: {
    flex: 1,
    gap: 6,
  },
  focusTitle: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  focusSub: {
    fontSize: 14,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    zIndex: 2,
    width: "100%",
  },
  dismissBtn: {
    minWidth: 88,
    paddingHorizontal: 0,
  },
  primaryBtn: {
    flex: 1,
  },
});
