import React, {useState} from "react";
import {Customer} from "../../../models/Customer";
import {useAdmin} from "../../../hooks/useAdmin";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import {CustomerRequest} from "../../../models/request/CustomerRequest";
import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import UserForm from "./component/UserForm";
import UserTable from "./component/UserTable";
import Footer from "../../../components/Footer";
import Notification from "../../../components/Notification";

function ManageUser() {
    const { userAll, setUserAll, handleAddCustomer, handleUpdateCustomer, notification, setNotification, handleDeleteCustomer } = useAdmin();
    const [editingUser, setEditingUser] = useState<Customer | null>(null);

    const handleDelete = (id: string) => {
        setUserAll(prev => prev.filter(user => user.id !== id));
    };

    const handleEdit = (user: CustomerResponse) => {
        setEditingUser(user);
    };

    const handleSubmit = async (customerRequest: CustomerRequest) => {
        if (editingUser && editingUser.id) {
            console.log("Dữ liệu gửi lên để cập nhật:", customerRequest);

            // Cập nhật user
            const updated = await handleUpdateCustomer(editingUser.id, customerRequest);
            if (updated) {
                setEditingUser(null);
            }
        } else {
            // Thêm user mới
            await handleAddCustomer(customerRequest);
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    return (
        <>
            <Header />
            <div className="flex min-h-screen bg-gray-100">
                {notification && (
                    <Notification message={notification.message} type={notification.type}
                                  onClose={() => setNotification(null)}/>
                )}
                <Sidebar />
                <main className="flex-1 p-6">
                    <h1 className="text-xl font-bold mb-4">Quản lý người dùng</h1>
                    <UserForm
                        user={editingUser}
                        onSubmit={handleSubmit}
                        onCancel={handleCancelEdit}
                    />
                    <UserTable users={userAll} onDelete={handleDeleteCustomer} onEdit={handleEdit} />
                </main>
            </div>
            <Footer />
        </>
    );
}
export default ManageUser;
