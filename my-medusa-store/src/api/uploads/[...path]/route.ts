import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import path from "path"
import fs from "fs"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // 1. Lấy tên file từ URL
    const pathParam = req.params.path;
    const filePath = Array.isArray(pathParam) ? pathParam.join("/") : pathParam;
    
    // 2. Trỏ đúng vào thư mục /uploads trên ổ cứng vật lý của CapRover
    const fullPath = path.resolve(process.cwd(), "uploads", filePath);

    // 3. Kiểm tra xem file có tồn tại không
    if (!fs.existsSync(fullPath)) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    // 4. Bưng tấm ảnh trả về cho trình duyệt
    res.sendFile(fullPath);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
