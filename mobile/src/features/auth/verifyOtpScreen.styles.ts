import { StyleSheet } from "react-native";

export const verifyOtpScreenStyles = StyleSheet.create({
  hero: {
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 18,
  },
  eyebrow: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 11,
    letterSpacing: 0.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.3,
    paddingHorizontal: 4,
  },
  subtitle: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 5,
    paddingHorizontal: 8,
  },
  emailText: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 12,
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
    gap: 6,
    paddingHorizontal: 0,
  },
  otpCell: {
    flex: 1,
    height: 52,
    minWidth: 0,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  otpCellText: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 20,
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
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  resendText: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 13,
  },
  formOuterSpacing: {
    marginTop: 6,
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
