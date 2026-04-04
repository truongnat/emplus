import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, useThemeColors } from "@/src/theme";
import { ThemeModeProvider } from "@/src/theme/theme-mode-context";
import { SessionProvider } from "@/src/session-context";
import { ToastProvider } from "@/src/toast-context";
import { ApiProvider } from "@/src/framework/ctx/api-context";
import { NotificationBootstrap } from "@/src/components/NotificationBootstrap";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
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

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might cause errors here */
});

function FontLoadingScreen() {
  const colors = useThemeColors();
  return (
    <View
      style={[fontLoadingStyles.container, { backgroundColor: colors.background.default }]}
    >
      <EmplusLottie
        source={lottieInventory.loader}
        style={{ width: 120, height: 120 }}
        loop
        speed={1.1}
      />
      <Text style={[fontLoadingStyles.text, { color: colors.text.tertiary }]}>
        Đang tải Em+...
      </Text>
    </View>
  );
}

const fontLoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  text: {
    fontSize: 15,
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

function RootLayoutInner() {
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
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <FontLoadingScreen />;
  }

  return (
    <ToastProvider>
      <SessionProvider>
        <ApiProvider>
          <>
            <NotificationBootstrap />
            <StatusBar style="auto" />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="login"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="register"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="forgot-password"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="reset-password"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="pairing"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="verify-otp"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen name="policy" />
              <Stack.Screen name="add-expense" />
              <Stack.Screen name="add-memory" />
              <Stack.Screen name="memory/[id]" />
              <Stack.Screen name="profile-details/personal-info" />
              <Stack.Screen name="profile-details/notifications" />
              <Stack.Screen name="profile-details/appearance" />
              <Stack.Screen name="profile-details/privacy" />
              <Stack.Screen name="profile-details/help" />
            </Stack>
          </>
        </ApiProvider>
      </SessionProvider>
    </ToastProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeModeProvider>
        <ThemeProvider>
          <RootLayoutInner />
        </ThemeProvider>
      </ThemeModeProvider>
    </GestureHandlerRootView>
  );
}
