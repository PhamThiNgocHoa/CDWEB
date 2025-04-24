import {Customer} from "../Customer";
import {CartItemResponse} from "./CartItemResponse";

export interface CartResponse {
    id: number;
    customerId: Customer;
    totalPrice: number;
    cartItem: CartItemResponse[];

}