// src/server/api/cart/cart.get.ts

import { CartResponse } from "../../../models/response/CartResponse";
import ApiService from "../ApiService";

// Lấy giỏ hàng theo customerId
export const getCartByCustomerId = async (customerId: number): Promise<CartResponse> => {
    const result = await ApiService.get(`/api/cart/${customerId}`);
    return result.data; // đảm bảo đúng structure phản hồi từ BE
};

// Lấy tổng số lượng sản phẩm trong cart theo cartId
export const getCartQuantityByCartId = async (cartId: number): Promise<number> => {
    const result = await ApiService.get(`/api/cart/quantity/${cartId}`);
    return result.data;
};
