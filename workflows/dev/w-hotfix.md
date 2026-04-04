# w-hotfix — Hotfix workflow

## Metadata

- **Command**: `/w-hotfix`
- **Scope**: Sửa lỗi nhỏ, triage nhanh — không thay thế full `w-ticket`.

## Inputs

- **symptom** (bắt buộc): hành vi sai / mong đợi.
- **prod_ref** (tùy): branch/tag production.
- **stack** (tùy): ví dụ Expo mobile.

## Outputs

- `hotfix_branch`: tên nhánh đề xuất (ví dụ `hotfix/login-keyboard`).
- `fix`: mô tả thay đổi.
- `deploy_notes`: ghi chú ship / rollback một dòng.
- `merge_followup`: merge về nhánh phát triển chính sau khi xác nhận.

## Steps (1–6)

1. Xác nhận triệu chứng và bề mặt ảnh hưởng (màn / platform).
2. Tìm root cause tối thiểu (đọc code, không mở rộng scope).
3. Patch nhỏ + typecheck/lint cho phạm vi đụng.
4. Ghi vào ticket Kanban liên quan (nếu có) hoặc `NOTES.md`.
5. Đề xuất nhánh và cách verify tay (simulator/device).
6. Báo cáo theo Outputs.

## Notes

- Auth/payment/PII: thêm rà soát `security-pro` trước khi merge.
- DB migration: không dùng hotfix cho thay đổi schema rủi ro cao.
