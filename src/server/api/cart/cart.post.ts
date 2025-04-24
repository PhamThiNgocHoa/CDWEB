import {CartRequest} from "../../../models/request/CartRequest";
import ApiService from "../ApiService";

export const saveCart = async (cartRequest: CartRequest): Promise<void> => {
    return ApiService.post("/api/cart", cartRequest);
}
