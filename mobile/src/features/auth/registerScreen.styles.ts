import { StyleSheet } from "react-native";

export const registerScreenStyles = StyleSheet.create({
  /** Compact hero vs login (smaller Lottie + tighter vertical rhythm). */
  registerHeader: {
    alignItems: "center",
    marginBottom: 4,
    width: "100%",
  },
  registerLogoMark: {
    alignItems: "center",
    justifyContent: "center",
  },
  registerLogoLottie: {
    width: 128,
    height: 80,
  },
  /**
   * Register: stack from top — avoids `justifyContent: "center"` gap
   * between top bar and hero (login keeps centered layout).
   */
  registerScrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 22,
  },
  /** Single scroll child — avoids Fabric edge cases with multiple roots in KASV. */
  registerScrollInner: {
    flexGrow: 1,
    justifyContent: "flex-start",
    gap: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  /** Align brand vertically with back chip (visual baseline with form). */
  brandBesideBack: {
    flexShrink: 1,
    justifyContent: "center",
    paddingBottom: 1,
  },
  topBar: {
    position: "absolute",
    zIndex: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  genderBlock: {
    gap: 8,
    width: "100%",
  },
  genderLabel: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 14,
  },
  genderRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genderChip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth * 2,
    minWidth: "22%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  genderChipText: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 13,
  },
  policyContainer: {
    marginTop: 2,
    gap: 6,
  },
  policyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  policyTextWrap: {
    flex: 1,
    paddingTop: 2,
  },
  policyLabel: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  policyLink: {
    fontFamily: "BeVietnamPro_600SemiBold",
    textDecorationLine: "underline",
  },
  policyError: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 12,
    marginLeft: 36,
  },
});
