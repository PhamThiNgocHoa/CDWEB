import {AddressRequest} from "../../../models/request/AddressRequest";
import {Address} from "../../../models/Address";
import ApiService from "../ApiService";

export const setDefaultAddress = async (customerId: number, addressId: number): Promise<boolean> => {
    const response = await ApiService.patch(`/api/address/default/${customerId}/${addressId}`, {});
    return response.success;

}