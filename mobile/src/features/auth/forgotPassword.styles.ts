import { StyleSheet } from "react-native";

export const forgotPasswordStyles = StyleSheet.create({
  hero: {
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
    paddingHorizontal: 4,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  title: {
    fontFamily: "BeVietnamPro_800ExtraBold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
});
