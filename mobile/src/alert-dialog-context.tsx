/**
 * In-app confirm dialogs — replaces React Native Alert.alert for consistent UX.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/src/components/atoms/Button";
import { AppText } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";

export type ConfirmOptions = {
  title: string;
  message?: string;
  /** Default: "Hủy" */
  cancelLabel?: string;
  confirmLabel: string;
  destructive?: boolean;
};

type AlertDialogContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(
  undefined,
);

type DialogState = (ConfirmOptions & { visible: true }) | { visible: false };

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<DialogState>({ visible: false });
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const finish = useCallback((value: boolean) => {
    const resolve = resolveRef.current;
    resolveRef.current = null;
    setState({ visible: false });
    resolve?.(value);
  }, []);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState({ visible: true, ...options });
    });
  }, []);

  const cancelLabel = state.visible ? state.cancelLabel ?? "Hủy" : "Hủy";
  const title = state.visible ? state.title : "";
  const message = state.visible ? state.message : undefined;
  const confirmLabel = state.visible ? state.confirmLabel : "";
  const destructive = state.visible ? state.destructive ?? false : false;

  const cardStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: colors.surface.default,
      borderColor: colors.border.subtle,
    }),
    [colors.border.subtle, colors.surface.default],
  );

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <AlertDialogContext.Provider value={value}>
      {children}
      <Modal
        visible={state.visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => finish(false)}
        accessibilityViewIsModal
      >
        <View
          style={[styles.root, { paddingBottom: Math.max(insets.bottom, 24) }]}
          pointerEvents="box-none"
        >
          <Pressable
            style={[styles.backdrop, { backgroundColor: colors.scrim }]}
            onPress={() => finish(false)}
            accessibilityRole="button"
            accessibilityLabel="Đóng hộp thoại"
          />
          <View style={[styles.card, cardStyle]} accessibilityRole="none">
            <AppText variant="h3" style={{ color: colors.text.primary }}>
              {title}
            </AppText>
            {message ? (
              <AppText
                variant="body"
                style={[styles.message, { color: colors.text.secondary }]}
              >
                {message}
              </AppText>
            ) : null}
            <View style={styles.actions}>
              <View style={styles.actionGrow}>
                <Button
                  variant="neutralOutline"
                  label={cancelLabel}
                  onPress={() => finish(false)}
                  fullWidth
                  accessibilityLabel={cancelLabel}
                />
              </View>
              <View style={styles.actionGrow}>
                <Button
                  variant={destructive ? "danger" : "primary"}
                  label={confirmLabel}
                  onPress={() => finish(true)}
                  fullWidth
                  accessibilityLabel={confirmLabel}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </AlertDialogContext.Provider>
  );
}

export function useAlertDialog() {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) {
    throw new Error("useAlertDialog must be used within AlertDialogProvider");
  }
  return ctx;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    zIndex: 1,
    gap: 12,
  },
  message: {
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  actionGrow: {
    flex: 1,
    minWidth: 0,
  },
});
