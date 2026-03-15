import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { ThemeProvider } from "@/src/theme";
import { ThemeModeProvider } from "@/src/theme/theme-mode-context";
import { SessionProvider } from "@/src/session-context";
import { ToastProvider } from "@/src/toast-context";
import { ApiProvider } from "@/src/framework/ctx/api-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { palette } from "@/src/theme/tokens";
import { AppText } from "@/src/components/atoms/Text";
import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
  BeVietnamPro_800ExtraBold,
} from "@expo-google-fonts/be-vietnam-pro";
import {
  RobotoMono_400Regular,
  RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.zinc50 },
});

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

  useEffect(() => {
    console.log("Fonts loaded:", fontsLoaded);
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Waiting for fonts...");
    return (
      <View style={styles.container}>
        <ActivityIndicator color={palette.violet600} />
        <AppText style={{ fontSize: 13, color: palette.zinc500 }}>
          Đang tải Em Plus...
        </AppText>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeModeProvider>
        <ThemeProvider>
          <SessionProvider>
            <ToastProvider>
              <ApiProvider>
                <>
                  <StatusBar style="auto" />
                  <Stack
                    screenOptions={{
                      headerShown: false,
                      animation: "slide_from_right",
                    }}
                  >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="login" />
                    <Stack.Screen name="pairing" />
                    <Stack.Screen name="verify-otp" />
                    <Stack.Screen name="policy" />
                    <Stack.Screen name="add-expense" />
                    <Stack.Screen name="profile-details/personal-info" />
                    <Stack.Screen name="profile-details/notifications" />
                    <Stack.Screen name="profile-details/appearance" />
                    <Stack.Screen name="profile-details/privacy" />
                    <Stack.Screen name="profile-details/help" />
                  </Stack>
                </>
              </ApiProvider>
            </ToastProvider>
          </SessionProvider>
        </ThemeProvider>
      </ThemeModeProvider>
    </GestureHandlerRootView>
  );
}
