import {CustomerResponse} from "../../../models/response/CustomerResponse";
import ApiService from "../ApiService";
import {MonthlyRevenueResponse} from "../../../models/response/MonthlyRevenueResponse";
import {OrderResponse} from "../../../models/response/OrderResponse";
import {OrderStatus} from "../../../enums/OrderStatus";
import {RevenueResponse} from "../../../models/response/RevenueResponse";
import {Discount} from "../../../models/Discount";

export const getCustomers = async (): Promise<CustomerResponse[]> => {
    const response = await ApiService.get("/api/admin/customers");
    return response.data;

}
export const getCustomer = async (customerId: number): Promise<CustomerResponse> => {
    const response = await ApiService.get(`/api/admin/customer/${customerId}`);
    return response.data;
}
export const getOrderRevenue = async (): Promise<MonthlyRevenueResponse[]> => {
    const response = await ApiService.get("/api/admin/order/revenue");
    return response.data;

}
export const getAllOrders = async (): Promise<OrderResponse[]> => {
    const respone = await ApiService.get("/api/admin/order/list");
    return respone.data;
}
export const getOrderByStatus = async (status: OrderStatus): Promise<OrderResponse[]> => {
    return await ApiService.get(`/api/admin/${status}`);
}

export const getOrderRevenueAtYear = async (date: string): Promise<RevenueResponse> => {
    const response = await ApiService.get(`/api/admin/order/revenue/date/${date}`);
    return response.data;
}
export const getAllDiscounts = async (): Promise<Discount[]> => {
    const response = await ApiService.get("/api/admin/discount/all");
    return response.data;
};

export const getDiscountByCode = async (code: string): Promise<Discount> => {
    const response = await ApiService.get(`/api/admin/discount?code=${code}`);
    return response.data;
};
