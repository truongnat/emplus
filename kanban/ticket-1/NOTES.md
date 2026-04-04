# Ticket 1 — ghi chú kỹ thuật

- **Liquid glass**: `GlassCard` bọc nội dung form trong `cardContent` trên nhánh liquid để padding khớp blur, tránh padding đôi (shell `liquidCardShell` không set padding ngoài).
- **Keyboard**: `KeyboardAvoidingView` + `ScrollView` không tự scroll tới `TextInput` đang focus; chuyển sang `react-native-keyboard-aware-scroll-view` đã có trong `mobile/package.json`.
