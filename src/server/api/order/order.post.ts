import { OrderMethod } from "../../../enums/OrderMethod";
import ApiService from "../ApiService";
import { OrderDetailRequest } from "../../../models/request/OrderDetailRequest";

export const createOrder = async (
    order: {
        orderDetails: OrderDetailRequest[];
        address: string;
        receiver: string;
        discountCode: string;
        numberPhone: any;
        customerId: string;
    },
    method: OrderMethod
) => {
    try {
        const response = await ApiService.post(`/api/order?method=${method}`, order);
        return response.data;
    } catch {
    }
};

export const getTotalAmount = async (
    orderDetails: OrderDetailRequest[],
    discountCode: string
): Promise<number | undefined> => {
    try {
        const response = await ApiService.post(
            `/api/order/total-amount?discountCode=${discountCode}`,
            orderDetails
        );
        return response.data;
    } catch {
        return undefined;
    }
};

export const checkDiscount = async (discountCode: string): Promise<void> => {
    try {
        const response = await ApiService.post(`/api/order/check-discount?discountCode=${discountCode}`, {});
        if (response.code !== 200) {
            throw new Error(response.message || 'Mã giảm giá không hợp lệ');
        }
    } catch (error: any) {
        const serverMessage = error?.response?.data?.message || 'Mã giảm giá không hợp lệ hoặc đã hết hạn';
        const serverCode = error?.response?.data?.code;

        throw new Error(
            serverCode
                ? `❌ [${serverCode}] ${serverMessage}`
                : `⚠️ Kiểm tra mã giảm giá thất bại: ${error.message || 'Lỗi không xác định'}`
        );
    }
};
