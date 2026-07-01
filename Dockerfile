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

CMD ["sh", "-c", "if [ -z \"$DATABASE_URL\" ] && [ -z \"$MYSQL_URL\" ]; then echo 'ERROR: DATABASE_URL is not set. On Railway: api service → Variables → add DATABASE_URL referencing MySQL.MYSQL_URL'; exit 1; fi && export DATABASE_URL=\"${DATABASE_URL:-$MYSQL_URL}\" && echo 'Running database migrations...' && pnpm run start:prod"]
