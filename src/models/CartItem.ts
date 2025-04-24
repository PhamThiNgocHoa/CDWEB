import {CartResponse} from "./response/CartResponse";
import {Product} from "./Product";

export interface CartItem{
    id: number;
    cart: CartResponse;
    product: Product;
    quantity: number;


}