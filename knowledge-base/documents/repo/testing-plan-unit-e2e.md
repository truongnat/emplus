# Kế hoạch kiểm thử — Backend (API) & Mobile (Unit + E2E)

Tài liệu này mô tả **chiến lược**, **phạm vi**, **công cụ đề xuất**, **ma trận ưu tiên** và **tiêu chí báo cáo** cho unit test và E2E. Phù hợp làm backlog triển khai dần; không thay thế việc chạy test thực tế trên CI.

---

## 1. Tóm tắt điều hành

| Khía cạnh | Backend (`api/`) | Mobile (`mobile/`) |
|-----------|------------------|---------------------|
| **Unit** | Một phần đã có (logic thuần + Zod); thiếu tách service layer với mock | Chưa có pipeline Jest/RTL trong `package.json` |
| **Integration HTTP** | Đã có: `bun test` + `app.request()` + `DATA_STORE=memory` | Có thể mock API (MSW) hoặc trỏ staging |
| **E2E thật** | Chưa có job CI với Postgres/Redis/MinIO | Chưa có Maestro/Detox/Appium |
| **CI hiện tại** | `bun run test:api` (memory store, không Docker) | Chỉ `typecheck:mobile` |

**Khuyến nghị ngắn:** giữ **smoke integration** trên memory store trong CI; bổ sung **unit có mock** cho dịch vụ (push, mail, notify); thêm **E2E API** theo lịch (nightly) với Docker Compose; mobile bắt đầu bằng **Jest + jest-expo + RTL**, E2E ưu tiên **Maestro** (YAML, dễ CI) hoặc **Detox** (nặng build native hơn).

---

## 2. Hiện trạng trong repo

### 2.1 Backend

- **Runner:** Bun built-in test (`bun:test`), script: `api/package.json` → `NODE_ENV=test DATA_STORE=memory ALLOW_MOCK_OAUTH=true bun test`.
- **File test:** `api/src/__tests__/*.test.ts` — khoảng 8 file, gồm:
  - `app.test.ts`: luồng đăng ký, refresh token, pairing/care/timeline (integration qua Hono `app.request`).
  - `auth.test.ts`, `notifications.test.ts`, `validation.test.ts`, `system.test.ts`: HTTP + validation.
  - `anniversary.test.ts`, `love-days-utc.test.ts`, `security_random.test.ts`: logic thuần / engine.
- **Hạn chế:** Không có suite chạy trên **Postgres thật** trong CI; WebSocket (`live.ts`), gửi mail/push thật không được kiểm tra tự động đầy đủ.

### 2.2 Mobile

- **Không có** script `test` / `test:e2e` trong `mobile/package.json`.
- Kiểm thử hiện tại chủ yếu **typecheck** và thủ công trên thiết bị/giả lập.

---

## 3. Nguyên tắc chung

1. **Kim tự tháp:** nhiều unit nhanh, ít E2E đắt; integration HTTP là lớp trung tâm cho API.
2. **Dữ liệu:** test không dùng DB production; secret chỉ từ env test / mock.
3. **Xác định ranh giới:**
   - **Unit:** hàm thuần, DTO/Zod parse, service với `DataStore` / `fetch` mock.
   - **Integration API:** toàn app Hono + in-memory store (như hiện tại) hoặc test DB.
   - **E2E:** hạ tầng gần production (Compose), hoặc app mobile trên simulator/device.
4. **Flake:** E2E cần retry có kiểm soát, timeout rõ, seed cố định.
5. **Báo cáo:** lưu JUnit XML / HTML trên CI artifact khi bật coverage hoặc E2E.

---

## 4. Backend — kế hoạch chi tiết

### 4.1 Unit test (nhanh, không mạng)

| Mục tiêu | Vị trí đề xuất | Ghi chú |
|----------|----------------|---------|
| Zod DTO / parse errors | `api/src/dto/**/*.test.ts` hoặc cùng file `validation.test.ts` | Đã có một phần; mở rộng theo từng module mới |
| `anniversary` engine, `love-days`, presentation utils | Giữ pattern file riêng | Đã có |
| `couple.service`, `budget.service`, `notification.service` | `api/src/services/__tests__/` | Mock `DataStore` + mock `sendExpoPush` / `sendNotificationEmail` |
| `push.ts`, `mail.ts` | Unit với `fetch` / transporter mock | Tránh gọi Expo SMTP thật |
| Auth helpers (JWT, session TTL) | Tách hàm thuần nếu cần để test không cần HTTP | Giảm trùng với `app.test.ts` |

**Việc cần làm kỹ thuật:** export interface nhỏ cho side-effect (push, mail) hoặc dependency injection nhẹ trong service để mock ổn định (tránh singleton khó thay).

### 4.2 Integration test — HTTP + in-memory (CI hiện tại)

Mở rộng các file kiểu `app.test.ts` / `auth.test.ts`:

| Route / nhóm | Kịch bản tối thiểu |
|----------------|-------------------|
| `GET /v1/couples/status` | Chưa pair → `paired: false`; sau `join` → `paired: true`, `coupleId`, partner summary |
| `POST /v1/couples/join` | Hai user; mã hết hạn; mã sai; user đã có couple (conflict) |
| `PUT /v1/care/mood` | 401; 200 + tạo notification (mock notify nếu tách được) |
| Budget CRUD | Filter `status` query (regression bug `category` vs `status`) |
| Media upload URL | Chữ ký / validation (nếu không gọi MinIO thật — mock store) |
| Admin / debug | Chỉ chạy khi `NODE_ENV=test` và flag bật; tránh lộ trên prod |

**Tiêu chí xong phase:** mọi route trong `api/src/modules/*.ts` có ít nhất một test smoke hoặc được gom vào flow lớn có assert rõ.

### 4.3 E2E / contract — Postgres + Redis (job riêng)

**Mục đích:** bắt lỗi SQL, constraint, migration, khác biệt memory vs Postgres (ví dụ đã sửa `DANG_YEU` / `DA_CUOI`).

| Bước | Mô tả |
|------|--------|
| 1 | Workflow GitHub Actions: `services: postgres` (image giống `docker-compose`) hoặc `docker compose up` |
| 2 | `DATA_STORE=postgres` + `DATABASE_URL` trỏ container test |
| 3 | `bun run db:migrate` trước suite |
| 4 | Chạy subset test được đánh dấu `describe(..., { timeout })` hoặc file `*.postgres.test.ts` |
| 5 | Redis / MinIO: optional phase 2 — mock hoặc Testcontainers nếu team chấp nhận thời gian CI |

**WebSocket `live`:** E2E khó trong Bun HTTP-only; đề xuất: (a) test nhỏ bằng client `ws` trong script riêng, hoặc (b) integration test ở mức “presence store” nếu tách logic khỏi transport.

### 4.4 Ma trận module → loại test

| Module | Unit | Integration (memory) | E2E (Postgres) |
|--------|------|----------------------|----------------|
| `auth` | JWT/session helpers | Đã có | Login/register + session DB |
| `couples` | validate join | Mở rộng `status`, concurrent join | Unique constraint, status enum |
| `dashboard` | — | GET với token | — |
| `timeline` | — | CRUD | Media FK nếu có |
| `budget` | service totals | Filter `status` | Transaction / concurrent |
| `care` | — | mood + notify mock | — |
| `notifications` | — | list/read | — |
| `user` | privacy flags | PATCH profile | — |
| `media` | URL signing | mock MinIO | ACL thật (phase sau) |
| `live` | presence logic | partial | ws client |
| `system` | — | health/docs | — |

---

## 5. Mobile — kế hoạch chi tiết

### 5.1 Unit & component test

**Stack đề xuất:** `jest-expo` + `@testing-library/react-native` + `react-test-renderer` (theo Expo docs phiên bản SDK 55).

| Lớp | Ví dụ file / nhóm | Kịch bản |
|-----|-------------------|----------|
| **Hooks** | `useSession`, query hooks | Mock `AsyncStorage` / provider |
| **Presentational** | `GlassCard`, buttons | render + accessibility label |
| **Forms** | OTP, login | validation messages |
| **Pairing** | `PairingScreenBody` | mock `dependencies.couple`, `router.replace` |
| **QRScannerSheet** | — | mock `expo-camera` module (`jest.mock('expo-camera')`) |

**Cấu hình:** thêm `jest.config.js` hoặc `expo` preset trong `package.json`; script `test` và `test:watch`.

### 5.2 Integration (mobile + API giả)

| Cách | Khi dùng |
|------|----------|
| **MSW** (Node) | Hook + `fetch` thật tới handler mock; ổn định cho TanStack Query |
| **Mock repository** | Đơn giản hơn — inject `CoupleRepository` fake qua DI test |

Ưu tiên mock ở boundary (`apiClient` hoặc repository) để không phụ thuộc server chạy.

### 5.3 E2E trên thiết bị / simulator

| Công cụ | Ưu điểm | Nhược điểm |
|---------|---------|------------|
| **Maestro** | YAML, flow nhanh, CI macOS (iOS) / Linux (Android emulator) | Cần cài CLI + app build |
| **Detox** | Mạnh cho RN, sync tốt | Cấu hình build nặng |
| **Expo + EAS build + Maestro** | Gần bản production | Chi phí build |

**Flow E2E tối thiểu (release):**

1. Mở app → màn welcome/login (tùy env test account).
2. Đăng nhập OTP hoặc bypass test-only (chỉ staging) — **không** hardcode secret trong repo; dùng secret CI.
3. Vào pairing → quét QR giả lập khó — có thể deep link / paste mã thay vì camera trong bản test.
4. Xác nhận điều hướng `/(tabs)/home`.
5. Một flow budget hoặc profile (đọc-only).

**Ghi chú camera / QR:** E2E thường **không** quét camera thật; dùng mã dán, deep link `emplus://join?code=`, hoặc mock native module.

---

## 6. CI/CD — đề xuất pipeline

| Job | Trigger | Lệnh |
|-----|---------|------|
| `api-unit-integration` | Mọi PR | Giữ `bun run test:api` (memory) |
| `api-e2e-postgres` | Main / nightly | Compose + migrate + `bun test` filtered |
| `mobile-typecheck` | Mọi PR | Giữ `typecheck:mobile` |
| `mobile-unit` | PR sau khi có Jest | `bun run --cwd mobile test --ci` |
| `mobile-e2e` | Release candidate / manual | Maestro trên artifact build |

**Artifact:** lưu screenshot/video khi E2E fail (Maestro hỗ trợ).

---

## 7. Ưu tiên triển khai (gợi ý 3 phase)

### Phase A — 1–2 tuần

- API: test `GET /v1/couples/status` + join edge cases trên memory store.
- API: unit mock cho `notify` / push (không gọi mạng).
- Mobile: scaffold Jest + 3–5 test component/hook quan trọng.

### Phase B

- API: job Postgres trên CI (subset).
- Mobile: MSW hoặc mock repo cho 1 feature (budget hoặc pairing).

### Phase C

- Mobile: Maestro flow login → home.
- API: WebSocket smoke hoặc test presence logic tách module.

---

## 8. Báo cáo & đo lường

### 8.1 Trong repo

- **Coverage (tùy chọn):** `bun test --coverage` (Bun) cho API; Jest `--coverage` cho mobile.
- **Báo cáo nhân đọc:** cập nhật mục “Testing” trong `knowledge-base/documents/repo/production-deployment.md` hoặc README `api/` / `mobile/` khi pipeline ổn định (một dòng link tới file này là đủ).

### 8.2 Checklist báo cáo định kỳ (copy dùng cho ticket)

- [ ] Số test: unit / integration / E2E; trend so với sprint trước.
- [ ] % coverage theo thư mục quan trọng (`services/`, `modules/`, `mobile/src/features/pairing`).
- [ ] Thời gian chạy CI; số flake (retry).
- [ ] Danh sách route **chưa** có smoke test.
- [ ] Rủi ro còn lại (WS, MinIO, push thật).

---

## 9. Security verification (phạm vi tài liệu)

- **Verification:** pass — tài liệu không thêm mã hay secret.
- **Risks found:** không phát hiện rủi ro mới; nhắc không commit credential test vào Git.
- **Mitigation:** dùng GitHub Actions secrets / `.env.test.local` (gitignored) cho E2E.
- **Residual risk:** E2E staging vẫn cần quản lý tài khoản test và rate limit.

---

## 10. Tham chiếu nhanh

- API test: `api/package.json` → `npm run test` (qua bun).
- CI: `.github/workflows/ci.yml` (job API test).
- Mobile switch/API: `knowledge-base/documents/repo/mobile-switch-network-calls.md`.
