import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/src/theme";

/** Icon cảnh báo khi field lỗi — bổ sung cho viền (a11y: không chỉ màu). */
export function InputErrorLeadingIcon({ error }: { error?: string }) {
  const colors = useThemeColors();
  if (!error) return null;
  return (
    <Ionicons
      name="alert-circle"
      size={20}
      color={colors.status.error.icon}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}
