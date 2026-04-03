# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Production stage
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

RUN npm prune --omit=dev

EXPOSE 9000

CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
