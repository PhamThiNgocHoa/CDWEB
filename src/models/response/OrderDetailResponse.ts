import {ProductResponse} from "./ProductResponse";

export interface OrderDetailResponse {
    id: number;
    orderId: number;
    productResponseDTO: ProductResponse;
    quantity: number;
}