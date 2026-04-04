/**
 * Shared UI Components - Atoms
 * Pure, reusable building blocks
 */

// Form Controls
export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { Input } from "./Input";
export type { InputProps, InputSize } from "./Input";

export { InputErrorLeadingIcon } from "./InputErrorLeadingIcon";

export { Text, AppText } from "./Text";
export type { TextProps } from "./Text";

export { Switch } from "./Switch";
export type { SwitchProps } from "./Switch";

export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

// Feedback & Display
export { Avatar } from "./Avatar";
export type { AvatarProps } from "./Avatar";

export { Badge } from "./Badge";
export type { BadgeProps, BadgeVariant, BadgeSize } from "./Badge";

export { Skeleton } from "./Skeleton";
export type { SkeletonProps, SkeletonVariant } from "./Skeleton";

export {
  ToastContainer,
  toast,
  TOAST_DEFAULT_DURATION_MS,
  TOAST_HORIZONTAL_PAD,
  TOAST_TAB_BAR_OFFSET,
} from "./Toast";
export type {
  ToastConfig,
  ToastVariant,
  ToastPosition,
  ToastAction,
} from "./Toast";

export { BottomSheet } from "./BottomSheet";
export type { BottomSheetProps, BottomSheetHandle } from "./BottomSheet";

export { EmplusLottie } from "./EmplusLottie";
export type { EmplusLottieProps } from "./EmplusLottie";
