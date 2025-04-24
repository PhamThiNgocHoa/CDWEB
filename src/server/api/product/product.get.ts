import {Product} from "../../../models/Product";
import ApiService from "../ApiService";
import {Category} from "../../../models/Category";

export const getProductById = async (productId: number): Promise<Product> => {
    return ApiService.get(`/api/product/${productId}`);
}
export const getListProduct = async (): Promise<Product[]> => {
    return ApiService.get("/api/product/list", false);
}
export const searchProduct = async (name: string): Promise<Product[]> => {
    return ApiService.get(`/api/product/search?name=${encodeURIComponent(name)}`, false);
};
export const listFindByName = async (name: string): Promise<Product[]> => {
    return ApiService.get(`/api/product/list/findByName/${name}`, false);
};
export const getListCategory = async (categoryId: number): Promise<Category[]> => {
    return ApiService.get(`/api/product//list/${categoryId}`);
};
