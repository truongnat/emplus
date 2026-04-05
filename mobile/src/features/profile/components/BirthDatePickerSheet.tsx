import type { StyleProp, ViewStyle } from "react-native";
import { DatePickerSheet } from "@/src/components/molecules/pickers";

export interface BirthDatePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  initialIso: string | undefined | null;
  onConfirm: (iso: string) => void;
  sheetStyle?: StyleProp<ViewStyle>;
}

/** Preset hồ sơ — dùng `DatePickerSheet` trực tiếp cho use case khác. */
export function BirthDatePickerSheet(props: BirthDatePickerSheetProps) {
  return <DatePickerSheet title="Chọn ngày sinh" {...props} />;
}
