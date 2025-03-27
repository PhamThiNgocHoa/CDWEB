import {Customer} from "./Customer";

export interface Cart{
    id: number;
    customer: Customer;
    cartItem: Cart[];

}