import {Product} from "../Product";

export interface CartItemResponse{
    id: string;
    product: Product;
    quantity: number;
}