# syntax=docker.io/docker/dockerfile:1

FROM node:22.23.4-alpine AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Define build-time arguments (must match Coolify vars)
ARG API_BASE_URL
ARG API_TOKEN
ARG NEXT_PUBLIC_HOST

# Expose them to Next.js build as environment variables
ENV API_BASE_URL=$API_BASE_URL
ENV API_TOKEN=$API_TOKEN
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST

RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# You can still override this at runtime
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
