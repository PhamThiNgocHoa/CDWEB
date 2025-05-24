import {ProductResponse} from "./ProductResponse";

export interface OrderDetailResponse {
    id: string;
    orderId: string;
    productResponseDTO: ProductResponse;
    quantity: number;
}