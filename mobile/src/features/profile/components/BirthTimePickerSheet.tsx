import type { StyleProp, ViewStyle } from "react-native";
import { TimePickerSheet } from "@/src/components/molecules/pickers";

export interface BirthTimePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  initialHm: string | undefined | null;
  onConfirm: (hm: string) => void;
  sheetStyle?: StyleProp<ViewStyle>;
}

/** Preset hồ sơ — dùng `TimePickerSheet` trực tiếp cho use case khác. */
export function BirthTimePickerSheet(props: BirthTimePickerSheetProps) {
  return <TimePickerSheet title="Chọn giờ sinh" {...props} />;
}
