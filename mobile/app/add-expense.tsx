import React, { useState, useRef, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Text } from "@/src/components/atoms/Text";
import { Button } from "@/src/components/atoms/Button";
import { Card } from "@/src/components/molecules/Card";
import { palette } from "@/src/theme/tokens";
import { createBudgetExpense } from "@/src/api";
import { useToast } from "@/src/toast-context";
import { useSession } from "@/src/session-context";
import { useRouter } from "expo-router";
import { CATEGORY_CONFIG } from "@/src/features/budget/components/constants";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

interface Category {
  icon: string;
  bg: string;
  color: string;
  label: string;
}

export default function AddExpenseScreen() {
  const router = useRouter();
  const { withAccessToken } = useSession();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const amountInputRef = useRef<TextInput>(null);

  const { mutate: createExpense, isPending } = useMutation({
    mutationFn: (data: any) =>
      withAccessToken((api: any) => api.budget.createExpense.execute(data)),
    onSuccess: () => {
      showToast("Đã thêm chi tiêu mới!", "success");
      void queryClient.invalidateQueries({ queryKey: ["budgetExpenses"] });
      void queryClient.invalidateQueries({ queryKey: ["budgetSummary"] });
      router.back();
    },
    onError: (err: any) => {
      showToast(err.message || "Không thể thêm chi tiêu", "error");
    },
  });

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    if (!amount || !categoryId) {
      showToast("Vui lòng nhập số tiền và chọn danh mục", "warning");
      return;
    }
    createExpense({
      amount: parseFloat(amount.replace(/,/g, "")),
      categoryId,
      description: description || undefined,
      date: new Date(date).toISOString(),
    });
  }, [amount, categoryId, description, date, createExpense, showToast]);

  const handleCategorySelect = useCallback((id: string) => {
    setCategoryId(id);
    amountInputRef.current?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={insets.top + 60}
    >
      <AppScreen>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <TextInput
              ref={amountInputRef}
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0 ₫"
              placeholderTextColor={palette.zinc400}
              keyboardType="decimal-pad"
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>

          {/* Category Selection */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>DANH MỤC</Text>
            <View style={styles.categoryGrid}>
              {(Object.entries(CATEGORY_CONFIG) as [string, Category][]).map(
                ([id, config]) => (
                  <View key={id} style={styles.categoryItem}>
                    <BlurView
                      intensity={80}
                      tint="light"
                      style={[
                        styles.categoryButton,
                        categoryId === id && styles.categoryButtonActive,
                      ]}
                    >
                      <LinearGradient
                        colors={
                          categoryId === id
                            ? [palette.violet600, palette.violet700]
                            : ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.6)"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.categoryGradient}
                      >
                        <View style={styles.categoryIconContainer}>
                          <Ionicons
                            name={config.icon as any}
                            size={20}
                            color={categoryId === id ? "#fff" : palette.zinc700}
                          />
                        </View>
                        <Text
                          style={[
                            styles.categoryLabel,
                            categoryId === id
                              ? styles.categoryLabelActive
                              : styles.categoryLabelInactive,
                          ]}
                        >
                          {config.label}
                        </Text>
                      </LinearGradient>
                    </BlurView>
                  </View>
                ),
              )}
            </View>
          </View>

          {/* Description Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>GHI CHÚ</Text>
            <Card style={styles.fieldCard}>
              <View style={styles.fieldContent}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={palette.zinc600}
                />
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Nhập ghi chú..."
                  placeholderTextColor={palette.zinc400}
                  value={description}
                  onChangeText={setDescription}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="done"
                />
              </View>
            </Card>
          </View>

          {/* Date Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>NGÀY</Text>
            <Card style={styles.fieldCard}>
              <View style={styles.fieldContent}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={palette.zinc600}
                />
                <TextInput
                  style={styles.fieldInput}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={palette.zinc400}
                  value={date}
                  onChangeText={setDate}
                  onFocus={() => setFocusedField("date")}
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="done"
                />
              </View>
            </Card>
          </View>

          {/* Submit Button */}
          <Button
            label={isPending ? "Đang xử lý..." : "Xác nhận chi tiêu"}
            onPress={handleSubmit}
            disabled={isPending}
            fullWidth
            style={styles.submitButton}
          >
            {isPending && (
              <ActivityIndicator color="#fff" style={styles.buttonIcon} />
            )}
            {!isPending && (
              <>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Xác nhận chi tiêu</Text>
              </>
            )}
          </Button>
        </ScrollView>
      </AppScreen>

      {isPending && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.zinc50,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  amountContainer: {
    marginBottom: 24,
  },
  amountInput: {
    fontSize: 42,
    fontWeight: "bold",
    color: palette.zinc900,
    textAlign: "center",
    paddingVertical: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  categoryLabelActive: {
    color: "#fff",
  },
  categoryLabelInactive: {
    color: palette.zinc700,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryItem: {
    width: "31%",
  },
  categoryButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  categoryButtonActive: {
    shadowColor: palette.violet600,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryGradient: {
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  fieldCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  fieldContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  fieldInput: {
    flex: 1,
    fontSize: 15,
    color: palette.zinc900,
    padding: 0,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
