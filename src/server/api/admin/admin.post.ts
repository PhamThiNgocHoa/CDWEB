import {Customer} from "../../../models/Customer";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import ApiService from "../ApiService";
import {Category} from "../../../models/Category";
import {Discount} from "../../../models/Discount";
import {CustomerRequest} from "../../../models/request/CustomerRequest";

export const addCustomer = async (customer: CustomerRequest): Promise<CustomerResponse> => {
    console.log("Sending customer to API:", customer);  // 🐞 debug input
    const response = await ApiService.post("/api/admin/customer", customer);
    return response.data;
}


export const addCategory = async (category: Category):Promise<Category> => {
    return ApiService.post("/api/admin/category", category);
}

export const importCategoryExcel = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await ApiService.post("/api/admin/category/upload", formData, {}, true);
    return response.data;
};

export const importProductExcel = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
        const response = await ApiService.post("/api/admin/product/upload", formData, {}, true);
        console.log("✅ Thêm sản phẩm từ Excel thành công");
        return response.data;
    } catch (error) {
        console.error("❌ Thêm sản phẩm từ Excel thất bại:", error);
        throw error; // Nếu muốn xử lý tiếp ở component
    }
};


export const createDiscount = async (dto: Omit<Discount, "id">): Promise<Discount | null> => {
    try {
        const res = await ApiService.post("/api/admin/discount", dto);
        return res;
    } catch (error) {
        return null;
    }
};








