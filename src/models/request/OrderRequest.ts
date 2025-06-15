import {OrderDetailRequest} from "./OrderDetailRequest";
import {OrderMethod} from "../../enums/OrderMethod";

export interface OrderRequest {
    customerId: string;
    address: string;
    numberPhone: string;
    receiver: string;
    orderDetails: OrderDetailRequest[];
    discountCode: string;
    orderMethod: OrderMethod;
}
