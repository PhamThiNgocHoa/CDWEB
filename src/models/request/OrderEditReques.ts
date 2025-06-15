import {OrderStatus} from "../../enums/OrderStatus";

export interface OrderEditReques {
    receiver: string;
    address: string;
    status: OrderStatus;
    numberPhone: string;
}