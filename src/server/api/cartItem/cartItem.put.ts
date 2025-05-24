import ApiService from "../ApiService";
import {CartItemRequest} from "../../../models/request/CartItemRequest";

export const updateCartItem = async (cartItemId: string, quantity: number): Promise<void> => {
    const result = await ApiService.put(`/api/cartItem/updatequantity/${cartItemId}?quantity=${quantity}`, {});
    return result.data;
}
export const updateQuantityCartItem = async (cartItemId: string, cartItemRequest: CartItemRequest): Promise<void> => {
    const result = await ApiService.put(`/api/cartItem//update/${cartItemId}`, cartItemRequest);
    return result.data;
}
