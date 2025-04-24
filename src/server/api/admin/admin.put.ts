import {Customer} from "../../../models/Customer";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import ApiService from "../ApiService";
import {OrderEditReques} from "../../../models/request/OrderEditReques";
import {OrderStatus} from "../../../enums/OrderStatus";

export const updateCustomer = async (customerId: number, customer: Customer): Promise<CustomerResponse> => {
    return ApiService.put(`/api/admin/customer/${customerId}`, customer);
}
export const editOrder = async (orderRequest: OrderEditReques, orderId: number): Promise<void> => {
    return ApiService.put(`/api/admin/order/${orderId}`, orderRequest);
}
export const changeOrderStatus = async (status: OrderStatus, orderId: number): Promise<void> => {
    return ApiService.put(`/api/admin/status/${status}/${orderId}`, status);
}