# Change Log

Tất cả các thay đổi đáng chú ý đối với dự án này sẽ được ghi lại trong tệp này.

## [Unreleased]
- **feat(mobile):** Cài đặt các package Expo cốt lõi cho business (ImagePicker, Notifications, AuthSession, v.v.).
- **feat(mobile):** Bổ sung tiện ích `expo-helpers` để đơn giản hóa việc sử dụng các API native của Expo.
- **feat(mobile):** Tích hợp tính năng chọn ảnh (Pick Image) vào màn hình Dòng thời gian (Timeline).
- **feat(mobile):** Tích hợp `expo-glass-effect` để làm tính năng "liquid glass" cho ứng dụng mobile.
- **refactor(mobile):** Thay thế `@callstack/liquid-glass` bằng `expo-glass-effect`.
- **feat(mobile):** Bổ sung component `LiquidGlassView` và `LiquidGlassContainer`.
- **feat(mobile):** Nâng cấp `GlassCard` để hỗ trợ native liquid effect trên iOS.
- Khởi tạo quy tắc `GEMINI.md` về Branching, Commits, Pre-commit, và Change Log.
- Sửa lỗi TypeScript trùng thuộc tính `components` trong `api/src/docs/openapi.ts`.
- Bổ sung các script `lint`, `format`, `typecheck` vào `package.json` của `api`, `mobile`, và `web`.
- Chuyển sang nhánh `refactor/fix-tsc-and-setup-audit` để tuân thủ quy tắc quản lý nhánh.

