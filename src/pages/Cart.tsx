import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import formatToVND from "../hooks/formatToVND";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import {getCurrentUserId} from "../utils/authUtils";

const Cart = () => {
    const tokenData = getCurrentUserId();
    const customerId = tokenData || null;

    const { cartData, loading, error } = useCart(customerId);

    const [cartItems, setCartItems] = useState<any[]>([]);

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

    const handleSelect = (id: number, isChecked: boolean) => {
        const updated = cartItems.map(item =>
            item.id === id ? { ...item, selected: isChecked } : item
        );
        setCartItems(updated);
    };

    const handleQuantityChange = (id: number, action: "increase" | "decrease") => {
        const updated = cartItems.map(item => {
            if (item.id === id) {
                let quantity = item.quantity;
                if (action === "increase") quantity += 1;
                else if (action === "decrease" && quantity > 1) quantity -= 1;
                return { ...item, quantity };
            }
            return item;
        });
        setCartItems(updated);
    };

    const removeItem = (id: number) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return item.selected ? total + item.price * item.quantity : total;
        }, 0);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="p-6 text-center">Đang tải giỏ hàng...</div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="p-6 text-center text-red-600">Lỗi: {error}</div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
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
                                        onSelect={handleSelect}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-8 sm:mt-6 max-w-md w-full mt-4 mx-auto">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-md mb-4 border-b pb-2 font-semibold">Mã giảm giá</h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Nhập mã giảm giá"
                                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">ÁP MÃ</button>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-md mb-4 border-b pb-2 font-semibold">Thành Tiền</h3>
                            <div className="flex justify-between mb-4">
                                <span className="text-lg">Tổng Số Tiền (gồm VAT)</span>
                                <span className="text-xl text-red-500 font-bold">
                                    {formatToVND(calculateTotal() * 1000)} VND
                                </span>
                            </div>
                            <button className="w-full py-3 bg-red-500 text-white rounded-md">THANH TOÁN</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
