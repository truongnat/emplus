# Documentation Strategy: Feature-Centric Wiki

## Overview
Dự án `docs-wiki` chuyển từ mô hình "Tóm tắt code theo file" sang "Đặc tả hệ thống theo tính năng" (Feature-Centric). Mục tiêu là giúp nhà phát triển hiểu được luồng nghiệp vụ xuyên suốt từ UI đến Database.

## Feature Clustering (Gom cụm tính năng)
Thay vì phân tích đơn lẻ từng file, AI Agent/Developer phải xác định các "Feature Clusters":
- Gom các file có chung từ khóa nghiệp vụ (ví dụ: `auth`, `teacher`, `order`).
- Liên kết Entry point của Frontend (UI Screen/Action) với Controller và Service của Backend.

## Layer Tracing (Truy vết xuyên tầng)
Mỗi tài liệu tính năng phải thể hiện rõ luồng dữ liệu qua 4 tầng:
1. **UI Layer:** React/Next.js/React Native Components.
2. **Gateway Layer:** API Controllers/Routes (Hono, NestJS).
3. **Business Layer:** Services/UseCases xử lý nghiệp vụ chính.
4. **Data Layer:** DTOs, Entities, và Database Schema.

## Feature Specification Template
Sử dụng template tại `.templates/feature-spec.md` cho mọi tính năng mới hoặc khi cập nhật tài liệu cũ.

### Các thành phần bắt buộc:
1. **Feature Overview:** "Cái gì" và "Tại sao".
2. **Business Constraints:** Các quy tắc nghiệp vụ trích xuất từ code (Validation, Permissions, Rate limits).
3. **Data Flow (PlantUML Sequence):** Sơ đồ Sequence thể hiện tương tác giữa các thành phần.
4. **Architecture Mapping:** Bảng liệt kê File/Symbol và trách nhiệm của chúng.

## PlantUML Guidelines
- Sử dụng cú pháp `sequenceDiagram` (hoặc PlantUML `@startuml ... @enduml`).
- Chia nhỏ sơ đồ nếu tính năng quá phức tạp (ví dụ: tách Main Flow và Error Flow).
- Đảm bảo label rõ ràng, sử dụng `\n` để ngắt dòng nếu text quá dài.

## DX Workflow
1. **Discovery:** Quét routes và folder structure để tìm cụm tính năng.
2. **Analysis:** Đọc code trong cụm để tìm Business Constraints và Data Flow.
3. **Generation:** Sử dụng template để tạo file Markdown trong thư mục `features/`.
4. **Validation:** Kiểm tra tính chính xác của sơ đồ và các liên kết file.
