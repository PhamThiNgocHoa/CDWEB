import React from 'react';
import {formatToVND} from "../hooks/formatToVND";

interface ProductProps {
    id: number;
    name: string;
    img: string;
    price: number;
    discount?: number;
    quantitySold: number;
    onClick: () => void;
}

const CardProduct: React.FC<ProductProps> = (props) => {
    return (
        <div className="cursor-pointer w-64 bg-white rounded-lg border border-gray-300 shadow-lg p-2 py-4"
             onClick={props.onClick}
        >
            {/* Hình ảnh sản phẩm */}
            <img src={props.img} alt={props.name} className="w-full h-48 object-cover rounded-md"/>

            {/* Tiêu đề sản phẩm */}
            {/* Tiêu đề sản phẩm */}
            <h2 className="text-md truncate mt-3">
                {props.name}
            </h2>

            {/* Giá sản phẩm */}
            <div className="flex flex-row w-full justify-between gap-2 mt-2">
                <span className="text-red-500 font-bold">{formatToVND(props.price * 1000)} VND</span>
                <span className="bg-red-500 p-1 rounded-md text-white text-xs">
                    {(props.discount ? props.discount * 100 : 0)} %
                </span>
            </div>

            {/* Số lượng đã bán */}
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
    );
};

export default CardProduct;
