---
title: "mobile/app/add-memory.tsx"
description: "The `AddMemoryScreen` function creates a new memory screen with a title, date, note, and options for adding or selecting assets."
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
  page: "reference/files/mobile/app/add-memory.tsx.md"
  relativePath: "mobile/app/add-memory.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/add-memory.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/app/add-memory.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/add-memory.tsx`
- Lines: 697
- Symbols: 4

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Create](../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.

## AI Summary

The `AddMemoryScreen` function creates a new memory screen with a title, date, note, and options for adding or selecting assets.

### Responsibilities

- to create a mobile app UI screen

### Usage Notes

- [...] Add memory screen functionality] to a mobile app

## Public API

- `function AddMemoryScreen()`

## Symbols

### function `AddMemoryScreen`

- Signature: `function AddMemoryScreen()`
- Lines: 81-534
- Exported: yes

```tsx
function AddMemoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { withAccessToken } = useSession();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  useAuthGridChrome(isDark, colors.background.default, true);

  const [title, setTitle] = useState("");
  const [memoryDate, setMemoryDate] = useState(() => new Date());
  const [note, setNote] = useState("");
  const [assets, setAssets] = useState<ImagePickerAsset[]>([]);
  const [memoryType, setMemoryType] = useState<MemoryTypeId>("ky-niem");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { mutate: submitAll, isPending } = useMutation({
    mutationFn: async () => {
      const t = title.trim();
      if (!t) {
        throw new Error("TITLE_REQUIRED");
      }
      const mediaUrls: string[] = [];
      for (const asset of assets) {
        const fd = new FormData();
        const name =
          asset.fileName ??
          `memory_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
        const type = asset.mimeType ?? "image/jpeg";
        fd.append("file", { uri: asset.uri, name, type } as any);
        const url = await uploadTimelineMemoryPhoto(fd);
        mediaUrls.push(url);
      }
      const body: TimelineModule.CreateRequest = {
        title: t,
        memoryDate: toIsoDateLocal(memoryDate),
        mediaUrls,
        tags: [memoryType],
      };
      const n = note.trim();
      if (n) body.description = n;
      return withAccessToken((token) => createMemory(token, body));
    },
    onSuccess: () => {
      showToast("Đã thêm kỷ niệm!", "success");
      void queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "timelineMemories",
      });
      router.back();
    },
    onError: (err: unknown) => {
      if (err instanceof Error && err.message === "TITLE_REQUIRED") {
        showToast("Vui lòng nhập tiêu đề", "warning");
        return;
      }
      showToast(toDisplayError(err), "error");
    },
  });

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    submitAll();
  }, [submitAll]);

  const addPhotos = useCallback(async () => {
    try {
      const remaining = MAX_IMAGES - assets.length;
      if (remaining <= 0) {
        showToast(`Tối đa ${MAX_IMAGES} ảnh`, "warning");
        return;
      }
      const picked = await pickMemoryImages(remaining);
      if (picked.length === 0) return;
      setAssets((prev) => [...prev, ...picked].slice(0, MAX_IMAGES));
    } catch (e) {
      showToast(
        e instanceof Error ? e.message : "Không mở được thư viện ảnh",
        "error",
      );
    }
  }, [assets.length, showToast]);

  const removeAsset = useCallback((uri: string) => {
    setAssets((prev) => prev.filter((a) => a.uri !== uri));
  }, []);

  const onDateChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (Platform.OS === "android") {
        setShowDatePicker(false);
        if (event.type === "set" && date) setMemoryDate(date);
        return;
      }
      if (date) setMemoryDate(date);
    },
    [],
  );

  const scrollPadBottom = scrollPadBottomWithTabBar(insets.bottom);

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
      <KeyboardAvoidingView
        style={homeScreenStyles.layerRoot}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.top}
      >
        <LoginGridAnimatedBackground isDark={isDark} />

        <View style={[styles.headerRow, { paddingTop: insets.top + 8 }]}>
          <PressableScale
            onPress={() => router.back()}
            style={[
              styles.iconBtn,
              isDark
                ? {
                    backgroundColor: homeDarkChromeButton.backgroundColor,
                    borderColor: homeDarkChromeButton.borderColor,
                  }
                : {
                    backgroundColor: colors.surface.default,
                    borderColor: colors.border.subtle,
                  },
            ]}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Quay lại"
          >
            <Ionicons name="chevron-back" size={22} color={colors.text.primary} />
          </PressableScale>
          <AppText
            style={[
              typographyRoles.title,
              styles.headerTitle,
              { color: colors.text.primary },
            ]}
            accessibilityRole="header"
          >
            Thêm kỷ niệm
          </AppText>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          style={homeScreenStyles.scrollView}
          contentContainerStyle={[
            styles.scrollInner,
            { paddingBottom: scrollPadBottom },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <AppText style={[styles.lead, { color: colors.text.tertiary }]}>
            Chọn loại mục (lọc giống dòng thời gian), ảnh tuỳ chọn, tiêu đề, ngày và ghi
            chú.
          </AppText>

          <AppText style={[styles.fieldLabel, { color: colors.text.secondary }]}>
            Loại
          </AppText>
          <View style={styles.typeRow}>
            {MEMORY_TYPES.map((opt) => {
              const active = memoryType === opt.id;
              return (
                <PressableScale
                  key={opt.id}
                  onPress={() => setMemoryType(opt.id)}
                  style={[
                    styles.typeChip,
                    active
                      ? isDark
                        ? {
                            backgroundColor: colors.interactive.primary,
                            borderColor: "rgba(255, 255, 255, 0.22)",
                          }
                        : {
                            backgroundColor: colors.background.inverse,
                            borderColor: colors.border.inverse,
                          }
                      : isDark
                        ? {
                            backgroundColor: homeDarkGridCard.backgroundColor,
                            borderColor: homeDarkGridCard.borderColor,
                          }
                        : {
                            backgroundColor: colors.surface.default,
                            borderColor: colors.border.subtle,
                          },
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={`Loại ${opt.label}`}
                >
                  <Ionicons
                    name={opt.icon}
                    size={18}
                    color={
                      active
                        ? isDark
                          ? colors.text.onBrand
                          : colors.text.inverse
                        : colors.text.secondary
                    }
                  />
                  <AppText
                    numberOfLines={1}
                    style={[
                      styles.typeChipLabel,
                      {
                        color: active
                          ? isDark
                            ? colors.text.onBrand
                            : colors.text.inverse
                          : colors.text.tertiary,
                      },
                    ]}
                  >
                    {opt.label}
                  </AppText>
                </PressableScale>
              );
            })}
          </View>

          <View
            style={[
              styles.previewCard,
              isDark
                ? {
                    backgroundColor: homeDarkGridCard.backgroundColor,
                    borderColor: homeDarkGridCard.borderColor,
                    shadowColor: "#0A0809",
                  }
                : {
                    backgroundColor: colors.surface.default,
                    borderColor: colors.border.subtle,
                    shadowColor: colors.text.primary,
                  },
            ]}
          >
            {assets.length === 0 ? (
              <PressableScale
                onPress={addPhotos}
                style={[
                  styles.emptyPreview,
                  isDark
                    ? { backgroundColor: homeDarkGridInset.backgroundColor }
                    : { backgroundColor: colors.surface.sunken },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Thêm ảnh kỷ niệm"
              >
                <Ionicons
                  name="images-outline"
                  size={40}
                  color={colors.text.tertiary}
                />
                <AppText style={[styles.emptyPreviewText, { color: colors.text.tertiary }]}>
                  Chạm để thêm ảnh (tối đa {MAX_IMAGES})
                </AppText>
              </PressableScale>
            ) : (
              <View style={styles.thumbStrip}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbRow}
                >
                  {assets.map((a) => (
                    <View key={a.uri} style={styles.thumbWrap}>
                      <Image
                        source={{ uri: a.uri }}
                        style={styles.thumb}
                        contentFit="cover"
                        transition={0}
                        cachePolicy="memory-disk"
                        priority="high"
                        recyclingKey={a.uri}
                      />
                      <TouchableOpacity
                        style={[
                          styles.thumbRemove,
                          { backgroundColor: colors.background.inverse },
                        ]}
                        onPress={() => removeAsset(a.uri)}
                        accessibilityRole="button"
                        accessibilityLabel="Xoá ảnh"
                      >
                        <Ionicons name="close" size={16} color={colors.text.inverse} />
                      </TouchableOpacity>
                    </View>
                  ))}
                  {assets.length < MAX_IMAGES ? (
                    <PressableScale
                      onPress={addPhotos}
                      style={[
                        styles.addMoreTile,
                        isDark
                          ? {
                              borderColor: homeDarkGridInset.borderColor,
                              backgroundColor: homeDarkGridInset.backgroundColor,
                            }
                          : {
                              borderColor: colors.border.subtle,
                              backgroundColor: colors.surface.sunken,
                            },
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel="Thêm ảnh nữa"
                    >
                      <Ionicons name="add" size={28} color={colors.text.secondary} />
                    </PressableScale>
                  ) : null}
                </ScrollView>
              </View>
            )}
          </View>

          <Input
            label="Tiêu đề"
            placeholder="Ví dụ: Buổi sáng cùng nhau"
            value={title}
            onChangeText={setTitle}
            variant="soft"
            containerStyle={styles.fieldGap}
          />

          <AppText style={[styles.fieldLabel, { color: colors.text.secondary }]}>
            Ngày kỷ niệm
          </AppText>
          <PressableScale
            onPress={() => setShowDatePicker(true)}
            style={[
              styles.dateField,
              isDark
                ? {
                    backgroundColor: homeDarkGridCard.backgroundColor,
                    borderColor: homeDarkGridCard.borderColor,
                  }
                : {
                    backgroundColor: colors.surface.default,
                    borderColor: colors.border.subtle,
                  },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Chọn ngày kỷ niệm"
          >
            <Ionicons name="calendar-outline" size={20} color={colors.brand.default} />
            <AppText style={[styles.dateFieldText, { color: colors.text.primary }]}>
              {formatDateVi(memoryDate)}
            </AppText>
            <Ionicons name="chevron-down" size={18} color={colors.text.tertiary} />
          </PressableScale>

          {Platform.OS === "android" && showDatePicker ? (
            <DateTimePicker
              value={memoryDate}
              mode="date"
              display="default"
              locale={DATE_PICKER_LOCALE}
              onChange={onDateChange}
            />
          ) : null}

          {Platform.OS === "ios" ? (
            <Modal
              visible={showDatePicker}
              transparent
              animationType="fade"
              onRequestClose={() => setShowDatePicker(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowDatePicker(false)}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={(e) => e.stopPropagation()}
                  style={[
                    styles.dateModalCard,
                    isDark
                      ? {
                          backgroundColor: homeDarkGridCard.backgroundColor,
                          borderColor: homeDarkGridCard.borderColor,
                        }
                      : {
                          backgroundColor: colors.surface.default,
                          borderColor: colors.border.subtle,
                        },
                  ]}
                >
                  <DateTimePicker
                    value={memoryDate}
                    mode="date"
                    display="spinner"
                    locale={DATE_PICKER_LOCALE}
                    onChange={onDateChange}
                    themeVariant={isDark ? "dark" : "light"}
                  />
                  <Button
                    label="Xong"
                    onPress={() => setShowDatePicker(false)}
                    fullWidth
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          ) : null}

          <Input
            label="Ghi chú"
            placeholder="Viết thêm chi tiết…"
            value={note}
            onChangeText={setNote}
            variant="soft"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.noteInput}
            containerStyle={styles.fieldGapTop}
          />

          <Button
            label={isPending ? "Đang lưu…" : "Lưu"}
            onPress={handleSubmit}
            disabled={isPending}
            loading={isPending}
            fullWidth
            style={styles.submit}
            leftIcon={
              !isPending ? (
                <Ionicons name="heart" size={20} color="#fff" />
              ) : undefined
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}
```

### type `MemoryTypeId`

- Signature: `type MemoryTypeId = (typeof MEMORY_TYPES)[number]["id"];`
- Lines: 56-56
- Exported: no

```tsx
type MemoryTypeId = (typeof MEMORY_TYPES)[number]["id"];
```

### function `toIsoDateLocal`

- Signature: `function toIsoDateLocal(d: Date): string`
- Lines: 58-63
- Exported: no

```tsx
function toIsoDateLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
```

### function `formatDateVi`

- Signature: `function formatDateVi(d: Date): string`
- Lines: 65-76
- Exported: no

```tsx
function formatDateVi(d: Date): string {
  try {
    return d.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return toIsoDateLocal(d);
  }
}
```
