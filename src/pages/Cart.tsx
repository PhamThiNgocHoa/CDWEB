import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import formatToVND from "../hooks/formatToVND";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import {getCurrentUserId} from "../utils/authUtils";
import useCartItem from "../hooks/useCartItem";
import {CartItemRequest} from "../models/request/CartItemRequest";
import {Link} from "react-router-dom";

const Cart = () => {

    const tokenData = getCurrentUserId();
    const customerId = tokenData || undefined;
    const {fetchCart} = useCart(customerId);

    const {cartData, loading, error} = useCart(customerId);

    const [cartItems, setCartItems] = useState<any[]>([]);
    const {fetchDeleteCartItem, fetchUpdateQuantityCartItem} = useCartItem();

    useEffect(() => {
        if (cartData?.cartItems) {
            const itemsWithSelect = cartData.cartItems.map(item => ({
                id: item.id,
                name: item.product.name,
                image: item.product.img,
                price: item.product.price,
                quantity: item.quantity,
                selected: false,
            }));
            setCartItems(itemsWithSelect);
        }
    }, [cartData]);

    const handleQuantityChange = async (id: string, action: "increase" | "decrease") => {
        let updatedItems = [...cartItems];
        const itemToUpdate = updatedItems.find(item => item.id === id);

        if (itemToUpdate) {
            let newQuantity = itemToUpdate.quantity;

            if (action === "increase") {
                newQuantity += 1;
                await fetchCart();
            } else if (action === "decrease" && newQuantity > 1) {
                newQuantity -= 1;
                await fetchCart();
            }

            itemToUpdate.quantity = newQuantity;

            setCartItems(updatedItems);

            const cartItemRequest: CartItemRequest = {
                cartId: itemToUpdate.cartId,
                productId: itemToUpdate.productId,
                quantity: newQuantity,
            };

            await fetchUpdateQuantityCartItem(id, cartItemRequest);
        }
    };


    const removeItem = async (id: string) => {
        await fetchDeleteCartItem(id);

        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };


    if (loading) {
        return (
            <>
                <Header/>
                <div className="p-6 text-center">Đang tải giỏ hàng...</div>
                <Footer/>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header/>
                <div className="p-6 text-center text-red-600">Lỗi: {error}</div>
                <Footer/>
            </>
        );
    }

    return (
        <>
            <Header/>
            <div className="bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 py-6 max-w-7xl mx-auto pb-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Giỏ Hàng Của Bạn</h2>
                        <div className="space-y-4 xs:px-8 sm:px-4">
                            {cartItems.length === 0 ? (
                                <div>Giỏ hàng trống</div>
                            ) : (
                                cartItems.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={removeItem}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-8 sm:mt-6 max-w-md w-full mt-4 mx-auto py-10">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-md mb-4 border-b pb-2 font-semibold">Thành Tiền</h3>
                            <div className="flex justify-between mb-4">
                                <span className="text-lg">Tổng Số Tiền (gồm VAT)</span>
                                <span className="text-xl text-red-500 font-bold">
                                    {formatToVND(calculateTotal())}
                                </span>
                            </div>
                            <Link to="/checkout">
                                <button
                                    className="w-full py-3 bg-red-500 text-white rounded-md"
                                >
                                    THANH TOÁN
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Cart;
