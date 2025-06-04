import Header from "../../../components/Header";
import Sidebar from "../dasboard/Sidebar";
import Footer from "../../../components/Footer";
import React, {useState} from "react";
import UserForm from "./component/UserForm";
import UserTable from "./component/UserTable";
import {CustomerResponse} from "../../../models/response/CustomerResponse";
import {Customer} from "../../../models/Customer";


function ManageUser() {
    const [users, setUsers] = useState<CustomerResponse[]>([
        {
            id: "1",
            fullname: "Nguyễn Văn A",
            email: "a@gmail.com",
            role: "admin",
            phone: "0348429274",
            username: "a",
            password: "44556"
        },
        {
            id: "2",
            fullname: "Trần Thị B",
            email: "b@gmail.com",
            role: "user",
            phone: "0348429274",
            username: "a",
            password: "44556"
        },
    ]);
    const [editingUser, setEditingUser] = useState<Customer | null>(null);

    const handleDelete = (id: string) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    const handleEdit = (user: CustomerResponse) => {
        setEditingUser(user );
    };

    const handleSubmit = (user: Customer) => {
        if (!user.id) {
            const newUser = {...user, id: Date.now().toString()};
            setUsers(prev => [...prev, newUser]);
        } else {
            setUsers(prev =>
                prev.map(u => (u.id === user.id ? user : u))
            );
        }
        setEditingUser(null);
    };

    return (
        <>
            <Header/>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar/>
                <main className="flex-1 p-6">
                    <h1 className="text-xl font-bold mb-4">Quản lý người dùng</h1>
                    <UserForm user={editingUser} onSubmit={handleSubmit}/>
                    <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit}/>
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default ManageUser;
