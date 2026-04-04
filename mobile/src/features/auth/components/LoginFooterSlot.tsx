import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface LoginFooterSlotProps {
  /** Hàng action (vd. đăng ký) */
  children: ReactNode;
  /** Slot phía trên — sau này gắn animation vườn hoa */
  gardenSlot?: ReactNode;
  style?: ViewStyle;
}

/**
 * Phần cuối màn login: vùng decor (vườn hoa) + hàng CTA phụ.
 */
export function LoginFooterSlot({
  children,
  gardenSlot,
  style,
}: LoginFooterSlotProps) {
  return (
    <View style={[styles.wrap, style]}>
      <View
        style={styles.gardenPlaceholder}
        accessibilityElementsHidden={!gardenSlot}
        importantForAccessibility={gardenSlot ? "yes" : "no-hide-descendants"}
      >
        {gardenSlot ?? <View style={styles.gardenSpacer} />}
      </View>
      <View style={styles.actions}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    marginTop: 12,
    paddingBottom: 4,
  },
  gardenPlaceholder: {
    minHeight: 28,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gardenSpacer: {
    height: 20,
  },
  actions: {
    width: "100%",
    alignItems: "center",
    paddingTop: 4,
  },
});
