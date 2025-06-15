import React, {useState} from "react";
import {OrderResponse} from "../../../../models/response/OrderResponse";
import {OrderStatusDisplayName} from "../../../../enums/OrderStatus";

interface OrderListProps {
    orders: OrderResponse[];
    onDelete: (id: string) => void;
    onEdit: (order: OrderResponse) => void;
    onView: (order: OrderResponse) => void;
}


const OrderList: React.FC<OrderListProps> = ({orders, onDelete, onEdit, onView}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("");


    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerDTO.fullname.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = status === "" || order.status === status;

        return matchesSearch && matchesStatus;
    });


    return (
        <div>
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo mã đơn hoặc khách hàng..."
                    className="w-full p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Tất cả trạng thái</option>
                    {Object.entries(OrderStatusDisplayName).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>


            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-red-600 text-white uppercase text-sm font-semibold">
                    <th className="py-3 px-6 text-left">Mã đơn</th>
                    <th className="py-3 px-6 text-left">Khách hàng</th>
                    <th className="py-3 px-6 text-right">Tổng tiền</th>
                    <th className="py-3 px-6 text-center">Trạng thái</th>
                    <th className="py-3 px-6 text-center">Ngày đặt</th>
                    <th className="py-3 px-6 text-center">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, idx) => (
                        <tr
                            key={order.id}
                            className={`border-b hover:bg-gray-100 transition-colors ${
                                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                        >
                            <td className="py-4 px-6 text-left font-medium text-gray-700">{order.id}</td>
                            <td className="py-4 px-6 text-left">{order.receiver}</td>
                            <td className="py-4 px-6 text-right font-semibold text-green-600">
                                {order.totalAmount.toLocaleString()}đ
                            </td>
                            <td className="py-4 px-6 text-center">
                               <span
                                   className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                       order.status === "PENDING_PAYMENT"
                                           ? "bg-orange-200 text-orange-800"
                                           : order.status === "PENDING"
                                               ? "bg-yellow-200 text-yellow-800"
                                               : order.status === "PAYMENT_FAILED"
                                                   ? "bg-red-200 text-red-800"
                                                   : order.status === "PAYMENT_SUCCESS"
                                                       ? "bg-blue-200 text-blue-800"
                                                       : order.status === "SHIPPING"
                                                           ? "bg-purple-200 text-purple-800"
                                                           : order.status === "DELIVERED"
                                                               ? "bg-green-200 text-green-800"
                                                               : order.status === "CANCELLED"
                                                                   ? "bg-red-200 text-red-800"
                                                                   : "bg-gray-100 text-gray-600"
                                   }`}
                               >
                                  {OrderStatusDisplayName[order.status]}
                                </span>


                            </td>
                            <td className="py-4 px-6 text-center">
                                {new Date(order.orderDate).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 text-center space-x-2">
                                <button
                                    onClick={() => onView(order)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition"
                                    title="Xem chi tiết"
                                >
                                    👁
                                </button>
                                <button
                                    onClick={() => onEdit(order)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => onDelete(order.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                                >
                                    Xóa
                                </button>
                            </td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-center py-6 text-gray-500">
                            Không tìm thấy đơn hàng phù hợp
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
