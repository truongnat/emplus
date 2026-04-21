import { Platform, StyleSheet } from "react-native";

/**
 * Pairing — keep the screen compact and obvious on small devices:
 * one short promise, one primary QR action, one secondary code-entry path.
 */
export const pairingScreenStyles = StyleSheet.create({
  screenColumn: {
    width: "100%",
    gap: 10,
  },
  upperBlock: {
    width: "100%",
    alignItems: "center",
  },
  lowerBlock: {
    width: "100%",
    paddingTop: 2,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 17,
    paddingHorizontal: 10,
  },
  qrCard: {
    marginBottom: 0,
    padding: 0,
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    maxWidth: 392,
  },
  qrContent: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 5,
  },
  sectionTitle: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
  },
  sectionBody: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  qrWrapper: {
    padding: 7,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  qrContainer: {
    width: 144,
    height: 144,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    width: 144,
    height: 144,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderLottie: {
    width: 92,
    height: 92,
  },
  logoOverlay: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 12,
  },
  timeBold: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 12,
  },
  /** Một hàng hai thao tác — ít “khối nút” hơn so với hai pill full-width chồng nhau. */
  toolbarRow: {
    flexDirection: "row",
    gap: 8,
    width: "90%",
    maxWidth: 360,
    alignSelf: "center",
  },
  toolbarBtn: {
    minHeight: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  toolbarBtnPrimary: {
    flex: 1.45,
  },
  toolbarBtnSecondary: {
    flex: 0.95,
  },
  toolbarBtnOutline: {
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  toolbarInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 6,
    paddingVertical: 9,
  },
  toolbarLabel: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 12,
    flexShrink: 1,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 4,
    marginTop: 0,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2,
    opacity: 0.35,
  },
  dividerText: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "lowercase",
  },
  inputSection: {
    gap: 7,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  inputLabel: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 4,
    lineHeight: 15,
    opacity: 0.92,
  },
  ctaPressable: {
    width: "100%",
    marginTop: 0,
  },
  secondaryCtaWrap: {
    marginTop: 2,
  },
  ctaClip: {
    borderRadius: 999,
    overflow: "hidden",
  },
  ctaGradient: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
  },
  ctaLabel: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 15,
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  ctaDisabled: {
    opacity: 0.72,
  },
  footnote: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
    paddingHorizontal: 4,
    marginTop: 2,
  },
  loadingWrap: {
    flex: 1,
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
