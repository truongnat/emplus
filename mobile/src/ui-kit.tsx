/**
 * UI Kit - Backward compatibility layer
 * Re-exports from new component structure
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "./components/atoms/Button";
import { Card } from "./components/molecules/Card";

// Atoms
export { Button, type ButtonProps } from "./components/atoms/Button";
export { Input, type InputProps } from "./components/atoms/Input";
export { Text, AppText, type TextProps } from "./components/atoms/Text";
export { Switch, type SwitchProps } from "./components/atoms/Switch";
export { Avatar, type AvatarProps } from "./components/atoms/Avatar";
export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
} from "./components/atoms/Badge";
export {
  Skeleton,
  type SkeletonProps,
  type SkeletonVariant,
} from "./components/atoms/Skeleton";

// Molecules
export { Card, type CardProps } from "./components/molecules/Card";

// Glass Components
export { GlassCard, GlassButton, GlassOrb } from "./components/glass/GlassCard";
export {
  LiquidGlassView,
  LiquidGlassContainer,
  isLiquidGlassSupported,
} from "./components/glass/LiquidGlassView";

// Organisms
export { AppScreen } from "./components/organisms/AppScreen";
export type { AppScreenProps } from "./components/organisms/AppScreen";

export { LoadingOverlay } from "./components/organisms/LoadingOverlay";
export type { LoadingOverlayProps } from "./components/organisms/LoadingOverlay";

export { AnimatedFlatList } from "./components/organisms/AnimatedFlatList";
export type {
  AnimatedListProps,
  AnimatedListHandle,
} from "./components/organisms/AnimatedFlatList";

// Aliases for backward compatibility
export const AppButton = Button;
export const Reveal = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay?: number;
}) => <>{children}</>;

// PressableScale with custom prop
export interface PressableScaleProps {
  scaleTo?: number;
  children?: React.ReactNode;
  [key: string]: any;
}
export const PressableScale =
  TouchableOpacity as React.ComponentType<PressableScaleProps>;
