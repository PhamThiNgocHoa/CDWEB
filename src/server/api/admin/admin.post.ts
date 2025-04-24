import {Customer} from "../../../models/Customer";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import ApiService from "../ApiService";

export const addCustomer = async (customer: Customer): Promise<CustomerResponse> => {
    return ApiService.post("/api/admin/customer", customer);
}
