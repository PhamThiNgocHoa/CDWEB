import {Product} from "../Product";

export interface CartItemResponse{
    id: number;
    product: Product;
    quantity: number;
}