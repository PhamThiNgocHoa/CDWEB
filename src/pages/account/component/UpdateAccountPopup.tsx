import React, {useState, useEffect} from "react";
import useCustomer from "../../../hooks/useCustomer";
import {data} from "react-router-dom";
import Notification from "../../../components/Notification";

const UpdateAccountPopup = ({onClose}: { onClose: () => void }) => {
    const {user, fetchUpdateCustomer, setUser} = useCustomer();
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);


    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        username: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullname: user.fullname || "",
                email: user.email || "",
                phone: user.phone || "",
                username: user.username || "",
                password: user.password || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        if (!user) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(0|\+84)\d{9}$/;

        // Kiểm tra hợp lệ
        if (!emailRegex.test(formData.email)) {
            setNotification({message: "Email không hợp lệ.", type: "error"});
            return;
        }

        if (!phoneRegex.test(formData.phone)) {
            setNotification({message: "Số điện thoại không hợp lệ.", type: "error"});
            return;
        }

        try {
            const updatedCustomer = {
                ...user,
                ...formData,
            };

            await fetchUpdateCustomer(user.id, updatedCustomer);
            setNotification({message: "Cập nhật tài khoản thành công!", type: "success"});
            onClose();
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Cập nhật thông tin thất bại.";

            setNotification({message, type: "error"});
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {notification && (
                <Notification message={notification.message} type={notification.type}
                              onClose={() => setNotification(null)}/>
            )}
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4">Cập nhật tài khoản</h2>
                <form>
                    <div className="flex">
                        <label className="w-32">Họ và tên</label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Họ và tên"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="mb-3 w-full border px-4 py-2 rounded"
                        />
                    </div>
                    <div className="flex">
                        <label className="w-32">Tên đăng nhập</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Ten dang nhap"
                            value={formData.username}
                            onChange={handleChange}
                            className="mb-3 w-full border px-4 py-2 rounded"
                        />
                    </div>

                    <div className="flex">
                        <label className="w-32">Mật khẩu</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={formData.password}
                            readOnly
                            className="mb-3 w-full border px-4 py-2 rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div className="flex">
                        <label className="w-32">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mb-3 w-full border px-4 py-2 rounded"
                        />
                    </div>

                    <div className="flex">
                        <label className="w-32">SDT</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mb-4 w-full border px-4 py-2 rounded"
                        />
                    </div>
                </form>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAccountPopup;
