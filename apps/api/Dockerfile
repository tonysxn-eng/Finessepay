# FinessePay API — build from the monorepo root:
#   docker build -f apps/api/Dockerfile .
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/stellar/package.json packages/stellar/package.json
RUN pnpm install --frozen-lockfile --filter @finessepay/api...

FROM deps AS build
COPY tsconfig.base.json ./
COPY packages/shared packages/shared
COPY packages/stellar packages/stellar
COPY apps/api apps/api
RUN pnpm --filter @finessepay/shared build \
 && pnpm --filter @finessepay/stellar build \
 && pnpm --filter @finessepay/api build

FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
WORKDIR /app
ENV NODE_ENV=production
ENV API_HOST=0.0.0.0
ENV API_PORT=3001
COPY --from=build /app /app
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:3001/health || exit 1
CMD ["node", "apps/api/dist/index.js"]
