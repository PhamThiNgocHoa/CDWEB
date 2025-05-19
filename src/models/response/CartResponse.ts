import {Customer} from "../Customer";
import {CartItemResponse} from "./CartItemResponse";

export interface CartResponse {
    id: number;
    customerId: number; // Chỉ cần id khách hàng thôi, ko phải object
    cartItems: CartItemResponse[]; // sửa từ cartItem thành cartItems
}
