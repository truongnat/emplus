import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Input } from "@/src/components/atoms/Input";
import { Text, Checkbox } from "@/src/components/atoms";
import { RegisterSchema, RegisterFields } from "@/src/forms";
import { useRegister } from "@/src/presentation/hooks/auth/useRegister";
import { useThemeColors } from "@/src/theme";
import { palette } from "@/src/theme/tokens";

export default function RegisterScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();

    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    const registerMutation = useRegister({
        onSuccess: (data: any) => {
            router.replace({
                pathname: "/verify-otp",
                params: { email: data.user.email, flow: "register" },
            });
        },
        showToast: true,
    });


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const registerForm = useForm<RegisterFields>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "NAM",
            policyAccepted: false,
        },
        mode: "onBlur",
    });

    const handleRegister = registerForm.handleSubmit((data) => {
        Keyboard.dismiss();
        registerMutation.mutate({
            email: data.email,
            password: data.password,
            fullName: data.fullName,
            gender: data.gender,
        });
    });

    const isRegistering = registerMutation.isPending;

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
                extraHeight={50}
                keyboardOpeningTime={0}

            >
                <View style={styles.navHeader}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text.primary }]}>
                        Tạo tài khoản
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                        Bắt đầu hành trình xây dựng tổ ấm cùng Em Plus
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Controller
                        control={registerForm.control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.genderContainer}>
                                <Text style={[styles.fieldLabel, { color: colors.text.secondary }]}>Giới tính</Text>
                                <View style={styles.genderGrid}>
                                    {(["NAM", "NU", "KHAC"] as const).map((g) => (
                                        <TouchableOpacity
                                            key={g}
                                            onPress={() => onChange(g)}
                                            style={[
                                                styles.genderButton,
                                                { borderColor: colors.border.default },
                                                value === g ? {
                                                    borderColor: colors.brand.default,
                                                    backgroundColor: colors.brand.muted
                                                } : {},
                                            ]}
                                        >
                                            <Text style={[
                                                styles.genderText,
                                                { color: colors.text.secondary },
                                                value === g ? { color: colors.brand.default, fontWeight: "bold" } : {}
                                            ]}>
                                                {g === "NAM" ? "Nam" : g === "NU" ? "Nữ" : "Khác"}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        )}
                    />

                    <Controller
                        control={registerForm.control}
                        name="fullName"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                label="Họ và tên"
                                placeholder="Nguyễn Văn A"
                                value={value}
                                onChangeText={onChange}
                                error={error?.message}
                                returnKeyType="next"
                                onSubmitEditing={() => emailRef.current?.focus()}
                                blurOnSubmit={false}
                            />
                        )}
                    />

                    <Controller
                        control={registerForm.control}
                        name="email"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                ref={emailRef}
                                label="Email"
                                placeholder="vi_du@email.com"
                                value={value}
                                onChangeText={onChange}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoComplete="email"
                                error={error?.message}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current?.focus()}
                                blurOnSubmit={false}
                            />
                        )}
                    />

                    <Controller
                        control={registerForm.control}
                        name="password"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                ref={passwordRef}
                                label="Mật khẩu"
                                placeholder="••••••••"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={!showPassword}
                                error={error?.message}
                                returnKeyType="next"
                                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                                blurOnSubmit={false}
                                rightElement={
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={{ padding: 4 }}
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
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                ref={confirmPasswordRef}
                                label="Xác nhận mật khẩu"
                                placeholder="••••••••"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={!showConfirmPassword}
                                error={error?.message}
                                returnKeyType="go"
                                onSubmitEditing={handleRegister}
                                rightElement={
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{ padding: 4 }}
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

                    <Controller
                        control={registerForm.control}
                        name="policyAccepted"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <View style={styles.policyContainer}>
                                <View style={styles.policyRow}>
                                    <Checkbox
                                        value={value}
                                        onValueChange={onChange}
                                    />
                                    <View style={styles.policyTextContainer}>
                                        <Text style={[styles.policyLabel, { color: colors.text.secondary }]}>
                                            Tôi đồng ý với{" "}
                                            <Text
                                                style={[styles.policyLink, { color: colors.brand.text }]}
                                                onPress={() => router.push("/policy")}
                                            >
                                                Chính sách & Bảo mật
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                                {error && (
                                    <Text style={[styles.policyError, { color: colors.status.error.text }]}>
                                        {error.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />



                    <Button
                        label={isRegistering ? "Đang xử lý..." : "Đăng ký"}
                        onPress={handleRegister}
                        disabled={isRegistering}
                        loading={isRegistering}
                        fullWidth
                        size="lg"
                        style={styles.submitButton}
                    />

                    {/* Temporary Test Button */}
                    <Button
                        label="TEST: Sang màn OTP"
                        onPress={() => router.push("/verify-otp")}
                        variant="secondary"
                        fullWidth
                        size="sm"
                        style={{ marginTop: 12, borderStyle: 'dashed' }}
                    />


                    <View style={styles.loginLinkContainer}>
                        <Text style={[styles.loginLinkLabel, { color: colors.text.secondary }]}>
                            Đã có tài khoản?
                        </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={[styles.loginLinkText, { color: colors.brand.text }]}>
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>

        </AppScreen>
    );
}

const styles = StyleSheet.create({
    appScreen: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    navHeader: {

        paddingHorizontal: 16,
        paddingTop: 8,
        height: 56,
        justifyContent: "center",
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
    },
    formContainer: {
        gap: 20,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },
    genderContainer: {
        marginBottom: 4,
    },
    genderGrid: {
        flexDirection: "row",
        gap: 12,
    },
    genderButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    genderText: {
        fontSize: 14,
    },
    policyContainer: {
        marginTop: 4,
    },
    policyRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    policyTextContainer: {
        flex: 1,
        paddingTop: 2,
    },
    policyLabel: {
        fontSize: 14,
        lineHeight: 20,
    },
    policyLink: {
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    policyError: {
        fontSize: 12,
        marginTop: 4,
        marginLeft: 34,
    },

    submitButton: {
        marginTop: 12,
    },
    loginLinkContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 8,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: palette.zinc200,
    },
    loginLinkLabel: {
        fontSize: 14,
    },
    loginLinkText: {
        fontSize: 14,
        fontWeight: "700",
    },
});
