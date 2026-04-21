import { StyleSheet } from "react-native";

import { palette, radius } from "@/src/theme/tokens";

export const loginScreenStyles = StyleSheet.create({
  appScreenBase: {
    flex: 1,
  },
  appContent: {
    flex: 1,
  },
  layerRoot: {
    flex: 1,
    position: "relative",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: palette.zinc500,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  brandTopLeft: {
    position: "absolute",
    zIndex: 2,
  },
  header: {
    alignItems: "center",
    marginBottom: 14,
    width: "100%",
  },
  heroEyebrow: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 12,
    letterSpacing: 0.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  logoMark: {
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  logoLottie: {
    width: 88,
    height: 88,
  },
  heroTitle: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 26,
    textAlign: "center",
    letterSpacing: -0.2,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 2,
  },
  formOuter: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  glassCard: {
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(131,111,99,0.16)",
    backgroundColor: "rgba(255,253,252,0.78)",
  },
  glassCardContent: {
    borderColor: "rgba(131,111,99,0.12)",
    backgroundColor: "rgba(255,251,248,0.86)",
  },
  formInner: {
    gap: 14,
    paddingVertical: 2,
  },
  rememberForgotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 0,
    marginBottom: 2,
    paddingVertical: 0,
    gap: 8,
  },
  rememberLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  rememberLabel: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 14,
    flexShrink: 0,
  },
  forgotInline: {
    flexShrink: 0,
    paddingVertical: 6,
    paddingLeft: 4,
    minHeight: 44,
    justifyContent: "center",
  },
  forgotPasswordText: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 14,
    fontWeight: "normal",
  },
  eyeHit: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaPressable: {
    width: "100%",
    marginTop: 2,
  },
  ctaClip: {
    borderRadius: 999,
    overflow: "hidden",
  },
  ctaDisabled: {
    opacity: 0.72,
  },
  ctaGradient: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    borderRadius: 999,
  },
  ctaLabel: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 0.1,
  },
  trustNote: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    paddingHorizontal: 12,
    marginTop: 4,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    paddingTop: 10,
    paddingBottom: 4,
    width: "100%",
  },
  signUpLabel: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 14,
    fontWeight: "normal",
  },
  signUpText: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 14,
    fontWeight: "normal",
  },
});
