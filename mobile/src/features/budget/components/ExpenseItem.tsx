import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "@/src/theme/tokens";
import { type BudgetItem } from "@/src/api";
import { CATEGORY_CONFIG, STATUS_MAP } from "./constants";
import { AppText } from "@/src/components/atoms/Text";

interface ExpenseItemProps {
  item: BudgetItem;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: { flex: 1, paddingRight: 8 },
  rightContainer: { alignItems: "flex-end", gap: 6, marginLeft: 8 },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  divider: {
    width: 1,
    height: 1,
    borderRadius: 9999,
    backgroundColor: palette.zinc200,
  },
});

export const ExpenseItem = memo(({ item }: ExpenseItemProps) => {
  const isWarning = item.status === "OVER_BUDGET";
  const config = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.other;
  const status = STATUS_MAP[item.status] ?? {
    label: item.status,
    color: palette.zinc500,
  };

  const gradientColors: [string, string] = isWarning
    ? ["rgba(236,19,52,0.06)", "rgba(236,19,52,0.02)"]
    : [palette.violet50, palette.zinc50];

  return (
    <BlurView intensity={25} tint="light" style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.leftContainer}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: config?.bg || palette.zinc200 },
              ]}
            >
              <Ionicons
                name={(config?.icon as any) || "help"}
                size={22}
                color={config?.color || palette.zinc500}
              />
            </View>
            <View style={styles.textContainer}>
              <AppText
                numberOfLines={1}
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: palette.zinc800,
                  marginBottom: 4,
                }}
              >
                {item.title}
              </AppText>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <AppText
                  numberOfLines={1}
                  style={{
                    fontSize: 13,
                    color: isWarning ? palette.violet600 : palette.zinc400,
                    opacity: 0.7,
                  }}
                >
                  {item.date}
                </AppText>
                {item.place && (
                  <>
                    <View style={styles.divider} />
                    <AppText
                      numberOfLines={1}
                      style={{
                        fontSize: 13,
                        color: palette.zinc400,
                        maxWidth: 80,
                      }}
                    >
                      {item.place}
                    </AppText>
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <AppText
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: isWarning ? palette.violet600 : palette.zinc900,
              }}
            >
              {item.amount?.toLocaleString() ?? "0"}đ
            </AppText>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: isWarning
                    ? `${palette.red50}`
                    : item.status === "PAID"
                      ? `${palette.green50}`
                      : `${palette.amber50}`,
                  borderColor: isWarning
                    ? `${palette.red500}33`
                    : item.status === "PAID"
                      ? `${palette.green500}33`
                      : `${palette.amber500}33`,
                },
              ]}
            >
              <AppText
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: isWarning
                    ? palette.violet600
                    : item.status === "PAID"
                      ? palette.green600
                      : palette.amber600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {isWarning ? "Vượt hạn mức" : status.label}
              </AppText>
            </View>
          </View>
        </View>
      </LinearGradient>
    </BlurView>
  );
});
