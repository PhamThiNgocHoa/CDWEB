import {Customer} from "../Customer";
import {CartItemResponse} from "./CartItemResponse";

export interface CartResponse {
    id: string;
    customerId: string; // Chỉ cần id khách hàng thôi, ko phải object
    cartItems: CartItemResponse[]; // sửa từ cartItem thành cartItems
}
