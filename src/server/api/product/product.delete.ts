import ApiService from "../ApiService";

export const deleteProduct = async (productId: number): Promise<void> => {
    return ApiService.delete(`/api/product/${productId}`);
}