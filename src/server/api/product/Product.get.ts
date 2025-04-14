import {Product} from "../../../models/Product";
import ApiService from "../ApiService";

export const getProductById = async (productId: number): Promise<Product> => {
    const {data} = await ApiService.get(`/api/product/${productId}`);
    return data;
}
export const getListProduct = async (): Promise<Product[]> => {
    const {data} = await ApiService.get("/api/product/list");
    return data;

}
