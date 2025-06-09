import ApiService from "../ApiService";

export const deleteCustomer = async (customerId: string):Promise<void>=>{
    return ApiService.delete(`/api/admin/customer/${customerId}`);
}
export const deleteOrder = async (orderId: string):Promise<void>=>{
    return ApiService.delete(`/api/admin/customer/${orderId}`);
}
export const deleteCategory = async (categoryId: string): Promise<void> => {
    return ApiService.delete(`/api/admin/category/${categoryId}`);
};

export const deleteDiscount = async (code : string): Promise<void> => {
    await ApiService.delete(`/api/admin/discount/${code}`);
};