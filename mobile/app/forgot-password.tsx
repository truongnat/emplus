import React, { useRef } from "react";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ForgotPasswordSchema, ForgotPasswordFields } from "@/src/forms";
import { useThemeColors } from "@/src/theme";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();

    const form = useForm<ForgotPasswordFields>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const handleSendOtp = form.handleSubmit((data) => {
        Keyboard.dismiss();
        // TODO: Call API to send reset OTP
        // For now, navigate to verify-otp with forgot-password flow
        router.push({
            pathname: "/verify-otp",
            params: { email: data.email, flow: "forgot-password" },
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
                        label="Gửi mã xác thực"
                        onPress={handleSendOtp}
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
