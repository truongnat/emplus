FROM oven/bun:1.2.22-alpine

WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
COPY api/package.json api/package.json
COPY mobile/package.json mobile/package.json

RUN bun install --frozen-lockfile --production

COPY api ./api

WORKDIR /app/api

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "src/index.ts"]
