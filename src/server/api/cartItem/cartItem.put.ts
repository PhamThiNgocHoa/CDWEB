import ApiService from "../ApiService";

export const updateCartItem = async (cartItemId: number, quantity: number): Promise<void> => {
    return ApiService.put(`/api/cartItem/updatequantity/${cartItemId}?quantity=${quantity}`, {});
}
