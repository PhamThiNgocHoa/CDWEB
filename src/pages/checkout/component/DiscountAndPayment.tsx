// // components/checkout/DiscountAndPayment.tsx
// import React from "react";
// import {OrderMethod, OrderMethodDisplayName} from "../../../enums/OrderMethod";
//
// interface Props {
//     discountCode: string;
//     paymentMethod: OrderMethod;
//     setDiscountCode: (code: string) => void;
//     setPaymentMethod: (method: OrderMethod) => void;
//     handleApplyDiscount: () => void;
// }
//
// const DiscountAndPayment: React.FC<Props> = ({ discountCode, paymentMethod, setDiscountCode, setPaymentMethod, handleApplyDiscount }) => {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="bg-white p-4">
//                 <h3 className="font-medium text-lg mb-2">Áp mã giảm giá</h3>
//                 <div className="flex space-x-4">
//                     <input className="p-2 border border-gray-300 rounded-md flex-1" name="discountCode" type="text" value={discountCode}  onChange={(e) => setDiscountCode(e.target.value)} placeholder="Nhập mã giảm giá" />
//                     <button onClick={handleApplyDiscount} className="bg-blue-500 text-white px-4 py-2 rounded-md">Áp dụng</button>
//                 </div>
//             </div>
//
//             <div className="bg-white p-4">
//                 <h3 className="font-medium text-lg mb-2">Phương thức thanh toán</h3>
//                 {Object.values(OrderMethod).map((method) => (
//                     <label key={method} className="block mb-2">
//                         <input type="checkbox" style={{ accentColor: "red" }} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="mr-2" />
//                         {OrderMethodDisplayName[method]}
//                     </label>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default DiscountAndPayment;
import React, { useEffect } from "react";
import { OrderMethod, OrderMethodDisplayName } from "../../../enums/OrderMethod";

interface Props {
    discountCode: string;
    paymentMethod: OrderMethod;
    setDiscountCode: (code: string) => void;
    setPaymentMethod: (method: OrderMethod) => void;
    handleApplyDiscount: (code: string) => void; // truyền luôn mã vào đây
}

const DiscountAndPayment: React.FC<Props> = ({
                                                 discountCode,
                                                 paymentMethod,
                                                 setDiscountCode,
                                                 setPaymentMethod,
                                                 handleApplyDiscount,
                                             }) => {
    // Gọi handleApplyDiscount mỗi khi discountCode thay đổi
    useEffect(() => {
        if (discountCode.trim() !== "") {
            handleApplyDiscount(discountCode);
        }
    }, [discountCode, handleApplyDiscount]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mã giảm giá không có nút */}
            <div className="bg-white p-4">
                <h3 className="font-medium text-lg mb-2">Nhập mã giảm giá</h3>
                <input
                    type="text"
                    name="discountCode"
                    placeholder="Nhập mã giảm giá"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white p-4">
                <h3 className="font-medium text-lg mb-2">Phương thức thanh toán</h3>
                {Object.values(OrderMethod).map((method) => (
                    <label key={method} className="block mb-2 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={paymentMethod === method}
                            onChange={() => setPaymentMethod(method)}
                            className="mr-2"
                            style={{ accentColor: "red" }}
                        />
                        {OrderMethodDisplayName[method]}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default DiscountAndPayment;
