import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import formatToVND from "../hooks/formatToVND";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import useCartItem from "../hooks/useCartItem";
import {CartItemRequest} from "../models/request/CartItemRequest";
import {Link, useNavigate} from "react-router-dom";
import Notification from "../components/Notification";
import {CartItemResponse} from "../models/response/CartItemResponse";
import useCustomer from "../hooks/useCustomer";

const Cart = () => {
    const {user} = useCustomer();
    const {fetchCart} = useCart(user?.id);
    const navigator = useNavigate();
    const {cartData, loading, error} = useCart(user?.id);

    const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
    const {fetchDeleteCartItem, fetchUpdateQuantityCartItem} = useCartItem();
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);


    useEffect(() => {
        if (cartData?.cartItems) {
            setCartItems(cartData.cartItems);
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
                cartId: itemToUpdate.id,
                productId: itemToUpdate.product.id ?? "",
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
            return total + (item.product.price * item.quantity * (1 - Number(item.product.discount)));
        }, 0);
    };

    const handSubmit = async () => {
        if (cartData?.cartItems.length === 0) {
            setNotification({message: "Giỏ hàng trống!", type: "error"});
            return;
        } else {
            navigator("/checkout");
        }
    }


    if (loading) {
        return (
            <>
                <Header/>
                <div className="p-6 text-center">Đang tải giỏ hàng...</div>
                <Footer/>
            </>
        );
    }

    if (user?.role === "ADMIN") {
        return (
            <>
                <Header/>
                <div className="p-6 text-center">Bạn không có giỏ hàng</div>
                <Footer/>
            </>
        );
    }


    return (
        <>
            <Header/>
            {notification && (
                <Notification message={notification.message} type={notification.type}
                              onClose={() => setNotification(null)}/>

            )}
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
                            <button
                                onClick={handSubmit}
                                className="w-full py-3 bg-red-500 text-white rounded-md"
                            >
                                THANH TOÁN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Cart;
