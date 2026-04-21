import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppButton, AppText } from "@/src/ui-kit";
import { useToast } from "@/src/toast-context";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { elevation } from "@/src/theme/elevation";
import { typographyRoles } from "@/src/theme/typography-roles";
import { homeDarkGridCard } from "@/src/theme/emplus-design-tokens";

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
    showToast("Mình sẽ nhắc lại vào ngày mai.", "info");
  }, [setShowFocusCard, showToast]);

  const handleRecord = useCallback(() => {
    router.push("/(tabs)/care");
  }, [router]);

  if (!showFocusCard) return null;

  return (
    <View style={styles.outer}>
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
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <AppText
              style={[
                styles.eyebrow,
                {
                  color: colors.text.tertiary,
                  fontFamily: typographyRoles.caption.fontFamily,
                },
              ]}
            >
              Việc nhỏ cho hôm nay
            </AppText>
            <AppText
              style={[
                styles.headline,
                {
                  color: colors.text.primary,
                  fontFamily: typographyRoles.titleSm.fontFamily,
                },
              ]}
            >
              {focusTitle}
            </AppText>
          </View>

          <View
            style={[
              styles.iconTile,
              {
                backgroundColor: isDark ? "rgba(255,255,255,0.06)" : colors.brand.muted,
                borderColor: colors.border.subtle,
              },
            ]}
          >
            <Ionicons
              name="sparkles-outline"
              size={20}
              color={colors.brand.default}
            />
          </View>
        </View>

        <AppText
          style={[
            styles.body,
            {
              color: colors.text.secondary,
              fontFamily: typographyRoles.body.fontFamily,
            },
          ]}
        >
          {focusSubtitle}
        </AppText>

        <View
          style={[
            styles.metaRow,
            {
              backgroundColor: isDark ? "rgba(255,255,255,0.04)" : colors.surface.default,
              borderColor: colors.border.subtle,
            },
          ]}
        >
          <Ionicons
            name="time-outline"
            size={16}
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
            Chỉ cần một bước nhỏ, nhưng nên làm trong hôm nay.
          </AppText>
        </View>

        <View style={styles.actions}>
          <AppButton
            label="Để mai"
            variant="ghost"
            fullWidth={false}
            style={styles.dismissBtn}
            onPress={handleDismiss}
          />
          <AppButton
            label="Mở gợi ý"
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
    marginBottom: 28,
    borderRadius: 26,
  },
  card: {
    borderRadius: 26,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headline: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 25,
    letterSpacing: -0.1,
  },
  iconTile: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  metaText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  dismissBtn: {
    flex: 1,
  },
  primaryBtn: {
    flex: 1.2,
  },
});
