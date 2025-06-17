// ProductDetail.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, {useEffect, useState} from "react";
import formatToVND from "../hooks/formatToVND";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getProductById} from "../server/api/product/product.get";
import useCartItem from "../hooks/useCartItem";
import {CartItemRequest} from "../models/request/CartItemRequest";
import {getUser} from "../server/api/customers/customer.get";
import Notification from "../components/Notification";
import {ProductResponse} from "../models/response/ProductResponse";
import {useRating} from "../hooks/useRating";
import {RatingRequest} from "../server/api/rating/rating";
import useCustomer from "../hooks/useCustomer";

const ProductDetail = () => {
    const { id } = useParams();
    const { ratings, average, submitRating } = useRating(id ?? "");
    const {user} = useCustomer();
    const [comment, setComment] = useState("");
    const [score, setScore] = useState(5);
    const [product, setProduct] = useState<ProductResponse>();
    const [loading, setLoading] = useState(true);
    const {fetchSaveCartItem} = useCartItem();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState<"success" | "error">("success");


    const showSuccessNotification = (message: string) => {
        setNotificationMessage(message);
        setNotificationType("success");
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const showErrNotification = (message: string) => {
        setNotificationMessage(message);
        setNotificationType("error");
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }

    const handleSubmit = async () => {
        const rating: RatingRequest = {
            productId: id ?? "",
            customerId: user?.id ?? "",
            comment,
            score,
        };

        try {
            await submitRating(rating);
            showSuccessNotification("Đã gửi đánh giá");
            setComment("");
            setScore(5);
        } catch (error) {
           showErrNotification("Gửi đánh giá không thành công");
        }
    };


    useEffect(() => {
        if (id) {
            const productId = id;
            getProductById(productId)
                .then((data) => {
                    setProduct(data);
                })
                .catch((error) => {
                    console.error("Lỗi lấy thông tin sản phẩm:", error);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            showErrNotification("Vui lòng đăng nhập!");
            return;
        }
        if (!product) return;

        if (!product.stock || product.stock < 1) {
            showErrNotification("Sản phẩm đã hết hàng.");
            return;
        }
        try {
            const user = await getUser();
            if (!user.cartId) {
                showErrNotification("Sản không có quyền thêm sản phẩm.");
                return;
            }
            const cartItem: CartItemRequest = {
                cartId: user.cartId,
                productId: product.id,
                quantity: 1,
            };

            await fetchSaveCartItem(cartItem);
            showSuccessNotification("Sản phẩm đã được thêm vào giỏ hàng!");
            localStorage.setItem("cartUpdated", new Date().toISOString());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header/>
            <div className="bg-gray-100">
                <div className="sm:px-10 md:px-20 lg:px-28">
                    {showNotification && (
                        <Notification
                            message={notificationMessage}
                            type={notificationType}
                            onClose={() => setShowNotification(false)}
                        />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="">
                            <img
                                src={product?.img || "https://via.placeholder.com/400x400?text=No+Image"}
                                alt={product?.name}
                                className="w-full h-auto mb-4"
                            />
                            <p className="text-gray-700 mt-2 bg-white p-4">
                                {product?.detail
                                    ? product.detail.length > 300
                                        ? `${product.detail.slice(0, 300)}...`
                                        : product.detail
                                    : "Chưa có mô tả"}
                            </p>

                        </div>

                        <div className="">
                            <div className="bg-white p-2 px-4">
                                <h2 className="text-2xl font-bold mb-4">{product?.name}</h2>
                                {Number(product?.discount) > 0 ? (
                                    <div className="flex">
                                        <span className="text-xl text-red-500 mb-4 font-bold">
                                            {formatToVND((Number(product?.price) * (1 - Number(product?.discount))))}
                                        </span>

                                        <span
                                            className="bg-red-500 rounded-md h-4 px-2 py-1 text-white text-xs pb-6 ml-10">
                                            {product?.discount ? `${(Number(product.discount) * 100).toFixed(0)} %` : "0 %"}
                                        </span>

                                        <span className="text-md line-through text-gray-500 mb-4 font-bold ml-10">
                                            {formatToVND((product?.price ?? 0))}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                        <span className="text-xl text-red-500 font-bold ml-2">
                                            {formatToVND((product?.price ?? 0))}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full sm:w-auto flex-1 px-4 sm:px-6 py-2 border-2 border-red-500 font-semibold text-red-400 rounded-md text-center break-words whitespace-normal text-sm sm:text-base hover:bg-red-200">
                                        Thêm vào giỏ hàng
                                    </button>
                                    <Link
                                        to="/searchProduct"
                                        className="w-full sm:w-auto flex-1 px-4 sm:px-6 py-2 bg-yellow-500 text-white rounded-md text-center break-words whitespace-normal text-sm sm:text-base hover:bg-yellow-600">
                                        Xem thêm sản phẩm
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white p-4 mb-4 mt-4">
                                <p className="text-sm text-gray-700">
                                    <strong>Chính sách ưu đãi:</strong>
                                </p>
                                <ul className="text-sm text-gray-700 list-disc ml-4">
                                    <li>Thời gian giao hàng: Giao nhanh và uy tín</li>
                                    <li>Chính sách đổi trả: Đổi trả miễn phí toàn quốc</li>
                                    <li>Chính sách khách sỉ: Ưu đãi khi mua số lượng lớn</li>
                                </ul>
                            </div>

                            <div className="space-y-4 p-4 bg-white">
                                <div className="flex justify-between border-b pb-2">
                                    <strong>Mã hàng: </strong>
                                    <span>{product?.id || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <strong>Tên Nhà Cung Cấp: </strong>
                                    <span>{product?.supplier || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <strong>Tác giả: </strong>
                                    <span>{product?.author || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <strong>Nhà xuất bản: </strong>
                                    <span>{product?.publisher || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <strong>Năm xuất bản: </strong>
                                    <span>{product?.publishYear || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <strong>Trọng lượng (gr): </strong>
                                    <span>{product?.weight || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <strong>Kích Thước Bao Bì: </strong>
                                    <span>{product?.size || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <strong>Số trang: </strong>
                                    <span>{product?.pageNumber || "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <strong>Hình thức: </strong>
                                    <span>{product?.form || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-4 sm:px-10 md:px-20 lg:px-36">
                    <div className="p-4 bg-white">
                        <h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="mt-6 border-t pt-4">
                                <h4 className="font-semibold mb-2">Thêm đánh giá của bạn:</h4>
                                <textarea
                                    className="border p-2 w-full mb-2"
                                    placeholder="Viết đánh giá..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => setScore(val)}
                                                className="text-2xl focus:outline-none"
                                            >
                                                <span className={val <= score ? "text-yellow-400" : "text-gray-300"}>
                                                  ★
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={handleSubmit}
                                >
                                    Gửi đánh giá
                                </button>
                            </div>

                            <div className="my-6 space-y-4">
                                {Array.isArray(ratings) && ratings.length > 0 ? (
                                    ratings.map((r) => (
                                        <div key={r.id} className="border-b pb-4">
                                            <div className="font-semibold">{r.customerName}</div>
                                            <div className="text-yellow-500">
                                                {"★".repeat(r.score) + "☆".repeat(5 - r.score)}
                                            </div>
                                            <div>{r.comment}</div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(r.createdAt ?? "").toLocaleString()}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">Chưa có đánh giá nào cho sản phẩm này.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    )
        ;
};

export default ProductDetail;
