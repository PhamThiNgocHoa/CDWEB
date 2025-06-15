import {OrderStatus} from "../../../enums/OrderStatus";
import ApiService from "../ApiService";

export const changeOrderStatus = async (orderId: string): Promise<void> => {
    return ApiService.delete(`/api/order/${orderId}`);
};