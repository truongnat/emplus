import { palette } from "@/src/theme";
import { AppText, PressableScale } from "@/src/ui-kit";
import { Ionicons } from "@expo/vector-icons";
import { Fragment, useCallback, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import BudgetActionMenu from "./BudgetActionMenu";

interface BudgetHeaderProps {
  showMenu: boolean;
  onToggleMenu: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    position: "relative",
    zIndex: 1001,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
  },
  buttonActive: {
    backgroundColor: palette.zinc900,
    borderColor: palette.zinc900,
  },
  buttonInactive: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderColor: "rgba(255,255,255,0.8)",
  },
  buttonText: { fontSize: 13, fontWeight: "bold" },
});

export default function BudgetHeader({
  showMenu,
  onToggleMenu,
}: BudgetHeaderProps) {
  return (
    <Fragment key="budget-header">
      <View style={styles.container}>
        <AppText
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: palette.zinc900,
            letterSpacing: -0.5,
          }}
        >
          Ngân sách
        </AppText>
        <PressableScale
          onPress={onToggleMenu}
          style={[
            styles.button,
            showMenu ? styles.buttonActive : styles.buttonInactive,
          ]}
        >
          <Ionicons
            name={showMenu ? "close" : "options-outline"}
            size={18}
            color={showMenu ? "#fff" : palette.zinc800}
          />
          <AppText
            style={[
              styles.buttonText,
              { color: showMenu ? "#fff" : palette.zinc800 },
            ]}
          >
            {showMenu ? "Đóng" : "Quản lý"}
          </AppText>
        </PressableScale>
      </View>
      {/* Menu will be rendered at the screen level to avoid overlap issues */}
    </Fragment>
  );
}
