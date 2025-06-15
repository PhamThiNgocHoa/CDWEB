import React, {useState} from "react";
import {CustomerResponse} from "../../../../models/response/CustomerResponse";
import UserItem from "./UserItem";
import {CustomerRequest} from "../../../../models/request/CustomerRequest";


interface Props {
    users: CustomerResponse[];
    onDelete: (id: string) => void;
    onEdit: (user: CustomerResponse) => void;
}

function UserTable({users, onDelete, onEdit}: Props) {
    const [viewingUser, setViewingUser] = useState<CustomerResponse | null>(null);

    const handleView = (user: CustomerResponse) => {
        setViewingUser(user);
    };

    return (
        <>
            <table className="w-full border border-gray-300 bg-white table-auto text-left">
                <thead className="bg-red-100">
                <tr>
                    <th className="px-4 py-2 border-b border-gray-300">Họ tên</th>
                    <th className="px-4 py-2 border-b border-gray-300">Email</th>
                    <th className="px-4 py-2 border-b border-gray-300">Vai trò</th>
                    <th className="px-4 py-2 border-b border-gray-300">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {users.filter(user => user.status === "ACTIVE").map(user => (
                    <UserItem
                        key={user.id}
                        user={user}
                        onDelete={onDelete}
                        onEdit={(customerRequest) => onEdit(customerRequest)}
                        onView={handleView}
                    />

                ))}
                </tbody>
            </table>


            {viewingUser && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setViewingUser(null)}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setViewingUser(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Chi tiết người dùng</h2>
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-medium">Họ tên:</span> {viewingUser.fullname}</p>
                            <p><span className="font-medium">Tên đăng nhập:</span> {viewingUser.username}</p>
                            <p><span className="font-medium">Email:</span> {viewingUser.email}</p>
                            <p><span className="font-medium">Điện thoại:</span> {viewingUser.phone}</p>
                            <p><span className="font-medium">Vai trò:</span> {viewingUser.role}</p>
                        </div>
                        <button
                            onClick={() => setViewingUser(null)}
                            className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-md font-semibold"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}

export default UserTable;
