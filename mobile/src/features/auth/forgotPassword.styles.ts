import { StyleSheet } from "react-native";

export const forgotPasswordStyles = StyleSheet.create({
  hero: {
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
    paddingHorizontal: 4,
  },
  eyebrow: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 11,
    letterSpacing: 0.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 12,
  },
});
