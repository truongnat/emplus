import { createTamagui } from 'tamagui'
import { createAnimations } from '@tamagui/animations-react-native'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'

import { headingFont, bodyFont } from './fonts'
import { tokens as customTokens } from './tokens'

const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    mass: 1,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 15,
    mass: 1,
    stiffness: 120,
  },
  slow: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
})

const mergedTokens = {
  ...tokens,
  color: {
    ...tokens.color,
    ...customTokens.color,
  },
  space: {
    ...tokens.space,
    ...customTokens.space,
  },
  radius: {
    ...tokens.radius,
    ...customTokens.radius,
  },
  zIndex: {
    ...tokens.zIndex,
    ...customTokens.zIndex,
  }
}

const tamaguiConfig = createTamagui({
  animations,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: mergedTokens,
  themes,
  // Bỏ hoặc để trống settings để tránh lỗi TypeScript về AllowedStyleValuesSetting
  settings: {},
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
