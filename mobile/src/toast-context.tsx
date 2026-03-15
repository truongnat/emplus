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
import { ToastContainer, toast as toastImpl } from "./components/atoms/Toast";

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
      duration: number = 3000,
    ) => {
      console.log("🍞 Toast SHOW:", {
        message: message || "(empty message)",
        variant,
        duration,
        messageLength: message?.length,
        messageType: typeof message,
      });

      if (!message || message.trim() === "") {
        console.error("❌ Toast error: Empty message!");
        return;
      }

      toastImpl.show({
        message,
        variant,
        duration,
        position: "top",
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
