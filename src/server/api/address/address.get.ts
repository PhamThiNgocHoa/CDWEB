import ApiService from "../ApiService";
import {Address} from "../../../models/Address";

export const getAllAddresses = async (): Promise<Address[]> => {
    return await ApiService.get("/api/address/");
};
export const getAddressByCustomerId = async (customerId: string): Promise<Address[]> => {
    const data = await ApiService.get(`/api/address/customer/${customerId}`);
    return data;
};
export const getAddress = async (id: number): Promise<Address> => {
    return await ApiService.get(`/api/address/customer/${id}`);
};
export const getAddressByCustomerIdAndIsDefault = async (customerId: number): Promise<Address> => {
    return ApiService.get(`/api/address//default/${customerId}`);
}
