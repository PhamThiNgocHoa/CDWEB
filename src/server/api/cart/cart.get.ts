import {CartResponse} from "../../../models/response/CartResponse";
import ApiService from "../ApiService";

export const getCartByCustomerId = async (customerId: number): Promise<CartResponse> => {
    return await ApiService.get(`/api/cart/${customerId}`);
}

export const getCart = async (cartId: number): Promise<number> => {
    return await ApiService.get(`/api/cart/quantity/${cartId}`);
}