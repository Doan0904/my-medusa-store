import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // THÊM DÒNG NÀY VÀO ĐÂY
    redisUrl: process.env.REDIS_URL,
databaseDriverOptions: process.env.NODE_ENV === 'production' 
      ? { 
          connection: { 
            ssl: { rejectUnauthorized: false } 
          } 
        } 
      : {}, 
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors: process.env.AUTH_CORS || "http://localhost:7001",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
