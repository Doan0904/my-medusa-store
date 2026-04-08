import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const tags = searchParams.get("tags") as string
  const secret = searchParams.get("secret")

  // 1. Kiểm tra mã bảo mật
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }

  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 })
  }

  // 2. Xử lý xóa cache theo luồng Next.js
  const tagsArray = tags.split(",")
  await Promise.all(
    tagsArray.map(async (tag) => {
      if (tag === "products") {
        // Xóa cache trang danh sách cửa hàng
        revalidatePath("/[countryCode]/(main)/store", "page")
        // Xóa cache trang chi tiết sản phẩm
        revalidatePath("/[countryCode]/(main)/products/[handle]", "page")
        // Xóa cache trang chủ (nếu có show sản phẩm nổi bật)
        revalidatePath("/[countryCode]/(main)", "page")
      }
    })
  )
  
  return NextResponse.json({ message: "Revalidated successfully", now: Date.now() }, { status: 200 })
}
