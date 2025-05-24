import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {OrderStatus, OrderStatusDisplayName} from "../enums/OrderStatus";
import formatToVND from "../hooks/formatToVND";

function OrderHistory() {
    const [selectedStatus, setSelectedStatus] = useState("all");

    const orders = [
        {
            id: 1,
            status: OrderStatus.PENDING,
            date: "2024-05-01",
            products: [
                {
                    id: 101,
                    name: "Sản phẩm A",
                    quantity: 2,
                    price: 100000,
                    image: "https://pibook.vn/upload/product-slide/giai-ma-me-cung-phat-trien-iq-dai-duong-04032025.jpg",
                },
                {
                    id: 102,
                    name: "Sản phẩm B",
                    quantity: 1,
                    price: 200000,
                    image: "https://pibook.vn/upload/product-slide/giai-ma-me-cung-phat-trien-iq-dai-duong-04032025.jpg",
                }
            ],
            total: 400000,  // có thể tính tự động cũng được
        },
        {
            id: 2,
            status: OrderStatus.SHIPPING,
            date: "2024-05-05",
            products: [
                {
                    id: 103,
                    name: "Sản phẩm C",
                    quantity: 1,
                    price: 350000,
                    image: "https://pibook.vn/upload/product-slide/giai-ma-me-cung-phat-trien-iq-dai-duong-04032025.jpg",
                },
            ],
            total: 350000,
        },
        // ... các đơn khác
    ];

    const filterOrders = selectedStatus === "all"
        ? orders
        : orders.filter((o) => o.status === selectedStatus);

    return (
        <>
            <Header/>
            <div className="bg-gray-100 py-8">
                <div className="flex flex-col md:flex-row p-4 gap-4">
                    {/* Sidebar */}
                    <div className="md:w-1/4 w-full bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Lịch sử đơn hàng</h2>
                        <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-auto md:overflow-visible border-b md:border-b-0 pb-2 md:pb-0">
                            <li
                                key="all"
                                onClick={() => setSelectedStatus("all")}
                                className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-200 ${
                                    selectedStatus === "all" ? "bg-red-500 text-white" : ""
                                }`}
                                style={{userSelect: "none"}}
                            >
                                Tất cả
                            </li>
                            {Object.values(OrderStatus).map((status) => (
                                <li
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-200 ${
                                        selectedStatus === status ? "bg-red-500 text-white" : ""
                                    }`}
                                    style={{userSelect: "none"}}
                                >
                                    {OrderStatusDisplayName[status]}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            {selectedStatus === "all"
                                ? "Tất cả đơn hàng"
                                : `Đơn hàng - ${OrderStatusDisplayName[selectedStatus as OrderStatus]}`}
                        </h2>

                        {filterOrders.map((order) => {
                            const firstProduct = order.products[0];
                            const otherCount = order.products.length - 1;

                            return (
                                <div key={order.id}
                                     className="flex items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white">
                                    <img
                                        src={firstProduct.image}
                                        alt={firstProduct.name}
                                        className="w-24 h-24 object-cover rounded mr-4 border"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-1">{firstProduct.name}</h3>
                                        {otherCount > 0 && (
                                            <p className="text-sm text-gray-500">và {otherCount} sản phẩm khác</p>
                                        )}
                                        <p className="text-gray-600 text-sm mb-1">
                                            Ngày đặt: {order.date}
                                        </p>
                                        <p className="text-gray-700 font-semibold">
                                            Tổng tiền: {order.total.toLocaleString()}₫
                                        </p>
                                    </div>
                                    <div className="text-sm text-right min-w-[160px] flex justify-end items-center">
                                        <span
                                            className={`px-3 py-1 rounded-full font-medium ${
                                                order.status === OrderStatus.PENDING
                                                    ? "bg-yellow-400 text-black"
                                                    : order.status === OrderStatus.SHIPPING
                                                        ? "bg-blue-400 text-white"
                                                        : order.status === OrderStatus.DELIVERED
                                                            ? "bg-green-500 text-white"
                                                            : "bg-gray-500 text-white"
                                            }`}
                                        >
                                          {OrderStatusDisplayName[order.status]}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}


                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default OrderHistory;
