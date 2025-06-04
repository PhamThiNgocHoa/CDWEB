import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {OrderStatus, OrderStatusDisplayName} from "../enums/OrderStatus";
import useOrder from "../hooks/useOrder";
import DataTable from "react-data-table-component";
import formatToVND from "../hooks/formatToVND";
import {useNavigate} from "react-router-dom";
import {OrderResponse} from "../models/response/OrderResponse";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTimes} from "@fortawesome/free-solid-svg-icons";
import Notification from "../components/Notification";

function OrderHistory() {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState("all");
    const {orders,handleCancelOrder, handleViewDetail,notification, setNotification} = useOrder();

    const filterOrders =
        selectedStatus === "all"
            ? orders
            : orders?.filter((o) => o.status === selectedStatus);

    const columns = [
        {
            name: 'Hình',
            selector: (row: OrderResponse) => row?.orderDetails?.[0]?.productResponseDTO?.img,
            cell: (row: OrderResponse) => (
                <img
                    src={row?.orderDetails?.[0]?.productResponseDTO?.img}
                    alt="sản phẩm"
                    className="w-28 h-28 object-cover rounded border"
                />
            ),
            width: '100px',
        },
        {
            name: 'Tên sản phẩm',
            selector: (row: OrderResponse) => row?.orderDetails?.[0]?.productResponseDTO?.name,
            cell: (row: OrderResponse) => {
                const product = row?.orderDetails?.[0]?.productResponseDTO;
                const otherCount = row.orderDetails.length - 1;
                return (
                    <div>
                        <div className="text-sm">{product.name}</div>
                        {otherCount > 0 && (
                            <div className="text-gray-500 text-md">và {otherCount} sản phẩm khác</div>
                        )}
                    </div>
                );
            },
            sortable: true,
        },
        {
            name: 'Ngày đặt',
            cell: (row: OrderResponse) => (
                <div className="p-0 m-0">{row.orderDate}</div>
            ),
            sortable: true,
        },
        {
            name: 'Tổng tiền',
            selector: (row: OrderResponse) => row.totalAmount,
            cell: (row: OrderResponse) => (
                <span className="text-sm">
                {formatToVND(row.totalAmount)}
            </span>
            ),
            sortable: true,
        },
        {
            name: 'Thao tác',
            cell: (row: OrderResponse) => {
                const isCancellable = row.status !== 'CANCELLED' && row.status !== 'DELIVERED';

                return (
                    <div className="flex flex-row gap-x-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                            onClick={() => handleViewDetail(row.id)}
                        >
                            <FontAwesomeIcon icon={faEye}/>
                        </button>
                        {isCancellable && (
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                onClick={() => handleCancelOrder(row.id, row.status)}
                            >
                                <FontAwesomeIcon icon={faTimes}/>
                            </button>

                        )}
                    </div>
                );

            },
            ignoreRowClick: true,
        }


    ];


    return (
        <>
            <Header/>
            <div className="bg-gray-100 py-8">
                {notification && (
                    <Notification message={notification.message} type={notification.type}
                                  onClose={() => setNotification(null)}/>
                )}
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
                                : `Đơn hàng - ${
                                    OrderStatusDisplayName[selectedStatus as OrderStatus]
                                }`}
                        </h2>

                        <DataTable
                            columns={columns}
                            data={filterOrders ?? []}
                            pagination
                            highlightOnHover
                            responsive
                            striped
                        />

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default OrderHistory;
