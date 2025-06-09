import {OrderResponse} from "../../../models/response/OrderResponse";
import ApiService from "../ApiService";

export const getOrderByCustomerId = async (customerId: string): Promise<OrderResponse[]> => {
    const data = await ApiService.get(`/api/order/customer/${customerId}`, {}, {}, true);
    return data.data;
}

export const getOrderByStatusAndCustomerId = async (status: string, customerId: number): Promise<OrderResponse[]> => {
    return await ApiService.get(`/api/order/client/${status}&&${customerId}`);
}
