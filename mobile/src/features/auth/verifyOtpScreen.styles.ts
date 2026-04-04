import { StyleSheet } from "react-native";

export const verifyOtpScreenStyles = StyleSheet.create({
  hero: {
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
    paddingHorizontal: 20,
  },
  /** Không nền/bo — Lottie nằm trực tiếp trên lưới nền (giống logo login). */
  lottieHeroWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontFamily: "BeVietnamPro_800ExtraBold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.4,
    paddingHorizontal: 8,
  },
  subtitle: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  emailText: {
    fontFamily: "BeVietnamPro_700Bold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  otpOuterContainer: {
    width: "100%",
  },
  hiddenInput: {
    position: "absolute",
    width: 0,
    height: 0,
    opacity: 0,
  },
  otpCellsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
    paddingHorizontal: 0,
  },
  otpCell: {
    flex: 1,
    height: 56,
    minWidth: 0,
    /** Bo góc set trong form (24 sáng / 16 tối — giống Input login). */
    borderWidth: StyleSheet.hairlineWidth * 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  otpCellText: {
    fontFamily: "BeVietnamPro_700Bold",
    fontSize: 22,
  },
  cursor: {
    position: "absolute",
    width: 2,
    height: 28,
  },
  resendContainer: {
    alignItems: "center",
    paddingHorizontal: 4,
  },
  countdownText: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  resendText: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 14,
  },
  formOuterSpacing: {
    marginTop: 2,
    width: "100%",
  },
  loadingWrap: {
    flex: 1,
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const verifyOtpLottieLoader = {
  width: 120,
  height: 120,
};

export const verifyOtpLottieHero = {
  width: 150,
  height: 150,
};
