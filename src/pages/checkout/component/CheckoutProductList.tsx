import { useEffect, useState } from "react";
import formatToVND from "../../../hooks/formatToVND";
import useCart from "../../../hooks/useCart";
import useCustomer from "../../../hooks/useCustomer";
import { CartItemResponse } from "../../../models/response/CartItemResponse";

const CheckoutProductList: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<{ id: string; quantity: number }[]>([]);
    const { user } = useCustomer();
    const { cartData } = useCart(user?.id);

    const [checkoutItems, setCheckoutItems] = useState<CartItemResponse[]>([]);

    useEffect(() => {
        const storedItems = localStorage.getItem("checkoutItems");
        if (storedItems) {
            try {
                setSelectedItems(JSON.parse(storedItems));
            } catch (error) {
                console.error("Lỗi parse checkoutItems:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (!cartData || !cartData.cartItems) return;

        // Kết hợp selectedItems với cartData.items
        const matchedItems: CartItemResponse[] = selectedItems
            .map((selectedItem) => {
                const found = cartData.cartItems.find((item) => item.id === selectedItem.id);
                if (found && found.product) {
                    return {
                        ...found,
                        quantity: selectedItem.quantity // dùng quantity đã chọn
                    };
                }
                return null;
            })
            .filter((item): item is CartItemResponse => item !== null);

        setCheckoutItems(matchedItems);
    }, [cartData, selectedItems]);

    if (checkoutItems.length === 0) {
        return <p>Giỏ hàng của bạn đang trống hoặc không có sản phẩm đã chọn.</p>;
    }

    return (
        <div className="bg-white p-6 rounded-md mb-6 mt-10 mb-10">
            <h3 className="text-lg font-medium mb-4">Danh sách sản phẩm</h3>
            <div className="space-y-4">
                {checkoutItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.product.img}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-red-500">
                            {formatToVND(item.product.price * item.quantity)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default CheckoutProductList;
