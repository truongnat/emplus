/**
 * Toast Context - Integration with existing Toast component
 * Provides simple hook-based API for showing toasts
 */

import React, {
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import {
  ToastContainer,
  toast as toastImpl,
  TOAST_DEFAULT_DURATION_MS,
} from "./components/atoms/Toast";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastContextType {
  showToast: (
    message: string,
    variant?: ToastVariant,
    duration?: number,
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const showToast = useCallback(
    (
      message: string,
      variant: ToastVariant = "info",
      duration: number = TOAST_DEFAULT_DURATION_MS,
    ) => {
      if (!message || message.trim() === "") {
        return;
      }

      toastImpl.show({
        message,
        variant,
        duration,
        position: "bottom",
      });
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer maxVisible={3} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

// Re-export toast imperative API for advanced usage
export { toast } from "./components/atoms/Toast";
