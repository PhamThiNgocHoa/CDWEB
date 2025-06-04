import React, { useEffect, useState } from "react";
import useCustomer from "../../../hooks/useCustomer";
import Notification from "../../../components/Notification";

const ChangePasswordPopup = ({ onClose }: { onClose: () => void }) => {
    const { user, fetchChangePassword } = useCustomer();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!user) return;

        const { oldPassword, newPassword } = formData;

        if (!oldPassword || !newPassword ) {
            setNotification({ message: "Vui lòng nhập đầy đủ thông tin.", type: "error" });
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            setNotification({
                message: "Mật khẩu mới phải chứa ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
                type: "error",
            });
            return;
        }
        try {
            await fetchChangePassword(user.id, { oldPassword, newPassword });
            setNotification({ message: "Đổi mật khẩu thành công!", type: "success" });

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Đổi mật khẩu thất bại.";
            setNotification({ message, type: "error" });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {notification && (
                <Notification message={notification.message} type={notification.type}
                              onClose={() => setNotification(null)}/>
            )}
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
                <form>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Mật khẩu cũ"
                        onChange={handleChange}
                        className="mb-3 w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Mật khẩu mới"
                        onChange={handleChange}
                        className="mb-3 w-full border px-4 py-2 rounded"
                    />
                </form>

                {notification && (
                    <p className={`mb-3 text-sm ${notification.type === "error" ? "text-red-600" : "text-green-600"}`}>
                        {notification.message}
                    </p>
                )}

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
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPopup;
