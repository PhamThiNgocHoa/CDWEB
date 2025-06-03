import ApiService from "../ApiService";
import {CustomerResponse} from "../../../models/response/CustomerResponse";

export const getUser = async (): Promise<CustomerResponse> => {
    const result = await ApiService.get("/api/customer/profile");
    return result.data;
};


export const getQuantity = async (customerId: number): Promise<number> => {
    return ApiService.get(`/api/customer/quantity/${customerId}`);
};
