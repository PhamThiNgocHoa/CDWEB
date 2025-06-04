import React from 'react';
import { OrderResponse } from "../../../models/response/OrderResponse";

interface RecentOrdersProps {
    orders: OrderResponse[];
}

function RecentOrders({ orders }: RecentOrdersProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h3>
            <table className="w-full text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-2">Mã đơn</th>
                    <th className="p-2">Khách hàng</th>
                    <th className="p-2">Tổng tiền</th>
                    <th className="p-2">Ngày đặt</th>
                    <th className="p-2">Trạng thái</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{order.id}</td>
                        <td className="p-2">{order.customerDTO.fullname}</td>
                        <td className="p-2">{order.totalAmount.toLocaleString()}₫</td>
                        <td className="p-2">{order.orderDate}</td>
                        <td className="p-2">{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentOrders;
