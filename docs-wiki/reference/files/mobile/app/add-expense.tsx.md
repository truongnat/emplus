---
title: "mobile/app/add-expense.tsx"
description: "Add Expense Screen function returns AddExpenseScene object"
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/app/add-expense.tsx.md"
  relativePath: "mobile/app/add-expense.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/add-expense.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/app/add-expense.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/add-expense.tsx`
- Lines: 398
- Symbols: 2

## Related Features

- [Search Create](../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.

## AI Summary

Add Expense Screen function returns AddExpenseScene object

### Responsibilities

- Adds a new expense to the budget.

### Usage Notes

- Notifies user withtoast message after successfully adding expense.

## Public API

- `function AddExpenseScreen()`

## Symbols

### function `AddExpenseScreen`

- Signature: `function AddExpenseScreen()`
- Lines: 39-271
- Exported: yes

```tsx
function AddExpenseScreen() {
  const router = useRouter();
  const colors = useThemeColors();
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
  const descriptionInputRef = useRef<TextInput>(null);
  const dateInputRef = useRef<TextInput>(null);


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
          <View style={{ alignItems: "center", marginBottom: 8 }}>
            <EmplusLottie
              source={lottieInventory.placeholder}
              style={{ width: 88, height: 88 }}
              loop
              speed={0.7}
            />
          </View>

          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <TextInput
              ref={amountInputRef}
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0 ₫"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => {
                // Focus description after clicking next on amount
                descriptionInputRef.current?.focus();
              }}
              blurOnSubmit={false}
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
                            ? [colors.brand.default, colors.brand.strong]
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
                            color={
                              categoryId === id
                                ? colors.text.onBrand
                                : colors.text.primary
                            }
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
                  color={colors.text.secondary}
                />
                <TextInput
                  ref={descriptionInputRef}
                  style={styles.fieldInput}
                  placeholder="Nhập ghi chú..."
                  placeholderTextColor={colors.text.tertiary}
                  value={description}
                  onChangeText={setDescription}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="next"
                  onSubmitEditing={() => dateInputRef.current?.focus()}
                  blurOnSubmit={false}
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
                  color={colors.text.secondary}
                />
                <TextInput
                  ref={dateInputRef}
                  style={styles.fieldInput}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.text.tertiary}
                  value={date}
                  onChangeText={setDate}
                  onFocus={() => setFocusedField("date")}
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
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
```

### interface `Category`

- Signature: `interface Category`
- Lines: 32-37
- Exported: no

```tsx
interface Category {
  icon: string;
  bg: string;
  color: string;
  label: string;
}
```
