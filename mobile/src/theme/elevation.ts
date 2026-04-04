/**
 * Elevation semantic — map sang shadow trong tokens (iOS + Android).
 */

import { shadow } from "./tokens";

export const elevation = {
  rest: shadow.sm,
  raised: shadow.md,
  floated: shadow.lg,
  modal: shadow.xl,
  overlay: shadow["2xl"],
} as const;

export type ElevationKey = keyof typeof elevation;
