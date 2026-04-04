import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import * as SystemUI from "expo-system-ui";

import {
  LOGIN_GRID_TOP_DARK,
  LOGIN_GRID_TOP_LIGHT,
} from "../components/LoginGridAnimatedBackground";

/**
 * Syncs system root / status-bar area with auth grid top color while focused;
 * restores theme background on blur.
 *
 * @param syncChrome — when false, skips setting grid color on focus (still restores on blur).
 */
export function useAuthGridChrome(
  isDark: boolean,
  backgroundDefault: string,
  syncChrome: boolean,
) {
  useFocusEffect(
    useCallback(() => {
      if (syncChrome) {
        const chrome = isDark ? LOGIN_GRID_TOP_DARK : LOGIN_GRID_TOP_LIGHT;
        void SystemUI.setBackgroundColorAsync(chrome);
      }
      return () => {
        void SystemUI.setBackgroundColorAsync(backgroundDefault);
      };
    }, [syncChrome, isDark, backgroundDefault]),
  );
}
