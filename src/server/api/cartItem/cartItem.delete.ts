import ApiService from "../ApiService";

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
    return ApiService.delete(`/api/cartItem/${cartItemId}`);
}
export const deleteCartItemByCartId = async (cartId: number): Promise<void> => {
    return ApiService.delete(`/api/cartItem/cartId/${cartId}`)
}