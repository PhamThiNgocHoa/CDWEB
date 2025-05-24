import {OrderStatus} from "../../enums/OrderStatus";
import {OrderMethod} from "../../enums/OrderMethod";
import {OrderDetailRequest} from "./OrderDetailRequest";


export interface OrderRequest {
    customerId: string;
    totalAmount: number;
    address: string;
    numberPhone: string;
    status: OrderStatus;
    paymentMethod: OrderMethod;
    receiver: string;
    orderDetails: OrderDetailRequest[];
}
