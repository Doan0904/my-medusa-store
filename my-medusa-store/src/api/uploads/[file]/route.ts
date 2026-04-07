import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import path from "path"
import fs from "fs"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // 1. Lấy tên file từ URL (vd: Code_Generated_Image%20(3).png)
    const fileName = req.params.file;
    
    // 2. GIẢI MÃ KÝ TỰ (Biến %20 thành khoảng trắng chuẩn)
    const decodedFileName = decodeURIComponent(fileName);
    
    // 3. Trỏ vào thư mục /uploads trên ổ cứng
    const fullPath = path.resolve(process.cwd(), "uploads", decodedFileName);

    // 4. Kiểm tra file có tồn tại không
    if (!fs.existsSync(fullPath)) {
      res.status(404).json({ message: "File not found on local disk" });
      return;
    }

    // 5. Bưng tấm ảnh trả về
    res.sendFile(fullPath);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
