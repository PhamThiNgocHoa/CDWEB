import {Cart} from "./Cart";
import {Product} from "./Product";

export interface CartItem{
    id: number;
    cart: Cart;
    product: Product;
    quantity: number;


}