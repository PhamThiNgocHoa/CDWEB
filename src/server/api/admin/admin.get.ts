import {CustomerResponse} from "../../../models/response/CustomerResponse";
import ApiService from "../ApiService";
import {MonthlyRevenueResponse} from "../../../models/response/MonthlyRevenueResponse";
import {OrderResponse} from "../../../models/response/OrderResponse";
import {OrderStatus} from "../../../enums/OrderStatus";

export const getCustomers = async (): Promise<CustomerResponse[]> => {
    return await ApiService.get("/api/admin/customers");
}
export const getCustomer = async (customerId: number): Promise<CustomerResponse> => {
    return await ApiService.get(`/api/admin/customer/${customerId}`);
}
export const getOrderRevenue = async (): Promise<MonthlyRevenueResponse[]> => {
    return await ApiService.get("/api/admin/order/revenue");
}
export const getAllOrders = async (): Promise<OrderResponse[]> => {
    return await ApiService.get("/api/admin/order/list");
}
export const getOrderByStatus = async (status: OrderStatus): Promise<OrderResponse[]> => {
    return await ApiService.get(`/api/admin/${status}`);
}