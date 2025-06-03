import React, {useState, useEffect} from "react";
import useCustomer from "../../../hooks/useCustomer";

const UpdateAccountPopup = ({onClose}: { onClose: () => void }) => {
    const {user, fetchUpdateCustomer} = useCustomer();

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

        const updatedCustomer = {
            ...user,
            ...formData,
        };

        await fetchUpdateCustomer(user.id, updatedCustomer);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4">Cập nhật tài khoản</h2>
                <form>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Họ và tên"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="mb-3 w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Ten dang nhap"
                        value={formData.username}
                        onChange={handleChange}
                        className="mb-3 w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        readOnly
                        className="mb-3 w-full border px-4 py-2 rounded bg-gray-100 cursor-not-allowed"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mb-3 w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mb-4 w-full border px-4 py-2 rounded"
                    />
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
