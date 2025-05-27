import React from "react";

const ChangePasswordPopup = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
            <input type="password" placeholder="Mật khẩu cũ" className="mb-3 w-full border px-4 py-2 rounded" />
            <input type="password" placeholder="Mật khẩu mới" className="mb-4 w-full border px-4 py-2 rounded" />
            <div className="flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Hủy</button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Xác nhận</button>
            </div>
        </div>
    </div>
);

export default ChangePasswordPopup;
