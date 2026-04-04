import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { type BudgetItem } from "@/src/api";
import { useThemeColors } from "@/src/theme";
import { CATEGORY_CONFIG, STATUS_MAP } from "./constants";
import { AppText } from "@/src/ui-kit";

interface ExpenseItemProps {
  item: BudgetItem;
}

export const ExpenseItem = memo(function ExpenseItem({ item }: ExpenseItemProps) {
  const colors = useThemeColors();
  const isWarning = item.status === "OVER_BUDGET";
  const config = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.other;
  const status = STATUS_MAP[item.status] ?? {
    label: item.status,
    color: colors.text.secondary,
  };

  const paidBadge = {
    bg: colors.status.success.bg,
    border: colors.status.success.border,
    text: colors.status.success.text,
  };
  const warningBadge = {
    bg: colors.status.error.bg,
    border: colors.status.error.border,
    text: colors.status.error.text,
  };
  const pendingBadge = {
    bg: colors.status.warning.bg,
    border: colors.status.warning.border,
    text: colors.status.warning.text,
  };

  const badgeStyle =
    item.status === "PAID"
      ? paidBadge
      : isWarning
        ? warningBadge
        : pendingBadge;

  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface.default,
            borderColor: colors.border.subtle,
            shadowColor: colors.text.primary,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: config?.bg || colors.surface.sunken },
            ]}
          >
            <Ionicons
              name={(config?.icon as any) || "help"}
              size={24}
              color={config?.color || colors.text.secondary}
            />
          </View>
          <View style={styles.titleContainer}>
            <AppText numberOfLines={1} style={[styles.title, { color: colors.text.primary }]}>
              {item.title}
            </AppText>
            <AppText style={[styles.metaText, { color: colors.text.tertiary }]}>
              {item.date} {item.place ? `• ${item.place}` : ""}
            </AppText>
          </View>
          <View style={styles.amountContainer}>
            <AppText
              style={[
                styles.amount,
                {
                  color: isWarning
                    ? colors.status.error.text
                    : colors.text.primary,
                },
              ]}
            >
              {item.amount?.toLocaleString() ?? "0"}đ
            </AppText>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: badgeStyle.bg,
                  borderColor: badgeStyle.border,
                },
              ]}
            >
              <AppText style={[styles.statusText, { color: badgeStyle.text }]}>
                {isWarning ? "Vượt hạn mức" : status.label}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  container: {
    borderRadius: 24,
    padding: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  metaText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "900",
  },
  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
