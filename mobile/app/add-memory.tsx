import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import type { ImagePickerAsset } from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Input } from "@/src/components/atoms/Input";
import { useThemeColors, useThemeMode } from "@/src/theme";
import {
  homeDarkChromeButton,
  homeDarkGridCard,
  homeDarkGridInset,
} from "@/src/theme/emplus-design-tokens";
import { typographyRoles } from "@/src/theme/typography-roles";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { scrollPadBottomWithTabBar } from "@/src/core/common/core";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { pickMemoryImages } from "@/src/utils/expo-helpers";
import { AppText, PressableScale } from "@/src/ui-kit";
import {
  createMemory,
  uploadTimelineMemoryPhoto,
  toDisplayError,
} from "@/src/api";
import { useToast } from "@/src/toast-context";
import { useSession } from "@/src/session-context";
import type { TimelineModule } from "@/src/domain/entities/schemas";
import { setSoloImportantDate } from "@/src/features/home/solo-important-date";

const MAX_IMAGES = 12;

const MEMORY_TYPES = [
  { id: "ky-niem" as const, label: "Kỷ niệm", icon: "heart-outline" as const },
  { id: "chi-phi" as const, label: "Chi phí", icon: "card-outline" as const },
  { id: "nhiem-vu" as const, label: "Nhiệm vụ", icon: "checkmark-done" as const },
];
type MemoryTypeId = (typeof MEMORY_TYPES)[number]["id"];

function toIsoDateLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

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

/** iOS dùng underscore (NSLocale); Android BCP 47. */
const DATE_PICKER_LOCALE = Platform.OS === "ios" ? "vi_VN" : "vi-VN";

export default function AddMemoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { withAccessToken, session } = useSession();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const isPaired = Boolean(session?.user?.coupleId);

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
      const n = note.trim();

      if (!isPaired) {
        await setSoloImportantDate({
          title: t,
          memoryDate: toIsoDateLocal(memoryDate),
          description: n || undefined,
          createdAt: new Date().toISOString(),
        });
        return null;
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
      if (n) body.description = n;
      return withAccessToken((token) => createMemory(token, body));
    },
    onSuccess: () => {
      showToast(
        isPaired ? "Đã thêm kỷ niệm!" : "Đã lưu ngày quan trọng đầu tiên!",
        "success",
      );
      if (isPaired) {
        void queryClient.invalidateQueries({
          predicate: (q) => q.queryKey[0] === "timelineMemories",
        });
      }
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
            {isPaired ? "Thêm kỷ niệm" : "Thêm ngày quan trọng"}
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
            {isPaired
              ? "Chọn loại mục (lọc giống dòng thời gian), ảnh tuỳ chọn, tiêu đề, ngày và ghi chú."
              : "Lưu một ngày bạn không muốn quên trước. Khi ghép đôi, Em+ sẽ nâng nó thành bối cảnh chung cho cả hai."}
          </AppText>

          {isPaired ? (
            <>
              <AppText
                style={[styles.fieldLabel, { color: colors.text.secondary }]}
              >
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
            </>
          ) : (
            <View
              style={[
                styles.helpCard,
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
              <AppText style={[styles.helpTitle, { color: colors.text.primary }]}>
                Lưu trước trên thiết bị này
              </AppText>
              <AppText style={[styles.helpBody, { color: colors.text.secondary }]}>
                Đây là bước solo-first cho V1. Bạn có thể bắt đầu bằng một ngày
                đầu tiên, rồi ghép đôi sau để mở trải nghiệm chung.
              </AppText>
            </View>
          )}

          {isPaired ? (
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
                  <AppText
                    style={[styles.emptyPreviewText, { color: colors.text.tertiary }]}
                  >
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
                          <Ionicons
                            name="close"
                            size={16}
                            color={colors.text.inverse}
                          />
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
          ) : null}

          <Input
            label="Tiêu đề"
            placeholder={
              isPaired ? "Ví dụ: Buổi sáng cùng nhau" : "Ví dụ: Sinh nhật của cô ấy"
            }
            value={title}
            onChangeText={setTitle}
            variant="soft"
            containerStyle={styles.fieldGap}
          />

          <AppText style={[styles.fieldLabel, { color: colors.text.secondary }]}>
            {isPaired ? "Ngày kỷ niệm" : "Ngày quan trọng"}
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
            accessibilityLabel={
              isPaired ? "Chọn ngày kỷ niệm" : "Chọn ngày quan trọng"
            }
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
            placeholder={
              isPaired
                ? "Viết thêm chi tiết…"
                : "Ví dụ: dịp không muốn quên, món quà định chuẩn bị, hoặc điều cần nhắc trước đó…"
            }
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
            leftIcon={!isPending ? <Ionicons name="heart" size={20} color="#fff" /> : undefined}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingBottom: 12,
    zIndex: 2,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
  },
  scrollInner: {
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  lead: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  previewCard: {
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 6,
  },
  emptyPreview: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  emptyPreviewText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 24,
  },
  thumbStrip: {
    paddingVertical: 12,
  },
  thumbRow: {
    gap: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  thumbWrap: {
    width: 88,
    height: 88,
    borderRadius: 16,
    overflow: "hidden",
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  thumbRemove: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  addMoreTile: {
    width: 88,
    height: 88,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldGap: {
    marginBottom: 4,
  },
  fieldGapTop: {
    marginTop: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 4,
  },
  dateField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  dateFieldText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  noteInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  submit: {
    marginTop: 20,
  },
  typeRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 8,
    marginBottom: 18,
  },
  typeChip: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  typeChipLabel: {
    fontSize: 13,
    fontWeight: "800",
    flexShrink: 1,
  },
  helpCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 6,
    marginBottom: 18,
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  helpBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
    padding: 20,
  },
  dateModalCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    gap: 12,
  },
});
