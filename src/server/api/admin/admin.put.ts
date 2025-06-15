import {Customer} from "../../../models/Customer";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import ApiService from "../ApiService";
import {OrderEditReques} from "../../../models/request/OrderEditReques";
import {OrderStatus} from "../../../enums/OrderStatus";
import {Category} from "../../../models/Category";
import {Discount} from "../../../models/Discount";
import {ProductResponse} from "../../../models/response/ProductResponse";
import {Product} from "../../../models/Product";

export const updateCustomer = async (customerId: number, customer: Customer): Promise<CustomerResponse> => {
    return ApiService.put(`/api/admin/customer/${customerId}`, customer);
}
export const editOrder = async (orderRequest: OrderEditReques, orderId: string): Promise<void> => {
    return ApiService.put(`/api/admin/order/${orderId}`, orderRequest);
}
export const changeOrderStatus = async (status: OrderStatus, orderId: number): Promise<void> => {
    return ApiService.put(`/api/admin/status/${status}/${orderId}`, status);
}
export const updateCategory = async (category: Category): Promise<void> => {
    return ApiService.put("/api/admin/category", category);
}

export const updateDiscount = async (dto: Discount) => {
    const response = await ApiService.put("/api/admin/discount", dto);
    return response.data;
};

export const updateProduct = async (id: string, dto: Product): Promise<ProductResponse> => {
    console.log("du lieu da tai len", dto);
    const response = await ApiService.put(`/api/admin/product/${id}`, dto);
    return response.data;
};



