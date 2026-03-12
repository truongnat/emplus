import { tws } from "@/src/utils/tws";
import React, { useState, useRef, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    View,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette } from "@/src/theme";
import { PressableScale, AppText } from "@/src/ui-kit";
import { createBudgetExpense } from "@/src/api";
import { useToast } from "@/src/toast-context";
import { useSession } from "@/src/session-context";
import { CATEGORY_CONFIG } from "@/src/components/budget/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const PremiumField = ({
    label,
    value,
    onChangeText,
    placeholder,
    icon,
    keyboardType = "default",
    onFocus,
    isFocused
}: {
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    icon: any,
    keyboardType?: any,
    onFocus?: () => void,
    isFocused?: boolean
}) => (
    <View style={tws("gap-2")}>
        <AppText variant="captionBold" color="slate-500" style={tws("tracking-widest ml-1")}>{label}</AppText>
        <View style={tws(`flex-row items-center bg-slate-50 border ${isFocused ? 'border-secondary' : 'border-slate-200'} rounded-3xl px-5 py-3.5 shadow-sm overflow-hidden`)}>
            <View style={tws("mr-3 w-8 h-8 rounded-xl bg-white items-center justify-center shadow-sm shadow-slate-200/50")}>
                <Ionicons name={icon} size={18} color={isFocused ? (palette as any).secondary : (palette as any)['slate-600']} />
            </View>
            <TextInput
                style={tws("flex-1 font-bold text-[16px] text-slate-800 p-0")}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={(palette as any).placeholder}
                keyboardType={keyboardType}
                onFocus={onFocus}
                returnKeyType="done"
                blurOnSubmit={true}
            />
        </View>
    </View>
);

export default function AddExpenseScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const scrollViewRef = useRef<ScrollView>(null);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("other");
    const [place, setPlace] = useState("");
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const { withAccessToken } = useSession();
    const { showToast } = useToast();
    const queryClient = useQueryClient();

    const handleFieldFocus = useCallback((field: string, index: number) => {
        setFocusedField(field);
        setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    y: index * 140,
                    animated: true
                });
            }
        }, 150);
    }, []);

    const handleClose = () => {
        Keyboard.dismiss();
        router.back();
    };

    const mutation = useMutation({
        mutationFn: (data: Parameters<typeof createBudgetExpense>[1]) =>
            withAccessToken((token) => createBudgetExpense(token, data)),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["budgetSummary"] });
            void queryClient.invalidateQueries({ queryKey: ["budgetExpenses"] });
            showToast("Đã thêm thành công!", "success");
            handleClose();
        },
        onError: () => {
            showToast("Có lỗi xảy ra", "error");
        },
    });

    const handleSubmit = () => {
        if (!title || !amount) {
            showToast("Vui lòng nhập tên và số tiền", "error");
            return;
        }
        mutation.mutate({
            title,
            amount: parseFloat(amount),
            category,
            place: place || undefined,
            status: "PENDING",
            date: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <KeyboardAvoidingView
            style={tws("flex-1 bg-white")}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View style={[tws("flex-1"), { paddingTop: insets.top + 16 }]}>
                <View style={tws("flex-row items-center justify-between mb-6 px-6 gap-4")}>
                    <PressableScale onPress={handleClose} style={tws("w-10 h-10 rounded-full items-center justify-center bg-slate-100")}>
                        <Ionicons name="arrow-back" size={20} color={(palette as any)['slate-800']} />
                    </PressableScale>
                    <View style={tws("flex-1")}>
                        <AppText variant="h1" color="slate-900" style={tws("tracking-tight")}>Chi tiêu mới</AppText>
                        <AppText variant="caption" color="slate-500" style={tws("mt-0.5")}>Xây dựng thói quen tài chính tốt</AppText>
                    </View>
                    <View style={tws("w-10 h-10")} />
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: insets.bottom + 140, paddingHorizontal: 24 }}
                    style={tws("flex-1")}
                >
                    <View style={tws("gap-6")}>
                        <PremiumField
                            label="Lý do chi tiêu"
                            icon="reader-outline"
                            placeholder="Ví dụ: Ăn tối cùng gia đình..."
                            value={title}
                            onChangeText={setTitle}
                            onFocus={() => handleFieldFocus('title', 0)}
                            isFocused={focusedField === 'title'}
                        />

                        <PremiumField
                            label="Số tiền (VNĐ)"
                            icon="wallet-outline"
                            placeholder="0"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            onFocus={() => handleFieldFocus('amount', 1)}
                            isFocused={focusedField === 'amount'}
                        />

                        <View style={tws("gap-3.5")}>
                            <AppText variant="captionBold" color="slate-500" style={tws("tracking-widest ml-1")}>Danh mục chi tiêu</AppText>
                            <View style={tws("flex-row flex-wrap gap-2.5")}>
                                {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
                                    const isSelected = category === key;
                                    return (
                                        <PressableScale
                                            key={key}
                                            onPress={() => setCategory(key)}
                                            style={tws(
                                                "flex-row items-center gap-2.5 px-4 py-3 rounded-2xl border",
                                                isSelected ? "border-transparent shadow-md shadow-secondary/20" : "bg-slate-50 border-slate-200"
                                            )}
                                        >
                                            {isSelected && (
                                                <View style={tws("absolute inset-0 bg-secondary rounded-2xl")} />
                                            )}
                                            <View style={tws("w-7 h-7 rounded-xl items-center justify-center", { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : cfg.bg })}>
                                                <Ionicons name={cfg.icon} size={15} color={isSelected ? "white" : cfg.color} />
                                            </View>
                                            <AppText variant="bodyBold" color={isSelected ? "white" : "slate-600"}>{cfg.label}</AppText>
                                        </PressableScale>
                                    );
                                })}
                            </View>
                        </View>

                        <PremiumField
                            label="Địa điểm (Tùy chọn)"
                            icon="map-outline"
                            placeholder="Nơi bạn đã chi tiêu..."
                            value={place}
                            onChangeText={setPlace}
                            onFocus={() => handleFieldFocus('place', 3)}
                            isFocused={focusedField === 'place'}
                        />

                        <PressableScale
                            onPress={handleSubmit}
                            disabled={mutation.isPending}
                            style={tws("mt-4 min-h-[56px] rounded-2xl overflow-hidden shadow-lg shadow-secondary/30")}
                        >
                            <View style={tws("absolute inset-0 bg-secondary")} />
                            <View style={tws("absolute inset-0 flex-row items-center justify-center px-4")}>
                                <View style={tws("flex-row items-center justify-center gap-3")}>
                                    <AppText variant="bodyBold" color="white" style={tws("tracking-tight")}>Tạo chi tiêu ngay</AppText>
                                    <View style={tws("w-7 h-7 rounded-full bg-white/20 items-center justify-center")}>
                                        <Ionicons name="arrow-forward" size={14} color="white" />
                                    </View>
                                </View>
                            </View>
                        </PressableScale>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
