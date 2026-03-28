import React, { useState, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Input } from "@/src/components/atoms/Input";
import { Text } from "@/src/components/atoms";
import { ResetPasswordSchema, ResetPasswordFields } from "@/src/forms";
import { useThemeColors } from "@/src/theme";
import { useToast } from "@/src/toast-context";
import { dependencies } from "@/src/framework/di/dependencies";
import { toDisplayError } from "@/src/core/api/to-display-error";

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { email: emailParam } = useLocalSearchParams<{ email: string }>();
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();
    const { showToast } = useToast();

    const email = typeof emailParam === "string" ? emailParam : "";

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const otpRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    const form = useForm<ResetPasswordFields>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            otp: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const resetMutation = useMutation({
        mutationFn: (payload: { email: string; otp: string; newPassword: string }) =>
            dependencies.auth.resetPassword.execute(payload),
        onSuccess: () => {
            showToast("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.", "success");
            router.replace("/login");
        },
        onError: (err) => {
            showToast(toDisplayError(err), "error");
        },
    });

    const handleResetPassword = form.handleSubmit((data) => {
        Keyboard.dismiss();
        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail) {
            showToast("Thiếu email. Vui lòng bắt đầu lại từ Quên mật khẩu.", "error");
            return;
        }
        resetMutation.mutate({
            email: normalizedEmail,
            otp: data.otp,
            newPassword: data.password,
        });
    });

    return (
        <AppScreen style={styles.appScreen}>
            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 40 },
                ]}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets={true}
                enableAutomaticScroll={true}
                extraScrollHeight={20}
                keyboardOpeningTime={0}
            >
                <View style={styles.navHeader}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.brand.muted }]}>
                        <MaterialCommunityIcons name="shield-lock-outline" size={48} color={colors.brand.default} />
                    </View>
                    <Text style={[styles.title, { color: colors.text.primary }]}>Đặt lại mật khẩu</Text>
                    <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                        Thiết lập mật khẩu mới cho tài khoản{"\n"}
                        <Text variant="bodyBold" style={{ color: colors.brand.text }}>{email}</Text>
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Controller
                        control={form.control}
                        name="otp"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                ref={otpRef}
                                label="Mã OTP (6 số)"
                                placeholder="000000"
                                value={value}
                                onChangeText={(t) => onChange(t.replace(/[^0-9]/g, "").slice(0, 6))}
                                keyboardType="number-pad"
                                maxLength={6}
                                error={error?.message}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current?.focus()}
                                blurOnSubmit={false}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                ref={passwordRef}
                                label="Mật khẩu mới"
                                placeholder="••••••••"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={!showPassword}
                                error={error?.message}
                                autoComplete="password-new"
                                returnKeyType="next"
                                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                                blurOnSubmit={false}
                                rightElement={
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color={colors.text.tertiary}
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="confirmPassword"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                ref={confirmPasswordRef}
                                label="Xác nhận mật khẩu mới"
                                placeholder="••••••••"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={!showConfirmPassword}
                                error={error?.message}
                                autoComplete="password-new"
                                returnKeyType="go"
                                onSubmitEditing={handleResetPassword}
                                rightElement={
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color={colors.text.tertiary}
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        )}
                    />

                    <Button
                        label={
                            resetMutation.isPending
                                ? "Đang cập nhật..."
                                : "Cập nhật mật khẩu"
                        }
                        onPress={handleResetPassword}
                        disabled={resetMutation.isPending}
                        fullWidth
                        size="lg"
                        style={styles.submitButton}
                    />
                </View>
            </KeyboardAwareScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    appScreen: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    navHeader: {
        height: 56,
        justifyContent: "center",
        marginLeft: -8,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
    },
    formContainer: {
        gap: 20,
    },
    eyeIcon: {
        padding: 4,
    },
    submitButton: {
        marginTop: 10,
    },
});
