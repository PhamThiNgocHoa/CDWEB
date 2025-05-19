import {CartResponse} from "../../../models/response/CartResponse";
import ApiService from "../ApiService";

export const getCartByCustomerId = async (customerId: number): Promise<CartResponse> => {
    const result = await ApiService.get(`/api/cart/${customerId}`);
    return result.data; // ✅ Lấy đúng phần chứa giỏ hàng
}


export const getCart = async (cartId: number): Promise<number> => {
    return await ApiService.get(`/api/cart/quantity/${cartId}`);
}