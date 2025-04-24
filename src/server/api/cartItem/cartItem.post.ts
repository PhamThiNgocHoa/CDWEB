import {CartItemRequest} from "../../../models/request/CartItemRequest";
import ApiService from "../ApiService";

export const saveCartItem = async (cartItemRequest: CartItemRequest):Promise<void>=>{
    return ApiService.post("/api/cartItem", cartItemRequest);
}