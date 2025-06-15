import React, {useState} from "react";
import {Customer} from "../../../models/Customer";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import {CustomerRequest} from "../../../models/request/CustomerRequest";
import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import UserForm from "./component/UserForm";
import UserTable from "./component/UserTable";
import Footer from "../../../components/Footer";
import Notification from "../../../components/Notification";
import {useCustomerManagement} from "../../../hooks/useCustomerManagement";
import useCustomer from "../../../hooks/useCustomer";
import {useToken} from "../../../hooks/useToken";

function ManageUser() {
    const {user} = useCustomer();
    const token = useToken();
    const {
        customers,
        addNewCustomer,
        updateExistingCustomer,
        notification,
        setNotification,
        deleteExistingCustomer
    } = useCustomerManagement(token, user?.role);
    const [editingUser, setEditingUser] = useState<Customer | null>(null);

    const handleEdit = (user: CustomerResponse) => {
        setEditingUser(user);
    };

    const handleSubmit = async (customerRequest: CustomerRequest) => {
        if (editingUser && editingUser.id) {
            const updated = await updateExistingCustomer(editingUser.id, customerRequest);
            if (updated) {
                setEditingUser(null);
            }
        } else {

            await addNewCustomer(customerRequest);
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    return (
        <>
            <Header/>
            <div className="flex min-h-screen bg-gray-100 mt-32">
                {notification && (
                    <Notification message={notification.message} type={notification.type}
                                  onClose={() => setNotification(null)}/>
                )}
                <div
                    className="w-64 hidden md:block fixed top-[80px] left-0 h-[calc(100vh-80px)] overflow-y-auto z-40 bg-white shadow-lg">
                    <Sidebar/>
                </div>
                <main className="flex-1 ml-0 md:ml-64 p-6 pt-[100px]">
                    <h1 className="text-xl font-bold mb-4">Quản lý người dùng</h1>
                    <UserForm
                        user={editingUser}
                        onSubmit={handleSubmit}
                        onCancel={handleCancelEdit}
                    />
                    <UserTable users={customers} onDelete={deleteExistingCustomer} onEdit={handleEdit}/>
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default ManageUser;
