import {Customer} from "../../../models/Customer";
import ApiService from "../ApiService";

export const updateCustomer = async (customerId: string | undefined, customer: {
    password: string;
    phone: string;
    id: string | undefined;
    fullname: string;
    email: string;
    username: string
}): Promise<void> => {
    return ApiService.put(`/api/customer/${customerId}`, customer);

};
