import {useEffect, useState} from "react";
import {
    getAllOrders,
    getOrderRevenue,
    getOrderRevenueAtDay,
    getOrderRevenueAtMonthYear,
} from "../server/api/admin/admin.get";
import {editOrder} from "../server/api/admin/admin.put";
import {OrderResponse} from "../models/response/OrderResponse";
import {RevenueResponse} from "../models/response/RevenueResponse";
import {MonthlyRevenueResponse} from "../models/response/MonthlyRevenueResponse";
import {OrderEditReques} from "../models/request/OrderEditReques";
import {OrderStatus, OrderStatusDisplayName} from "../enums/OrderStatus";
import {deleteOrder} from "../server/api/admin/admin.delete";

export const useOrderManagement = (token: string | null, role: string | undefined) => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [revenue, setRevenue] = useState<MonthlyRevenueResponse[]>([]);
    const [revenueByMonthYear, setRevenueByMonthYear] = useState<RevenueResponse>();
    const [revenueByDay, setRevenueByDay] = useState<RevenueResponse>();
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const fetchAllOrders = async () => {
        if (!token || role !== "ADMIN") return;
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            console.error("Lỗi khi lấy đơn hàng", err);
        }
    };

    const fetchRevenue = async () => {
        if (!token || role !== "ADMIN") return;
        try {
            const data = await getOrderRevenue();
            setRevenue(data);
        } catch (err) {
            console.error("Lỗi doanh thu:", err);
        }
    };

    const fetchRevenueByMonthYear = async (month: string, year: string) => {
        if (!token || role !== "ADMIN") return;
        try {
            const data = await getOrderRevenueAtMonthYear(month, year);
            setRevenueByMonthYear(data);
        } catch (err) {
            console.error("Lỗi doanh thu theo tháng/năm:", err);
        }
    };

    const fetchRevenueByDay = async (date: string) => {
        if (!token || role !== "ADMIN") return;
        try {
            const data = await getOrderRevenueAtDay(date);
            console.log("data", data.revenue);
            setRevenueByDay(data);
        } catch (err) {
            console.error("Lỗi doanh thu theo ngày:", err);
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
        const order = orders.find(o => o.id === orderId);
        if (!order || [OrderStatus.DELIVERED, OrderStatus.SHIPPING].includes(order.status)) {
            setNotification({ message: "Không thể huỷ đơn hàng", type: "error" });
            return;
        }
        try {
            await deleteOrder(orderId);
            await fetchAllOrders();
            setNotification({ message: "Huỷ đơn hàng thành công", type: "success" });
        } catch (err) {
            setNotification({ message: "Huỷ đơn hàng thất bại", type: "error" });
        }
    };
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.PENDING_PAYMENT]: [OrderStatus.CANCELLED, OrderStatus.PAYMENT_SUCCESS],
        [OrderStatus.PENDING]: [OrderStatus.SHIPPING, OrderStatus.CANCELLED],
        [OrderStatus.SHIPPING]: [OrderStatus.DELIVERED, OrderStatus.RETURNED],
        [OrderStatus.DELIVERED]: [OrderStatus.RETURNED],
        [OrderStatus.PAYMENT_SUCCESS]: [OrderStatus.SHIPPING, OrderStatus.DELIVERED],
        [OrderStatus.PAYMENT_FAILED]: [],
        [OrderStatus.CANCELLED]: [],
        [OrderStatus.RETURNED]: [],
    };
    const handleUpdateOrder = async (dto: OrderEditReques, id: string) => {
        const order = orders.find(o => o.id === id);
        if (!order) {
            setNotification({ message: "Đơn hàng không tồn tại", type: "error" });
            return;
        }

        const currentStatus = order.status;
        const newStatus = dto.status;

        if (!validTransitions[currentStatus]?.includes(newStatus)) {
            setNotification({
                message: `Không thể chuyển trạng thái từ "${OrderStatusDisplayName[currentStatus]}" sang "${OrderStatusDisplayName[newStatus]}"`,
                type: "error"
            });
            return;
        }

        try {
            await editOrder(dto, id);
            await fetchAllOrders();
            const today = new Date();
            await fetchRevenueByMonthYear((today.getMonth() + 1).toString(), today.getFullYear().toString());
            setNotification({ message: "Cập nhật đơn hàng thành công", type: "success" });
        } catch (err) {
            setNotification({ message: "Cập nhật đơn hàng thất bại", type: "error" });
        }
    };

    useEffect(() => {
        fetchAllOrders();
        fetchRevenue();
        const today = new Date();
        const todayString = today.toISOString().slice(0, 10); // "YYYY-MM-DD"
        fetchRevenueByDay(todayString);
        fetchRevenueByMonthYear((today.getMonth() + 1).toString(), today.getFullYear().toString());
    }, [token, role]);

    return {
        orders,
        revenue,
        revenueByMonthYear,
        revenueByDay,
        notification,
        setNotification,
        handleDeleteOrder,
        handleUpdateOrder,
    };
};
