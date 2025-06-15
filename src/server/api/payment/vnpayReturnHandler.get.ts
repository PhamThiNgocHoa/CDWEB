import ApiService from "../ApiService";

export const vnpayReturnHandlerGet = async () => {
    try {
        const queryString = window.location.search; // Lấy ?vnp_TxnRef=...&vnp_...
        const response = await ApiService.get(`/api/payments/vnpay-return${queryString}`, {}, {}, true);

        if (response) {
            return response;
        }

        return null;
    } catch (error: any) {
        console.error("Lỗi khi xác nhận thanh toán VNPay:", error.message);
        throw error;
    }
};
