import { useEffect, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText, AppButton } from "@/src/ui-kit";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { useThemeColors, useThemeMode } from "@/src/theme";
import type { SemanticColors } from "@/src/theme/tokens/semantic";
import { useSession } from "@/src/session-context";
import { dependencies } from "@/src/framework/di/dependencies";
import { useToast } from "@/src/toast-context";
import { toDisplayError } from "@/src/api";
import type { UserModule } from "@/src/domain/entities/schemas";

function createStyles(c: SemanticColors) {
  return StyleSheet.create({
    screenRoot: { flex: 1, zIndex: 1 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
    },
    headerTitle: { fontSize: 18, fontWeight: "800", color: c.text.primary },
    section: { marginTop: 8, marginBottom: 8, paddingHorizontal: 20 },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "bold",
      color: c.text.tertiary,
      textTransform: "uppercase" as "uppercase",
      letterSpacing: 1,
    },
    fieldContainer: {
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
    },
    fieldRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 12,
    },
    fieldIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: c.surface.sunken,
      alignItems: "center",
      justifyContent: "center",
    },
    fieldContainer2: { flex: 1 },
    fieldLabel: {
      fontSize: 13,
      fontWeight: "bold",
      color: c.text.tertiary,
      marginBottom: 4,
    },
    fieldInput: { fontSize: 15, color: c.text.primary, padding: 8 },
    fieldInputReadonly: { opacity: 0.75 },
    divider: { height: 1, backgroundColor: c.border.subtle, marginVertical: 8 },
    hint: {
      fontSize: 12,
      color: c.text.tertiary,
      paddingHorizontal: 20,
      marginBottom: 8,
    },
  });
}

export default function PersonalInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { session, setSession, hydrated } = useSession();
  const { showToast } = useToast();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    const u = session?.user;
    if (!u || !hydrated) return;
    setFullName(u.fullName ?? "");
    setNickname(u.nickname ?? "");
    setEmail(u.email ?? "");
    setDob(u.dob ?? "");
  }, [session?.user, hydrated]);

  const scrollPadBottom = Math.max(insets.bottom + 32, 48);

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: async () => {
      const body: UserModule.UpdateProfileRequest = {
        fullName: fullName.trim(),
        nickname: nickname.trim() || undefined,
        dob: dob.trim() || undefined,
      };
      return dependencies.auth.updateProfile.execute(body);
    },
    onSuccess: (user) => {
      setSession((prev) => (prev ? { ...prev, user } : null));
      showToast("Đã lưu hồ sơ", "success");
    },
    onError: (err: unknown) => {
      showToast(toDisplayError(err), "error");
    },
  });

  return (
    <AppScreen
      applyTopSafeAreaPadding={false}
      wrapWithKeyboardDismiss={false}
      style={{
        ...loginScreenStyles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={loginScreenStyles.appContent}
      animatedEntrance={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={homeScreenStyles.layerRoot}>
        <LoginGridAnimatedBackground isDark={isDark} />
        <KeyboardAvoidingView
          style={styles.screenRoot}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={insets.top}
        >
          <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Quay lại"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={colors.text.primary}
              />
            </TouchableOpacity>
            <AppText style={styles.headerTitle}>Thông tin tài khoản</AppText>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1, backgroundColor: "transparent" }}
            contentContainerStyle={{ paddingBottom: scrollPadBottom }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AppText style={styles.hint}>
              Ngày sinh theo định dạng YYYY-MM-DD. Tên hiển thị là tên chính trên
              tab Hồ sơ (có thể để trống để dùng họ tên).
            </AppText>

            <View style={styles.section}>
              <AppText style={styles.sectionLabel}>Thông tin cơ bản</AppText>
            </View>

            <View style={styles.fieldContainer}>
              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Họ và tên</AppText>
                  <TextInput
                    style={styles.fieldInput}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor={colors.text.tertiary}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="at-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Tên hiển thị</AppText>
                  <TextInput
                    style={styles.fieldInput}
                    value={nickname}
                    onChangeText={setNickname}
                    placeholder="Ví dụ: Mèo, Anh yêu…"
                    placeholderTextColor={colors.text.tertiary}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Email</AppText>
                  <TextInput
                    style={[styles.fieldInput, styles.fieldInputReadonly]}
                    value={email}
                    editable={false}
                    placeholderTextColor={colors.text.tertiary}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.fieldRow}>
                <View style={styles.fieldIcon}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={colors.text.secondary}
                  />
                </View>
                <View style={styles.fieldContainer2}>
                  <AppText style={styles.fieldLabel}>Ngày sinh (YYYY-MM-DD)</AppText>
                  <TextInput
                    style={styles.fieldInput}
                    value={dob}
                    onChangeText={setDob}
                    placeholder="1990-01-01"
                    placeholderTextColor={colors.text.tertiary}
                  />
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
              {isPending ? (
                <ActivityIndicator color={colors.brand.default} />
              ) : (
                <AppButton
                  label="Lưu thay đổi"
                  onPress={() => saveProfile()}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </AppScreen>
  );
}
