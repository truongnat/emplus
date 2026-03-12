/**
 * UI Kit - Re-exports from design system
 * Backward compatibility layer for existing code
 */

import React from 'react';
import { YStack, XStack } from 'react-native';
import * as Design from "./framework/design/index";

// Re-export all new components
export * from "./framework/design/index";

// Backward compatibility wrappers for legacy code

/**
 * @deprecated Use Button from framework/design instead
 */
export const AppButton = ({ label, children, loading, ...props }: any) => (
  <Design.Button {...props} loading={loading}>
    {loading ? <Design.Spinner color="white" /> : (label || children)}
  </Design.Button>
);

/**
 * @deprecated Use AppText from framework/design instead
 */
export const AppText = Design.AppText;

/**
 * @deprecated Use Box with flexDirection='column' instead
 */
export const AppScreen = ({ children, scroll, ...props }: any) => (
  <Design.Box flex={1} backgroundColor="$background" padding="md" {...props}>
    {children}
  </Design.Box>
);

/**
 * @deprecated Use Card from framework/design instead
 */
export const GlassCard = ({ title, subtitle, children, ...props }: any) => (
  <Design.Card {...props}>
    {title && <Design.AppText variant="h3">{title}</Design.AppText>}
    {subtitle && <Design.AppText variant="caption">{subtitle}</Design.AppText>}
    {children}
  </Design.Card>
);

/**
 * @deprecated Use Box with children instead
 */
export const ScreenTitle = ({ title, subtitle }: any) => (
  <Design.Box alignItems="center" marginBottom="xl">
    <Design.Box
      width={72}
      height={72}
      borderRadius="lg"
      backgroundColor="$background"
      alignItems="center"
      justifyContent="center"
      marginBottom="xl"
    >
      <YStack>
        <Design.AppText variant="h1">❤️</Design.AppText>
      </YStack>
    </Design.Box>
    <Design.AppText variant="h1" textAlign="center">{title}</Design.AppText>
    {subtitle && (
      <Design.AppText variant="captionBold" textAlign="center" textTransform="uppercase" letterSpacing={2}>
        {subtitle}
      </Design.AppText>
    )}
  </Design.Box>
);

/**
 * @deprecated Use Box instead
 */
export const Reveal = ({ children }: any) => <>{children}</>;

/**
 * @deprecated Use XStack instead
 */
export const FlowStrip = ({ steps }: any) => (
  <XStack gap="$sm">
    {steps?.map((s: any) => (
      <Design.AppText key={s.key}>{s.label}</Design.AppText>
    ))}
  </XStack>
);

/**
 * @deprecated Use TouchableOpacity instead
 */
export const PressableScale = ({ children, ...props }: any) => (
  <YStack {...props}>{children}</YStack>
);

/**
 * @deprecated Use Input with error prop instead
 */
export const FieldError = Design.AppText;

/**
 * @deprecated Use Switch instead
 */
export const Checkbox = ({ label, checked, onToggle, error, ...props }: any) => (
  <Design.Box gap="$sm">
    <Design.XStack alignItems="center" gap="$sm">
      <Design.Switch
        checked={checked}
        onCheckedChange={onToggle}
        {...props}
      />
      <Design.AppText variant="body">{label}</Design.AppText>
    </Design.XStack>
    {error && <Design.AppText variant="caption" color="$danger">{error}</Design.AppText>}
  </Design.Box>
);

/**
 * @deprecated Use Alert variant="success" instead
 */
export const SuccessBanner = ({ message }: any) => (
  <Design.Alert variant="success" description={message} />
);

/**
 * @deprecated Use Alert variant="destructive" instead
 */
export const ErrorBanner = ({ message }: any) => (
  <Design.Alert variant="destructive" description={message} />
);

/**
 * @deprecated Use Spinner with conditional rendering instead
 */
export const TransitionOverlay = ({ visible }: any) =>
  visible ? (
    <Design.Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex="$modal"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(255,255,255,0.6)"
    >
      <Design.Spinner size="large" color="$primary" />
    </Design.Box>
  ) : null;

/**
 * @deprecated Use Input with label prop instead
 */
export const TextField = ({ label, value, onChangeText, placeholder, error, ...props }: any) => (
  <Design.Input
    label={label}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    error={error}
    {...props}
  />
);
