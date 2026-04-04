import React from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";

import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { useSession } from "@/src/framework/ctx/session-context";
import { lottieInventory } from "@/src/lottie/inventory";
import { PairingGridShell } from "@/src/features/pairing/PairingGridShell";
import { PairingScreenBody } from "@/src/features/pairing/PairingScreenBody";
import { pairingScreenStyles } from "@/src/features/pairing/pairingScreen.styles";

export default function PairingScreen() {
  const { session, hydrated, isAuthenticated } = useSession();
  const isPaired = Boolean(session?.user?.coupleId);

  if (!hydrated) {
    return (
      <PairingGridShell>
        <View style={pairingScreenStyles.loadingWrap}>
          <EmplusLottie
            source={lottieInventory.loader}
            style={{ width: 120, height: 120 }}
            loop
          />
        </View>
      </PairingGridShell>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (isPaired) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <PairingGridShell>
      <PairingScreenBody />
    </PairingGridShell>
  );
}
