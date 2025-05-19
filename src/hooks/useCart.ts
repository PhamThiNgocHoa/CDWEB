import { useState, useEffect } from "react";
import { CartResponse } from "../models/response/CartResponse";
import { getCartByCustomerId } from "../server/api/cart/cart.get";

export const useCart = (customerId: number | null) => {
    const [cartData, setCartData] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = async () => {
        if (!customerId) return;
        setLoading(true);
        setError(null);

        try {
            const data = await getCartByCustomerId(customerId);
            setCartData(data);
        } catch (err) {
            setError("Lỗi khi tải giỏ hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [customerId]);

    return { cartData, loading, error, fetchCart, setCartData };
};

export default useCart;
