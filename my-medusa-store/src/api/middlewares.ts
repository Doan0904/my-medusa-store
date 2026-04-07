import { defineMiddlewares } from "@medusajs/medusa"
import express from "express"

export default defineMiddlewares({
  routes: [
    {
      // Bắt mọi request gọi vào đường dẫn bắt đầu bằng /uploads
      matcher: "/uploads/*",
      // Dùng express.static để lấy file từ ổ cứng trả về cho người dùng
      middlewares: [
        express.static(process.cwd())
      ],
    },
  ],
})
