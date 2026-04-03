# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# SỬA ĐƯỜNG DẪN: Lấy file từ đúng thư mục con của Github
COPY my-medusa-store-storefront/package.json my-medusa-store-storefront/package-lock.json* ./
RUN npm install

# SỬA ĐƯỜNG DẪN: Copy toàn bộ code frontend vào thư mục /app
COPY my-medusa-store-storefront/ .

# Build ứng dụng Next.js kèm biến môi trường
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://zang-finance-app.app.lilichilly.com
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL

# Thêm biến môi trường frontend
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_1a29faa7ed5f0458338f918edb747d4300ea85e091fa70bf484549947d3ff38d
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

RUN npm run build

# --- Production stage ---
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Lấy các file đã build xong từ bước trên
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 8000

# Khởi động Next.js
CMD ["npm", "run", "start"]
