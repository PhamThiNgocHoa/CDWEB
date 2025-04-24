import {OrderResponse} from "../../../models/response/OrderResponse";
import ApiService from "../ApiService";

export const getOrderByCustomerId = async (customerId: number): Promise<OrderResponse[]> => {
    return await ApiService.get(`/api/order/customer/${customerId}`);
}

export const getOrderByStatusAndCustomerId = async (status: string, customerId: number): Promise<OrderResponse[]> => {
    return await ApiService.get(`/api/order/client/${status}&&${customerId}`);
}
