import {AddressRequest} from "../../../models/request/AddressRequest";
import ApiService from "../ApiService";

export const createAddress = async (addressRequest: {
    note: string;
    address: string;
    receiver: string;
    numberPhone: string;
    customerId: string
}): Promise<AddressRequest | null> => {
    const response = await ApiService.post("/api/address/", addressRequest);
    return response;
};
