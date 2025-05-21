import {CartItemRequest} from "../models/request/CartItemRequest";
import {saveCartItem} from "../server/api/cartItem/cartItem.post";
import {updateCartItem, updateQuantityCartItem} from "../server/api/cartItem/cartItem.put";
import {deleteCartItem} from "../server/api/cartItem/cartItem.delete";
import {useState} from "react";
import {CartItemResponse} from "../models/response/CartItemResponse";

// Hàm sử dụng trong custom hook để quản lý giỏ hàng
function useCartItem() {
    const [cartItems, setCartItems] = useState<CartItemResponse[]>([]); // Lưu giỏ hàng trong state

    const getCartItems = async () => {
        return [];
    };

    const fetchSaveCartItem = async (cartItemRequest: CartItemRequest): Promise<void> => {
        try {
            await saveCartItem(cartItemRequest);
            const updatedCart = await getCartItems();
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };

    const fetchUpdateCartItem = async (cartItemId: number, quantity: number): Promise<void> => {
        try {
            await updateCartItem(cartItemId, quantity);
            const updatedCart = await getCartItems()
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
        }
    };

    const fetchDeleteCartItem = async (cartItemId: number): Promise<void> => {
        try {
            await deleteCartItem(cartItemId);
            const updatedCart = await getCartItems();
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
        }
    };
    const fetchUpdateQuantityCartItem = async (cartItemId: number, cartItemRequest: CartItemRequest): Promise<void> => {
        try {
            await updateQuantityCartItem(cartItemId, cartItemRequest);
            const updatedCart = await getCartItems();
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
        }
    };


    return {
        cartItems,
        setCartItems,
        fetchSaveCartItem,
        fetchUpdateCartItem,
        fetchDeleteCartItem,
        fetchUpdateQuantityCartItem
    };
}

export default useCartItem;
