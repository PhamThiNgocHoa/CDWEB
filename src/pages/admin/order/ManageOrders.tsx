import React, {useState} from "react";
import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import Footer from "../../../components/Footer";
import OrderList from "./component/OrderList";
import OrderForm from "./component/OrderForm";
import {OrderResponse} from "../../../models/response/OrderResponse";
import {OrderStatus} from "../../../enums/OrderStatus";
import {OrderFormData} from "../../../models/request/OrderFormData";
import {ClockIcon, CurrencyDollarIcon, ShoppingCartIcon, TruckIcon} from "@heroicons/react/16/solid";
import {BookForm} from "../../../enums/BookForm";


const StatCard = ({
                      title,
                      value,
                      icon: Icon,
                      bgColor = "bg-white"
                  }: {
    title: string;
    value: number | string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    bgColor?: string
}) => (
    <div className={`${bgColor} shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow cursor-default`}>
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
            <Icon className="w-8 h-8" />
        </div>
        <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{typeof value === "number" ? value.toLocaleString() : value}</p>
        </div>
    </div>
);

const ManageOrders = () => {

    const handleSave = (formData: OrderFormData, id?: string) => {
        const mappedOrder: Omit<OrderResponse, "id"> = {
            customerDTO: {
                id: "defaultCustomerId",
                fullname: "",
                email: "",
                phone: "",
                username: "",
                password: "",
                role: "user",
                cartId: ""
            },
            orderDate: formData.orderDate,
            totalAmount: formData.totalAmount,
            address: formData.address,
            numberPhone: formData.numberPhone,
            status: formData.status as OrderStatus,
            receiver: formData.receiver,
            orderDetails: [],
            discountCode: ""
        };

        if (id) {
            updateOrder(mappedOrder, id);
        } else {
            addOrder(mappedOrder);
        }
    };

    const [orders, setOrders] = useState<OrderResponse[]>([
        {
            id: "1",
            customerDTO: {
                id: "c001",
                fullname: "Nguyễn Văn A",
                email: "nguyenvana@example.com",
                phone: "0123456789",
                username: "nguyenvana",
                password: "hashedpassword",
                role: "user",
                cartId: "cart123",
            },
            totalAmount: 1500000,
            status: OrderStatus.PENDING,
            orderDate: "2025-05-01",
            address: "123 Đường ABC, Quận 1, TP. HCM",
            numberPhone: "0123456789",
            receiver: "Nguyễn Văn A",
            orderDetails: [
                {
                    id: "od001",
                    orderId: "1",
                    productResponseDTO: {
                        id: "p001",
                        name: "Sách Lập Trình React",
                        img: "/images/react-book.jpg",
                        price: 500000,
                        detail: "Sách hướng dẫn lập trình React chi tiết cho người mới bắt đầu",
                        supplier: "Nhà xuất bản ABC",
                        author: "Nguyễn Văn T",
                        publishYear: 2023,
                        publisher: "NXB Giáo dục",
                        language: "Tiếng Việt",
                        weight: 300,
                        size: "20x25 cm",
                        pageNumber: 350,
                        form: BookForm.AUDIOBOOK, // Giả sử enum BookForm = { Hardcover=1, Paperback=2,...}
                        categoryId: "cat01",
                        categoryName: "Công nghệ thông tin",
                        discount: 10,
                    },
                    quantity: 2,
                },
                {
                    id: "od002",
                    orderId: "1",
                    productResponseDTO: {
                        id: "p002",
                        name: "Sách Kỹ Năng Giao Tiếp",
                        img: "/images/communication-book.jpg",
                        price: 500000,
                        detail: "Sách kỹ năng mềm giúp bạn tự tin giao tiếp",
                        author: "Trần Thị H",
                        publishYear: 2022,
                        language: "Tiếng Việt",
                        pageNumber: 200,
                        form: BookForm.EBOOK,
                        categoryId: "cat02",
                        categoryName: "Kỹ năng mềm",
                        discount: 0,

                    },
                    quantity: 1,
                },
            ],
            discountCode: "DISCOUNT10",
        },
        {
            id: "2",
            customerDTO: {
                id: "c002",
                fullname: "Trần Thị B",
                email: "tranthib@example.com",
                phone: "0987654321",
                username: "tranthib",
                password: "hashedpassword",
                role: "user",
                cartId: "cart456",
            },
            totalAmount: 2500000,
            status: OrderStatus.DELIVERED,
            orderDate: "2025-05-03",
            address: "456 Đường XYZ, Quận 3, TP. HCM",
            numberPhone: "0987654321",
            receiver: "Trần Thị B",
            orderDetails: [
                {
                    id: "od003",
                    orderId: "2",
                    productResponseDTO: {
                        id: "p003",
                        name: "Sách Tiếng Anh Giao Tiếp",
                        img: "/images/english-book.jpg",
                        price: 1000000,
                        detail: "Sách học tiếng Anh giao tiếp cơ bản",
                        author: "John Smith",
                        publishYear: 2021,
                        language: "English",
                        pageNumber: 400,
                        form: BookForm.BOARD_BOOK,
                        categoryId: "cat03",
                        categoryName: "Ngoại ngữ",
                        discount: 5,

                    },
                    quantity: 2,
                },
                {
                    id: "od004",
                    orderId: "2",
                    productResponseDTO: {
                        id: "p004",
                        name: "Sách Quản Trị Kinh Doanh",
                        img: "/images/business-book.jpg",
                        price: 500000,
                        detail: "Sách kỹ năng quản trị và lãnh đạo doanh nghiệp",
                        author: "Nguyễn Văn Q",
                        publishYear: 2020,
                        language: "Tiếng Việt",
                        pageNumber: 300,
                        form: BookForm.HARDCOVER,
                        categoryId: "cat04",
                        categoryName: "Kinh doanh",
                        discount: 0,

                    },
                    quantity: 1,
                },
            ],
            discountCode: "",
        },
    ]);


    const [editingOrder, setEditingOrder] = useState<OrderResponse | null>(null);

    const addOrder = (orderData: Omit<OrderResponse, "id">) => {
        const newOrder = {
            id: (orders.length ? (parseInt(orders[orders.length - 1].id) + 1).toString() : "1"),
            ...orderData,
        };
        setOrders([...orders, newOrder]);
        setEditingOrder(null);
    };

    const updateOrder = (orderData: Omit<OrderResponse, "id">, id?: string) => {
        if (!id) return;
        setOrders(orders.map(o => (o.id === id ? { id, ...orderData } : o)));
        setEditingOrder(null);
    };

    const deleteOrder = (id: string) => {
        setOrders(orders.filter(o => o.id !== id));
    };

    const onEdit = (order: OrderResponse) => {
        setEditingOrder(order);
    };

    const onCancelEdit = () => {
        setEditingOrder(null);
    };

    // Thống kê
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING).length;
    const deliveredOrders = orders.filter(o => o.status === OrderStatus.DELIVERED).length;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 bg-gray-50">
                <Sidebar />
                <main className="flex-1 p-8 space-y-8 overflow-auto">

                    {/* Phần thống kê */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard title="Tổng đơn hàng" value={totalOrders} icon={ShoppingCartIcon} />
                        <StatCard title="Tổng doanh thu" value={`${totalRevenue.toLocaleString()} đ`} icon={CurrencyDollarIcon} />
                        <StatCard title="Đơn chờ xử lý" value={pendingOrders} icon={ClockIcon} bgColor="bg-yellow-100" />
                        <StatCard title="Đơn đã giao" value={deliveredOrders} icon={TruckIcon} bgColor="bg-green-100" />
                    </div>

                    {/* Form đặt hàng */}
                    <section className="bg-white rounded-lg shadow p-6">
                        <OrderForm
                            onSave={handleSave}
                            editingOrder={editingOrder}
                            onCancel={onCancelEdit}
                        />
                    </section>

                    {/* Danh sách đơn hàng */}
                    <section className="bg-white rounded-lg shadow p-6">
                        <OrderList orders={orders} onDelete={deleteOrder} onEdit={onEdit} />
                    </section>

                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ManageOrders;
