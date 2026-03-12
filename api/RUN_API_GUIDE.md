# API - Hướng Dẫn Chạy

## ❌ Lỗi Thường Gặp

```
ENOENT: Could not change directory to "api"
error: script "dev" exited with code 1
```

## ✅ Giải Pháp

### Cách 1: Chạy từ root project (recommended)

```bash
# Từ root /Users/truongdq/tx/GitHub/emplus
bun run dev:api
```

### Cách 2: Chạy trực tiếp từ api folder

```bash
# CD vào api folder trước
cd /Users/truongdq/tx/GitHub/emplus/api

# Install dependencies
bun install

# Chạy dev
bun run dev
```

### Cách 3: Chạy trực tiếp file index

```bash
cd api
bun run src/index.ts
```

## 🔧 Troubleshooting

### 1. Kiểm tra Bun workspace

```bash
# Từ root
cat package.json | grep workspaces -A 5

# Phải có "api" trong workspaces
workspaces: [
  "mobile",
  "api",
  "design-builder"
]
```

### 2. Reinstall dependencies

```bash
# Từ root
rm -rf node_modules api/node_modules
bun install
```

### 3. Kiểm tra .env file

```bash
cd api
cat .env

# Nếu chưa có, tạo từ .env.example
cp .env.example .env
```

### 4. Chạy không cần .env (development mode)

```bash
cd api
NODE_ENV=development bun run dev
```

## 📋 Quick Start

```bash
# Terminal 1 - Start API
cd /Users/truongdq/tx/GitHub/emplus
bun run dev:api

# API sẽ chạy tại http://localhost:3000
# Swagger UI: http://localhost:3000/v1/docs
```

## ✅ Test API

```bash
# Health check
curl http://localhost:3000/health

# Expected: {"status":"hoat_dong"}
```

## 🚀 Scripts Available

```bash
# From root
bun run dev:api          # Chạy API dev server
bun run start:api        # Chạy API production
bun run test:api         # Chạy tests

# From api folder
bun run dev              # Chạy dev server
bun run start            # Chạy production
bun run test             # Chạy tests
bun run db:migrate       # Chạy migrations
bun run db:seed          # Seed data
```

## 📝 Notes

- **Working directory matters**: Luôn cd vào đúng folder trước khi chạy
- **Bun workspaces**: Root package.json quản lý tất cả workspaces
- **Environment variables**: Set trong `.env` hoặc environment

---

**API sẽ chạy sau khi fix working directory! 🚀**
