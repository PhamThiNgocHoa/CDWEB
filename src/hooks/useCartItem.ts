import {CartItemRequest} from "../models/request/CartItemRequest";
import {saveCartItem} from "../server/api/cartItem/cartItem.post";
import {updateCartItem, updateQuantityCartItem} from "../server/api/cartItem/cartItem.put";
import {deleteCartItem} from "../server/api/cartItem/cartItem.delete";
import {useState} from "react";
import {CartItemResponse} from "../models/response/CartItemResponse";
import {ProductResponse} from "../models/response/ProductResponse";

function useCartItem() {
    const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

    const getCartItems = async () => {
        return [];
    };
    const fetchUpdateCartItem = async (cartItemId: string, quantity: number): Promise<void> => {
        try {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === cartItemId ? {...item, quantity} : item
                )
            );

            await updateCartItem(cartItemId, quantity);

        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
            await getCartItems().then(setCartItems);
        }
    };

    const fetchSaveCartItem = async (cartItemRequest: CartItemRequest): Promise<void> => {
        try {
            setCartItems(prevItems => [
                ...prevItems,
                {
                    id: Date.now().toString(),
                    product: {
                        id: cartItemRequest.productId,
                        name: "Sản phẩm tạm thời",
                    } as ProductResponse,
                    quantity: cartItemRequest.quantity,
                } as CartItemResponse,
            ]);

            await saveCartItem(cartItemRequest);

            const updatedCart = await getCartItems();
            setCartItems(updatedCart);

        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };


    const fetchDeleteCartItem = async (cartItemId: string): Promise<void> => {
        try {
            setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));

            await deleteCartItem(cartItemId);
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
            // rollback hoặc fetch lại
        }
    };

    const fetchUpdateQuantityCartItem = async (cartItemId: string, cartItemRequest: CartItemRequest): Promise<void> => {
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
