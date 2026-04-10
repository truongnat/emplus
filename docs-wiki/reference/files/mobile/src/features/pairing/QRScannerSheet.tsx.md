---
title: "mobile/src/features/pairing/QRScannerSheet.tsx"
description: "Defines the structure of the QRScannerSheet functional component."
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/features/pairing/QRScannerSheet.tsx.md"
  relativePath: "mobile/src/features/pairing/QRScannerSheet.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/pairing/QRScannerSheet.tsx"
  module: "mobile/src/features/pairing"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/pairing/QRScannerSheet.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/features/pairing](../../../../../modules/mobile/src/features/pairing.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/pairing/QRScannerSheet.tsx`
- Lines: 244
- Symbols: 2

## AI Summary

Defines the structure of the QRScannerSheet functional component.

### Responsibilities

- React functional component

## Public API

- `function QRScannerSheet({ visible, onClose, onScanned }: QRScannerSheetProps)`

## Symbols

### function `QRScannerSheet`

- Signature: `function QRScannerSheet({ visible, onClose, onScanned }: QRScannerSheetProps)`
- Lines: 21-115
- Exported: yes

```tsx
function QRScannerSheet({ visible, onClose, onScanned }: QRScannerSheetProps) {
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
```

### interface `QRScannerSheetProps`

- Signature: `interface QRScannerSheetProps`
- Lines: 15-19
- Exported: no

```tsx
interface QRScannerSheetProps {
  visible: boolean;
  onClose: () => void;
  onScanned: (code: string) => void;
}
```
