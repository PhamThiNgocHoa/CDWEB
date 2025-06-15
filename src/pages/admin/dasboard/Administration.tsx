import React, {useState} from 'react';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import {FaUsers, FaBoxOpen, FaDollarSign, FaShoppingCart} from "react-icons/fa";
import Sidebar from "./Sidebar";
import StatCard from "./StatCard";
import RevenueChart from "./RevenueChart";
import RecentOrders from "./RecentOrders";
import useProduct from "../../../hooks/useProduct";
import useCustomer from "../../../hooks/useCustomer";
import {useOrderManagement} from "../../../hooks/useOrderManagement";
import {useToken} from "../../../hooks/useToken";
import {useCustomerManagement} from "../../../hooks/useCustomerManagement";

function Administration() {
    const {user} = useCustomer();
    const token = useToken();
    const {customers} = useCustomerManagement(token, user?.role)
    const {orders, revenue, revenueByDay} = useOrderManagement(token, user?.role);
    const {products} = useProduct();
    return (
        <div>
            <Header/>
            <div className="flex min-h-screen bg-gray-100 mt-36">
                <div
                    className="w-64 hidden md:block fixed top-[80px] left-0 h-[calc(100vh-80px)] overflow-y-auto z-40 bg-white shadow-lg">
                    <Sidebar/>
                </div>
                <main className="flex-1 ml-0 md:ml-64 p-6 pt-[100px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
                        {customers && (
                            <StatCard icon={FaUsers} label="Người dùng" value={customers.length} color="blue"/>
                        )}
                        {orders && (
                            <StatCard icon={FaShoppingCart} label="Đơn hàng" value={orders?.length} color="green"/>
                        )}
                        {revenueByDay && (
                            <StatCard icon={FaDollarSign} label="Tổng doanh thu"
                                      value={revenueByDay.revenue.toLocaleString()} color="yellow"/>
                        )}
                        {products && (
                            <StatCard icon={FaBoxOpen} label="Sản phẩm" value={products.length} color="purple"/>
                        )}
                    </div>

                    <RevenueChart data={revenue}/>
                    <RecentOrders orders={orders ?? []}/>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default Administration;
