import React, {useState} from 'react';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import {FaUsers, FaBoxOpen, FaDollarSign, FaShoppingCart} from "react-icons/fa";
import Sidebar from "./Sidebar";
import StatCard from "./StatCard";
import RevenueChart from "./RevenueChart";
import RecentOrders from "./RecentOrders";
import useOrder from "../../../hooks/useOrder";
import useProduct from "../../../hooks/useProduct";
import useCustomer from "../../../hooks/useCustomer";
import {useAdmin} from "../../../hooks/useAdmin";

function Administration() {
    const {orderAll, userAll, revenue, revenueByDay} = useAdmin();
    const {products} = useProduct();
    return (
        <div>
            <Header/>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar/>
                <main className="flex-1 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {userAll&&(
                            <StatCard icon={FaUsers} label="Người dùng" value={userAll.length} color="blue"/>
                        )}
                        {orderAll && (
                            <StatCard icon={FaShoppingCart} label="Đơn hàng" value={orderAll?.length} color="green"/>
                        )}
                        {revenueByDay&&(
                            <StatCard icon={FaDollarSign} label="Tổng doanh thu" value={revenueByDay.revenue.toLocaleString()} color="yellow"/>
                        )}
                        {products && (
                            <StatCard icon={FaBoxOpen} label="Sản phẩm" value={products.length} color="purple"/>
                        )}
                    </div>

                    <RevenueChart data={revenue}/>
                    <RecentOrders orders={orderAll ?? []}/>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default Administration;
