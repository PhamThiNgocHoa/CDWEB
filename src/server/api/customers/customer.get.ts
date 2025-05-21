import ApiService from "../ApiService";
import {CustomerResponse} from "../../../models/response/CustomerResponse";

export const getUser = async (): Promise<CustomerResponse> => {
    const result = await ApiService.get("/api/customer/profile");
    return result.data;
};

export const getQuantity = async (customerId: number): Promise<number> => {
    return ApiService.get(`/api/customer/quantity/${customerId}`);
};

export const checkUsername = async (username: string): Promise<boolean> => {
    const res = await ApiService.get(`/api/customer/checkUsername/${username}`, {}, false);
    return res.data === true;
};

export const checkEmail = async (email: string): Promise<boolean> => {
    const res = await ApiService.get(`/api/customer/checkEmail/${email}`, {}, false);
    return res.data === true;
};






