import {AddressRequest} from "../../../models/request/AddressRequest";
import {Address} from "../../../models/Address";
import ApiService from "../ApiService";

export const deleteAddress = async (id: number, address: AddressRequest): Promise<Address> => {
    return ApiService.put(`/api/address/${id}`, address);
}