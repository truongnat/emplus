import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { SessionProvider } from "@/src/framework/ctx/session-context";
import { ToastProvider } from "@/src/framework/ctx/toast-context";
import { ApiProvider } from "@/src/framework/ctx/api-context";
import { DesignProvider } from "@/src/framework/design/design-provider";
import { palette } from "@/src/theme";
import { AppText } from "@/src/ui-kit";
import { tws } from "@/src/utils/tws";
import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
  BeVietnamPro_800ExtraBold,
} from "@expo-google-fonts/be-vietnam-pro";
import { RobotoMono_400Regular, RobotoMono_700Bold } from "@expo-google-fonts/roboto-mono";

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

  if (!fontsLoaded) {
    return (
      <View style={tws("flex-1 bg-slate-50 items-center justify-center gap-3")}>
        <ActivityIndicator color={palette.primary} />
        <AppText variant="caption" color="slate-500">Đang tải Em Plus...</AppText>
      </View>
    );
  }

  return (
    <DesignProvider>
      <SessionProvider>
        <ToastProvider>
          <ApiProvider>
            <>
              <StatusBar style="auto" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  gestureEnabled: true
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen name="verify-otp" />
                <Stack.Screen name="pairing" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="add-expense" />
              </Stack>
            </>
          </ApiProvider>
        </ToastProvider>
      </SessionProvider>
    </DesignProvider>
  );
}
