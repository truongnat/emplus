import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText, PressableScale } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";

interface BudgetHeaderProps {
  showMenu: boolean;
  onToggleMenu: () => void;
}

export default function BudgetHeader({
  showMenu,
  onToggleMenu,
}: BudgetHeaderProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <AppText style={[styles.title, { color: colors.text.primary }]}>
        Ngân sách
      </AppText>
      <PressableScale
        onPress={onToggleMenu}
        style={[
          styles.button,
          showMenu
            ? {
                backgroundColor: colors.background.inverse,
                borderColor: colors.border.inverse,
              }
            : {
                backgroundColor: colors.surface.default,
                borderColor: colors.border.subtle,
                shadowColor: colors.text.primary,
              },
        ]}
        accessibilityRole="button"
        accessibilityLabel={showMenu ? "Đóng menu quản lý" : "Mở menu quản lý"}
        accessibilityState={{ expanded: showMenu }}
      >
        <Ionicons
          name={showMenu ? "close" : "options-outline"}
          size={20}
          color={showMenu ? colors.text.inverse : colors.text.primary}
        />
        <AppText
          style={[
            styles.buttonText,
            { color: showMenu ? colors.text.inverse : colors.text.primary },
          ]}
        >
          {showMenu ? "Đóng" : "Quản lý"}
        </AppText>
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    zIndex: 1001,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
