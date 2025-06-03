import React, {useEffect, useState} from "react";
import useCustomer from "../../../hooks/useCustomer";

const ChangePasswordPopup = ({onClose}: { onClose: () => void }) => {
    const {user, changePass, fetchChangePassword} = useCustomer();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    });
    useEffect(() => {
        if (changePass) {
            setFormData({
                oldPassword: changePass.oldPassword || "",
                newPassword: changePass.newPassword || "",
            })
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async () => {
        if (!user) return;

        const changePassword = {
            ...changePass,
            ...formData,
        };

        await fetchChangePassword(user.id, changePassword);
        onClose();
    };
    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
                <form>
                    <input type="password"
                           name="oldPassword"
                           placeholder="Mật khẩu cũ"
                           onChange={handleChange}
                           className="mb-3 w-full border px-4 py-2 rounded"/>
                    <input type="password"
                           name="newPassword"
                           placeholder="Mật khẩu mới"
                           onChange={handleChange}
                           className="mb-4 w-full border px-4 py-2 rounded"/>
                </form>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Hủy
                    </button>
                    <button onClick={handleSubmit}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordPopup;
