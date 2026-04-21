import { StyleSheet } from "react-native";

/**
 * Trang chủ — shell full-bleed đồng bộ auth (lưới + brand + padding scroll).
 */
export const homeScreenStyles = StyleSheet.create({
  layerRoot: {
    flex: 1,
    position: "relative",
  },
  headerBlur: {
    position: "absolute",
    zIndex: 3,
  },
  headerOverlay: {
    position: "absolute",
    zIndex: 3,
  },
  brandTopLeft: {
    position: "absolute",
    zIndex: 4,
  },
  /** Cùng hàng với `LoginBrandGradientTitle` (maskRoot height 40). */
  brandTopRight: {
    position: "absolute",
    zIndex: 4,
    height: 40,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    /** Default; home screen overrides with `insets.bottom` for tab bar. */
    paddingBottom: 128,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 1,
  },
  centerText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    marginTop: 32,
    marginBottom: 20,
  },
});
