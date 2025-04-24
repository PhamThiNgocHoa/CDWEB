export enum OrderMethod {
    COD = "COD",
    VN_PAY = "VN_PAY",
    MOMO = "MOMO",
    ZALO_PAY = "ZALO_PAY"
}

export const OrderMethodDisplayName: Record<OrderMethod, string> = {
    [OrderMethod.COD]: "Thanh toán khi nhận hàng",
    [OrderMethod.VN_PAY]: "Thanh toán qua VNPay",
    [OrderMethod.MOMO]: "Thanh toán qua Momo",
    [OrderMethod.ZALO_PAY]: "Thanh toán qua ZaloPay"
};
