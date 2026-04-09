import { AbstractFulfillmentProviderService } from "@medusajs/framework/utils"
import { FulfillmentOption } from "@medusajs/framework/types"

class MyFulfillmentProviderService extends AbstractFulfillmentProviderService {
  // Định danh này sẽ hiển thị là id của provider
  static identifier = "my-fulfillment"

  constructor() {
    super()
    // Khởi tạo các API client kết nối GHTK, Viettel Post ở đây sau
  }

  // Khai báo các gói giao hàng bạn muốn hiển thị trên Admin
  async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
    return [
      {
        id: "giao-sieu-nhanh",
        name: "Giao Siêu Nhanh",
      },
      {
        id: "giao-tieu-chuan",
        name: "Giao Tiêu Chuẩn",
      }
    ]
  }

  async validateFulfillmentData(optionData: any, data: any, context: any): Promise<any> {
    return data;
  }

  async validateOption(data: any): Promise<boolean> {
    return true;
  }

  async canCalculate(data: any): Promise<boolean> {
    // Trả về false nếu giá là cố định (Fixed), trả về true nếu muốn tính toán (Calculated)
    return false; 
  }

  async calculatePrice(optionData: any, data: any, context: any): Promise<any> {
    return { calculated_amount: 0, is_calculated_price_tax_inclusive: false };
  }

  async createFulfillment(data: any, items: any, order: any, fulfillment: any): Promise<any> {
    return { data: {} };
  }

  async cancelFulfillment(data: any): Promise<any> {
    return {};
  }
}

export default MyFulfillmentProviderService
