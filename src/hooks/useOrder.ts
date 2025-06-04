import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {OrderDetailRequest} from "../models/request/OrderDetailRequest";
import {OrderMethod} from "../enums/OrderMethod";
import {createOrder} from "../server/api/order/order.post";
import {createPayment} from "../server/api/payment/payment.post";
import {getOrderByCustomerId} from "../server/api/order/order.get";
import {OrderResponse} from "../models/response/OrderResponse";
import useCustomer from "./useCustomer";
import {OrderStatus} from "../enums/OrderStatus";
import {changeOrderStatus} from "../server/api/order/order.put";

const useOrder = () => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState<string | undefined>(undefined);
    const [orders, setOrders] = useState<OrderResponse[]>();
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [loading, setLoading] = useState(false);

    const {user} = useCustomer();

    const token = localStorage.getItem("authToken");
    if (!token || token.trim() === "" || token === "null") {
        setError("Không có token đăng nhập");
    }

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
                if (!token) {
                    setError("Không có token đăng nhập");
                    return;
                }
                setLoading(true);
                setError(null);
                try {
                    const orderResponse = await createOrder(order, method);
                    setOrderId(orderResponse);

                    if (method === OrderMethod.VN_PAY) {
                        const returnUrl = `${window.location.origin}/payment-return`;

                        const paymentUrl = await createPayment(orderResponse ?? "", returnUrl);

                        if (paymentUrl) {
                            window.location.href = paymentUrl;
                        } else {
                            throw new Error("Không lấy được đường dẫn thanh toán");
                        }
                    } else {
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Lỗi khi tạo đơn hàng hoặc thanh toán:", error);
                    throw error;
                }
            },
            [navigate]
        )
    ;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) {
                setError("Không có token đăng nhập");
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                if (user?.id) {
                    const data = await getOrderByCustomerId(user.id);
                    setOrders(data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            }
        };

        fetchOrders();
    }, [user]);


    const handleCancelOrder = async (orderId: string, status: OrderStatus) => {
        if (!token || token.trim() === "" || token === "null") {
            setError("Không có token đăng nhập");
            return;
        }

        try {
            if (status === OrderStatus.PENDING || status === OrderStatus.PENDING_PAYMENT) {
                await changeOrderStatus(OrderStatus.CANCELLED, orderId);
                setNotification({message: "Đơn hàng đã bị hủy thành công!", type: "success"});
            } else {
                setNotification({message: "Không thể hủy đơn hàng đã xử lý hoặc đã giao!", type: "error"});
            }
        } catch (error) {
            setNotification({message: "Lỗi khi hủy đơn hàng!", type: "error"});
            setError("Không thể hủy đơn hàng");
        }
    };

    const handleViewDetail = (orderId: string) => {
        navigate(`/orderDetail/${orderId}`);
    };

    return {
        fetchCreateOrderAndPayment,
        orders,
        orderId,
        handleCancelOrder,
        handleViewDetail,
        notification,
        setNotification
    };
};

export default useOrder;
