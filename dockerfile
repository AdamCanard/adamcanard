FROM node:20-alpine AS base

USER root

WORKDIR /app
COPY package*.json ./

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM base AS production
WORKDIR /app

#RUN #npm install

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD npm start
