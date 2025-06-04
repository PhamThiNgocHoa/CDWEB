import React, { useState, useEffect } from "react";
import { Customer } from "../../../../models/Customer";

interface Props {
    user: Customer | null;
    onSubmit: (user: Customer) => void;
    onCancel?: () => void;  // thêm prop onCancel cho nút Hủy
}

function UserForm({ user, onSubmit, onCancel }: Props) {
    const [form, setForm] = useState<Customer>({
        fullname: "",
        password: "",
        phone: "",
        resetCode: "",
        username: "",
        id: "",
        email: "",
        role: "user",
    });

    useEffect(() => {
        if (user) setForm(user);
        else
            setForm({
                id: "",
                fullname: "",
                password: "",
                phone: "",
                resetCode: "",
                username: "",
                email: "",
                role: "user",
            });
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    const handleCancel = () => {
        setForm({
            id: "",
            fullname: "",
            password: "",
            phone: "",
            resetCode: "",
            username: "",
            email: "",
            role: "user",
        });
        if (onCancel) onCancel();
    };

    const isEditing = Boolean(form.id);

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Họ và tên"
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Số điện thọại"
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Tên đăng nhập"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                    className="border p-2 rounded"
                    required
                    readOnly={isEditing}
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <div className="space-x-3">
                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    {isEditing ? "Cập nhật" : "Thêm"}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                    Hủy
                </button>
            </div>
        </form>
    );
}

export default UserForm;
