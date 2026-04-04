/**
 * Shared vertical rhythm for full-bleed auth screens (grid under status bar).
 *
 * Scroll content `paddingTop` = `safeAreaTop + AUTH_GRID_SCROLL_PADDING_EXTRA`
 * so login (brand only) and shell screens (back + brand) align the first pixel
 * of scroll content the same distance below the safe area.
 */
export const AUTH_GRID_TOP_BAR_OFFSET = 2;
export const AUTH_GRID_TOP_BAR_HEIGHT = 40;
/** Space between top chrome (back row / implied row on login) and scroll content. */
export const AUTH_GRID_SCROLL_GAP_BELOW_TOP_BAR = 14;

export const AUTH_GRID_SCROLL_PADDING_EXTRA =
  AUTH_GRID_TOP_BAR_OFFSET +
  AUTH_GRID_TOP_BAR_HEIGHT +
  AUTH_GRID_SCROLL_GAP_BELOW_TOP_BAR;

/** Login: “Em Plus” wordmark — offset below safe area (no back chip row). */
export const AUTH_LOGIN_BRAND_TOP_OFFSET = 8;

/**
 * Login-only extra scroll `paddingTop`. Register/forgot use `flex-start` under the
 * shared `authGridScrollPaddingTop`; login keeps a vertically centered column, which
 * visually lifts the hero — this offsets that so rhythm matches shell screens.
 */
export const AUTH_LOGIN_SCROLL_EXTRA_TOP = 16;

export function authGridScrollPaddingTop(safeAreaTop: number): number {
  return safeAreaTop + AUTH_GRID_SCROLL_PADDING_EXTRA;
}

/**
 * Full-bleed grid screen **without** back/brand row (e.g. pairing after login).
 */
export const AUTH_GRID_PAIRING_TOP_EXTRA = 18;

export function authGridScrollPaddingTopPairing(safeAreaTop: number): number {
  return safeAreaTop + AUTH_GRID_PAIRING_TOP_EXTRA;
}
