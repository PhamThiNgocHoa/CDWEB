import Header from "../components/Header";
import Footer from "../components/Footer";
import formatToVND from "../hooks/formatToVND";
import useOrder from "../hooks/useOrder";
import {OrderStatus, OrderStatusDisplayName} from "../enums/OrderStatus";
import {useEffect, useState} from "react";
import {OrderDetailResponse} from "../models/response/OrderDetailResponse";
import {getOrderDetailByOrderId} from "../server/api/orderDetail/orderDetail.get";
import {useParams} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

function OrderDetail() {
    const {orders} = useOrder();
    const [orderDetail, setOrderDetail] = useState<OrderDetailResponse[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const {orderId} = useParams<{ orderId: string }>();
    const currentOrder = orders?.find(order => order.id === orderId);
    const {token} = useAuth();

    if (!token || token.trim() === "" || token === "null") {
        setError("Không có token đăng nhập");
    }
    useEffect(() => {
        const fetchGetOrderById = async () => {
            if (!token) {
                setError("Không có token đăng nhập");
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await getOrderDetailByOrderId(orderId ?? "");
                setOrderDetail(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            }
        };
        fetchGetOrderById();
    }, [orderId]);

    return (
        <>
            <Header/>
            <main className="bg-gray-100 min-h-screen py-10">
                <section className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-8 text-center text-red-500">
                        Chi tiết đơn hàng
                    </h1>

                    <div className="flex flex-row justify-between">
                        {/* Thông tin người nhận */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <span role="img" aria-label="User">
                            👤
                          </span>{" "}
                                Thông tin người nhận
                            </h2>
                            <ul className="space-y-1 pl-10 text-gray-700">
                                <li>
                                    <strong>Họ tên:</strong> {orders?.[0]?.customerDTO?.fullname ?? ""}

                                </li>
                                <li>
                                    <strong>Số điện thoại:</strong> {orders?.[0]?.customerDTO?.phone}
                                </li>
                            </ul>
                        </section>

                        {/* Địa chỉ giao hàng */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <span role="img" aria-label="Location">
                            📍
                          </span>{" "}
                                Địa chỉ giao hàng
                            </h2>
                            <p className="text-gray-700 pl-10">
                                {`${orders?.[0].address}`}
                            </p>
                        </section>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                          <span role="img" aria-label="Package">
                            📦
                          </span>{" "}
                            Sản phẩm đã đặt
                        </h2>
                        <div className="space-y-6">
                            {orderDetail?.map((oderDetail) => (
                                <div
                                    key={oderDetail.id}
                                    className="flex items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <img
                                        src={oderDetail.productResponseDTO.img}
                                        alt={oderDetail.productResponseDTO.name}
                                        className="w-24 h-24 rounded object-cover mr-6"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-lg">{oderDetail.productResponseDTO.name}</p>
                                        <p className="text-gray-600">Số lượng: {oderDetail.quantity}</p>
                                        <p className="text-gray-600">
                                            Giá: {formatToVND(oderDetail.productResponseDTO.price * (1 - (Number(oderDetail.productResponseDTO.discount))))}
                                        </p>
                                    </div>
                                    <div className="text-lg font-semibold text-red-500 text-right min-w-[100px]">
                                        {formatToVND(oderDetail.productResponseDTO.price * (1 - (Number(oderDetail.productResponseDTO.discount))) * oderDetail.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tổng tiền & trạng thái */}
                    <section className="border-t pt-6 flex flex-row justify-between items-end space-y-2 text-gray-800">
                        <div>
                            <p className="text-blue-600 font-semibold text-lg">
                                Trạng thái đơn
                                hàng: {OrderStatusDisplayName[orders?.[0]?.status as OrderStatus] ?? "Không xác định"}
                            </p>

                            <p>
                                <strong>Ngày đặt hàng:</strong> {orders?.[0]?.orderDate}
                            </p>
                            <p>
                                <strong>Mã đơn hàng:</strong> {orders?.[0]?.id}
                            </p>
                        </div>
                        <div className="">
                            {/*<p>Tổng tiền: {formatToVND((orders?.[0]?.totalAmount) + (orders?.[0]?.totalAmount * orders?.[0]?.d) ?? 0)}</p>*/}
                            {/*<p>Giảm giá: </p>*/}
                            <p className="text-xl font-bold text-red-500 pt-2">
                                <strong>Tổng thanh toán:</strong>{" "}
                                {formatToVND(currentOrder?.totalAmount ?? 0)}
                            </p>
                        </div>

                    </section>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default OrderDetail;
