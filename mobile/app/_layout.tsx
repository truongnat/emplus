import "@tamagui/native/setup-zeego";
import { tws } from "@/src/utils/tws";
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
  BeVietnamPro_800ExtraBold,
} from "@expo-google-fonts/be-vietnam-pro";
import { RobotoMono_400Regular, RobotoMono_700Bold } from "@expo-google-fonts/roboto-mono";
import { SessionProvider, useSession } from "@/src/framework/ctx/session-context";
import { ToastProvider } from "@/src/framework/ctx/toast-context";
import { palette } from "@/src/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppText } from "@/src/ui-kit";
import ApiContext from "@/src/framework/ctx/api-context";
import { DesignProvider } from "@/src/framework/design/design-provider";

/**
 * AuthGuard handles the conditional routing based on authentication and pairing status.
 */
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, hydrated, isAuthenticated } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;

    const inAuthGroup = segments[0] === "login" || segments[0] === "verify-otp" || segments[0] === "index";
    const isPaired = !!session?.user?.coupleId;

    if (!isAuthenticated) {
      if (!inAuthGroup) {
        router.replace("/login");
      }
    } else if (!isPaired) {
      if (segments[0] !== "pairing") {
        router.replace("/pairing");
      }
    } else {
      if (inAuthGroup || segments[0] === "pairing") {
        router.replace("/(tabs)");
      }
    }
  }, [isAuthenticated, session?.user?.coupleId, hydrated, segments, router]);

  if (!hydrated) {
    return (
      <View style={tws("flex-1 bg-white items-center justify-center")}>
        <ActivityIndicator color={(palette as any).primary} />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
    BeVietnamPro_800ExtraBold,
    RobotoMono_400Regular,
    RobotoMono_700Bold,
  });

  const content = () => {
    if (!fontsLoaded) {
      return (
        <View style={tws("flex-1 bg-slate-50 items-center justify-center gap-3")}>
          <ActivityIndicator color={(palette as any).primary} />
          <AppText variant="caption" color="slate-500">Đang tải Em Plus...</AppText>
        </View>
      );
    }

    return (
      <ApiContext>
        <SafeAreaProvider>
          <SessionProvider>
            <AuthGuard>
              <ToastProvider>
                <StatusBar style="auto" />
                <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', gestureEnabled: true }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="login" />
                  <Stack.Screen name="pairing" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="add-expense" />
                </Stack>
              </ToastProvider>
            </AuthGuard>
          </SessionProvider>
        </SafeAreaProvider>
      </ApiContext>
    );
  };

  return (
    <DesignProvider>
      {content()}
    </DesignProvider>
  );
}
