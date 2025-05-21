import {CartItemRequest} from "../../../models/request/CartItemRequest";
import ApiService from "../ApiService";

export const saveCartItem = async (cartItemRequest: CartItemRequest): Promise<void> => {
    const result = await ApiService.post("/api/cartItem", cartItemRequest);
    return result.data;
}