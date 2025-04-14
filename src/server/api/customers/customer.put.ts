import {Customer} from "../../../models/Customer";
import ApiService from "../ApiService";

export const updateCustomer = async (customerId: number, customer: Customer): Promise<void> => {
    const {data} = await ApiService.put(`/api/customer/${customerId}`, customer);
    return data;

};
