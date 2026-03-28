import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText, PressableScale } from "@/src/ui-kit";

interface BudgetHeaderProps {
  showMenu: boolean;
  onToggleMenu: () => void;
}

export default function BudgetHeader({
  showMenu,
  onToggleMenu,
}: BudgetHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Ngân sách</AppText>
      <PressableScale
        onPress={onToggleMenu}
        style={[
          styles.button,
          showMenu ? styles.buttonActive : styles.buttonInactive,
        ]}
      >
        <Ionicons
          name={showMenu ? "close" : "options-outline"}
          size={20}
          color={showMenu ? "#FFFFFF" : "#1C1917"}
        />
        <AppText
          style={[
            styles.buttonText,
            { color: showMenu ? "#FFFFFF" : "#1C1917" },
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
    color: "#1C1917", // taupe900
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
  },
  buttonActive: {
    backgroundColor: "#1C1917",
    borderColor: "#1C1917",
  },
  buttonInactive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#F5F5F4",
    shadowColor: "#000",
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
