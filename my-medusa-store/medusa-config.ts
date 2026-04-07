import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    // SỬA ĐOẠN NÀY: Ép buộc tắt SSL để khớp với cấu hình Database trên CapRover
    databaseDriverOptions: {
      connection: {
        ssl: false
      }
    },
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors: process.env.AUTH_CORS || "http://localhost:7001",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
admin: {
    // Ép backend phục vụ admin dashboard 
    disable: false, 
    // Trỏ về đúng domain của bạn [cite: 32]
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  },
// THÊM MODULE CHO MINIO
modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3",
            id: "s3",
            options: {
              // 👉 SỬA LẠI ĐÚNG LINK API CỦA BẠN:
              file_url: "https://zang-minio-api.app.lilichilly.com/medusa-media",
              endpoint: "https://zang-minio-api.app.lilichilly.com",
              
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              bucket: "medusa-media", // Đảm bảo bạn đã tạo bucket tên này trong MinIO
              region: "us-east-1",
              force_path_style: true,
	additional_client_config: {
      forcePathStyle: true,
    },
            },
          },
        ],
      },
    },
  ]

})
