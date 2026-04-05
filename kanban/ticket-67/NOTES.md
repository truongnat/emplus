# Ticket 67 — Notes

- Deploy Postgres: chạy `bun run db:migrate` (hoặc tương đương) để áp `015_profile_private.sql` trước khi bật API với `DATA_STORE=postgres`.
- Hai switch còn lại (online, tin nhắn người lạ) vẫn chỉ local state — chưa có cột API.
