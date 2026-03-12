import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppButton, AppScreen, AppText, FieldError, GlassCard, Reveal, TransitionOverlay } from "../src/ui-kit";
import { toDisplayError, verifyOTP } from "../src/api";
import { OtpSchema, OtpFields } from "../src/forms";
import { useSession } from "../src/session-context";
import { useToast } from "../src/toast-context";
import { fonts, palette } from "../src/theme";

export default function VerifyOtpScreen() {
    const router = useRouter();
    const { email: emailParam } = useLocalSearchParams<{ email: string }>();
    const { setSession, hydrated } = useSession();
    const { showToast } = useToast();

    const [countdown, setCountdown] = useState(300);

    const emailToVerify = emailParam || "";

    const otpForm = useForm<OtpFields>({
        resolver: zodResolver(OtpSchema),
        defaultValues: { otp: "" },
        mode: "onChange",
    });

    const verifyMutation = useMutation({
        mutationFn: verifyOTP,
        onSuccess: (session) => {
            setSession(session);
            router.replace(!!session.user.coupleId ? "/(tabs)/home" : "/pairing");
        },
        onError: (err) => {
            showToast(toDisplayError(err), "error");
        }
    });

    const handleOtpSubmit = (data: OtpFields) => {
        verifyMutation.mutate({ email: emailToVerify, otp: data.otp });
    };

    const handleResendOtp = () => {
        showToast("Vui lòng quay lại màn hình đăng nhập để yêu cầu mã mới.", "info");
    };

    const otpValue = otpForm.watch("otp");
    useEffect(() => {
        if (otpValue?.length === 6) {
            otpForm.handleSubmit(handleOtpSubmit)();
        }
    }, [otpValue]);

    useEffect(() => {
        let timer: any;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    if (!hydrated) return null;

    return (
        <AppScreen>
            <Reveal>
                <View style={styles.headerArea}>
                    <View style={styles.logoContainer}>
                        <MaterialCommunityIcons name="heart-outline" size={40} color={palette.primary} />
                    </View>
                    <AppText variant="h1" style={styles.title}>Xác thực OTP</AppText>
                    <AppText variant="h3" color={palette.muted} style={styles.subtitle}>
                        Mã xác thực đã được gửi tới{"\n"}
                        <AppText variant="bodyBold" color={palette.ink}>{emailToVerify}</AppText>
                    </AppText>
                </View>
            </Reveal>

            <Reveal delay={80}>
                <View style={styles.cardWrap}>
                    <GlassCard>
                        <View style={styles.formContainer}>
                            <View style={styles.inputGroup}>
                                <AppText variant="bodyBold" style={styles.label}>Nhập mã OTP</AppText>
                                <Controller
                                    control={otpForm.control}
                                    name="otp"
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <>
                                            <View style={[styles.inputContainer, error && styles.inputError]}>
                                                <Ionicons name="key-outline" size={20} color={palette.muted} style={styles.inputIcon} />
                                                <TextInput
                                                    value={value}
                                                    onChangeText={onChange}
                                                    placeholder="123456"
                                                    placeholderTextColor={palette.muted}
                                                    keyboardType="number-pad"
                                                    maxLength={6}
                                                    autoFocus
                                                    style={[styles.input, { letterSpacing: 8, textAlign: "center", fontSize: 20 }]}
                                                />
                                            </View>
                                            <FieldError message={error?.message} />
                                        </>
                                    )}
                                />
                            </View>

                            <AppButton
                                label="Xác nhận OTP"
                                onPress={otpForm.handleSubmit(handleOtpSubmit)}
                                loading={verifyMutation.isPending}
                                variant="primary"
                                style={styles.submitButton}
                            />

                            <View style={{ marginTop: 16, alignItems: "center" }}>
                                <AppText variant="caption" color={countdown > 0 ? palette.muted : palette.danger}>
                                    {countdown > 0
                                        ? `Mã sẽ hết hạn sau ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
                                        : "Mã OTP đã hết hạn"}
                                </AppText>
                                {countdown === 0 && (
                                    <Pressable onPress={handleResendOtp} style={{ marginTop: 8 }}>
                                        <AppText variant="bodyBold" color={palette.primary}>Gửi lại mã mới</AppText>
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </GlassCard>
                </View>
            </Reveal>


            <TransitionOverlay visible={verifyMutation.isPending} />
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    headerArea: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    logoContainer: {
        width: 64,
        height: 64,
        borderRadius: 18,
        backgroundColor: palette["primary-subtle"],
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: palette["glass-border"],
        marginBottom: 12,
        ...Platform.select({
            ios: {
                shadowColor: palette.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    title: {
        fontSize: 32,
        fontFamily: fonts.monoBold,
        color: palette.ink,
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.mono,
        color: palette.muted,
        textAlign: "center",
        paddingHorizontal: 32,
        lineHeight: 24,
    },
    cardWrap: {
        paddingHorizontal: 24,
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
    },
    formContainer: {
        gap: 14,
        paddingVertical: 6,
    },
    inputGroup: {
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontFamily: fonts.monoBold,
        color: palette['slate-700'],
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: palette["input-bg"],
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 48,
        borderWidth: 1,
        borderColor: "transparent",
    },
    inputError: {
        borderColor: palette.danger,
        backgroundColor: "rgba(239, 68, 68, 0.05)",
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: fonts.mono,
        color: palette.ink,
        paddingVertical: 12
    },
    submitButton: {
        marginTop: 10,
    },
});
