/**
 * Design Provider - Integrates the design system into the application
 * Combines ThemeProvider with other design system providers
 */

import { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';

/**
 * DesignProvider integrates the design system into the application.
 * Provides theme context (light/dark mode) to all child components.
 */
export function DesignProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
