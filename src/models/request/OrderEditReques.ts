import {OrderStatus} from "../../enums/OrderStatus";

export interface OrderEditReques {
    fullname: string;
    address: string;
    status: OrderStatus;
    phone: string;
}