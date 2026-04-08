# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
# Cài đặt các thư viện hệ thống cần thiết cho các package native
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
# Cài đặt toàn bộ dependencies bao gồm cả devDependencies để build
RUN npm install

# ✅ SỬA DÒNG NÀY: Copy toàn bộ source code hiện tại vào /app
COPY . .

# Thực hiện biên dịch dự án Medusa v2 (Tạo ra thư mục .medusa)
RUN MEDUSA_BACKEND_URL=https://zang-finance-app.app.lilichilly.com npm run build


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

# Cần thiết cho production
COPY --from=builder /app/tsconfig.json ./

# ✅ THÊM DÒNG NÀY ĐỂ COPY CẢ THƯ MỤC static (Nơi lưu ảnh mà chúng ta đã setup trước đó)
# Dùng COPY . static để tạo sẵn thư mục nếu nó chưa tồn tại, tránh lỗi Docker
COPY --from=builder /app/static ./static

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 9000

# Chạy migrate trước khi khởi động server Medusa v2
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
