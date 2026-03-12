# Swagger UI - Hướng Dẫn

## 🔍 Vấn Đề

Swagger UI không hiển thị gì vì:
1. **API chưa chạy**
2. **Environment variables chưa set**
3. **Truy cập sai URL**

## ✅ Giải Pháp

### 1. Chạy API Server

```bash
# Từ root project
cd api
bun run dev

# Hoặc từ root
bun run dev:api
```

### 2. Kiểm Tra Environment

Tạo file `.env` trong `api/`:

```bash
# api/.env
NODE_ENV=development
DATA_STORE=postgres
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/emplus?schema=public
REDIS_URL=redis://localhost:6379
CORS_ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000
SWAGGER_ENABLED=true
SWAGGER_PATH=/v1/docs
```

### 3. Truy Cập Swagger UI

Sau khi API chạy, mở:

```
http://localhost:3000/v1/docs
```

## 📋 URLs

| Endpoint | URL |
|----------|-----|
| **Swagger UI** | http://localhost:3000/v1/docs |
| **OpenAPI JSON** | http://localhost:3000/v1/docs/openapi.json |
| **Health Check** | http://localhost:3000/health |
| **API Base** | http://localhost:3000 |

## 🔧 Troubleshooting

### Swagger không hiển thị?

```bash
# 1. Kiểm tra API có chạy không
curl http://localhost:3000/health

# Nếu lỗi → API chưa chạy
# Nếu OK → API đang chạy

# 2. Kiểm tra Swagger JSON
curl http://localhost:3000/v1/docs/openapi.json

# Nếu có JSON → Swagger config OK
# Nếu 404 → Swagger path sai
```

### API không chạy được?

```bash
# Kiểm tra dependencies
cd api
bun install

# Kiểm tra database
docker compose up -d postgres

# Chạy migrations
bun run db:migrate

# Start API
bun run dev
```

### CORS errors?

Thêm vào `.env`:

```bash
CORS_ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000,http://127.0.0.1:3000
```

## 🎯 Quick Start

```bash
# Terminal 1 - Start infrastructure
cd /Users/truongdq/tx/GitHub/emplus
docker compose up -d postgres redis mailpit

# Terminal 2 - Run migrations
cd api
bun run db:migrate

# Terminal 3 - Start API
cd api
bun run dev

# Terminal 4 - Open Swagger
# Open browser: http://localhost:3000/v1/docs
```

## 📝 Notes

- Swagger chỉ enabled trong development (không phải production)
- Default path: `/v1/docs`
- Có thể đổi path trong `.env`: `SWAGGER_PATH=/api-docs`
- Disable Swagger: `SWAGGER_ENABLED=false`

## ✅ Checklist

- [x] API đang chạy tại http://localhost:3000
- [x] Health check OK: http://localhost:3000/health
- [x] Swagger enabled trong .env
- [x] Truy cập đúng URL: http://localhost:3000/v1/docs
- [x] OpenAPI JSON available: http://localhost:3000/v1/docs/openapi.json

---

**Swagger UI sẽ hoạt động khi API chạy! 🚀**
