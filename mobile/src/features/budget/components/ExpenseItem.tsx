import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { type BudgetItem } from "@/src/api";
import { CATEGORY_CONFIG, STATUS_MAP } from "./constants";
import { AppText } from "@/src/ui-kit";

interface ExpenseItemProps {
  item: BudgetItem;
}

export const ExpenseItem = memo(({ item }: ExpenseItemProps) => {
  const isWarning = item.status === "OVER_BUDGET";
  const config = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.other;
  const status = STATUS_MAP[item.status] ?? {
    label: item.status,
    color: "#78716C", // taupe500
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: config?.bg || "#F5F5F4" },
            ]}
          >
            <Ionicons
              name={(config?.icon as any) || "help"}
              size={24}
              color={config?.color || "#78716C"}
            />
          </View>
          <View style={styles.titleContainer}>
            <AppText numberOfLines={1} style={styles.title}>
              {item.title}
            </AppText>
            <AppText style={styles.metaText}>
              {item.date} {item.place ? `• ${item.place}` : ""}
            </AppText>
          </View>
          <View style={styles.amountContainer}>
            <AppText
              style={[styles.amount, isWarning ? styles.warningAmount : {}]}
            >
              {item.amount?.toLocaleString() ?? "0"}đ
            </AppText>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === "PAID"
                      ? "#ECFDF5"
                      : isWarning
                        ? "#FFF1F2"
                        : "#FEF3C7",
                  borderColor:
                    item.status === "PAID"
                      ? "#D1FAE5"
                      : isWarning
                        ? "#FFE4E6"
                        : "#FDE68A",
                },
              ]}
            >
              <AppText
                style={[
                  styles.statusText,
                  {
                    color:
                      item.status === "PAID"
                        ? "#10B981"
                        : isWarning
                          ? "#E11D48"
                          : "#D97706",
                  },
                ]}
              >
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
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F5F5F4",
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
    color: "#1C1917",
  },
  metaText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A8A29E",
    marginTop: 2,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1C1917",
  },
  warningAmount: {
    color: "#E11D48",
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
