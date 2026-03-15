import { tws } from "@/src/utils/tws";

import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { AppText, PressableScale, pickImage } from "@/src/ui-kit";
import { Plus } from "lucide-react-native";

export interface FilterChip {
  id: string;
  label: string;
}

export interface TimelineHeaderProps {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  filters?: FilterChip[];
}

const DEFAULT_FILTERS: FilterChip[] = [
  { id: "tat-ca", label: "Tất cả" },
  { id: "chi-phi", label: "Chi phí" },
  { id: "nhiem-vu", label: "Nhiệm vụ" },
  { id: "ky-niem", label: "Kỷ niệm" },
];

export function TimelineHeader({
  activeFilter,
  setActiveFilter,
  filters = DEFAULT_FILTERS,
}: TimelineHeaderProps) {
  const handleAddMemory = async () => {
    try {
      const asset = await pickImage();
      if (asset) {
        // Logic to upload/save memory would go here
        Alert.alert(
          "Thành công",
          `Đã chọn ảnh: ${asset.fileName || "ảnh mới"}`,
        );
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message);
    }
  };

  return (
    <View style={tws("pt-6 pb-4 px-5 gap-6")}>
      <View style={tws("flex-row items-center justify-between")}>
        <AppText variant="h2" color="slate-900" style={tws("tracking-tighter")}>
          Dòng thời gian
        </AppText>
        <PressableScale
          onPress={handleAddMemory}
          style={
            tws(
              "w-10 h-10 bg-primary rounded-full items-center justify-center shadow-lg",
            ) as any
          }
        >
          <Plus size={24} color="#fff" />
        </PressableScale>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tws("gap-3 pr-5")}
      >
        {filters.map((chip) => {
          const isActive = activeFilter === chip.id;
          return (
            <PressableScale
              key={chip.id}
              style={
                tws(
                  "px-5 py-2.5 rounded-full",
                  isActive
                    ? "bg-primary shadow-glass"
                    : "bg-white/60 border border-white/80 shadow-sm",
                ) as any
              }
              onPress={() => setActiveFilter(chip.id)}
              scaleTo={0.9}
            >
              <AppText
                variant={isActive ? "bodyBold" : "body"}
                color={isActive ? "white" : "slate-500"}
                style={tws("text-sm")}
              >
                {chip.label}
              </AppText>
            </PressableScale>
          );
        })}
      </ScrollView>
    </View>
  );
}
