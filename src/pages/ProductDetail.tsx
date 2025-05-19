import Header from "../components/Header";
import Footer from "../components/Footer";
import React, {useEffect, useState} from "react";
import formatToVND from "../hooks/formatToVND";
import Breadcrumb from "../components/Breadcrumb";
import {useParams} from "react-router-dom";
import {getProductById} from "../server/api/product/product.get";
import {Product} from "../models/Product";

const ProductDetail = () => {
    // Lưu số lượng đánh giá cho từng sao (5 sao, 4 sao, ...)
    type Ratings = {
        [key: number]: number;
    };

    const [ratings, setRatings] = useState<Ratings>({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    });

    // Mảng đánh giá sản phẩm (bao gồm số sao và nội dung)
    const [reviews, setReviews] = useState([
        {stars: 5, content: "Sản phẩm tuyệt vời, rất đáng mua!"},
        {stars: 4, content: "Chất lượng tốt nhưng có thể cải thiện."},
        {stars: 3, content: "Sản phẩm trung bình, không như mong đợi."},
        {stars: 3, content: "Sản phẩm trung bình, không như mong đợi."},
    ]);

    const [newRating, setNewRating] = useState(0); // Lưu rating mới của người dùng
    const [reviewText, setReviewText] = useState(""); // Lưu mô tả đánh giá
    const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0); // Tính tổng số đánh giá

    // Hàm xử lý khi người dùng gửi đánh giá mới
    const handleReviewSubmit = () => {
        if (reviewText.trim() === "") {
            alert("Vui lòng viết đánh giá");
            return;
        }

        // Thêm đánh giá mới vào mảng reviews
        setReviews([...reviews, {stars: 5, content: reviewText}]);

        // Reset form sau khi gửi
        setReviewText("");
        alert("Đánh giá của bạn đã được gửi!");
    };
    const {id} = useParams<{ id: string }>(); // Lấy id từ URL
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const productId = parseInt(id, 10);
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

    return (
        <>
            <Header/>
            <div className="bg-gray-100">
                <div className="sm:px-10 md:px-20 lg:px-28">
                    <div className="flex flex-row">
                        {/* Ảnh sản phẩm */}
                        <div className="w-1/2 p-4">
                            <img
                                src={product?.img || "https://via.placeholder.com/400x400?text=No+Image"}
                                alt={product?.name}
                                className="w-full h-auto mb-4"
                            />
                            {/* Mô tả sản phẩm */}
                            <div className="mt-4 bg-white p-4">
                                <h3 className="text-xl font-semibold">Mô tả sản phẩm:</h3>
                                <p className="text-gray-700 mt-2">{product?.detail || "Chưa có mô tả"}</p>
                            </div>
                        </div>

                        {/* Thông tin sản phẩm và nút */}
                        <div className="w-1/2 p-4">
                            <div className="bg-white p-2 px-4">
                                <h2 className="text-2xl font-bold mb-4">{product?.name}</h2>
                                <div className="flex">
                                  <span className="text-xl text-red-500 mb-4 font-bold">
                                    {formatToVND((product?.price ?? 0) * 1000)} VND
                                  </span>
                                    <span className="bg-red-500 rounded-md h-4 px-2 py-1 text-white text-xs pb-6 ml-10">
                                        {product?.discount ? `${(product?.discount * 100).toFixed(0)} %` : "0 %"}
                                    </span>

                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <button
                                        className="w-full sm:w-auto flex-1 px-4 sm:px-6 py-2 border-2 border-red-500 font-semibold text-red-400 rounded-md text-center break-words whitespace-normal text-sm sm:text-base">
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button
                                        className="w-full sm:w-auto flex-1 px-4 sm:px-6 py-2 bg-yellow-500 text-white rounded-md text-center break-words whitespace-normal text-sm sm:text-base">
                                        Mua ngay
                                    </button>
                                </div>


                            </div>

                            {/* Thông tin ưu đãi */}
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

                            {/* Thông tin chi tiết sản phẩm */}
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

                {/* Đánh giá sản phẩm */}
                <div className="py-4 sm:px-10 md:px-20 lg:px-36 xl:px-48">
                    <div className="flex justify-between bg-white p-6 rounded-lg shadow-md px-10">
                        {/* Form đánh giá */}
                        <div className="mt-6 w-full">
                            <h4 className="text-xl font-semibold mb-4">Viết đánh giá của bạn:</h4>

                            {/* Textarea cho nội dung đánh giá */}
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                placeholder="Viết đánh giá của bạn..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />

                            {/* Nút gửi đánh giá */}
                            <button
                                onClick={handleReviewSubmit}
                                className="px-6 py-2 bg-red-500 text-white rounded-md"
                            >
                                Gửi đánh giá
                            </button>
                        </div>
                        {/* Hiển thị các đánh giá đã có */}
                        <div className="space-y-4 w-82 px-6 ml-20 mt-6">
                            {reviews.map((review, index) => (
                                <div key={index} className="border-b py-4">
                                    {/* Hiển thị nội dung đánh giá */}
                                    <p className="mt-2 text-gray-700">{review.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>

            <Footer/>
        </>
    );
};

export default ProductDetail;
