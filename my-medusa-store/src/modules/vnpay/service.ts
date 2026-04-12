import { 
  AbstractPaymentProcessor, 
  PaymentProcessorContext, 
  PaymentProcessorSessionResponse, 
  PaymentSessionStatus 
} from "@medusajs/framework/utils"
import crypto from "crypto"
import qs from "qs"

class VNPayProviderService extends AbstractPaymentProcessor {
  static identifier = "vnpay"

  protected readonly config_: any

  constructor(container, config) {
    super(container, config)
    this.config_ = config
  }

  async initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorSessionResponse> {
    const { amount, currency_code, resource_id, customer } = context
    
    // Logic tạo URL VNPay
    const vnpUrl = this.buildVnpayUrl({
      amount,
      orderId: resource_id,
      ipAddr: "127.0.0.1", // Nên lấy IP thực tế của khách hàng
    })

    return {
      session_data: {
        vnp_url: vnpUrl,
      },
    }
  }

  private buildVnpayUrl({ amount, orderId, ipAddr }) {
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
      vnp_Amount: amount * 100, // VNPay tính theo đơn vị đồng, không phải decimal
      vnp_ReturnUrl: this.config_.return_url,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    }

    // Sắp xếp params theo alphabet (Bắt buộc)
    vnp_Params = Object.keys(vnp_Params).sort().reduce((obj, key) => {
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

  // Các hàm khác như authorizePayment, getPaymentStatus... bạn có thể để trả về mặc định cho bước đầu
  async getPaymentStatus(data) { return PaymentSessionStatus.PENDING }
}

export default VNPayProviderService
