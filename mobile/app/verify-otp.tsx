import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { AuthGridScreenShell } from "@/src/features/auth/components/AuthGridScreenShell";
import { VerifyOtpForm } from "@/src/features/auth/components/VerifyOtpForm";
import { VerifyOtpHeroSection } from "@/src/features/auth/components/VerifyOtpHeroSection";
import { useSession } from "@/src/session-context";
import { lottieInventory } from "@/src/lottie/inventory";

import {
  verifyOtpLottieLoader,
  verifyOtpScreenStyles as styles,
} from "@/src/features/auth/verifyOtpScreen.styles";

export default function VerifyOtpScreen() {
  const { email: emailParam } = useLocalSearchParams<{ email: string }>();
  const { hydrated } = useSession();
  const emailToVerify = emailParam ?? "";

  if (!hydrated) {
    return (
      <AuthGridScreenShell centerContent>
        <View style={styles.loadingWrap}>
          <EmplusLottie
            source={lottieInventory.loader}
            style={verifyOtpLottieLoader}
            loop
          />
        </View>
      </AuthGridScreenShell>
    );
  }

  return (
    <AuthGridScreenShell centerContent>
      <VerifyOtpHeroSection email={emailToVerify} />
      <VerifyOtpForm email={emailToVerify} />
    </AuthGridScreenShell>
  );
}
