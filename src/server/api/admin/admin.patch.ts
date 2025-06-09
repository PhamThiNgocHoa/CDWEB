import {CustomerRequest} from "../../../models/request/CustomerRequest";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import ApiService from "../ApiService";

export const updateCustomer = async (customerId: string, customer: CustomerRequest): Promise<CustomerResponse> => {
    const response = await ApiService.patch(`/api/admin/customer/${customerId}`, customer);
    return response.data;
};