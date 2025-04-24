import {OrderDetailSaveRequest} from "../../../models/request/OrderDetailSaveRequest";
import {OrderDetailResponse} from "../../../models/response/OrderDetailResponse";
import ApiService from "../ApiService";

export const deleteOrderDetail = async (id: number): Promise<void> => {
    return ApiService.delete(`/api/order-detail/id/${id}`);
}