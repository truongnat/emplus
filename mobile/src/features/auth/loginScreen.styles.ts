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
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  brandTopLeft: {
    position: "absolute",
    zIndex: 2,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  logoMark: {
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  logoLottie: {
    width: 192,
    height: 192,
  },
  formOuter: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  glassCard: {
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.28)",
  },
  formInner: {
    gap: 16,
    paddingVertical: 0,
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
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  ctaLabel: {
    fontFamily: "BeVietnamPro_700Bold",
    fontSize: 17,
    color: "#FFFFFF",
    letterSpacing: 0.35,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    paddingTop: 12,
    paddingBottom: 4,
    width: "100%",
  },
  signUpLabel: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 14,
    fontWeight: "normal",
  },
  signUpText: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 14,
    fontWeight: "normal",
  },
});
