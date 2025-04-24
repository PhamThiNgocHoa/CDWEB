export enum OrderStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",
    PENDING = "PENDING",
    SHIPPING = "SHIPPING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export const OrderStatusDisplayName: Record<OrderStatus, string> = {
    [OrderStatus.PENDING_PAYMENT]: "Đang chờ thanh toán",
    [OrderStatus.PENDING]: "Đang chờ xử lý",
    [OrderStatus.SHIPPING]: "Đang giao hàng",
    [OrderStatus.DELIVERED]: "Đã giao hàng",
    [OrderStatus.CANCELLED]: "Đã hủy"
};
