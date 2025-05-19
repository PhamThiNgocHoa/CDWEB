import {Category} from "../../../models/Category";
import ApiService from "../ApiService";

export const getListCategory = async (): Promise<Category[]> => {
    return ApiService.get("/api/category/list");

}

export const getCategoryById = async (categoryId: number): Promise<Category> => {
    return ApiService.get(`/api/category/${categoryId}`, false);

}