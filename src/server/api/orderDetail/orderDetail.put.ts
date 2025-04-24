import ApiService from "../ApiService";
import {OrderDetailSaveRequest} from "../../../models/request/OrderDetailSaveRequest";
import {OrderDetailResponse} from "../../../models/response/OrderDetailResponse";

export const updateOrderDetail = async (id: number, orderDetailRequestDTO: OrderDetailSaveRequest): Promise<OrderDetailResponse> => {
    return ApiService.put(`/api/order-detail/${id}`, orderDetailRequestDTO);
}