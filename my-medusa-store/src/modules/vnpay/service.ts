import { 
  AbstractPaymentProvider, 
  PaymentSessionStatus 
} from "@medusajs/framework/utils"
import crypto from "crypto"
import qs from "qs"

class VNPayProviderService extends AbstractPaymentProvider<any> {
  static identifier = "vnpay"

  protected readonly config_: any

  constructor(container: any, config: any) {
    super(container, config)
    this.config_ = config
  }

  async initiatePayment(input: any): Promise<any> {
    // Trong Medusa v2, payload được bọc trong object input
    const { amount, currency_code, resource_id, customer } = input
    
    // Logic tạo URL VNPay
    const vnpUrl = this.buildVnpayUrl({
      amount,
      orderId: resource_id,
      ipAddr: "127.0.0.1", // Nên lấy IP thực tế của khách hàng (có thể lấy từ req)
    })

    return {
      // Medusa v2 yêu cầu id cho session khởi tạo
      id: "vnpay_" + Date.now(), 
      session_data: {
        vnp_url: vnpUrl,
      },
    }
  }

  private buildVnpayUrl({ amount, orderId, ipAddr }: any) {
    const date = new Date()
    const createDate = this.formatDate(date)
    
    let vnp_Params: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.config_.vnp_TmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: 'Thanh toan don hang: ' + orderId,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100, // VNPay tính theo đơn vị đồng
      vnp_ReturnUrl: this.config_.return_url,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    }

    // Sắp xếp params theo alphabet (Bắt buộc)
    vnp_Params = Object.keys(vnp_Params).sort().reduce((obj: any, key) => {
      obj[key] = vnp_Params[key];
      return obj;
    }, {});

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", this.config_.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
    
    vnp_Params['vnp_SecureHash'] = signed;
    
    return this.config_.vnp_Url + '?' + qs.stringify(vnp_Params, { encode: false });
  }

  private formatDate(date: Date) {
    // Hàm format yyyyMMddHHmmss
    return date.toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-|:/g, '');
  }

  // =========================================================================
  // CÁC METHOD BẮT BUỘC (ABSTRACT) CỦA MEDUSA V2 ĐỂ PASS QUÁ TRÌNH BUILD TYPES
  // Bạn có thể update logic tương ứng vào các block này khi xử lý IPN/Webhook
  // =========================================================================

  async authorizePayment(input: any): Promise<any> {
    return { data: input.data, status: PaymentSessionStatus.AUTHORIZED }
  }

  async cancelPayment(input: any): Promise<any> {
    return { data: input.data }
  }

  async capturePayment(input: any): Promise<any> {
    return { data: input.data }
  }

  async deletePayment(input: any): Promise<any> {
    return { data: input.data }
  }

  async refundPayment(input: any): Promise<any> {
    return { data: input.data }
  }

  async getPaymentStatus(input: any): Promise<any> {
    return PaymentSessionStatus.PENDING
  }

  async updatePayment(input: any): Promise<any> {
    return { data: input.data }
  }

  async getWebhookActionAndData(payload: any): Promise<any> {
    return { action: "not_supported" }
  }
}

export default VNPayProviderService
