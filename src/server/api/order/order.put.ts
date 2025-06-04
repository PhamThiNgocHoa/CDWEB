import {OrderStatus} from "../../../enums/OrderStatus";
import ApiService from "../ApiService";

export const changeOrderStatus = async (status: OrderStatus, orderId: string): Promise<void> => {
    return ApiService.put(`/api/order/status/${status}/${orderId}`, status);
}