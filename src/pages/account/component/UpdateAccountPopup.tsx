import React from "react";

const UpdateAccountPopup = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Cập nhật tài khoản</h2>
            <input type="text" placeholder="Họ và tên" className="mb-3 w-full border px-4 py-2 rounded" />
            <input type="email" placeholder="Email" className="mb-3 w-full border px-4 py-2 rounded" />
            <input type="text" placeholder="Số điện thoại" className="mb-4 w-full border px-4 py-2 rounded" />
            <div className="flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Hủy</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Lưu thay đổi</button>
            </div>
        </div>
    </div>
);

export default UpdateAccountPopup;
