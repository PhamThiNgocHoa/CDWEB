import {Product} from "../../../models/Product";
import ApiService from "../ApiService";

export const addProduct = async (product: Product): Promise<Product> => {
    return ApiService.post("/api/product", product, {}, false);

}