# Pet Tracker Hub API — deploy from monorepo root (Railway / Docker).
FROM node:20-alpine

RUN apk add --no-cache openssl python3 make g++

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --filter api... --ignore-scripts

COPY apps/api ./apps/api

RUN pnpm --filter api exec prisma generate
RUN pnpm --filter api build

WORKDIR /app/apps/api

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && node dist/main.js"]
