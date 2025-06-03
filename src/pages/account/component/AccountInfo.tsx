import React from "react";
import useCustomer from "../../../hooks/useCustomer";

const AccountInfo = ({onUpdate, onChangePassword}: { onUpdate: () => void; onChangePassword: () => void }) => {
    const { user } = useCustomer();


    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Thông tin tài khoản</h1>
            <div className="bg-white p-6 rounded shadow-md max-w-xl">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Họ và tên</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2"
                           defaultValue={user?.fullname}/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded px-4 py-2"
                           defaultValue={user?.email}/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2"
                           defaultValue={user?.phone}/>
                </div>
                <div className="flex gap-4">
                    <button onClick={onUpdate}
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Cập nhật tài khoản
                    </button>
                    <button onClick={onChangePassword}
                            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition">Đổi mật khẩu
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccountInfo;
