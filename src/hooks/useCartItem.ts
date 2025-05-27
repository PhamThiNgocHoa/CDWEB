import {CartItemRequest} from "../models/request/CartItemRequest";
import {saveCartItem} from "../server/api/cartItem/cartItem.post";
import {updateCartItem, updateQuantityCartItem} from "../server/api/cartItem/cartItem.put";
import {deleteCartItem} from "../server/api/cartItem/cartItem.delete";
import {useState} from "react";
import {CartItemResponse} from "../models/response/CartItemResponse";
import {ProductResponse} from "../models/response/ProductResponse";

// Hàm sử dụng trong custom hook để quản lý giỏ hàng
function useCartItem() {
    const [cartItems, setCartItems] = useState<CartItemResponse[]>([]); // Lưu giỏ hàng trong state

    const getCartItems = async () => {
        return [];
    };
    const fetchUpdateCartItem = async (cartItemId: string, quantity: number): Promise<void> => {
        try {
            // Cập nhật local trước
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === cartItemId ? {...item, quantity} : item
                )
            );

            // Gọi API update backend
            await updateCartItem(cartItemId, quantity);

            // Không cần fetch lại toàn bộ giỏ hàng nếu backend ổn
        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
            // Có thể rollback nếu muốn
            await getCartItems().then(setCartItems);
        }
    };

    const fetchSaveCartItem = async (cartItemRequest: CartItemRequest): Promise<void> => {
        try {
            // Cập nhật state local với object chuẩn
            setCartItems(prevItems => [
                ...prevItems,
                {
                    id: Date.now().toString(),
                    product: {
                        id: cartItemRequest.productId,
                        name: "Sản phẩm tạm thời",  // hoặc lấy từ dữ liệu khác nếu có
                        // thêm các trường khác của Product nếu cần
                    } as ProductResponse,
                    quantity: cartItemRequest.quantity,
                } as CartItemResponse,
            ]);

            // Gọi API lưu backend
            await saveCartItem(cartItemRequest);

            // Tốt nhất lấy lại cart chuẩn từ server sau khi lưu thành công
            const updatedCart = await getCartItems();
            setCartItems(updatedCart);

        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            // Có thể rollback hoặc báo lỗi UI
        }
    };


    const fetchDeleteCartItem = async (cartItemId: string): Promise<void> => {
        try {
            // Xóa local trước
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
