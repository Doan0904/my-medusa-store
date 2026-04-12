import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import crypto from "crypto"
import qs from "qs"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  let vnp_Params = req.query as any
  const secureHash = vnp_Params["vnp_SecureHash"]

  // Xóa mã hash để tính toán lại chữ ký
  delete vnp_Params["vnp_SecureHash"]
  delete vnp_Params["vnp_SecureHashType"]

  // 1. Sắp xếp lại params (như lúc tạo URL)
  vnp_Params = Object.keys(vnp_Params).sort().reduce((obj: any, key: string) => {
    obj[key] = vnp_Params[key]
    return obj
  }, {})

  // 2. Kiểm tra chữ ký
  const secretKey = process.env.VNP_HASH_SECRET || ""
  const signData = qs.stringify(vnp_Params, { encode: false })
  const hmac = crypto.createHmac("sha512", secretKey)
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex")

  if (secureHash === signed) {
    const orderId = vnp_Params["vnp_TxnRef"]
    const responseCode = vnp_Params["vnp_ResponseCode"]

    if (responseCode === "00") {
      // THANH TOÁN THÀNH CÔNG
      // Tại đây bạn sử dụng Medusa Workflow để:
      // - Capture thanh toán
      // - Gửi email xác nhận đơn hàng
      console.log(`Đơn hàng ${orderId} đã thanh toán thành công qua IPN`)
    }

    // Trả về kết quả cho VNPay theo đúng định dạng tài liệu yêu cầu
    res.status(200).json({ RspCode: "00", Message: "Confirm success" })
  } else {
    // Sai chữ ký (Có thể có kẻ gian can thiệp dữ liệu)
    res.status(200).json({ RspCode: "97", Message: "Invalid signature" })
  }
}
