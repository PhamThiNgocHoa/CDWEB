import {AddressRequest} from "../../../models/request/AddressRequest";
import {Address} from "../../../models/Address";
import ApiService from "../ApiService";

export const createAddress = async (addressResquest: AddressRequest): Promise<Address> => {
    return ApiService.post("/api/address/", addressResquest);
}