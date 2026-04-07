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
// THÊM MODULE CHO BDD
modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-local",
            id: "local",
            options: {
              // Thư mục chứa ảnh (Medusa sẽ tự tạo thư mục này trong source code)
              upload_dir: "uploads",
              
              // Để Medusa biết đường tạo link ảnh public trả về cho frontend
              backend_url: process.env.MEDUSA_BACKEND_URL || "https://zang-finance-app.app.lilichilly.com",
            },
          },
        ],
      },
    },
  ]
})
