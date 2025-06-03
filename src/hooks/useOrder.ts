import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderDetailRequest } from "../models/request/OrderDetailRequest";
import { OrderMethod } from "../enums/OrderMethod";
import { createOrder } from "../server/api/order/order.post";
import { createPayment } from "../server/api/payment/payment.post";

const useOrder = () => {
    const navigate = useNavigate();

    // Hàm gọi khi tạo đơn hàng và thanh toán
    const fetchCreateOrderAndPayment = useCallback(
        async (
            order: {
                orderDetails: OrderDetailRequest[];
                address: string;
                receiver: string;
                discountCode: string;
                numberPhone: any;
                customerId: string;
            },
            method: OrderMethod
        ): Promise<void> => {
            try {
                // 1. Tạo đơn hàng
                const orderResponse = await createOrder(order, method);
                const orderId = orderResponse;

                if (!orderId) throw new Error("Không lấy được ID đơn hàng sau khi tạo");

                const returnUrl = `${window.location.origin}/payment-return`;
                const paymentUrl = await createPayment(orderId, returnUrl);


                if (paymentUrl) {
                    window.location.href = paymentUrl;
                } else {
                    throw new Error("Không lấy được đường dẫn thanh toán");
                }
            } catch (error) {
                console.error("Lỗi khi tạo đơn hàng hoặc thanh toán:", error);
                throw error;
            }
        },
        []
    );

    return { fetchCreateOrderAndPayment };
};

export default useOrder;
