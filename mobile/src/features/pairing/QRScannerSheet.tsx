import React, { useState, useCallback } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/src/components/atoms/Text";

interface QRScannerSheetProps {
  visible: boolean;
  onClose: () => void;
  onScanned: (code: string) => void;
}

export function QRScannerSheet({ visible, onClose, onScanned }: QRScannerSheetProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const insets = useSafeAreaInsets();

  const handleBarCodeScanned = useCallback(
    ({ data }: { data: string }) => {
      if (scanned) return;
      setScanned(true);
      onScanned(data.trim().toUpperCase());
      onClose();
    },
    [scanned, onScanned, onClose],
  );

  const handleRequestPermission = useCallback(async () => {
    const result = await requestPermission();
    if (!result.granted && !result.canAskAgain) {
      if (Platform.OS === "ios") {
        Linking.openURL("app-settings:");
      } else {
        Linking.openSettings();
      }
    }
  }, [requestPermission]);

  const handleClose = useCallback(() => {
    setScanned(false);
    onClose();
  }, [onClose]);

  const needsPermission = !permission?.granted;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {needsPermission ? (
          <View style={[styles.permissionWrap, { paddingTop: insets.top + 60 }]}>
            <Ionicons name="camera-outline" size={64} color="#A1A1AA" />
            <Text style={styles.permTitle}>Cần quyền truy cập camera</Text>
            <Text style={styles.permBody}>
              Để quét mã QR ghép đôi, vui lòng cho phép Em+ sử dụng camera.
            </Text>
            <TouchableOpacity
              style={styles.permButton}
              onPress={handleRequestPermission}
              activeOpacity={0.8}
            >
              <Text style={styles.permButtonText}>Cho phép camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        )}

        <View style={[styles.overlay, { paddingTop: insets.top }]}>
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Quét mã QR</Text>
            <View style={{ width: 40 }} />
          </View>
        </View>

        {!needsPermission && (
          <View style={styles.finderOverlay} pointerEvents="none">
            <View style={styles.finderFrame}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
            <Text style={styles.hint}>Đưa camera vào mã QR của người ấy</Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

const FRAME_SIZE = 240;
const CORNER_LEN = 28;
const CORNER_WIDTH = 4;
const CORNER_COLOR = "#FF6B81";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "BeVietnamPro_600SemiBold",
  },
  permissionWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 32,
    gap: 16,
    backgroundColor: "#18181B",
  },
  permTitle: {
    color: "#FAFAFA",
    fontSize: 20,
    fontFamily: "BeVietnamPro_700Bold",
    textAlign: "center",
  },
  permBody: {
    color: "#A1A1AA",
    fontSize: 15,
    fontFamily: "BeVietnamPro_400Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  permButton: {
    marginTop: 8,
    backgroundColor: "#FF6B81",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 999,
  },
  permButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "BeVietnamPro_700Bold",
  },
  finderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  finderFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: CORNER_LEN,
    height: CORNER_LEN,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: CORNER_COLOR,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: CORNER_COLOR,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: CORNER_COLOR,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: CORNER_COLOR,
    borderBottomRightRadius: 8,
  },
  hint: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontFamily: "BeVietnamPro_500Medium",
    marginTop: 24,
    textAlign: "center",
  },
});
