import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import formatToVND from "../hooks/formatToVND";
import {CartItemResponse} from "../models/response/CartItemResponse";

interface CartItemProps {
    item: CartItemResponse;
    onQuantityChange: (id: string, action: "increase" | "decrease") => void;
    onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({item, onQuantityChange, onRemove}) => {
    return (
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
            <img
                src={item.product.img}
                alt={item.product.name}
                className="w-32 h-32 object-cover rounded-md text-xs ml-4"
            />
            <div className="ml-4 w-full">
                <h3 className="text-md">{item.product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                        <button
                            className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                            onClick={() => onQuantityChange(item.id, "decrease")}
                            disabled={item.quantity <= 1}
                            aria-label={`Giảm số lượng của ${item.product.name}`}
                        >
                            -
                        </button>
                        <span className="mx-4">{item.quantity}</span>
                        <button
                            className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400 transition"
                            onClick={() => onQuantityChange(item.id, "increase")}
                            aria-label={`Tăng số lượng của ${item.product.name}`}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex items-center">
                        <p className="font-semibold text-red-500 mr-4 pt-1">
                            {formatToVND(item.product.price * item.quantity * (1 - Number(item.product.discount)))}
                        </p>
                        <button
                            className="text-red-500 mt-2 hover:text-red-700 transition"
                            onClick={() => onRemove(item.id)}
                            aria-label={`Xóa sản phẩm ${item.product.name} khỏi giỏ hàng`}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
