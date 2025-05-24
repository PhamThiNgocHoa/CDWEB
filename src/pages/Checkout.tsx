import React, {useState, useEffect} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {CartItemResponse} from "../models/response/CartItemResponse";
import ProductList from "../components/ProductList";
import {OrderMethod, OrderMethodDisplayName} from "../enums/OrderMethod";
import formatToVND from "../hooks/formatToVND";  // Import kiểu dữ liệu CartItemResponse

const Checkout: React.FC = () => {
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<OrderMethod>(OrderMethod.COD);
    const [receiverName, setReceiverName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [address, setAddress] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);  // Dữ liệu giỏ hàng

    // Danh sách tỉnh thành và quận huyện
    const [provinces, setProvinces] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);

    // Danh sách địa chỉ đã lưu - sử dụng useState để quản lý
    const [savedAddresses, setSavedAddresses] = useState([
        {
            id: 1,
            name: "Nguyễn Văn A",
            phone: "0123456789",
            address: "Số 12, Đường ABC, Quận 1, TP.HCM",
        },
        {
            id: 2,
            name: "Trần Thị B",
            phone: "0987654321",
            address: "Số 34, Đường XYZ, Quận 3, TP.HCM",
        },
    ]);

    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    const handleAddressSelect = (address: any) => {
        setSelectedAddress(address);
    };

    const handleDeleteAddress = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
            setSavedAddresses(savedAddresses.filter((address) => address.id !== id));
            if (selectedAddress?.id === id) {
                setSelectedAddress(null);
            }
        }
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/p');
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tỉnh thành:", error);
            }
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const fetchDistricts = async () => {
                try {
                    const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
                    const data = await response.json();
                    setDistricts(data.districts);
                } catch (error) {
                    console.error("Lỗi khi lấy danh sách quận huyện:", error);
                }
            };

            fetchDistricts();
        } else {
            setDistricts([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        const provinceName = provinces.find(p => p.code === Number(selectedProvince))?.name || '';
        const districtName = districts.find(d => d.code === Number(selectedDistrict))?.name || '';
        const fullAddress = `${houseNumber ? houseNumber + ', ' : ''}${districtName ? districtName + ', ' : ''}${provinceName}`;
        setAddress(fullAddress)
    }, [selectedProvince, selectedDistrict, provinces, districts, houseNumber]);


    useEffect(() => {
        const sampleCartItems: CartItemResponse[] = [
            {
                id: "1",
                product: {
                    id: "101",
                    name: "Áo Thun Nam",
                    price: 200000,
                    img: "https://cdn0.fahasa.com/media/catalog/product//i/m/image_195509_1_33297.jpg"
                },
                quantity: 2
            },
            {
                id: "2",
                product: {
                    id: "102",
                    name: "Quần Jeans",
                    price: 350000,
                    img: "https://cdn0.fahasa.com/media/catalog/product//i/m/image_195509_1_33297.jpg"
                },
                quantity: 1
            }
        ];

        setCartItems(sampleCartItems);
    }, []);

    const handleApplyDiscount = () => {
        console.log('Áp dụng mã giảm giá:', discountCode);
    };

    // Tính tổng số tiền của giỏ hàng
    const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <>
            <Header/>
            <div className="w-full bg-gray-100">
                <div className="container mx-auto p-6">
                    <h2 className="text-2xl font-semibold mb-4">Trang thanh toán</h2>

                    {/* Địa chỉ giao hàng và thông tin người nhận */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 bg-white p-6 rounded-md">
                        {/* Địa chỉ giao hàng */}
                        <div>
                            <h3 className="font-medium text-lg mb-2">Tạo địa chỉ giao hàng</h3>
                            <div className="mb-2">
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={selectedProvince || ''}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                >
                                    <option value="">Chọn tỉnh thành</option>
                                    {provinces.map((province: any) => (
                                        <option key={province.code} value={province.code}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedProvince && (
                                <>
                                    <div className="mb-2">
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedDistrict || ''}
                                            onChange={(e) => setSelectedDistrict(e.target.value)}
                                        >
                                            <option value="">Chọn quận huyện</option>
                                            {districts.map((district: any) => (
                                                <option key={district.code} value={district.code}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <input
                                        type="text"
                                        placeholder="Số nhà (nếu có)"
                                        value={houseNumber}
                                        onChange={(e) => setHouseNumber(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Tỉnh, Quận đã chọn"
                                        value={address}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                    />
                                </>
                            )}


                            <input
                                type="text"
                                placeholder="Tên người nhận"
                                value={receiverName}
                                onChange={(e) => setReceiverName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">Tạo</button>
                        </div>

                        {/* Danh sách địa chỉ giao hàng */}
                        <div>
                            <h3 className="font-medium text-lg mb-2">Chọn địa chỉ giao hàng đã lưu</h3>
                            <div className="space-y-4">
                                {savedAddresses.map((address) => (
                                    <div key={address.id} className="flex flex-row border p-4 rounded-lg shadow-md">
                                        <input
                                            type="checkbox"
                                            name="selectedAddress"
                                            checked={selectedAddress?.id === address.id}
                                            onChange={() => handleAddressSelect(address)}
                                            className="mr-4 w-4 h-4"
                                            style={{accentColor: "red"}}

                                        />
                                        <div>
                                            <p><strong>Tên người nhận:</strong> {address.name}</p>
                                            <p><strong>Số điện thoại:</strong> {address.phone}</p>
                                            <p><strong>Địa chỉ:</strong> {address.address}</p>
                                            <div className="mt-2 flex space-x-4">
                                                <button
                                                    onClick={() => alert('Chỉnh sửa địa chỉ')}
                                                    className="text-blue-500"
                                                >
                                                    Chỉnh sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAddress(address.id)}
                                                    className="text-red-500"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Áp mã giảm giá và chọn hình thức thanh toán */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Áp mã giảm giá */}
                        <div className="bg-white p-4">
                            <h3 className="font-medium text-lg mb-2">Áp mã giảm giá</h3>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md flex-1"
                                    placeholder="Nhập mã giảm giá"
                                />
                                <button
                                    onClick={handleApplyDiscount}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Áp dụng
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-4">
                            <h3 className="font-medium text-lg mb-2">Phương thức thanh toán</h3>
                            {Object.values(OrderMethod).map((method) => (
                                <label key={method} className="block mb-2">
                                    <input
                                        type="checkbox"
                                        name="paymentMethod"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={() => setPaymentMethod(method)}
                                        style={{accentColor: "red"}}
                                        className="mr-2 w-4 h-4"
                                    />
                                    {OrderMethodDisplayName[method]}
                                </label>
                            ))}
                        </div>


                    </div>

                    <div className="mb-6 bg-white p-4">
                        <h3 className="font-medium text-lg mb-2">Kiểm tra lại đơn hàng</h3>
                        <div className="grid grid-cols-1 gap-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="border p-4 rounded-lg shadow-md">
                                    <div className="flex items-center space-x-4">
                                        {/* Hình ảnh sản phẩm */}
                                        <img
                                            src={item.product.img}
                                            alt={item.product.name}
                                            className="w-24 h-24 object-cover"
                                        />
                                        <div className="flex-1">
                                            {/* Tên sản phẩm */}
                                            <h4 className="font-medium text-lg mb-2">{item.product.name}</h4>
                                            {/* Giá sản phẩm */}
                                            <p className="text-gray-600">Giá: {formatToVND(item.product.price)}</p>
                                            {/* Số lượng sản phẩm */}
                                            <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                        </div>
                                        {/* Tổng tiền cho sản phẩm */}
                                        <div>
                                            <p className="font-semibold">Tổng: {formatToVND(item.product.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-right mt-4">
                            <p className="text-lg font-semibold">Tổng cộng: {formatToVND(totalAmount)}</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="bg-red-500 text-white px-6 py-3 rounded-md">
                            Xác nhận thanh toán
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Checkout;
