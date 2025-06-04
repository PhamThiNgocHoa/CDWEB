import React, {useState} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {FaUsers, FaBoxOpen, FaDollarSign, FaShoppingCart} from "react-icons/fa";
import Sidebar from "./dasboard/Sidebar";
import StatCard from "./dasboard/StatCard";
import RevenueChart from "./dasboard/RevenueChart";
import RecentOrders from "./dasboard/RecentOrders";
import useOrder from "../../hooks/useOrder";

const revenueData = [
    {month: 'Tháng 1', revenue: 1000000},
    {month: 'Tháng 2', revenue: 1500000},
    {month: 'Tháng 3', revenue: 800000},
    {month: 'Tháng 4', revenue: 2000000},
    {month: 'Tháng 5', revenue: 1700000},
    {month: 'Tháng 6', revenue: 2200000}
];


function Administration() {
    const {orders} = useOrder();
    return (
        <div>
            <Header/>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar/>
                <main className="flex-1 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={FaUsers} label="Người dùng" value="1,234" color="blue"/>
                        <StatCard icon={FaShoppingCart} label="Đơn hàng" value="245" color="green"/>
                        <StatCard icon={FaDollarSign} label="Tổng doanh thu" value="134,000,000₫" color="yellow"/>
                        <StatCard icon={FaBoxOpen} label="Sản phẩm" value="312" color="purple"/>
                    </div>

                    <RevenueChart data={revenueData}/>
                    <RecentOrders orders={orders ?? []}/>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default Administration;
