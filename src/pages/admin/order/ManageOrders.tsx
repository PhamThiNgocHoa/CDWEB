import React, {useState} from "react";
import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import Footer from "../../../components/Footer";
import OrderList from "./component/OrderList";
import OrderForm from "./component/OrderForm";
import {OrderResponse} from "../../../models/response/OrderResponse";
import {OrderStatus} from "../../../enums/OrderStatus";
import {ClockIcon, CurrencyDollarIcon, ShoppingCartIcon, TruckIcon} from "@heroicons/react/16/solid";

import Notification from "../../../components/Notification";
import OrderDetailPopup from "./component/OrderDetailPopup";
import {useOrderManagement} from "../../../hooks/useOrderManagement";
import {useToken} from "../../../hooks/useToken";
import useCustomer from "../../../hooks/useCustomer";


const StatCard = ({
                      title,
                      value,
                      icon: Icon,
                      bgColor = "bg-white"
                  }: {
    title: string;
    value: number | string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    bgColor?: string
}) => (
    <div
        className={`${bgColor} shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow cursor-default`}>
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
            <Icon className="w-8 h-8"/>
        </div>
        <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{typeof value === "number" ? value.toLocaleString() : value}</p>
        </div>
    </div>
);

const ManageOrders = () => {
    const {user} = useCustomer();
    const token = useToken();
    const {
        orders,
        revenueByMonthYear,
        handleDeleteOrder,
        notification,
        setNotification,
        handleUpdateOrder
    } = useOrderManagement(token, user?.role);
    const [viewingOrder, setViewingOrder] = useState<OrderResponse | null>(null);

    const onView = (order: OrderResponse) => {
        setViewingOrder(order);
    };


    const [editingOrder, setEditingOrder] = useState<OrderResponse | null>(null);

    const onEdit = (order: OrderResponse) => {
        setEditingOrder(order);
    };

    const onCancelEdit = () => {
        setEditingOrder(null);
    };

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING).length;
    const deliveredOrders = orders.filter(o => o.status === OrderStatus.DELIVERED).length;

    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <div className="flex flex-1 bg-gray-50">
                {notification && (
                    <Notification message={notification.message} type={notification.type}
                                  onClose={() => setNotification(null)}/>
                )}
                <div
                    className="w-64 hidden md:block fixed top-[80px] left-0 h-[calc(100vh-80px)] overflow-y-auto z-40 bg-white shadow-lg">
                    <Sidebar/>
                </div>
                <main className="flex-1 ml-0 md:ml-64 p-6 pt-[100px] overflow-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard title="Tổng đơn hàng" value={totalOrders} icon={ShoppingCartIcon}/>
                        {revenueByMonthYear && (
                            <StatCard title="Tổng doanh thu" value={(revenueByMonthYear.revenue)}
                                      icon={CurrencyDollarIcon}/>
                        )}
                        <StatCard title="Đơn chờ xử lý" value={pendingOrders} icon={ClockIcon} bgColor="bg-yellow-100"/>
                        <StatCard title="Đơn đã giao" value={deliveredOrders} icon={TruckIcon} bgColor="bg-green-100"/>
                    </div>

                    <OrderForm
                        onSave={handleUpdateOrder}
                        editingOrder={editingOrder}
                        onCancel={onCancelEdit}
                    />

                    <section className="bg-white rounded-lg shadow p-6 mt-6">
                        <OrderList
                            orders={orders}
                            onDelete={handleDeleteOrder}
                            onEdit={onEdit}
                            onView={onView}
                        />

                    </section>
                    {viewingOrder && (
                        <OrderDetailPopup
                            order={viewingOrder}
                            onClose={() => setViewingOrder(null)}
                        />
                    )}

                </main>
            </div>
            <Footer/>
        </div>
    );
};

export default ManageOrders;
