import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import formatToVND from "../hooks/formatToVND";

interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    selected: boolean;
    originalPrice?: number; // Nếu có
}

interface CartItemProps {
    item: CartItemType;
    onQuantityChange: (id: number, action: "increase" | "decrease") => void;
    onRemove: (id: number) => void;
    onSelect: (id: number, isChecked: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({item, onQuantityChange, onRemove, onSelect}) => {
    return (
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
            <input
                type="checkbox"
                checked={item.selected}
                onChange={(e) => onSelect(item.id, e.target.checked)}
                style={{accentColor: "red"}}
                className="w-6 h-6"
                aria-label={`Chọn sản phẩm ${item.name}`}
            />
            <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-md text-xs ml-4"
            />
            <div className="ml-4 w-full">
                <h3 className="text-md">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                        <button
                            className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                            onClick={() => onQuantityChange(item.id, "decrease")}
                            disabled={item.quantity <= 1}
                            aria-label={`Giảm số lượng của ${item.name}`}
                        >
                            -
                        </button>
                        <span className="mx-4">{item.quantity}</span>
                        <button
                            className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400 transition"
                            onClick={() => onQuantityChange(item.id, "increase")}
                            aria-label={`Tăng số lượng của ${item.name}`}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex items-center">
                        {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-gray-400 line-through mr-2">
                                {formatToVND(item.originalPrice)}
                            </p>
                        )}
                        <p className="font-semibold text-red-500 mr-4 pt-1">
                            {formatToVND(item.price * item.quantity )}
                        </p>
                        <button
                            className="text-red-500 mt-2 hover:text-red-700 transition"
                            onClick={() => onRemove(item.id)}
                            aria-label={`Xóa sản phẩm ${item.name} khỏi giỏ hàng`}
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
