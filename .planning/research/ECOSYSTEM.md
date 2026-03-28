# Hệ sinh thái kỹ thuật — Em Plus

## Ngôn ngữ & runtime

| Thành phần | Công nghệ |
|------------|-----------|
| Monorepo | Bun workspaces |
| API | Bun, TypeScript, Hono 4 |
| Mobile | Expo 55, React 19, React Native 0.83, Expo Router |
| Design builder | Vite 6, React 19, Tailwind 3 |

## Thư viện API (tiêu biểu)

- **HTTP / API:** `hono`, `@hono/swagger-ui`, `@hono/node-ws`
- **Auth / bảo mật:** `jose`, `google-auth-library`
- **Dữ liệu:** `postgres`, `ioredis`
- **Validation:** `zod`
- **Email:** `nodemailer`
- **Observability (optional):** `@grafana/faro-*`

## Thư viện Mobile (tiêu biểu)

- **Server state:** `@tanstack/react-query` + persist async-storage
- **Form:** `react-hook-form` + `@hookform/resolvers` + zod
- **UI / motion:** Reanimated, gesture-handler, FlashList, expo-image, glass effect, lucide-react-native
- **Auth UX:** expo-auth-session, expo-secure-store, expo-web-browser

## Hạ tầng local (Docker)

- PostgreSQL (+ slave trong compose), Redis, MinIO, Mailpit
- Logging stack tùy chọn: `api/docker-compose.logging.yml`

## DevOps

- Script Kubernetes: `deploy/k8s/scripts/`
- Workflow AI: `bun run ai:feature`, `ai:bugfix`, `ai:review` → `scripts/ai-workflow.sh`

## Miền nghiệp vụ (từ module API)

Ứng dụng cho cặp đôi: cặp đôi (`couples`), bảng điều khiển (`dashboard`), dòng thời gian (`timeline`), chăm sóc (`care`), ngân sách (`budget`), live (`live`), quản trị (`admin`), người dùng & xác thực (`users`, `auth`).
