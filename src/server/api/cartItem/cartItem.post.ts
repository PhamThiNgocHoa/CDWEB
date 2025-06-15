import {CartItemRequest} from "../../../models/request/CartItemRequest";
import ApiService from "../ApiService";

export const saveCartItem = async (cartItemRequest: CartItemRequest): Promise<void> => {
    console.log("📦 Đang gửi cartItemRequest:", cartItemRequest);

    try {
        const result = await ApiService.post("/api/cartItem", cartItemRequest);
        console.log("✅ Kết quả:", result.data);
        return result.data;
    } catch (error: any) {
        if (error.response) {
            console.error("❌ Lỗi từ server:", error.response.status, error.response.data);
        } else {
            console.error("❌ Lỗi khác:", error.message);
        }
        throw error;
    }
};
