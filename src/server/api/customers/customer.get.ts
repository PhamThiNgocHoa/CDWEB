import {Customer} from "../../../models/Customer";
import ApiService from "../ApiService";

export const getUser = async (): Promise<Customer> => {
    return ApiService.get("/api/customer/profile");
};

export const getQuantity = async (customerId: number): Promise<number> => {
    return ApiService.get(`/api/customer/quantity/${customerId}`);
};

export const checkUsername = async (username: string): Promise<boolean> => {
    return ApiService.get(`/api/customer/checkUsername/${username}`);
};
