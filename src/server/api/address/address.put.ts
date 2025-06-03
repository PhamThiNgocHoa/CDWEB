import {AddressRequest} from "../../../models/request/AddressRequest";
import {Address} from "../../../models/Address";
import ApiService from "../ApiService";

export const updateAddress = async (id: string, address: AddressRequest): Promise<AddressRequest> => {
    return ApiService.put(`/api/address/${id}`, address);
}