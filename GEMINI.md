# 🤖 GEMINI CLI MANDATES

Mọi hành động thực hiện bởi Gemini CLI trong dự án này PHẢI tuân thủ các quy tắc sau. Không có ngoại lệ.

## 1. QUY TẮC NHÁNH (BRANCHING)
- **Tên nhánh:** `<type>/<description>` (VD: `feature/login-api`, `bugfix/ios-overflow`)
- **Loại nhánh hợp lệ:** `feature/`, `bugfix/`, `hotfix/`, `refactor/`, `docs/`.
- Luôn tạo nhánh mới từ `main` trước khi thực hiện thay đổi logic lớn.

## 2. QUY TẮC COMMIT (CONVENTIONAL COMMITS)
- **Định dạng:** `<type>(<scope>): <description>`
- **Types:** `feat`, `fix`, `refactor`, `style`, `test`, `chore`, `docs`.
- **Scopes:** `api`, `mobile`, `shared`, `deps`, `config`.
- **Ngôn ngữ:** Tiếng Anh hoặc Tiếng Việt (thống nhất với project).
- **Ví dụ:** `feat(api): add otp verification endpoint`

## 3. CHECKLIST BẮT BUỘC TRƯỚC KHI COMMIT (PRE-COMMIT)
Trước khi thực hiện `git commit`, Agent PHẢI thực hiện các bước sau:
1. **Lint & Format:** Chạy lệnh lint/format của dự án (VD: `bun lint`, `bun format`).
2. **Type Check:** Đảm bảo không có lỗi TypeScript (`bun x tsc --noEmit`).
3. **Clean Code:** Xóa bỏ `console.log`, code thừa, code debug.
4. **Validation:** Chạy `bun test` nếu có sự thay đổi logic quan trọng.

## 4. QUY TRÌNH CHANGE LOG
- Với mỗi `feat` (tính năng mới) hoặc `fix` (sửa lỗi), PHẢI cập nhật file `CHANGELOG.md`.
- Cấu trúc: [Ngày] - [Loại] - [Nội dung ngắn gọn].

## 5. CÁC LỆNH ƯU TIÊN
- **BẮT BUỘC:** Chỉ sử dụng `bun`. Tuyệt đối không dùng `npm`, `yarn`, `pnpm`.
- Tự động nhận diện `package.json` trong các thư mục con (`api/`, `mobile/`) để chạy lệnh đúng context.
