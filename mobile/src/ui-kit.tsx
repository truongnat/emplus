import React from 'react';
import { YStack, XStack } from 'tamagui';
import * as Design from "./framework/design/ui-kit";

// Re-export new ones
export * from "./framework/design/ui-kit";

// Compatibility wrappers for legacy code
export const AppButton = ({ label, children, loading, ...props }: any) => (
  <Design.AppButton {...props}>
    {loading ? <Design.Spinner color="white" /> : (label || children)}
  </Design.AppButton>
);

export const AppText = Design.AppText;
export const AppScreen = ({ children, scroll, ...props }: any) => (
  <Design.AppScreen {...props}>
    {children}
  </Design.AppScreen>
);

export const GlassCard = ({ title, subtitle, children, ...props }: any) => (
  <Design.GlassCard {...props}>
    {title && <Design.AppText variant="h3">{title}</Design.AppText>}
    {subtitle && <Design.AppText variant="caption">{subtitle}</Design.AppText>}
    {children}
  </Design.GlassCard>
);

export const ScreenTitle = ({ title, subtitle }: any) => (
  <Design.AppLogoHeader title={title} subtitle={subtitle} />
);

export const Reveal = ({ children }: any) => <>{children}</>;
export const FlowStrip = ({ steps }: any) => <XStack gap="$2">{steps?.map((s: any) => <Design.AppText key={s.key}>{s.label}</Design.AppText>)}</XStack>;
export const PressableScale = ({ children, ...props }: any) => <YStack {...props}>{children}</YStack>;
export const FieldError = Design.AppFieldError;
export const Checkbox = ({ label, checked, onToggle, error, ...props }: any) => (
  <Design.AppCheckbox label={label} checked={checked} onCheckedChange={onToggle} error={error} />
);
export const SuccessBanner = ({ message }: any) => <Design.AppText color="$green10">{message}</Design.AppText>;
export const ErrorBanner = ({ message }: any) => <Design.AppText color="$red10">{message}</Design.AppText>;
export const TransitionOverlay = ({ visible }: any) => visible ? <Design.LoadingOverlay /> : null;
export const TextField = ({ label, value, onChangeText, placeholder, ...props }: any) => (
  <Design.AppFormInput label={label} value={value} onChangeText={onChangeText} placeholder={placeholder} {...props} />
);
