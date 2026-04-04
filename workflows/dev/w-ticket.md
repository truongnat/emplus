# w-ticket — Ticket / Kanban workflow

## Metadata

- **Command**: `/w-ticket`
- **Scope**: Một ticket có spec rõ; theo dõi trạng thái trong repo qua thư mục Kanban.

## Inputs

- **ticket_id** (bắt buộc): số hoặc slug, ví dụ `1` → thư mục `kanban/ticket-1/`.
- **issue_spec** (tùy): mô tả ngắn từ user.
- **domain_stack** (tùy): ví dụ `mobile/expo`.

## Outputs

- `kanban_tree`: cấu trúc `kanban/ticket-<id>/`.
- `implementation`: tóm tắt thay đổi code (khi có).
- `closing_reports`: ghi trong `TICKET.md` / `NOTES.md` của ticket.
- `bundle_state`: sau khi thêm skill mới — chạy `node dist/tools.js validate-skills` (và `build-skill-index` nếu quy trình yêu cầu).

## Ticket / Kanban layout

Mỗi ticket một thư mục:

```text
kanban/
  README.md                 # bảng tổng quan (optional)
  ticket-<id>/
    TICKET.md               # spec, trạng thái, acceptance, liên kết PR/commit
    NOTES.md                # optional — quyết định kỹ thuật, log ngắn
```

**Quy ước trạng thái** (trong `TICKET.md`, field `status`): `backlog` | `doing` | `review` | `done`.

## Steps (1–7)

1. **Intake**: Ghi `ticket_id`, mô tả, acceptance criteria vào `kanban/ticket-<id>/TICKET.md`.
2. **Skill mới** (chỉ khi cần): Thêm `skills/<name>/` theo `skills/SKILL_AUTHORING_RULES.md` §1; validate như Outputs.
3. **Breakdown**: Liệt kê task con trong `TICKET.md` hoặc `NOTES.md`.
4. **Implement**: Code theo spec; cập nhật `TICKET.md` (mục Implementation).
5. **Verify**: Typecheck/test theo stack; ghi kết quả ngắn trong `TICKET.md`.
6. **Close**: Đặt `status: done`, ngày đóng, residual risk (nếu có).
7. **Report**: Trả lời user với `kanban_tree` + tóm tắt.

## Notes

- Chọn skill từ `skills/README.md` hoặc `node dist/tools.js list-skills`.
- Ticket không thay thế code review hay CI; chỉ là nguồn sự thật nhẹ trong repo.
