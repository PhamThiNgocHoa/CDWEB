import React, {useState} from 'react';
import { OrderResponse } from "../../../models/response/OrderResponse";

interface RecentOrdersProps {
    orders: OrderResponse[];
}

function RecentOrders({ orders }: RecentOrdersProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = orders?.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h3>
            <div className="p-4 bg-white rounded-xl shadow-md">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-700">Danh sách đơn hàng</h2>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mã đơn..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-72"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-red-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mã đơn</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Khách hàng</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tổng tiền</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ngày đặt</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                        {filteredOrders?.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-2 text-sm">{order.id}</td>
                                    <td className="px-4 py-2 text-sm">{order.customerDTO.fullname}</td>
                                    <td className="px-4 py-2 text-sm text-green-600 font-medium">{order.totalAmount.toLocaleString()}₫</td>
                                    <td className="px-4 py-2 text-sm">{order.orderDate}</td>
                                    <td className="px-4 py-2 text-sm">
                                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium
                                        bg-blue-100 text-blue-700">
                                        {order.status}
                                    </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    Không tìm thấy đơn hàng nào.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecentOrders;
