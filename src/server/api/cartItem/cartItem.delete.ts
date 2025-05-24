import ApiService from "../ApiService";

export const deleteCartItem = async (cartItemId: string): Promise<void> => {
    return ApiService.delete(`/api/cartItem/${cartItemId}`);
}
export const deleteCartItemByCartId = async (cartId: number): Promise<void> => {
    return ApiService.delete(`/api/cartItem/cartId/${cartId}`)
}