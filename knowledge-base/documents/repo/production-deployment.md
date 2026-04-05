# Production Deployment Guide — Em+ v0.1.0

> Ngày tạo: 2026-04-05

---

## Mục lục

1. [Tổng quan kiến trúc](#1-tổng-quan-kiến-trúc)
2. [Yêu cầu hạ tầng](#2-yêu-cầu-hạ-tầng)
3. [Triển khai API](#3-triển-khai-api)
4. [Triển khai Mobile](#4-triển-khai-mobile)
5. [Biến môi trường production](#5-biến-môi-trường-production)
6. [Database migration](#6-database-migration)
7. [Checklist trước khi go-live](#7-checklist-trước-khi-go-live)
8. [Monitoring & Observability](#8-monitoring--observability)
9. [Rollback plan](#9-rollback-plan)

---

## 1. Tổng quan kiến trúc

```
┌─────────────┐     HTTPS      ┌──────────────┐
│  Mobile App │ ◄────────────► │   API (Bun)  │
│  (Expo/RN)  │                │  Port 3000   │
└─────────────┘                └──────┬───────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                  │
              ┌─────▼─────┐   ┌──────▼──────┐   ┌──────▼──────┐
              │ PostgreSQL │   │    Redis    │   │    MinIO    │
              │  (primary) │   │  (session,  │   │  (media     │
              │            │   │   OTP, WS)  │   │   uploads)  │
              └────────────┘   └─────────────┘   └─────────────┘
                    │
              ┌─────▼─────┐
              │ PostgreSQL │  (optional read replica)
              │  (replica) │
              └────────────┘
```

**Stack:** Bun 1.2+ / Hono / PostgreSQL 15 / Redis 7 / MinIO / Expo SDK 55

---

## 2. Yêu cầu hạ tầng

| Service | Minimum | Ghi chú |
|---------|---------|---------|
| **API server** | 1 vCPU, 512MB RAM | Bun single-process, stateless |
| **PostgreSQL** | 1 vCPU, 1GB RAM, 10GB disk | Managed DB khuyến nghị (Supabase, Neon, RDS) |
| **Redis** | 256MB RAM | Upstash / ElastiCache / managed Redis |
| **MinIO / S3** | Tùy lượng media | Có thể dùng AWS S3 / Cloudflare R2 thay MinIO |
| **SMTP** | — | Resend, SendGrid, AWS SES, hoặc bất kỳ SMTP provider |
| **Domain + SSL** | — | Reverse proxy (Caddy, nginx, Cloudflare Tunnel) |

---

## 3. Triển khai API

### 3.1 Docker (khuyến nghị)

Dockerfile đã có sẵn tại `api/Dockerfile`:

```bash
# Build image
docker build -t emplus-api:v0.1.0 -f api/Dockerfile .

# Run
docker run -d \
  --name emplus-api \
  -p 3000:3000 \
  --env-file api/.env.production \
  emplus-api:v0.1.0
```

### 3.2 Cloud platforms

| Platform | Hướng dẫn |
|----------|-----------|
| **Railway** | Connect repo → set root directory `/` → Dockerfile detected auto → set env vars |
| **Fly.io** | `fly launch` từ root, dùng Dockerfile hiện tại |
| **Render** | Docker deploy, set env vars trong dashboard |
| **VPS** | Docker + Caddy reverse proxy (xem bên dưới) |

### 3.3 VPS + Caddy (ví dụ)

```bash
# Trên VPS
git clone <repo> && cd emplus

# Build + run
docker compose -f docker-compose.yml up -d   # Postgres, Redis, MinIO
docker build -t emplus-api -f api/Dockerfile .
docker run -d --name emplus-api --network host \
  --env-file api/.env.production \
  emplus-api

# Caddy reverse proxy
cat > /etc/caddy/Caddyfile << 'EOF'
api.emplus.app {
    reverse_proxy localhost:3000
}
EOF
sudo systemctl reload caddy
```

### 3.4 Kubernetes (kind/local)

Đã có manifests tại `deploy/k8s/`. Xem `deploy/k8s/README.md`.

Lưu ý: manifests hiện dùng `emptyDir` — cần chuyển sang PVC cho production.

---

## 4. Triển khai Mobile

### 4.1 Tạo EAS config

Tạo `mobile/eas.json`:

```json
{
  "cli": {
    "version": ">= 13.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "<APPLE_ID>",
        "ascAppId": "<ASC_APP_ID>",
        "appleTeamId": "ZG4LJ9HHX8"
      },
      "android": {
        "serviceAccountKeyPath": "<PATH_TO_KEY.json>"
      }
    }
  }
}
```

### 4.2 Build + Submit

```bash
cd mobile

# iOS production build
eas build --platform ios --profile production

# Android production build
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios --profile production
eas submit --platform android --profile production
```

### 4.3 Mobile environment

Cấu hình API URL cho production trong `mobile/src/core/config/`:

- `EXPO_PUBLIC_API_URL` → URL API production (vd: `https://api.emplus.app`)
- `EXPO_PUBLIC_LIVE_WS_ENABLED` → `true` nếu WebSocket sẵn sàng

### 4.4 Prebuild (native splash / icon)

Sau khi thay đổi `app.json` (icon, splash), cần prebuild:

```bash
npx expo prebuild --clean
```

---

## 5. Biến môi trường production

Tạo file `api/.env.production` (KHÔNG commit file này):

```bash
# === REQUIRED ===
NODE_ENV=production
DATA_STORE=postgres
DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/emplus?sslmode=require
REDIS_URL=redis://:<pass>@<host>:6379
CORS_ALLOWED_ORIGINS=https://emplus.app,https://api.emplus.app

# Encryption (32-byte hex, generate: openssl rand -hex 32)
DATA_ENCRYPTION_KEY=<your-64-char-hex-key>

# === SMTP ===
MAIL_HOST=smtp.resend.com
MAIL_PORT=465
MAIL_USER=resend
MAIL_PASS=re_xxxxxxxxxxxx
MAIL_FROM=Em+ <no-reply@emplus.app>

# === Object Storage ===
# Option A: MinIO self-hosted
MINIO_ENDPOINT=https://minio.emplus.app
MINIO_ACCESS_KEY=<access-key>
MINIO_SECRET_KEY=<secret-key>
MINIO_BUCKET=emplus
MINIO_USE_SSL=true
MINIO_PUBLIC_BASE_URL=https://cdn.emplus.app

# Option B: AWS S3 / Cloudflare R2
# MINIO_ENDPOINT=https://<account>.r2.cloudflarestorage.com
# MINIO_REGION=auto

# === OAuth (nếu dùng) ===
GOOGLE_CLIENT_IDS=<ios-client-id>,<android-client-id>
APPLE_AUDIENCES=com.truongdq.emplus

# === Swagger (tắt trong production) ===
SWAGGER_ENABLED=false

# === Demo data (tắt trong production) ===
FAKE_IN_APP_NOTIFICATIONS=false
FAKE_TIMELINE_MEMORIES=false

# === Optional ===
# READ_DATABASE_URL=postgresql://<user>:<pass>@<replica-host>:5432/emplus?sslmode=require
# DEFAULT_BUDGET_AMOUNT=20000000
```

### Biến nhạy cảm — KHÔNG lưu trong Git

| Biến | Mô tả |
|------|-------|
| `DATABASE_URL` | Connection string PostgreSQL |
| `REDIS_URL` | Connection string Redis |
| `DATA_ENCRYPTION_KEY` | AES-256-GCM key (32 bytes hex) |
| `MAIL_PASS` | SMTP password |
| `MINIO_SECRET_KEY` | Object storage secret |

---

## 6. Database migration

### 6.1 Chạy migration production

```bash
# Từ thư mục root
DATABASE_URL="postgresql://..." bun run db:migrate

# Kiểm tra trạng thái
DATABASE_URL="postgresql://..." bun run db:migrate:status
```

### 6.2 Migration files

Nằm tại `api/src/db/migrations/` (001 → 017). Runner tự quản bảng `schema_migrations`.

### 6.3 Quy trình migration an toàn

1. **Backup** database trước khi migrate.
2. Chạy `db:migrate:status` để kiểm tra pending migrations.
3. Chạy `db:migrate` — mỗi file chạy trong transaction riêng.
4. Verify bằng `db:migrate:status` — tất cả phải `applied`.
5. Smoke test API health endpoint: `GET /health`.

---

## 7. Checklist trước khi go-live

### Infrastructure

- [ ] PostgreSQL production instance đã tạo + SSL
- [ ] Redis production instance đã tạo
- [ ] Object storage (MinIO/S3/R2) đã tạo + bucket `emplus`
- [ ] SMTP provider đã cấu hình (Resend/SendGrid/SES)
- [ ] Domain `api.emplus.app` trỏ đúng
- [ ] SSL/TLS certificate hoạt động
- [ ] Reverse proxy (Caddy/nginx/Cloudflare) cấu hình xong

### API

- [ ] `NODE_ENV=production` đã set
- [ ] `DATA_ENCRYPTION_KEY` đã generate và set
- [ ] `SWAGGER_ENABLED=false`
- [ ] `FAKE_IN_APP_NOTIFICATIONS=false`
- [ ] `FAKE_TIMELINE_MEMORIES=false`
- [ ] Database migration đã chạy thành công
- [ ] `GET /health` trả về 200
- [ ] CORS origins chỉ cho phép domain chính thức
- [ ] Rate limiting hoạt động trên `/v1/auth/*`

### Mobile

- [ ] `eas.json` đã tạo với profile production
- [ ] API URL production đã cấu hình
- [ ] App icon hiển thị đúng
- [ ] Splash screen hiển thị đúng (cần `npx expo prebuild --clean`)
- [ ] Push notification permission flow hoạt động
- [ ] Build production pass trên cả iOS và Android
- [ ] TestFlight / Internal Testing đã verify

### Security

- [ ] Không có secret nào trong Git
- [ ] `allowMockOAuth` chỉ bật khi `NODE_ENV=test`
- [ ] CSP + HSTS headers bật trong production
- [ ] WebSocket reject unauthenticated connections
- [ ] SQL debug logging chỉ chạy khi `NODE_ENV !== production`

---

## 8. Monitoring & Observability

### Health check

```
GET /health → 200 OK
```

### Logging

- API log ra stdout (structured khi production).
- Docker: `docker logs emplus-api -f`
- K8s local: Grafana + Loki + Promtail đã có manifests (`deploy/k8s/observability/`).

### Metrics (tùy chọn)

- Prometheus scrape `/metrics` (nếu thêm middleware).
- Grafana dashboards cho response time, error rate, DB connections.

### Alerts đề xuất

| Alert | Điều kiện |
|-------|----------|
| API down | Health check fail > 2 phút |
| High error rate | 5xx > 5% trong 5 phút |
| DB connection pool | Active connections > 80% pool |
| Disk usage | > 85% |
| Redis memory | > 80% maxmemory |

---

## 9. Rollback plan

### API rollback

```bash
# Docker
docker stop emplus-api
docker run -d --name emplus-api-rollback \
  --env-file api/.env.production \
  emplus-api:<previous-tag>

# Hoặc revert code + rebuild
git revert HEAD
docker build -t emplus-api:rollback -f api/Dockerfile .
```

### Database rollback

Migration runner hiện chỉ hỗ trợ forward migration. Nếu cần rollback:

1. Restore từ backup đã tạo trước khi migrate.
2. Hoặc viết SQL revert thủ công cho migration cụ thể.

### Mobile rollback

- **OTA (Expo Updates):** Publish bản cũ qua `eas update`.
- **Store:** Submit bản cũ hoặc tạo hotfix build mới.

---

## CI/CD hiện tại

File: `.github/workflows/ci.yml`

- **Trigger:** Push to `main` + tất cả PR
- **Jobs:**
  - `api`: Typecheck + test (DATA_STORE=memory, không cần DB)
  - `mobile`: Typecheck

### Mở rộng CI/CD (đề xuất)

```yaml
# Thêm job deploy (ví dụ Railway)
deploy:
  needs: [api, mobile]
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Deploy to Railway
      uses: bervProject/railway-deploy@v1
      with:
        railway_token: ${{ secrets.RAILWAY_TOKEN }}
        service: emplus-api
```
