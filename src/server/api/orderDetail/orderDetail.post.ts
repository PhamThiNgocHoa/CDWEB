import {OrderDetailSaveRequest} from "../../../models/request/OrderDetailSaveRequest";
import {OrderDetailResponse} from "../../../models/response/OrderDetailResponse";
import ApiService from "../ApiService";

export const saveOrderDetail = async (orderDetailRequestDTO: OrderDetailSaveRequest): Promise<OrderDetailResponse> => {
    return ApiService.post("/api/order-detail", orderDetailRequestDTO);
}