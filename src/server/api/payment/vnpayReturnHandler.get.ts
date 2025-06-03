import ApiService from "../ApiService";

export const vnpayReturnHandlerGet = async (params: any) => {
    try {
        const response = await ApiService.get("/api/payments/vnpay-return", params, {}, true);

        if (response) {
            return response;
        }

        return null;
    } catch (error: any) {
        console.error("Lỗi khi xác nhận thanh toán VNPay:", error.message);
        throw error;
    }
};
