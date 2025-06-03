import {OrderDetailRequest} from "./OrderDetailRequest";

export interface OrderRequest {
    orderDetails: OrderDetailRequest[];
    address: string;
    receiver: string;
    discountCode: string;  // không optional, không cho undefined
    numberPhone: string;
    customerId: string;
}
