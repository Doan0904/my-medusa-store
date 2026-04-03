# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
# Cài đặt các thư viện hệ thống cần thiết cho các package native
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json* ./
# Cài đặt toàn bộ dependencies bao gồm cả devDependencies để build
RUN npm install
COPY . .
# Thực hiện biên dịch dự án Medusa v2 (Tạo ra thư mục .medusa)
RUN npm run build


# Production stage
FROM node:20-alpine
WORKDIR /app
# Thiết lập môi trường sản xuất
ENV NODE_ENV=production
# Chỉ copy những file thực thi và cấu hình cần thiết từ builder
COPY --from=builder /app/package.json ./

COPY --from=builder /app/package-lock.json* ./

# Thư mục .medusa chứa kết quả build của Medusa v2
COPY --from=builder /app/.medusa ./.medusa

COPY --from=builder /app/medusa-config.ts ./

# 👉 THÊM DÒNG NÀY ĐỂ FIX LỖI TS2307:
COPY --from=builder /app/tsconfig.json ./

RUN ln -s .medusa/server/public public

COPY --from=builder /app/node_modules ./node_modules
# Cài đặt chỉ các thư viện production để image nhẹ và bảo mật
# RUN npm install --omit=dev
EXPOSE 9000
# Chạy migrate trước khi khởi động server Medusa v2
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
