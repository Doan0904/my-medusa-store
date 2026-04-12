export default function VNPayCallbackPage({ searchParams }: { searchParams: any }) {
  const { vnp_ResponseCode, vnp_TxnRef } = searchParams

  if (vnp_ResponseCode === "00") {
     return (
       <div className="flex flex-col items-center py-20">
         <h1 className="text-2xl font-bold">Thanh toán thành công!</h1>
         <p>Đơn hàng của bạn đang được xử lý.</p>
         <a href={`/order/confirmed/${vnp_TxnRef}`} className="mt-4 text-blue-600 underline">
            Xem chi tiết đơn hàng
         </a>
       </div>
     )
  }

  return (
    <div className="flex flex-col items-center py-20">
      <h1 className="text-2xl font-bold text-red-600">Thanh toán thất bại</h1>
      <p>Mã lỗi: {vnp_ResponseCode}</p>
      <a href="/checkout" className="mt-4 bg-black text-white px-4 py-2">
         Quay lại trang thanh toán
      </a>
    </div>
  )
}
