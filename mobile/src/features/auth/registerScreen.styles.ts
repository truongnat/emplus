import { StyleSheet } from "react-native";

export const registerScreenStyles = StyleSheet.create({
  /** Compact hero vs login (smaller Lottie + tighter vertical rhythm). */
  registerHeader: {
    alignItems: "center",
    marginBottom: 2,
    width: "100%",
  },
  registerEyebrow: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 11,
    letterSpacing: 0.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  registerTitle: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 22,
    textAlign: "center",
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  /**
   * Register: stack from top — avoids `justifyContent: "center"` gap
   * between top bar and hero (login keeps centered layout).
   */
  registerScrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  /** Single scroll child — avoids Fabric edge cases with multiple roots in KASV. */
  registerScrollInner: {
    flexGrow: 1,
    justifyContent: "flex-start",
    gap: 2,
  },
  registerScrollInnerCompact: {
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
    gap: 4,
    width: "100%",
  },
  genderLabel: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 13,
    letterSpacing: 0.1,
  },
  genderRow: {
    width: "100%",
  },
  genderSummary: {
    minHeight: 44,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  genderSummaryText: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 14,
  },
  genderOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  genderChip: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    minWidth: "23%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  genderChipText: {
    fontFamily: "BeVietnamPro_500Medium",
    fontSize: 12,
  },
  policyContainer: {
    marginTop: 0,
    gap: 4,
  },
  policyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  policyTextWrap: {
    flex: 1,
    paddingTop: 1,
  },
  policyLabel: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  policyLink: {
    fontFamily: "BeVietnamPro_500Medium",
    textDecorationLine: "underline",
  },
  policyError: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 12,
    marginLeft: 36,
  },
  registerTrustNote: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 11,
    lineHeight: 15,
    textAlign: "center",
    paddingHorizontal: 12,
    marginTop: 2,
  },
});
