import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const safeBackendUrl = process.env.MEDUSA_BACKEND_URL 
  ? process.env.MEDUSA_BACKEND_URL.replace(/\/$/, '') 
  : "https://zang-finance-app.app.lilichilly.com";

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
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
    disable: false, 
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  },
  modules: [
    // 1. MODULE FILE CỦA BẠN (Giữ nguyên)
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-local",
            id: "local",
            options: {
              upload_dir: "static/uploads",
              backend_url: `${safeBackendUrl}/static/uploads`,
            },
          },
        ],
      },
    },
    // 2. MODULE THANH TOÁN (MỚI CHUẨN V2)
    {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            },
          }
        ]
      }
    }
  ]
})

