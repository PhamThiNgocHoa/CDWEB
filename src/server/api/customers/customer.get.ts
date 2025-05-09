import {Customer} from "../../../models/Customer";
import ApiService from "../ApiService";

export const getUser = async (): Promise<Customer> => {
    return ApiService.get("/api/customer/profile");
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






