# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.medusa ./.medusa

RUN cd .medusa/server && npm install

EXPOSE 9000

CMD ["sh", "-c", "cd /app/.medusa/server && npx medusa db:migrate && npx medusa start"]
