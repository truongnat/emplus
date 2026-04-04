/**
 * Motion presets — dùng chung cho Reanimated / layout.
 * Kết hợp tokens.duration / tokens.spring từ theme khi cần context theme.
 */

import { duration, spring } from "../theme/tokens";

export const motionPresets = {
  /** Vào màn — fade + slide */
  screenEnter: {
    durationMs: duration.slow,
    translateY: 14,
  },
  /** Stagger từng item list */
  stagger: {
    delayMs: 55,
    maxItems: 20,
  },
  /** Tab / pill indicator */
  tabSpring: spring.smooth,
  /** Nút / card press */
  pressSpring: spring.snappy,
  /** Success / check */
  celebrateSpring: spring.bouncy,
} as const;
