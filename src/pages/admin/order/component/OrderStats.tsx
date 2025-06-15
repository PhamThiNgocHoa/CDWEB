import React from "react";
import StatCard from "../../dasboard/StatCard";
import { FaShoppingCart, FaBoxOpen, FaUsers, FaDollarSign } from "react-icons/fa";

const OrderStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Tổng đơn hàng" value="120" icon={FaShoppingCart} color="blue" />
            <StatCard label="Đơn chờ xử lý" value="35" icon={FaBoxOpen} color="orange" />
            <StatCard label="Tổng khách hàng" value="89" icon={FaUsers} color="green" />
            <StatCard label="Doanh thu" value="25,000,000đ" icon={FaDollarSign} color="red" />
        </div>
    );
};
export default OrderStats;
