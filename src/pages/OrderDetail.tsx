import Header from "../components/Header";
import Footer from "../components/Footer";
import formatToVND from "../hooks/formatToVND";

function OrderDetail() {
    const order = {
        id: "ORD123456",
        status: "Đã giao hàng",
        date: "2024-05-20",
        total: 650000,
        shippingFee: 20000,
        recipient: {
            name: "Nguyễn Văn A",
            phone: "0909123456",
            email: "vana@gmail.com",
        },
        address: {
            street: "123 Đường ABC",
            ward: "Phường 5",
            district: "Quận 1",
            province: "TP. Hồ Chí Minh",
        },
        products: [
            {
                id: 1,
                name: "Sản phẩm A",
                quantity: 2,
                price: 150000,
                image: "https://pibook.vn/upload/product-slide/lay-mau-sac-diem-to-cuoc-doi-1.jpg",
            },
            {
                id: 2,
                name: "Sản phẩm B",
                quantity: 1,
                price: 350000,
                image: "https://pibook.vn/upload/product-slide/lay-mau-sac-diem-to-cuoc-doi-1.jpg",
            },
        ],
    };

    return (
        <>
            <Header/>
            <main className="bg-gray-100 min-h-screen py-10">
                <section className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-8 text-center text-red-500">
                        Chi tiết đơn hàng
                    </h1>

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
                                <strong>Họ tên:</strong> {order.recipient.name}
                            </li>
                            <li>
                                <strong>Số điện thoại:</strong> {order.recipient.phone}
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
                            {`${order.address.street}, ${order.address.ward}, ${order.address.district}, ${order.address.province}`}
                        </p>
                    </section>

                    {/* Danh sách sản phẩm */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span role="img" aria-label="Package">
                📦
              </span>{" "}
                            Sản phẩm đã đặt
                        </h2>
                        <div className="space-y-6">
                            {order.products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-24 h-24 rounded object-cover mr-6"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-lg">{product.name}</p>
                                        <p className="text-gray-600">Số lượng: {product.quantity}</p>
                                        <p className="text-gray-600">
                                            Giá: {formatToVND(product.price)}
                                        </p>
                                    </div>
                                    <div className="text-lg font-semibold text-red-500 text-right min-w-[100px]">
                                        {formatToVND(product.price * product.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tổng tiền & trạng thái */}
                    <section className="border-t pt-6 flex flex-row justify-between items-end space-y-2 text-gray-800">
                        <div>
                            <p className="text-green-600 font-semibold text-lg">
                                Trạng thái: {order.status}
                            </p>
                            <p>
                                <strong>Ngày đặt hàng:</strong> {order.date}
                            </p>
                            <p>
                                <strong>Mã đơn hàng:</strong> {order.id}
                            </p>
                        </div>
                        <div className="">
                            <p>
                                <strong>Phí vận chuyển:</strong>{" "}
                                {formatToVND(order.shippingFee)}
                            </p>
                            <p className="text-xl font-bold text-red-500 pt-2">
                                <strong>Tổng thanh toán:</strong>{" "}
                                {formatToVND(order.total + order.shippingFee)}
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
