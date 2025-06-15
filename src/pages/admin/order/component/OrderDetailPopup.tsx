import React from "react";
import {OrderResponse} from "../../../../models/response/OrderResponse";
import formatToVND from "../../../../hooks/formatToVND";
import {OrderStatusDisplayName} from "../../../../enums/OrderStatus";

interface Props {
    order: OrderResponse;
    onClose: () => void;
}

const OrderDetailPopup: React.FC<Props> = ({order, onClose}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-xl relative overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Chi tiết đơn hàng</h2>

                {/* Thông tin chung */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <p><span className="font-semibold">Mã đơn:</span> {order.id}</p>
                    <p><span className="font-semibold">Trạng thái:</span> <span className="font-medium text-blue-600">{OrderStatusDisplayName[order.status]}</span></p>
                    <p><span className="font-semibold">Tên người nhận:</span> {order.receiver}</p>
                    <p><span className="font-semibold">Số điện thoại:</span> {order.numberPhone}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Địa chỉ:</span> {order.address}</p>
                    <p><span className="font-semibold">Ngày đặt:</span> {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Tổng tiền:</span> <span className="text-green-600 font-bold">{formatToVND(order.totalAmount)}</span></p>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Danh sách sản phẩm</h3>
                    <div className="border rounded-lg overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-gray-100 font-medium">
                            <tr>
                                <th className="px-4 py-2 text-left">Sản phẩm</th>
                                <th className="px-4 py-2 text-center">Số lượng</th>
                                <th className="px-4 py-2 text-right">Đơn giá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.orderDetails.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{item.productResponseDTO.name}</td>
                                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                                    <td className="px-4 py-2 text-right">{(item.productResponseDTO.price)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPopup;
