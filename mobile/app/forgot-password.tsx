import React from "react";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Input } from "@/src/components/atoms/Input";
import { Text } from "@/src/components/atoms";
import { ForgotPasswordSchema, ForgotPasswordFields } from "@/src/forms";
import { useThemeColors } from "@/src/theme";
import { dependencies } from "@/src/framework/di/dependencies";
import { useToast } from "@/src/toast-context";
import { toDisplayError } from "@/src/core/api/to-display-error";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();
    const { showToast } = useToast();

    const form = useForm<ForgotPasswordFields>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const sendOtpMutation = useMutation({
        mutationFn: (email: string) =>
            dependencies.auth.requestPasswordReset.execute({ email }),
        onSuccess: (_, email) => {
            showToast("Đã gửi mã xác thực đến email của bạn.", "success");
            router.push({
                pathname: "/reset-password",
                params: { email },
            });
        },
        onError: (err) => {
            showToast(toDisplayError(err), "error");
        },
    });

    const handleSendOtp = form.handleSubmit((data) => {
        Keyboard.dismiss();
        sendOtpMutation.mutate(data.email.trim().toLowerCase());
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
                        <MaterialCommunityIcons name="lock-reset" size={48} color={colors.brand.default} />
                    </View>
                    <Text style={[styles.title, { color: colors.text.primary }]}>Quên mật khẩu?</Text>
                    <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                        Nhập email của bạn để nhận mã xác thực đặt lại mật khẩu.
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                label="Email"
                                placeholder="ví_dụ@email.com"
                                value={value}
                                onChangeText={onChange}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoComplete="email"
                                error={error?.message}
                                returnKeyType="go"
                                onSubmitEditing={handleSendOtp}
                            />
                        )}
                    />

                    <Button
                        label={
                            sendOtpMutation.isPending
                                ? "Đang gửi..."
                                : "Gửi mã xác thực"
                        }
                        onPress={handleSendOtp}
                        disabled={sendOtpMutation.isPending}
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
        paddingHorizontal: 10,
    },
    formContainer: {
        gap: 20,
    },
    submitButton: {
        marginTop: 10,
    },
});
