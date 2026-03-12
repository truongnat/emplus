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
| 06 | [Infrastructure & Ops](./06_deployment_and_infrastructure.md) | Hướng dẫn Docker, K8s, Logging (Loki/Grafana). | ✅ Done |
| 07 | [Functional Specifications](./07_functional_specifications.md) | Đặc tả chi tiết Logic và Action của từng module. | ✅ Done |
| 08 | [Core Engines Logic](./08_core_engines_logic.md) | Thuật toán Anniversary và Emotional Care. | ✅ Done |
| 09 | [End-to-End Flow Specifications](./09_end_to_end_flow_specifications.md) | Đặc tả luồng dữ liệu từ App ➔ Backend ➔ Database. | ✅ Done |

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
