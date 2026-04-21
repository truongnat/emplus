import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { AppText } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";
import {
  getSoloImportantDate,
  type SoloImportantDateDraft,
} from "@/src/features/home/solo-important-date";

export interface TimelineAuthGateProps {
  isAuthenticated: boolean;
  isPaired: boolean;
}

function formatSoloDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) {
    return iso;
  }
  return `${day}/${month}/${year}`;
}

function getSoloCountdown(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(today.getFullYear(), month - 1, day);

  if (next.getTime() < today.getTime()) {
    next = new Date(today.getFullYear() + 1, month - 1, day);
  }

  const daysLeft = Math.round((next.getTime() - today.getTime()) / 86_400_000);
  if (daysLeft <= 0) return "Hôm nay";
  if (daysLeft === 1) return "Còn 1 ngày";
  return `Còn ${daysLeft} ngày`;
}

export function TimelineAuthGate({
  isAuthenticated,
  isPaired,
}: TimelineAuthGateProps) {
  const router = useRouter();
  const colors = useThemeColors();
  const [soloImportantDate, setSoloImportantDate] =
    useState<SoloImportantDateDraft | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated || isPaired) {
        setSoloImportantDate(null);
        return;
      }

      let alive = true;
      void getSoloImportantDate().then((draft) => {
        if (alive) {
          setSoloImportantDate(draft);
        }
      });

      return () => {
        alive = false;
      };
    }, [isAuthenticated, isPaired]),
  );

  return (
    <AppScreen>
      <View style={styles.centerContainer}>
        {!isAuthenticated ? (
          <>
            <AppText style={[styles.centerText, { color: colors.text.tertiary }]}>
              Đăng nhập để xem dòng thời gian
            </AppText>
            <Button
              label="Đăng nhập"
              onPress={() => router.push("/login")}
              style={styles.centerButton}
              accessibilityLabel="Mở đăng nhập"
            />
          </>
        ) : (
          <View
            style={[
              styles.soloCard,
              {
                backgroundColor: colors.surface.default,
                borderColor: colors.border.subtle,
              },
            ]}
          >
            <View style={styles.soloHeader}>
              <View
                style={[
                  styles.soloIconWrap,
                  { backgroundColor: colors.brand.muted },
                ]}
              >
                <Ionicons
                  name="calendar-clear-outline"
                  size={22}
                  color={colors.brand.default}
                />
              </View>
              <View style={styles.soloHeaderText}>
                <AppText
                  style={[styles.soloEyebrow, { color: colors.text.tertiary }]}
                >
                  Timeline cá nhân trước
                </AppText>
                <AppText
                  style={[styles.soloTitle, { color: colors.text.primary }]}
                >
                  Bạn vẫn có thể xem mốc đầu tiên của mình tại đây
                </AppText>
              </View>
            </View>

            {soloImportantDate ? (
              <View
                style={[
                  styles.soloDateCard,
                  {
                    backgroundColor: colors.surface.raised,
                    borderColor: colors.border.subtle,
                  },
                ]}
              >
                <View style={styles.soloDateTop}>
                  <AppText
                    style={[
                      styles.soloDateCountdown,
                      { color: colors.brand.text },
                    ]}
                  >
                    {getSoloCountdown(soloImportantDate.memoryDate) ?? "Sắp tới"}
                  </AppText>
                  <Ionicons
                    name="sparkles-outline"
                    size={16}
                    color={colors.brand.default}
                  />
                </View>
                <AppText
                  style={[styles.soloDateTitle, { color: colors.text.primary }]}
                >
                  {soloImportantDate.title}
                </AppText>
                <AppText
                  style={[styles.soloDateMeta, { color: colors.text.secondary }]}
                >
                  {formatSoloDate(soloImportantDate.memoryDate)}
                </AppText>
                {soloImportantDate.description ? (
                  <AppText
                    style={[styles.soloDateBody, { color: colors.text.secondary }]}
                  >
                    {soloImportantDate.description}
                  </AppText>
                ) : (
                  <AppText
                    style={[styles.soloDateBody, { color: colors.text.secondary }]}
                  >
                    Đây là mốc đầu tiên Em+ đang giữ giúp bạn. Ghép đôi sau để biến nó thành một phần của dòng thời gian chung.
                  </AppText>
                )}
              </View>
            ) : (
              <AppText
                style={[styles.centerText, { color: colors.text.tertiary }]}
              >
                Bạn chưa có mốc nào trong timeline cá nhân. Hãy thêm một ngày quan trọng đầu tiên để Em+ bắt đầu sắp xếp giúp bạn.
              </AppText>
            )}

            <View style={styles.soloActions}>
              <Button
                label={
                  soloImportantDate
                    ? "Cập nhật ngày quan trọng"
                    : "Thêm ngày quan trọng đầu tiên"
                }
                fullWidth
                onPress={() => router.push("/add-memory")}
                accessibilityLabel="Mở màn hình thêm ngày quan trọng"
              />
              <Button
                label="Ghép đôi khi sẵn sàng"
                variant="neutralOutline"
                fullWidth
                onPress={() => router.push("/pairing")}
                accessibilityLabel="Mở màn hình ghép đôi"
              />
            </View>
          </View>
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  centerButton: {
    marginTop: 20,
  },
  centerText: {
    fontSize: 15,
    textAlign: "center",
  },
  soloCard: {
    width: "100%",
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    gap: 16,
  },
  soloHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  soloIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  soloHeaderText: {
    flex: 1,
    gap: 4,
  },
  soloEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  soloTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  soloDateCard: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 6,
  },
  soloDateTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  soloDateCountdown: {
    fontSize: 12,
    fontWeight: "800",
  },
  soloDateTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  soloDateMeta: {
    fontSize: 13,
    fontWeight: "600",
  },
  soloDateBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  soloActions: {
    gap: 10,
  },
});
