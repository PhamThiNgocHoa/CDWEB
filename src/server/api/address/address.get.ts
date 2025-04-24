import {Address} from "node:cluster";
import ApiService from "../ApiService";

export const getAllAddresses = async (): Promise<Address[]> => {
    return await ApiService.get("/api/address/");
};
export const getAddressByCustomerId = async (customerId: number): Promise<Address[]> => {
    return await ApiService.get(`/api/address/customer/${customerId}`);
};
export const getAddress = async (id: number): Promise<Address> => {
    return await ApiService.get(`/api/address/customer/${id}`);
};
export const getAddressByCustomerIdAndIsDefault = async (customerId: number): Promise<Address> => {
    return ApiService.get(`/api/address//default/${customerId}`);
}
