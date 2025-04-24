import ApiService from "../ApiService";
import {Product} from "../../../models/Product";

export const updateProduct = async (productId: number, product: Product): Promise<Product> => {
    return ApiService.put(`/api/product/${productId}`, product);
}