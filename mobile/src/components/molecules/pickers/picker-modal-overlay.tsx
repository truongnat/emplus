import React from "react";
import { View, Modal, Pressable, StyleSheet } from "react-native";

export interface PickerModalOverlayProps {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

/**
 * Modal + dim backdrop + căn nội dung đáy màn hình.
 * Phần sheet (màu, safe area) do children tự bọc.
 */
export function PickerModalOverlay({
  visible,
  onRequestClose,
  children,
}: PickerModalOverlayProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.root}>
        <Pressable
          style={[StyleSheet.absoluteFillObject, styles.backdrop]}
          onPress={onRequestClose}
          accessibilityLabel="Đóng"
        />
        <View style={styles.anchor}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  backdrop: { backgroundColor: "rgba(0,0,0,0.45)" },
  anchor: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignSelf: "stretch",
    pointerEvents: "box-none",
  },
});
