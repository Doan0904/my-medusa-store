# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Cài đặt thư viện cần thiết
COPY package.json package-lock.json* ./
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build ứng dụng Next.js
# Bạn có thể truyền thẳng biến môi trường vào đây giống như lúc sửa lỗi Admin
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://zang-finance-app.app.lilichilly.com
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL

RUN npm run build

# --- Production stage ---
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy các thư mục và file kết quả build từ stage trên
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 8000

# Khởi động Next.js
CMD ["npm", "run", "start"]
