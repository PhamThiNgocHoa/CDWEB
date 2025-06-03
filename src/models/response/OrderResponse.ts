import {OrderStatus} from "../../enums/OrderStatus";
import {CustomerResponse} from "./CustomerResponse";
import {OrderDetailResponse} from "./OrderDetailResponse";


export interface OrderResponse {
    id: string;
    customerDTO: CustomerResponse;
    orderDate: string;
    totalAmount: number;
    address: string;
    numberPhone: string;
    status: OrderStatus;
    receiver: string;
    orderDetails: OrderDetailResponse[];
    discountCode: string;
}
