# Em Plus API

API Bun + TypeScript theo tài liệu `docs/`:

- Xác thực email/mật khẩu (đăng ký + đăng nhập)
- Ghép đôi cặp đôi (tạo mã mời + tham gia)
- Trang chủ dashboard (số ngày yêu + sự kiện sắp tới + gợi ý hằng ngày)
- Timeline kỷ niệm (danh sách + tạo mới)
- Engine chăm sóc cảm xúc (chu kỳ nữ + gợi ý cho nam)
- Tầng dữ liệu runtime: `PostgreSQL + Redis`

## Chuẩn kiến trúc backend

Backend đã được chuẩn hóa về một kiến trúc duy nhất theo luồng:

`modules (HTTP routes) -> dto (Zod validation) -> services (business logic) -> store (data access)`

Quy ước hiện tại:

- `src/modules/*`: chỉ xử lý HTTP concerns (route, auth middleware, parse input, map response).
- `src/dto/*`: schema Zod + hàm validate/parse cho body/query/params.
- `src/services/*`: business logic thuần nghiệp vụ, không phụ thuộc Hono context.
- `src/store/*` + `src/store.ts`: adapter truy cập dữ liệu (in-memory/postgres/redis).
- `src/utils/http.ts`: chuẩn response và error chung.

Những lớp `application/domain/infrastructure/presentation` trước đây đã được loại bỏ để tránh trùng lặp và giảm độ rối.

## Khởi động nhanh

Chạy ngay từ thư mục backend:

```bash
bun run dev:all
```

Lệnh này sẽ:

- tự tạo file môi trường còn thiếu cho `api`, `web`, `mobile`
- bật hạ tầng local: Postgres chính, Postgres đọc, Redis, Mailpit, MinIO
- chạy migration + nạp dữ liệu mẫu
- chạy API + web + mobile bằng một lệnh
- tự đổi cổng nếu cổng mặc định đang bận

## Migration

- Chạy migration: `bun run db:migrate`
- Xem trạng thái migration: `bun run db:migrate:status`
- Khởi tạo DB (`db:init`) thực chất là chạy migration

Migration được lưu trong:

- `src/db/migrations/*.sql`

Runner migration tự quản lý bảng:

- `schema_migrations` (tên migration, checksum, thời điểm áp dụng)

## Cấu hình môi trường cơ bản

```bash
DATA_STORE=postgres
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/emplus
READ_DATABASE_URL=postgresql://postgres:postgres@localhost:5434/emplus
REDIS_URL=redis://localhost:6380
MAIL_HOST=localhost
MAIL_PORT=1025
MINIO_ENDPOINT=http://localhost:9000
SWAGGER_ENABLED=true
```

## Chạy theo bước

1. Copy env mẫu:

```bash
cp api/.env.example api/.env
```

2. Cài dependencies:

```bash
bun install
```

3. Chạy migration:

```bash
bun run db:init
```

4. Nạp dữ liệu mẫu:

```bash
bun run db:seed
```

5. Chạy API:

```bash
bun run dev:api
```

## Địa chỉ mặc định

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/v1/docs`

## Alias path

Đã cấu hình alias path trong backend:

- `@/*` -> `src/*`
- `#/*` -> `src/*`
