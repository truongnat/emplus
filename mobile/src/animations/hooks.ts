/**
 * hooks/useReducedMotion.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Reduced motion: đọc system setting, expose cho mọi animation.
 */

import { useEffect, useState } from "react";
import { AccessibilityInfo, Platform } from "react-native";
import {
  useSharedValue,
  WithSpringConfig,
  WithTimingConfig,
  withSpring,
  withTiming,
  withDelay,
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutUp,
  SlideInDown,
  SlideOutDown,
  ZoomIn,
  ZoomOut,
  LinearTransition,
} from "react-native-reanimated";

// ─── Singleton cache — tránh nhiều component query cùng lúc ──────────────────

let _cached: boolean | null = null;
const _listeners = new Set<(v: boolean) => void>();

function _notify(v: boolean) {
  _cached = v;
  _listeners.forEach((fn) => fn(v));
}

// Khởi tạo ngay khi module load — không cần đợi component mount
if (Platform.OS !== "web") {
  AccessibilityInfo.isReduceMotionEnabled()
    .then(_notify)
    .catch(() => _notify(false));

  AccessibilityInfo.addEventListener("reduceMotionChanged", _notify);
}

// ─── React hook ───────────────────────────────────────────────────────────────

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(_cached ?? false);

  useEffect(() => {
    // Sync với cached value nếu đã load trước khi component mount
    if (_cached !== null && _cached !== reduced) {
      setReduced(_cached);
    }

    _listeners.add(setReduced);
    return () => {
      _listeners.delete(setReduced);
    };
  }, []);

  return reduced;
}

// ─── Reanimated shared value — dùng trong worklets ───────────────────────────

let _sharedReducedMotion: any = null;

export function useReducedMotionShared() {
  // Tạo shared value một lần, sync khi setting thay đổi
  const sv = useSharedValue<boolean>(_cached ?? false);

  useEffect(() => {
    _sharedReducedMotion = sv;

    const sync = (v: boolean) => {
      sv.value = v;
    };
    if (_cached !== null) sv.value = _cached;
    _listeners.add(sync);
    return () => {
      _listeners.delete(sync);
      if (_sharedReducedMotion === sv) _sharedReducedMotion = null;
    };
  }, [sv]);

  return sv;
}

// ─── Animation helper — central place để apply reduced motion ────────────────

/**
 * Reduced-motion-aware withSpring.
 * Nếu reduce motion bật → instant jump (duration 0).
 */
export function withSpringRM(
  toValue: number,
  config?: WithSpringConfig,
  callback?: (finished?: boolean) => void,
) {
  "worklet";
  if (_sharedReducedMotion?.value) {
    return withTiming(toValue, { duration: 0 }, callback);
  }
  return withSpring(toValue, config, callback);
}

/**
 * Reduced-motion-aware withTiming.
 * Nếu reduce motion bật → duration tối đa 100ms.
 */
export function withTimingRM(
  toValue: number,
  config?: WithTimingConfig,
  callback?: (finished?: boolean) => void,
) {
  "worklet";
  if (_sharedReducedMotion?.value) {
    return withTiming(toValue, { ...config, duration: 0 }, callback);
  }
  return withTiming(toValue, config, callback);
}

/**
 * Reduced-motion-aware withDelay.
 * Nếu reduce motion bật → delay = 0.
 */
export function withDelayRM(delay: number, animation: any) {
  "worklet";
  if (_sharedReducedMotion?.value) {
    return withDelay(0, animation);
  }
  return withDelay(delay, animation);
}

// ─── Reanimated entering/exiting preset factory ───────────────────────────────

function instantEnter() {
  return FadeIn.duration(0);
}
function instantExit() {
  return FadeOut.duration(0);
}

export const enteringPresets = {
  fade: (reduced: boolean) => (reduced ? instantEnter() : FadeIn.duration(300)),
  slideUp: (reduced: boolean) =>
    reduced ? instantEnter() : SlideInUp.duration(350).springify(),
  slideDown: (reduced: boolean) =>
    reduced ? instantEnter() : SlideInDown.duration(350).springify(),
  zoom: (reduced: boolean) =>
    reduced ? instantEnter() : ZoomIn.duration(280).springify(),
  springUp: (reduced: boolean) =>
    reduced ? instantEnter() : FadeIn.duration(300).springify(),
};

export const exitingPresets = {
  fade: (reduced: boolean) => (reduced ? instantExit() : FadeOut.duration(200)),
  slideUp: (reduced: boolean) =>
    reduced ? instantExit() : SlideOutUp.duration(280),
  slideDown: (reduced: boolean) =>
    reduced ? instantExit() : SlideOutDown.duration(280),
  zoom: (reduced: boolean) => (reduced ? instantExit() : ZoomOut.duration(200)),
};

export const layoutPresets = {
  spring: (reduced: boolean) =>
    reduced
      ? LinearTransition.duration(0)
      : LinearTransition.springify().damping(20).stiffness(250),
};
