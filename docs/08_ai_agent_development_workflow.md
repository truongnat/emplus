# AI-Augmented Development Workflow (Agentic Skills)

Tài liệu này định nghĩa quy trình **AI-Driven Development**, biến đội ngũ (hoặc một Developer duy nhất) kết hợp cùng AI Agents (như Cursor, Claude Code, Vercel v0) thành một "Siêu Team". Nó ứng dụng hệ sinh thái **`skills.sh`** và **`antigravity-awesome-skills`**.

---

## 1. KHÁI NIỆM & VAI TRÒ CỦA "SKILLS" TRONG DỰ ÁN

Thay vì phải liên tục bối cảnh hóa cho AI mỗi khi prompt (VD: "Tôi đang dùng React Native với Expo, đừng dùng cách cũ, hãy dùng hook này..."), chúng ta cài đặt sẵn các **Agent Skills** (các chuyên gia ảo) vào Workspace của dự án.
AI Agent sẽ tự động nạp những kỹ năng này làm Context nền trước khi sinh mã nguồn.

### 1.1 Vị trí cài đặt
Các Agent Skills được clone trực tiếp vào thư mục gốc của dự án:
```bash
# Repo chứa hơn 900+ skills (Bao gồm cả official skills từ Vercel/Anthropic/skills.sh)
./emplus/.agent/skills/
```

### 1.2 Danh mục Kĩ Năng Trọng Tâm Áp Dụng Cho Em Plus
Dựa vào Tech Stack và System Architecture, dự án sẽ ép buộc các AI (Cursor/Claude) tuân thủ nghiêm ngặt các bộ kỹ năng sau:

1. **`react-native-best-practices`**:
   - Chỉ sử dụng Function Component và Hooks.
   - Thư viện routing chuẩn: `expo-router`.
   - Animation: Ép dùng `react-native-reanimated` thay vì API Animated cổ điển, cực kỳ quan trọng cho hiệu ứng **Liquid Glass Morphism**.
2. **`nestjs-best-practices`**:
   - Sử dụng Dependency Injection chuẩn.
   - Viết Guard thay vì validate Auth trong Controller.
3. **`ui-ux-pro-max` / `frontend-design` (skills.sh)**:
   - Các prompt liên quan đến giao diện (đặc biệt CSS/Tailwind của trang Wedding Web) phải có tính thẩm mỹ "Pro Max", mượt mà, typography chuẩn chỉ và mobile-first.
4. **`postgres-table-design`**:
   - Ép chuẩn RDBMS: Tên bảng phải là số nhiều, dùng `UUID` thay vì auto-increment ID, dùng `JSONB` cho Cấu hình động.

---

## 2. QUY TRÌNH CODE THEO BUNDLES (Starter Packs)

Để quản lý luồng phát triển khổng lồ của Em Plus thành 4 Phân đoạn (Foundation -> Emotion -> Experience -> Wedding), chúng ta chia ra các **"AI Bundles Workflows"**.

### Kịch bản (Workflow) làm 1 Feature: Tự động hóa QA
Giả sử ta code tính năng *Ghi kỷ niệm mới (Timeline POST API)*:
1. **Developer:** Mở Terminal: `claude "Implement POST /timeline/memories API using nestjs-best-practices. Create DTO, Service and Unit test"`.
2. **AI Action:** 
   - Đọc skill `nestjs-best-practices`.
   - Đọc DB Schema tại `docs/03_database_schema_and_caching.md`.
   - Viết code chèn thẳng vào code base.
3. **Developer:** Gõ `claude "Use systematic-debugging and e2e-testing-patterns from awesome-skills to write an E2E test for the API"`.
4. **AI Action:** Tự động sinh test file `.e2e-spec.ts` mà không mắc các lỗi syntax cơ bản của Jest/Supertest.

---

## 3. CHECKLIST DÀNH CHO SA / PM KHI CHUẨN BỊ MỞ RỘNG (SCALING)

Khi thêm người vào dự án hoặc onboard tính năng mới, chỉ cần chạy các chuỗi lệnh Workflow:

- **Audit Security Phase 1:** Call prompt -> "Act as a Senior Security Engineer (skill: vulnerability-scanner). Review the codebase of Auth Module."
- **Tối ưu Chi Phí AWS (Phase 4 Wedding):** Call prompt -> "Use `azure-cost-optimization` & `aws-serverless` skills to analyze the wedding site generation AWS S3 upload flow."

---
## TỔNG KẾT

Sự kết hợp giữa:
- **Model Context Protocol (MCP)**: Giúp AI tự query DB, lấy Github Issue.
- **Agent Skills** từ `skills.sh` & `awesome-skills`: Nhét kinh nghiệm của Senior engineer vào AI.

Dự án Em Plus không chỉ được Planning như một sản phẩm phần mềm bình thường, mà được thiết kế ngay từ đầu như một **AI-Native Workspace**. Team Dev sẽ biến thành những người **"Duyệt Code" (Code Reviewers)** thay vì Người gõ code (Coders).
