# 🤖 GEMINI CLI MANDATES (AGENTIC SDLC)

Mọi hành động thực hiện bởi Gemini CLI trong dự án này PHẢI tuân thủ các quy tắc sau. Không có ngoại lệ.

## 1. QUY TẮC NHÁNH (BRANCHING STRATEGY)
- **main:** Nhánh dành riêng cho **Production**. Tuyệt đối không commit trực tiếp.
- **develop:** Nhánh chính để phát triển (**Development**). Mọi feature/bugfix đều được merge vào đây trước khi lên main.
- **Tên nhánh công việc:** `<type>/<description>` tách ra từ `develop`.
- **Loại nhánh hợp lệ:** `feature/`, `bugfix/`, `hotfix/`, `refactor/`, `docs/`.

## 2. QUY TẮC COMMIT (CONVENTIONAL COMMITS)
- **Định dạng:** `<type>(<scope>): <description>`
- **Types:** `feat`, `fix`, `refactor`, `style`, `test`, `chore`, `docs`.
- **Scopes:** `api`, `mobile`, `shared`, `deps`, `config`.

## 3. CHECKLIST BẮT BUỘC TRƯỚC KHI COMMIT (PRE-COMMIT)
1. **Lint & Format:** `bun lint` và `bun format`.
2. **Type Check:** `bun x tsc --noEmit`.
3. **Clean Code:** Xóa `console.log`, code debug, rác.
4. **Validation:** Chạy `bun test` cho logic thay đổi.

## 4. QUY TRÌNH KẾT THÚC TASK (POST-TASK MANDATES)
Khi hoàn thành một Task, Agent PHẢI thực hiện và nhắc nhở người dùng:
1. **Commit:** Thực hiện commit theo chuẩn Conventional.
2. **Push:** Đẩy nhánh hiện tại lên Remote.
3. **Merge Request:** Nhắc nhở tạo PR để merge vào nhánh `develop`.
4. **Clean up:** Sau khi merge, checkout về `develop`, pull mới nhất và chuẩn bị cho task tiếp theo.
5. **Change Log:** Cập nhật `CHANGELOG.md` cho các bản `feat` hoặc `fix`.

## 5. DX & LOCAL DEVELOPMENT
- **Lệnh duy nhất khởi động Backend:** `bun dev` (Sẽ khởi động Docker Infra + API + Migrate).
- **Mobile:** Chạy manual qua `cd mobile && bun dev`.
- **Ưu tiên:** Luôn sử dụng `bun`.

---
*Tuân thủ quy trình này là bắt buộc để đảm bảo chất lượng phần mềm theo chuẩn Agentic SDLC.*
