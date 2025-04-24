import ApiService from "../ApiService";

export const deleteCustomer = async (customerId: number):Promise<void>=>{
    return ApiService.delete(`/api/admin/customer/${customerId}`);
}
export const deleteOrder = async (orderId: number):Promise<void>=>{
    return ApiService.delete(`/api/admin/customer/${orderId}`);
}
