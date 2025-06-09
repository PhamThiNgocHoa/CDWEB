import {Product} from "../../../models/Product";
import ApiService from "../ApiService";
import {Category} from "../../../models/Category";
import {ProductResponse} from "../../../models/response/ProductResponse";
import {BookForm} from "../../../enums/BookForm";

export const getProductById = async (productId: string): Promise<ProductResponse> => {
    const result = await ApiService.get(`/api/product/${productId}`);
    return result.data;
}
export const getListProduct = async (): Promise<ProductResponse[]> => {
    try {
        const result = await ApiService.get("/api/product/list", {}, {}, false);
        return result.data;
    } catch (error: any) {
        // Nếu muốn có thêm log lỗi, hoặc xử lý ở đây
        // console.error("Lỗi khi lấy danh sách sản phẩm:", error);

        // Ném lỗi lên cho caller xử lý tiếp
        throw error;
    }
};


export const searchProduct = async (name: string): Promise<ProductResponse[]> => {
    const result = await ApiService.get(`/api/product/search?name=${encodeURIComponent(name)}`, false);
    return result.data;
};
export const listFindByName = async (name: string): Promise<ProductResponse[]> => {
    const result = await ApiService.get(`/api/product/list/findByName/${name}`, false);
    return result.data;
};
export const getListCategory = async (categoryId: number): Promise<Category[]> => {
    return ApiService.get(`/api/product//list/${categoryId}`);
};
export const getProductSale = async (): Promise<ProductResponse[]> => {
    const result = await ApiService.get("/api/product/sale", {}, {}, false);
    return result.data;
}

export const filterProduct = async (
    name?: string,
    categoryId?: string,
    bookForm?: BookForm,
    minPrice?: number,
    maxPrice?: number
): Promise<ProductResponse[]> => {
    const params: any = {};
    if (name) params.name = name;
    if (categoryId) params.categoryId = categoryId;
    if (bookForm) params.form = bookForm;
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;

    const response = await ApiService.get("/api/product/filter", params, {}, false);
    return response.data;
};

