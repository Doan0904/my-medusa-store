import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export default async function productUpdatedHandler({
  event: { data },
}: SubscriberArgs<{ id: string }>) {


console.log(`[WEBHOOK] Bắt đầu xử lý thay đổi cho sản phẩm ID: ${data.id}`);
  const storefrontUrl = process.env.STOREFRONT_URL
  const secret = process.env.REVALIDATE_SECRET

  if (!storefrontUrl || !secret) {
    console.warn("Bỏ qua Revalidate: Chưa cấu hình STOREFRONT_URL hoặc REVALIDATE_SECRET")
    return
  }

  // Gắn URL cùng tham số tags và secret để gọi sang Storefront
  const url = `${storefrontUrl}/api/revalidate?tags=products&secret=${secret}`

  try {
    const response = await fetch(url)
    if (response.ok) {
      console.log(`[Cache Revalidated] Thành công cho sản phẩm ID: ${data.id}`)
    } else {
      console.error("[Cache Revalidate] Thất bại với HTTP Status:", response.status)
    }
  } catch (error) {
    console.error("[Cache Revalidate] Lỗi khi gọi sang frontend:", error)
  }
}

export const config: SubscriberConfig = {
  // Lắng nghe các event liên quan đến sản phẩm (bao gồm cả cập nhật ảnh)
  event: ["product.updated", "product.created", "product.deleted"],
}
