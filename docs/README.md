# 📚 Em Plus - Project Documentation (Agentic SDLC)

Chào mừng bạn đến với hệ thống tài liệu chính thức của dự án **Em Plus**. Tài liệu này được biên soạn theo quy trình **Agentic SDLC**, đảm bảo tính chuyên nghiệp, dễ bảo trì và tối ưu cho cả con người lẫn AI Agent.

## 🗂 Cấu trúc tài liệu

| Thứ tự | Tài liệu | Mô tả | Trạng thái |
| :--- | :--- | :--- | :--- |
| 01 | [Product Requirements Document (PRD)](./01_prd_and_requirements.md) | Mục tiêu dự án, đối tượng người dùng, tính năng cốt lõi. | 📝 Drafting |
| 02 | [System Architecture](./02_architecture_design.md) | Kiến trúc Monorepo, Tech Stack, sơ đồ luồng dữ liệu. | ⏳ Pending |
| 03 | [Database Schema](./03_database_and_caching.md) | Thiết kế Postgres, Redis và quan hệ thực thể. | ⏳ Pending |
| 04 | [API Specifications](./04_api_specifications.md) | Chi tiết các RESTful API, Authentication, Error Codes. | ✅ Done |
| 05 | [UI/UX Style Guide](./05_ui_ux_guidelines.md) | Quy chuẩn thiết kế Mobile & Web, Color Palette, Typography. | ✅ Done |
| 06 | [UI/UX Screen Flows](./06_ui_ux_screen_flows.md) | Luồng màn hình mobile theo direction Calm Care, ưu tiên React Native/Expo. | ✅ Done |
| 07 | [Infrastructure & Ops](./06_deployment_and_infrastructure.md) | Hướng dẫn Docker, K8s, Logging (Loki/Grafana). | ✅ Done |
| 08 | [Functional Specifications](./07_functional_specifications.md) | Đặc tả chi tiết Logic và Action của từng module. | ✅ Done |
| 09 | [Core Engines Logic](./08_core_engines_logic.md) | Thuật toán Anniversary và Emotional Care. | ✅ Done |
| 10 | [End-to-End Flow Specifications](./09_end_to_end_flow_specifications.md) | Đặc tả luồng dữ liệu từ App ➔ Backend ➔ Database. | ✅ Done |
| 11 | [Mobile Calm Care Refactor](./11_mobile_calm_care_refactor.md) | Checklist mobile-first để refactor onboarding, pairing, reminders, timeline. | ✅ Done |
| 12 | [Release Scope V1](./12_release_scope_v1.md) | Scope phát hành hẹp cho mobile, backend, web landing theo trục YC + Calm Care. | ✅ Done |
| 13 | [Release Checklist V1](./13_release_checklist_v1.md) | Checklist triển khai và release gate cho mobile, backend, web landing. | ✅ Done |
| 14 | [GSD Workflow Integration](./14_gsd_workflow_integration.md) | Cách dùng get-shit-done trong repo Em+, map vào release scope và phase execution. | ✅ Done |
| 15 | [Manual Release QA V1](./15_manual_release_qa_v1.md) | Checklist manual QA cho mobile, pairing hai thiết bị, notifications, và web landing trước release. | ✅ Done |
| 16 | [LookAway Style Audit V1](./16_lookaway_style_audit_v1.md) | Audit tách riêng phần YC flow refactor khỏi phần style discipline lấy cảm hứng từ LookAway, đồng thời chốt thứ tự visual polish tiếp theo. | ✅ Done |
| 17 | [LookAway Theme Migration V1](./17_lookaway_theme_migration_v1.md) | Đặc tả migrate design-system nền của Em+ sang cream base, terracotta accent, quiet typography, và matte surfaces theo phân tích LookAway mới. | ✅ Done |

## 🛠 Tech Stack Overview
- **Backend:** Node.js (Hono Framework), Bun Runtime, Postgres, Redis.
- **Mobile:** React Native (Expo), NativeWind (Tailwind CSS).
- **Infrastructure:** Docker Compose, Kubernetes, Grafana Faro, Loki.

## 🤖 AI Agent Workflow
Mọi thay đổi trong dự án này phải tuân thủ quy tắc tại [GEMINI.md](../GEMINI.md).
- **Branching:** `feature/*`, `bugfix/*`, `refactor/*`.
- **Commits:** Conventional Commits.
- **Validation:** Pre-commit linting & type-checking via Bun.

---
*Tài liệu này được quản lý tự động và cập nhật liên tục bởi Gemini CLI.*
