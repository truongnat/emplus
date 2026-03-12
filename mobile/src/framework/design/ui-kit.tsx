import { 
  styled, 
  YStack, 
  XStack, 
  Button, 
  Card,
  SizableText,
  Input,
  Spinner,
  GetProps,
  Theme,
  Checkbox,
  Label,
} from 'tamagui'
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import React, { memo } from 'react'

export { Spinner }; // Export Spinner component

/**
 * AppText - Typography chuyên nghiệp
 */
export const AppText = styled(SizableText, {
  name: 'AppText',
  fontFamily: '$body',
  color: '$color', 
  variants: {
    variant: {
      h1: { fontFamily: '$heading', fontSize: '$7', fontWeight: '700', letterSpacing: -0.5 },
      h2: { fontFamily: '$heading', fontSize: '$6', fontWeight: '700' },
      h3: { fontFamily: '$heading', fontSize: '$5', fontWeight: '700' },
      body: { fontSize: '$3', fontWeight: '400' },
      bodyBold: { fontSize: '$3', fontWeight: '700' },
      caption: { fontSize: '$2', color: '$gray10' },
      captionBold: { fontSize: '$2', fontWeight: '700', color: '$gray11' },
    },
  } as const,
  defaultVariants: { variant: 'body' }
})

/**
 * AppButton - Nâng cấp với Animations và Press States
 */
export const AppButton = styled(Button, {
  name: 'AppButton',
  borderRadius: '$pill',
  pressStyle: { scale: 0.97, opacity: 0.9 },
  variants: {
    variant: {
      primary: { backgroundColor: '$primary', color: '$white', borderWidth: 0 },
      outline: { borderWidth: 2, borderColor: '$primary', backgroundColor: 'transparent', color: '$primary' },
      ghost: { backgroundColor: 'transparent', color: '$primary' },
    }
  } as const,
  defaultVariants: { variant: 'primary' }
})

/**
 * AppInput - Ô nhập liệu đồng bộ theme
 */
export const AppInput = styled(Input, {
  name: 'AppInput',
  borderRadius: '$md',
  borderWidth: 1.5,
  borderColor: '$gray5',
  backgroundColor: '$background',
  height: '$4.5',
  fontSize: '$3',
  focusStyle: {
    borderColor: '$primary',
    backgroundColor: '$backgroundStrong',
  },
})

/**
 * AppFieldError - Hiển thị lỗi trường nhập liệu
 */
export const AppFieldError = memo(({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <AppText variant="caption" color="$red10" mt="$1" ml="$1">
      {message}
    </AppText>
  );
});

/**
 * AppFormInput - Pattern input hoàn chỉnh với Icon và Error
 */
export const AppFormInput = memo(({ 
  icon, 
  label, 
  error, 
  rightElement,
  ...props 
}: GetProps<typeof Input> & { icon?: keyof typeof Ionicons.glyphMap, label?: string, error?: string, rightElement?: React.ReactNode }) => {
  return (
    <YStack gap="$1.5">
      {label && <AppText variant="captionBold" color="$gray10" ml="$1" textTransform="uppercase">{label}</AppText>}
      <XStack 
        ai="center" 
        bg="rgba(255,255,255,0.5)" 
        br="$4" px="$4" h={52} 
        bw={1.5} 
        borderColor={error ? '$red8' : 'transparent'}
        focusStyle={{ borderColor: '$primary' }}
      >
        {icon && <Ionicons name={icon} size={20} color="#94a3b8" style={{ marginRight: 12 }} />}
        <Input 
          f={1} h="100%" bw={0} bg="transparent" fontSize="$3" 
          placeholderTextColor="$gray10"
          {...props} 
        />
        {rightElement}
      </XStack>
      <AppFieldError message={error} />
    </YStack>
  )
})

/**
 * AppLogoHeader - Đồng bộ Header cho các màn hình Auth/Pairing
 */
export const AppLogoHeader = memo(({ title, subtitle }: { title: string, subtitle?: string }) => (
  <YStack ai="center" mb="$8">
    <YStack 
      w={72} h={72} br="$6" bg="$white" ai="center" jc="center" 
      shadowColor="$black" shadowOffset={{ width: 0, height: 10 }} shadowOpacity={0.1} shadowRadius={20}
      mb="$5"
    >
      <MaterialCommunityIcons name="heart" size={42} color="#ec1334" />
    </YStack>
    <AppText variant="h1" textAlign="center">{title}</AppText>
    {subtitle && (
      <AppText variant="captionBold" color="$gray10" textAlign="center" textTransform="uppercase" letterSpacing={2}>
        {subtitle}
      </AppText>
    )}
  </YStack>
))

/**
 * GlassCard & AppScreen
 */
export const GlassCard = styled(Card, {
  name: 'GlassCard',
  borderRadius: '$xl',
  borderWidth: 1,
  borderColor: '$glassBorder',
  backgroundColor: '$glass',
  padding: '$4',
})

export const AppScreen = styled(YStack, {
  name: 'AppScreen',
  flex: 1,
  backgroundColor: '$background',
  padding: '$4',
})

export const LoadingOverlay = memo(() => (
  <Theme name="light">
    <YStack pos="absolute" t={0} l={0} r={0} b={0} zi={1000} ai="center" jc="center" bg="rgba(255,255,255,0.6)">
      <Spinner size="large" color="$primary" />
    </YStack>
  </Theme>
))

export function AppCheckbox({ label, checked, onCheckedChange, error }: { label: string, checked: boolean, onCheckedChange: (val: boolean) => void, error?: string }) {
  const id = React.useId()
  return (
    <YStack gap="$1.5">
      <XStack ai="center" gap="$3">
        <Checkbox id={id} size="$4" checked={checked} onCheckedChange={onCheckedChange}>
          <Checkbox.Indicator><Ionicons name="checkmark" size={16} color="white" /></Checkbox.Indicator>
        </Checkbox>
        <Label size="$3" f={1} htmlFor={id} color={error ? '$red10' : '$color'}>{label}</Label>
      </XStack>
      <AppFieldError message={error} />
    </YStack>
  )
}

export type AppTextProps = GetProps<typeof AppText>
export type AppButtonProps = GetProps<typeof AppButton>
export type AppInputProps = GetProps<typeof AppInput>
export type GlassCardProps = GetProps<typeof GlassCard>
export type AppScreenProps = GetProps<typeof AppScreen>
