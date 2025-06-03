import React, {useState, useEffect} from 'react';
import {OrderMethod, OrderMethodDisplayName} from "../../enums/OrderMethod";
import formatToVND from "../../hooks/formatToVND";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useAddress from "../../hooks/useAddress";
import useCustomer from "../../hooks/useCustomer";
import useCart from "../../hooks/useCart";
import useOrder from "../../hooks/useOrder";
import {OrderRequest} from "../../models/request/OrderRequest";
import {Address} from "../../models/Address";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {AddressRequest} from "../../models/request/AddressRequest";
import {OrderDetailRequest} from "../../models/request/OrderDetailRequest";
import {checkDiscount} from "../../server/api/order/order.post";
import {useNavigate} from "react-router-dom";
import Notification from "../../components/Notification";

const Checkout: React.FC = () => {
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<OrderMethod>(OrderMethod.COD);
    const [receiverName, setReceiverName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const navigate = useNavigate();


    const {
        fetchCreateAddress,
        loading,
        error,
        fetchAddressByCustomerId,
        adr,
        setAdr,
        fetchDeleteAddress,
        fetchUpdateAddress,
        fetchTotalAmount,
    } = useAddress();

    const {user} = useCustomer();
    const {cartData} = useCart(user?.id);
    const [provinces, setProvinces] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const {fetchCreateOrderAndPayment} = useOrder();
    const [finalTotalAmoun, setFinalTotalAmoun] = useState<number>();

    const totalAmount = cartData?.cartItems?.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    ) || 0;

    const handleSubmit = async () => {
        if (selectedAddress == null) {
            setNotification({message: "Vui lòng chọn địa chỉ thanh toán!", type: "error"})
        }
        const orderData: OrderRequest = {
            customerId: user?.id || "",
            address: selectedAddress.address || "",
            numberPhone: selectedAddress.numberPhone || "",
            receiver: selectedAddress.receiver || "",
            orderDetails: (cartData?.cartItems || []).map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            })),
            discountCode: discountCode || ""
        };
        try {
            const result = await fetchCreateOrderAndPayment(orderData, paymentMethod);
        } catch (err) {

        }
    };

    // Tạo địa chỉ mới
    const handleCreateAddress = async () => {
        const fullAddress = `${houseNumber ? houseNumber + ', ' : ''}${districts.find(d => d.code === Number(selectedDistrict))?.name || ''}, ${provinces.find(p => p.code === Number(selectedProvince))?.name || ''}`;
        const request = {
            address: fullAddress,
            numberPhone: phoneNumber,
            receiver: receiverName,
            note: "",
            customerId: user?.id ?? ""
        };
        const result = await fetchCreateAddress(request);
        if (result) {
            setNotification({message: "Tạo địa chỉ thành công!", type: "success"})
        } else {
            setNotification({message: "Tạo địa chỉ thất bại!", type: "error"})
        }
    };

    // Load địa chỉ của khách hàng khi user thay đổi
    useEffect(() => {
        const loadAddresses = async () => {
            if (!user) return;
            try {
                const address = await fetchAddressByCustomerId(user.id);
                setAdr(address ?? []);
            } catch (error) {
                console.error("Lỗi khi tải địa chỉ:", error);
                setAdr([]);
            }
        };
        loadAddresses();
    }, [user]);

    // Xử lý chọn địa chỉ giao hàng đã lưu
    const handleAddressSelect = (address: any) => {
        setSelectedAddress(address);
    };

    // Xóa địa chỉ giao hàng đã lưu
    const handleDeleteAddress = async (id: string) => {
        try {
            await fetchDeleteAddress(id);

            setAdr(prev => prev.filter((address) => address.id !== id));
            if (selectedAddress?.id === id) {
                setSelectedAddress(null);
            }
            setNotification({message: "Đã xóa địa chỉ thành công!", type: "success"})
        } catch (err) {
            console.error("Xóa địa chỉ thất bại:", err);
            setNotification({message: "Xóa địa chỉ thất bại!", type: "error"})
        }
    };

    const openEditModal = (address: Address) => {
        setEditingAddress(address);
        setIsEditingModalOpen(true);
    };

    const handleUpdateAddress = async (id: string, addressRequest: AddressRequest) => {
        const result = await fetchUpdateAddress(id, addressRequest);
        if (result) {
            setNotification({message: "Cập nhật địa chỉ thành công!", type: "success"})
            setIsEditingModalOpen(false);
            const updatedList = await fetchAddressByCustomerId(user?.id || "");
            setAdr(updatedList ?? []);
            if (selectedAddress?.id === id) {
                setSelectedAddress((prev: any) => ({
                    ...prev,
                    ...addressRequest
                }));
            }
        } else {
            setNotification({message: "Cập nhật địa chỉ thất bại!", type: "error"})

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

    // Lấy danh sách quận/huyện khi chọn tỉnh/thành
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

    const handleApplyDiscount = async () => {
        if (!cartData?.cartItems || !discountCode) {
            setNotification({message: "Vui lòng nhập mã giảm giá và kiểm tra giỏ hàng!", type: "error"})
            return;
        }

        const orderDetails: OrderDetailRequest[] = cartData.cartItems.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
        }));

        try {
            await checkDiscount(discountCode);

            const total = await fetchTotalAmount(orderDetails, discountCode);
            setFinalTotalAmoun(total);
        } catch (error: any) {
            setNotification({message: "Mã giảm giá không hợp lệ hoặc có lỗi xảy ra!", type: "error"})
        }
    };

    return (
        <>
            <Header/>
            <div className="w-full bg-gray-100">
                {notification && (
                    <Notification message={notification.message} type={notification.type}
                                  onClose={() => setNotification(null)}/>
                )}
                <div className="container mx-auto p-6">
                    <h2 className="text-2xl font-semibold mb-4">Trang thanh toán</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 bg-white p-6 rounded-md">
                        {/* Form tạo địa chỉ */}
                        <div>
                            <h3 className="font-medium text-lg mb-2">Tạo địa chỉ giao hàng</h3>
                            <form>
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
                                            value={`${districts.find(d => d.code === Number(selectedDistrict))?.name || ''}, ${provinces.find(p => p.code === Number(selectedProvince))?.name || ''}`}
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
                                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                />
                                <button
                                    type="button"
                                    onClick={handleCreateAddress}
                                    className="w-full bg-red-600 text-white p-2 rounded-md"
                                    disabled={loading}
                                >
                                    Tạo địa chỉ mới
                                </button>
                            </form>
                        </div>

                        {/* Danh sách địa chỉ có sẵn */}
                        <ul>
                            {(showAllAddresses ? adr : adr?.slice(0, 3))?.map((address: Address) => (
                                <li
                                    key={address.id}
                                    className={`border p-3 rounded-md mb-2 cursor-pointer ${
                                        selectedAddress?.id === address.id ? 'bg-blue-100' : ''
                                    }`}
                                    onClick={() => handleAddressSelect(address)}
                                >
                                    <span>{address.address}</span>
                                    <p>{address.receiver} - {address.numberPhone}</p>
                                    <button
                                        type="button"
                                        className="text-blue-600 text-sm px-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEditModal(address); // address ở đây là kiểu Address, bạn có thể cast về AddressRequest nếu cần
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>

                                    <button
                                        type="button"
                                        className="text-red-600 text-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteAddress(address.id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isEditingModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">Chỉnh sửa địa chỉ</h3>
                                <input value={selectedAddress?.id}/>

                                <input
                                    type="text"
                                    placeholder="Tên người nhận"
                                    value={editingAddress?.receiver || ''}
                                    onChange={(e) => setEditingAddress(prev => prev ? {
                                        ...prev,
                                        receiver: e.target.value
                                    } : null)}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    value={editingAddress?.numberPhone || ''}
                                    onChange={(e) => setEditingAddress(prev => prev ? {
                                        ...prev,
                                        numberPhone: e.target.value
                                    } : null)}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={editingAddress?.address || ''}
                                    onChange={(e) => setEditingAddress(prev => prev ? {
                                        ...prev,
                                        address: e.target.value
                                    } : null)}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                />

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsEditingModalOpen(false)}
                                        className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (editingAddress) {
                                                const updatedAddressRequest: AddressRequest = {
                                                    address: editingAddress.address,
                                                    numberPhone: editingAddress.numberPhone,
                                                    receiver: editingAddress.receiver,
                                                    note: "",
                                                    customerId: user?.id ?? "",
                                                };
                                                handleUpdateAddress(editingAddress.id, updatedAddressRequest);
                                            }
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                    >
                                        Cập nhật
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-row">
                        <div className="py-6 bg-white mr-5 px-6 rounded-md">
                            <input
                                type="text"
                                name="discountCode"
                                placeholder="Mã giảm giá"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="p-2 border border-gray-300 rounded-l-md"
                            />
                            <button
                                type="button"
                                onClick={handleApplyDiscount}
                                className="p-2 bg-blue-600 text-white rounded-r-md"
                            >
                                Áp dụng
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-md">
                            <h3 className="font-medium text-lg mb-4">Phương thức thanh toán</h3>
                            <div className="flex space-x-6">
                                {Object.values(OrderMethod).map((method) => (
                                    <div key={method} className="flex items-center">
                                        <input
                                            id={`payment-${method}`}
                                            type="radio"
                                            value={method}
                                            checked={paymentMethod === method}
                                            onChange={() => setPaymentMethod(method)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`payment-${method}`}>
                                            {OrderMethodDisplayName[method]}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-md mt-6">
                        <h3 className="font-medium text-lg mb-4">Đơn hàng của bạn</h3>
                        <table className="w-full text-left border border-gray-300 rounded-md">
                            <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300">Sản phẩm</th>
                                <th className="py-2 px-4 border-b border-gray-300">Số lượng</th>
                                <th className="py-2 px-4 border-b border-gray-300">Giá</th>
                                <th className="py-2 px-4 border-b border-gray-300">Tổng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartData?.cartItems?.map((item) => (
                                <tr key={item.product.id}>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.product.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.quantity}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{formatToVND(item.product.price)}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{formatToVND(item.product.price * item.quantity)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={3} className="text-right font-semibold py-2 px-4">Tổng cộng:</td>
                                <td className="font-semibold py-2 px-4">{formatToVND(totalAmount)}</td>
                            </tr>
                            <tr>
                                <td>Tiền sau khi giảm giá:</td>
                                <td>{formatToVND(finalTotalAmoun ?? totalAmount)}</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>


                    <button
                        onClick={handleSubmit}
                        className="mt-6 w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Checkout;
