import {OrderDetailSaveRequest} from "../../../models/request/OrderDetailSaveRequest";
import {OrderDetailResponse} from "../../../models/response/OrderDetailResponse";
import ApiService from "../ApiService";

export const getOrderDetailById = async (id: number): Promise<OrderDetailResponse> => {
    return await ApiService.get(`/api/order-detail/id/${id}`);
}

export const getOrderDetailByOrderId = async (orderId: number): Promise<OrderDetailResponse[]> => {
    return await ApiService.get(`/api/order-detail/orderId/${orderId}`);
}

export const getOrderDetailByProductId = async (productId: number): Promise<OrderDetailResponse> => {
    return await ApiService.get(`/api/order-detail/productId/${productId}`);
}