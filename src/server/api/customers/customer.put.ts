import {Customer} from "../../../models/Customer";
import ApiService from "../ApiService";

export const updateCustomer = async (customerId: string | undefined, customer: {
    password: string;
    phone: string;
    fullname: string;
    email: string;
    username: string
}): Promise<void> => {
    const response = await ApiService.put(`/api/customer/${customerId}`, customer);
    return response.message;

};
