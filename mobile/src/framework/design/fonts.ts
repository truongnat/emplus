import { createFont } from 'tamagui'

export const headingFont = createFont({
  family: 'BeVietnamPro_700Bold',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 22,
    6: 28,
    7: 34,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 26,
    5: 30,
    6: 36,
    7: 42,
  },
  weight: {
    4: '400',
    7: '700',
  },
  letterSpacing: {
    4: 0,
    7: -0.5,
  },
})

export const bodyFont = createFont({
  family: 'BeVietnamPro_400Regular',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 26,
  },
  weight: {
    4: '400',
    7: '700',
  },
  letterSpacing: {
    4: 0,
  },
})
