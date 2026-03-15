import { useCallback, useEffect, useRef, RefObject, useState } from "react";
import {
  AccessibilityInfo,
  findNodeHandle,
  Platform,
  View,
} from "react-native";

// ─── Focus trap hook ──────────────────────────────────────────────────────────

interface FocusTrapOptions {
  delay?: number;
  initialFocusRef?: RefObject<View>;
  restoreFocusRef?: RefObject<View>;
  announceOnOpen?: string;
  announceOnClose?: string;
}

export function useFocusTrap(
  isOpen: boolean,
  containerRef: RefObject<View>,
  options: FocusTrapOptions = {},
) {
  const {
    delay = 300,
    initialFocusRef,
    restoreFocusRef,
    announceOnOpen,
    announceOnClose,
  } = options;

  const previousFocusHandle = useRef<number | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (restoreFocusRef?.current) {
        previousFocusHandle.current = findNodeHandle(restoreFocusRef.current);
      }

      openTimerRef.current = setTimeout(() => {
        const targetRef = initialFocusRef ?? containerRef;
        if (targetRef.current) {
          const node = findNodeHandle(targetRef.current);
          if (node) {
            AccessibilityInfo.setAccessibilityFocus(node);
          }
        }

        if (announceOnOpen) {
          AccessibilityInfo.announceForAccessibility(announceOnOpen);
        }
      }, delay);
    } else {
      if (previousFocusHandle.current) {
        setTimeout(() => {
          if (previousFocusHandle.current) {
            AccessibilityInfo.setAccessibilityFocus(
              previousFocusHandle.current,
            );
            previousFocusHandle.current = null;
          }
        }, 100);
      }

      if (announceOnClose) {
        AccessibilityInfo.announceForAccessibility(announceOnClose);
      }
    }

    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
    };
  }, [isOpen]);
}

// ─── accessibilityViewIsModal prop helper ────────────────────────────────────

export function getModalA11yProps(isOpen: boolean) {
  return {
    accessibilityViewIsModal: Platform.OS === "ios" ? isOpen : undefined,
    importantForAccessibility: isOpen
      ? ("yes" as const)
      : ("no-hide-descendants" as const),
  };
}

// ─── WCAG contrast checker ────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  if (clean.length === 6) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }
  return null;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export interface ContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAALarge: boolean;
  passesAAA: boolean;
  grade: "AAA" | "AA" | "AA-large" | "fail";
}

export function checkContrast(
  foreground: string,
  background: string,
): ContrastResult | null {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  if (!fg || !bg) return null;

  const l1 = relativeLuminance(...fg);
  const l2 = relativeLuminance(...bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA: ratio >= 4.5,
    passesAALarge: ratio >= 3.0,
    passesAAA: ratio >= 7.0,
    grade:
      ratio >= 7
        ? "AAA"
        : ratio >= 4.5
          ? "AA"
          : ratio >= 3
            ? "AA-large"
            : "fail",
  };
}

// ─── Minimum touch target enforcer ───────────────────────────────────────────

const MIN_TOUCH = Platform.OS === "android" ? 48 : 44;

export function getHitSlop(
  visualWidth: number,
  visualHeight: number,
): { top: number; bottom: number; left: number; right: number } {
  const dx = Math.max(0, (MIN_TOUCH - visualWidth) / 2);
  const dy = Math.max(0, (MIN_TOUCH - visualHeight) / 2);
  return {
    top: Math.ceil(dy),
    bottom: Math.ceil(dy),
    left: Math.ceil(dx),
    right: Math.ceil(dx),
  };
}

// ─── Screen reader detection ──────────────────────────────────────────────────

let _screenReaderEnabled = false;
const _srListeners = new Set<(v: boolean) => void>();

AccessibilityInfo.isScreenReaderEnabled().then((v) => {
  _screenReaderEnabled = v;
  _srListeners.forEach((fn) => fn(v));
});

AccessibilityInfo.addEventListener("screenReaderChanged", (v) => {
  _screenReaderEnabled = v;
  _srListeners.forEach((fn) => fn(v));
});

export function useScreenReader(): boolean {
  const [enabled, setEnabled] = useState(_screenReaderEnabled);

  useEffect(() => {
    _srListeners.add(setEnabled);
    return () => {
      _srListeners.delete(setEnabled);
    };
  }, []);

  return enabled;
}
