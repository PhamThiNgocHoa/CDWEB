import {Customer} from "../../../models/Customer";
import ApiService from "../ApiService";

export const getUser = async (): Promise<Customer> => {
    const {data} = await ApiService.get("/api/customer/profile");
    return data;
};

export const getQuantity = async (customerId: number): Promise<number> => {
    const {data} = await ApiService.get(`/api/customer/quantity/${customerId}`);
    return data;
};

export const checkUsername = async (username: string): Promise<boolean> => {
    const {data} = await ApiService.get(`/api/customer/checkUsername/${username}`);
    return data === true;
};











