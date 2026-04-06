import { Platform, StyleSheet } from "react-native";

/**
 * Pairing — readable QR, comfortable tap targets, vertical balance:
 * upper cluster (title + hero + card) vs lower cluster (OR + form) via space-between.
 */
export const pairingScreenStyles = StyleSheet.create({
  screenColumn: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  upperBlock: {
    width: "100%",
    alignItems: "center",
  },
  lowerBlock: {
    width: "100%",
    paddingTop: 4,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  /** Wrapper cho `PairingGradientTitle` (MaskedView không nhận margin Text cũ). */
  titleWrap: {
    marginBottom: 4,
    alignItems: "center",
  },
  subtitle: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  lottieWrap: {
    alignItems: "center",
    marginBottom: 12,
  },
  lottieHero: {
    width: 96,
    height: 96,
  },
  qrCard: {
    marginBottom: 0,
    padding: 0,
    borderRadius: 22,
    overflow: "hidden",
    width: "100%",
    maxWidth: 400,
  },
  qrContent: {
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 10,
  },
  qrWrapper: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  qrContainer: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderLottie: {
    width: 104,
    height: 104,
  },
  logoOverlay: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
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
    fontSize: 13,
  },
  timeBold: {
    fontFamily: "BeVietnamPro_700Bold",
    fontSize: 13,
  },
  /** Một hàng hai thao tác — ít “khối nút” hơn so với hai pill full-width chồng nhau. */
  toolbarRow: {
    flexDirection: "row",
    gap: 10,
    width: "92%",
    maxWidth: 380,
    alignSelf: "center",
  },
  toolbarBtn: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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
    paddingVertical: 11,
  },
  toolbarLabel: {
    fontFamily: "BeVietnamPro_700Bold",
    fontSize: 13,
    flexShrink: 1,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 10,
    marginTop: 2,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2,
    opacity: 0.35,
  },
  dividerText: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "lowercase",
  },
  inputSection: {
    gap: 10,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  inputLabel: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 8,
    lineHeight: 17,
    opacity: 0.92,
  },
  ctaPressable: {
    width: "100%",
    marginTop: 0,
  },
  ctaClip: {
    borderRadius: 999,
    overflow: "hidden",
  },
  ctaGradient: {
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  ctaLabel: {
    fontFamily: "BeVietnamPro_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 0.25,
  },
  ctaDisabled: {
    opacity: 0.72,
  },
  loadingWrap: {
    flex: 1,
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
