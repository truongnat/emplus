import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface LoginFooterSlotProps {
  /** Hàng action (vd. đăng ký) */
  children: ReactNode;
  /** Slot phía trên — sau này gắn animation vườn hoa */
  gardenSlot?: ReactNode;
  style?: ViewStyle;
  compact?: boolean;
}

/**
 * Phần cuối màn login: vùng decor (vườn hoa) + hàng CTA phụ.
 */
export function LoginFooterSlot({
  children,
  gardenSlot,
  style,
  compact = false,
}: LoginFooterSlotProps) {
  return (
    <View style={[styles.wrap, style]}>
      <View
        style={[
          styles.gardenPlaceholder,
          compact ? styles.gardenPlaceholderCompact : null,
        ]}
        accessibilityElementsHidden={!gardenSlot}
        importantForAccessibility={gardenSlot ? "yes" : "no-hide-descendants"}
      >
        {gardenSlot ?? (
          <View style={compact ? styles.gardenSpacerCompact : styles.gardenSpacer} />
        )}
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
  gardenPlaceholderCompact: {
    minHeight: 8,
  },
  gardenSpacer: {
    height: 20,
  },
  gardenSpacerCompact: {
    height: 4,
  },
  actions: {
    width: "100%",
    alignItems: "center",
    paddingTop: 4,
  },
});
