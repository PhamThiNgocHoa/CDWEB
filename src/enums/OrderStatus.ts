export enum OrderStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",
    PENDING = "PENDING",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
    SHIPPING = "SHIPPING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURNED = "RETURNED"

}

export const OrderStatusDisplayName: Record<OrderStatus, string> = {
    [OrderStatus.PENDING_PAYMENT]: "Đang chờ thanh toán",
    [OrderStatus.PENDING]: "Đang chờ xử lý",
    [OrderStatus.SHIPPING]: "Đang giao hàng",
    [OrderStatus.DELIVERED]: "Đã giao hàng",
    [OrderStatus.PAYMENT_SUCCESS]: "Đã thanh toán",
    [OrderStatus.PAYMENT_FAILED]: "Thanh toán thất bại",
    [OrderStatus.CANCELLED]: "Đã hủy",
    [OrderStatus.RETURNED]: "Đã trả hàng"


};
