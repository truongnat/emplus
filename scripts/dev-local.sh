#!/usr/bin/env bash
set -euo pipefail

# Màu sắc cho log
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Khởi động môi trường Em Plus Local...${NC}"

# 1. Khởi động Docker Infrastructure
echo -e "${YELLOW}🐳 Đang kiểm tra Infrastructure (Docker)...${NC}"
docker compose up -d postgres redis minio minio-init mailpit

# 2. Kiểm tra file .env của API
if [ ! -f "api/.env" ]; then
    echo -e "${YELLOW}⚠️  Không tìm thấy api/.env, đang tạo từ .env.example...${NC}"
    cp api/.env.example api/.env
fi

# 3. Chạy Database Migration (nếu cần)
echo -e "${YELLOW}🔄 Đang kiểm tra Database Migration...${NC}"
cd api && bun run db:migrate && cd ..

# 4. Hiển thị bảng cổng dịch vụ
bash ./scripts/ports.sh

# 5. Khởi động Backend API
echo -e "${GREEN}✨ Backend API đang khởi động...${NC}"
echo -e "${BLUE}💡 Tip: Bạn có thể chạy Mobile manual bằng lệnh: cd mobile && bun dev${NC}"
echo ""

exec bun run --cwd api dev
