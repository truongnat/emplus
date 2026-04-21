# Repo activity log

## 2026-04-09

- Bổ sung hướng dẫn release production theo mô hình 1 VPS (Contabo) + k3s, DB Supabase (staging/prod), web Astro deploy CDN, và GitHub Actions deploy qua SSH (`deploy/k8s-prod/`, workflow deploy API).
- Bổ sung runbook hardening VPS và backup/restore drill (Supabase/Redis/object storage) vào `knowledge-base/documents/repo/production-deployment.md`.

## 2026-04-16

- Tạo bộ chính sách nền tảng cho app Em+: Điều khoản sử dụng, Quyền riêng tư, Nội dung & cộng đồng, Xóa dữ liệu & retention, và Chính sách bảo mật trong `knowledge-base/documents/policies/` (đồng thời cập nhật `knowledge-base/INDEX.md`).

## 2026-04-18

- Thêm template Markdown `knowledge-base/documents/repo/deploy-dev-and-single-vps-template.md` (dev local + prod một VPS, placeholder) và cập nhật `knowledge-base/INDEX.md`.
- Bổ sung mục «Cấu hình đã điền — Em+» (GitHub `truongnat`, domain `emplus.truongsoftware.com` / API `emplus-api.truongsoftware.com`, VPS `62.146.238.102`, app `/root/apps/emplus`) và cột `{{APP_ROOT}}` trong bảng placeholder.
- Trong `deploy-dev-and-single-vps-template.md`: làm rõ mô hình Docker một VPS **không bắt buộc** k8s/k3s; k3s chỉ tuỳ chọn / khi dùng workflow deploy API lên cluster.
- Thêm `api/.env.production.example` (template production đầy đủ biến) và ignore `api/.env.production` trong `.gitignore`.
- `production-deployment.md`: trỏ tới `api/.env.production.example` làm mẫu env production.
- `api/.env.production.example`: khớp `docker-compose.yml`; mặc định dùng **tên service** (`postgres`, `redis`, `minio`) khi API cùng Docker network; ghi chú nhánh `127.0.0.1` khi API chạy trên host / ngoài network compose; SMTP placeholder (Gmail tự cấu hình); không commit secret vào file mẫu.

## 2026-04-19

- Hoàn thiện hướng tài liệu thiết kế theo trục `YC startup idea validation` + `LookAway landing/style analysis`, bổ sung mục phương pháp và nguồn tham chiếu trong `docs/10_calm_care_ui_direction.md`.
- Viết mới `docs/11_mobile_calm_care_refactor.md` để chốt checklist mobile-first cho các màn hình ưu tiên tiếp theo: onboarding, pairing, reminders, timeline.
- Thay thế `docs/06_ui_ux_screen_flows.md` bằng phiên bản mới đồng bộ với hướng `Calm Care`, bỏ giả định mặc định về liquid glass, ưu tiên clarity / hierarchy / daily utility cho React Native.
- Cập nhật `docs/05_ui_ux_guidelines.md` và `docs/README.md` để liên kết đầy đủ chuỗi tài liệu thiết kế mới và làm rõ mobile là trọng tâm của phase tiếp theo.
- Viết `docs/12_release_scope_v1.md` để chốt scope phát hành hẹp cho `mobile + backend + web landing`, nhấn mạnh `single-player first`, `pairing as upgrade`, và phong cách trình bày theo kỷ luật `Calm Care`.
- Viết `docs/13_release_checklist_v1.md` để biến scope phát hành thành checklist triển khai theo team và release gates xuyên suốt `mobile + backend + web landing`.
- Tích hợp `get-shit-done` ở mức repo bằng `scripts/gsd.sh`, thêm npm scripts `gsd:*`, và viết `docs/14_gsd_workflow_integration.md` để map GSD vào release flow hiện tại của Em+.
- Bắt đầu phase GSD thực tế đầu tiên cho release V1 bằng packet `.planning/phases/phase-v1-mobile-activation/`, khóa boundary `single-player first`, `pairing later`, và tập trung onboarding + unpaired home alignment.
- Execute Phase 1 `v1-mobile-activation`: bỏ redirect ép pairing sau auth, mở `home` solo-first, thêm local `important date` flow trong `add-memory`, phản chiếu countdown/suggestion trên `home`, thêm reminder-setup card ở `notifications`, mở `timeline` preview cho user solo, và cập nhật phase context + mobile release checklist để phản ánh trạng thái `done / defer`.
- Khởi tạo Phase 2 `v1-pairing-upgrade`: tạo packet `.planning/phases/phase-v1-pairing-upgrade/` để refactor pairing screen theo logic `solo-first, pair later`, tập trung messaging, CTA hierarchy, và framing pairing như một lớp nâng cấp chứ không phải cổng vào sản phẩm.
- Execute chính của Phase 2 `v1-pairing-upgrade`: audit pairing screen, viết lại copy theo hướng `you already started correctly`, thêm explainer block trước mechanics, làm rõ hierarchy `share code` là đường chính, hạ nhánh `join with code` xuống vai trò phụ, và cập nhật mobile docs / release checklist theo trạng thái mới.
- Khởi tạo và execute Phase 3 `v1-auth-onboarding-polish`: audit auth surfaces, refactor `login` và `register` theo hướng message-first / solo-first, làm `verify-otp` gọn hơn như bước cuối trước first value, và chốt rõ rằng V1 hiện dùng `register -> verify-otp -> home` như onboarding entry path thực tế.
- Đồng bộ web landing với thesis `use alone first, pair later`, cập nhật hero / feature / CTA copy để web và mobile nói cùng một câu chuyện, đồng thời verify lại `typecheck:web` và `build:web`.
- Thực hiện backend release pass cho `dashboard/home`: bỏ hard gate khi user chưa ghép đôi, sửa payload từ `dailySuggestion` sang `careAdvice` để khớp mobile/openapi contract, thêm API test cho nhánh solo, và làm ổn định test harness bằng email duy nhất cho từng test case.
- Bổ sung `PUT /v1/timeline/memories/:id` cho backend timeline flow, tái sử dụng validator của memory create, cập nhật OpenAPI route tương ứng, và mở rộng API test để đi qua chuỗi `create -> update -> list` cho mục kỷ niệm.
- Bổ sung backend CRUD cho `partner notes / preferences` theo hướng `solo-first`: thêm model `partner_notes` với `couple_id` tùy chọn, route `/v1/partner-notes`, OpenAPI docs, API test cho luồng `create -> list -> update -> detail -> delete`, và cơ chế đảm bảo table tồn tại trong Postgres store để local/test không fail vì lệch migration.
- Bổ sung core reminder notification flow ở backend: thêm `dispatchCoreReminders()` quét milestone hệ thống và anniversary theo `notifySettings`, phát notification với id quyết định để tránh gửi trùng, mở route `POST /v1/system/dispatch-reminders`, và thêm API test xác nhận luồng dispatch là idempotent.
- Thêm smoke test release-level cho backend, đi qua chuỗi `register -> login -> users/push-token -> couples/status -> generate invite -> join -> couples/status -> dispatch reminders -> notifications`, từ đó đánh dấu checklist cho `API smoke tests cover auth, pairing status, reminder basics` và `push token registration works`.
- Hoàn tất backend dependency audit cho release gate: xác nhận `notify()` luôn tạo in-app notification trước và chỉ gửi push/email theo kiểu fire-and-forget, route `live` không nằm trong auth/home/pairing/reminder critical path, và `timeline` không bị khóa bởi `media/upload` vì `mediaUrls` chỉ là dữ liệu đầu vào còn upload MinIO là route tách biệt.
- Khởi tạo phase `v1-manual-release-qa`, thêm `docs/15_manual_release_qa_v1.md` làm checklist chạy tay cho mobile, pairing hai thiết bị, notifications, và web landing; đồng thời nối ngược checklist / mobile refactor docs sang tài liệu QA này để chuẩn bị sign-off release.
- Khởi tạo Phase 4 `v1-lookaway-style-audit`: dùng workflow GSD trong repo cùng các skill `mobile-design`, `landing-page-design`, `frontend-design`, `web-design-guidelines` để tách rõ phần nào đã là YC flow refactor và phần nào mới chỉ áp dụng một phần LookAway discipline; đồng thời tạo `docs/16_lookaway_style_audit_v1.md` để chốt thứ tự visual polish tiếp theo.
- Đối chiếu lại GSD theo upstream [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done): xác nhận local install đã tồn tại ở `~/.claude/get-shit-done`, wrapper `scripts/gsd.sh` đang bọc đúng installation này, và cập nhật Phase 4 / GSD integration notes để dùng nomenclature upstream thay vì chỉ nói chung chung là “workflow nội bộ”.
- Bắt đầu visual polish thật cho Phase 4 trên `mobile home`: làm phẳng `HomeHeader`, giảm ornament ở `HeroCard`, rút ngắn và làm yên hơn các section `QuickActions` / `UpcomingEvents`, siết spacing ngang của home screen, và verify lại bằng `bun run typecheck:mobile`.
- Tiếp tục Phase 4 với visual polish cho `pairing`: giữ nguyên mechanics nhưng rút ngắn copy, giảm density của QR card / divider / footnote / code-entry path, và xác nhận lại `bun run typecheck:mobile` để đảm bảo đây chỉ là polish chứ không làm vỡ flow.
- Tiếp tục Phase 4 với visual polish cho `notifications`: làm dịu header, giảm density của feed cards và action pill, viết lại empty state theo hướng reminder-first, làm solo reminder setup card ngắn và thực dụng hơn, và verify lại bằng `bun run typecheck:mobile`.
- Tiếp tục Phase 4 với visual polish cho `auth shell`: giảm kích thước hero animation, siết top-to-form rhythm, làm card bớt cảm giác “glass demo”, rút ngắn trust note/copy phụ, và verify lại bằng `bun run typecheck:mobile`.
- Hoàn tất landing final pass cho Phase 4: làm dịu hero preview/card treatment, siết spacing và density ở feature/scenario/CTA sections, giảm nhẹ background noise toàn trang, và verify lại bằng `bun run typecheck:web` cùng `bun run build:web`.
- Chốt quyết định theme cho release v1 theo hướng LookAway: khóa mobile app về một theme sáng duy nhất ở `theme-mode-context`, bỏ khả năng đổi sáng/tối trên màn `appearance`, và giữ cleanup triệt để các nhánh dark/light lại cho một phase dọn mã riêng sau release.
- Cleanup tiếp theo cho quyết định light-only: dọn các nhánh dark/light chết ở `auth shell`, `home`, `pairing`, `notifications`, `appearance`, và phần prose dark helper trên web để release-critical surfaces không còn chỉ “bị khóa” mà đã thực sự lean hơn về một theme sáng duy nhất.
- Bắt đầu manual release QA và cập nhật ma trận `docs/15_manual_release_qa_v1.md` theo trạng thái thực tế: phát hiện web vẫn còn dark-mode toggle/dark boot script trong shared layout nên đã gỡ bỏ, xác nhận lại web build theo hướng `solo-first` bằng source/build audit, và ghi rõ rằng case viewport hẹp trên web vẫn đang `BLOCKED` do Playwright MCP không khởi tạo được trong môi trường hiện tại vì cố tạo `/.playwright-mcp` trên root path chỉ đọc.
- Khởi tạo phase `v1-lookaway-theme-migration` để chuyển từ style audit sang migrate design-system thật: thêm `docs/17_lookaway_theme_migration_v1.md`, packet GSD mới trong `.planning/phases/phase-v1-lookaway-theme-migration/`, và cập nhật base palette/theme vars của mobile + web theo hướng cream `#FDF8F5`, terracotta / burnt sienna, typography yên hơn, và matte surfaces ít noise hơn.
- Thực hiện screen migration pass đầu tiên cho `login`: giảm hero treatment và wordmark gradient kiểu aura cũ, chuyển CTA sang solid terracotta thay vì gradient app-style, làm `GlassCard` của login matte hơn, và giữ phạm vi chỉ ở presentation layer để không ảnh hưởng logic auth.
- Tiếp tục `auth migration pass` với `register`: đưa hero/register form/chips về cùng ngôn ngữ với login, dùng lại token matte cream + terracotta mới, bỏ gradient CTA cũ, và giữ toàn bộ chỉnh sửa ở presentation layer để không ảnh hưởng flow đăng ký + OTP.
