import React, {useState} from 'react';
import {formatToVND} from "../hooks/formatToVND";
import useCartItem from "../hooks/useCartItem";
import {getUser} from "../server/api/customers/customer.get";
import {CartItemRequest} from "../models/request/CartItemRequest";
import {Product} from "../models/Product";

interface ProductProps {
    id: string;
    name: string;
    img: string;
    price: number;
    discount?: number;
    quantitySold?: number;
    onClick: () => void;
}

const CardProduct: React.FC<ProductProps> = (props) => {
    const {fetchSaveCartItem} = useCartItem();


    const handleAddToCart = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return;
        }

        try {
            const user = await getUser();
            if (!user.cartId) {
                return;
            }

            const cartItem: CartItemRequest = {
                cartId: user.cartId,
                productId: props.id,
                quantity: 1,
            };
            await fetchSaveCartItem(cartItem);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="w-72 cursor-pointer bg-white rounded-lg border border-gray-300 shadow-lg p-2 py-4"
                 onClick={props.onClick}
            >
                <img src={props.img} alt={props.name} className="w-full h-48 object-cover rounded-md"/>

                <h2 className="text-md truncate mt-3">
                    {props.name}
                </h2>

                {/* Giá sản phẩm */}
                <div className="flex flex-row w-full justify-between gap-2 mt-2">
                    {Number(props.discount) > 0 ? (
                        <>
                            <span className="text-red-600">
                              {formatToVND(props.price * (1 - Number(props.discount)))}
                            </span>

                            <span className="line-through text-gray-500 text-sm mr-2">
                              {formatToVND(props.price)}
                            </span>
                        </>
                    ) : (
                        <span className="text-red-600">{formatToVND(props.price)}</span>
                    )}

                    <span className="bg-red-500 p-1 rounded-md text-white text-xs  bg-red-200">
                    {(props.discount ? props.discount * 100 : 0)} %
                </span>
                </div>

                <div className="mt-2 text-center">
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                        </div>
                        <div className="flex mb-2 items-center justify-between">
                            <div className="w-full bg-gray-200 rounded-full h-6 relative">
                                <div
                                    className="bg-red-500 h-6 rounded-full flex items-center justify-center text-white text-xs"
                                    style={{width: `${(15 / 100) * 100}%`}}
                                >
                              <span className="absolute left-1 text-center text-black ">
                                Đã bán {15}
                              </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <button className="w-72 bg-red-600 text-white p-2 rounded-md mt-4"
                    onClick={handleAddToCart}>Thêm
                vào
                giỏ
            </button>
        </div>

    );
};

export default CardProduct;
