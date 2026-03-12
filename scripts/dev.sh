#!/usr/bin/env bash
set -euo pipefail

# Màu sắc cho log
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Khởi động Em Plus Development...${NC}"

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}🛑 Đang dừng tất cả services...${NC}"
    kill 0 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

# 1. Kiểm tra Docker Infrastructure
echo -e "${YELLOW}🐳 Kiểm tra Infrastructure (Docker)...${NC}"
if command -v docker &> /dev/null; then
    docker compose up -d postgres redis minio minio-init mailpit 2>/dev/null || true
    echo -e "${GREEN}✅ Docker services ready${NC}"
else
    echo -e "${RED}⚠️  Docker not found, skipping infrastructure...${NC}"
fi

# 2. Kiểm tra file .env của API
if [ ! -f "api/.env" ]; then
    echo -e "${YELLOW}⚠️  Không tìm thấy api/.env, đang tạo từ .env.example...${NC}"
    cp api/.env.example api/.env 2>/dev/null || true
fi

# 3. Chạy Database Migration
echo -e "${YELLOW}🔄 Database Migration...${NC}"
if [ -f "api/.env" ]; then
    cd api && bun run db:migrate 2>/dev/null || echo -e "${YELLOW}⚠️  Migration skipped${NC}"
    cd ..
fi

# 4. Hiển thị bảng cổng dịch vụ
if [ -f "./scripts/ports.sh" ]; then
    bash ./scripts/ports.sh
fi

# 5. Khởi động services
echo -e "${GREEN}🚀 Starting services...${NC}"
echo ""

# Start API in background
echo -e "${BLUE}📡 Starting API Server...${NC}"
bun run --cwd api dev &
API_PID=$!

# Wait for API to start
sleep 3

# Start Design Builder in background
echo -e "${GREEN}🎨 Starting Design Builder...${NC}"
bun run --cwd design-builder dev &
BUILDER_PID=$!

# Wait and show status
echo ""
echo -e "${GREEN}✅ All services started!${NC}"
echo ""
echo -e "${BLUE}📍 Services:${NC}"
echo -e "   ${GREEN}●${NC} API Server:     http://localhost:3000"
echo -e "   ${GREEN}●${NC} Swagger UI:     http://localhost:3000/v1/docs"
echo -e "   ${GREEN}●${NC} Design Builder: http://localhost:3001"
echo ""
echo -e "${YELLOW}💡 Tip: Press Ctrl+C to stop all services${NC}"
echo ""

# Wait for all background processes
wait
