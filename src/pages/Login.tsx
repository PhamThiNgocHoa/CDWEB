import React, {useEffect, useState} from "react";
import useUsers from "../hooks/useCustomer";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useAuth} from "../hooks/useAuth";
import {checkTokenExpiration} from "../server/api/authentication/auth.post";

function Login() {
    const {handleLogin} = useUsers();
    const [formData, setFormData] = useState({username: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin(formData.username, formData.password);
            navigate("/home");
        } catch (err) {
            console.error("Login failed:", err);
        }
    };


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <Header/>

            {/* Main Content - Form đăng nhập */}
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
                {/* Phần bên trái - Hình ảnh */}
                <div className="flex justify-center items-center md:w-1/2 bg-blue-100 p-4">
                    <img
                        src="https://images.pexels.com/photos/810050/pexels-photo-810050.jpeg?cs=srgb&dl=blur-book-stack-books-810050.jpg&fm=jpg"
                        alt="Login"
                        className="max-w-full max-h-96 object-contain"
                    />
                </div>

                {/* Phần bên phải - Form đăng nhập */}
                <div className="flex justify-center items-center md:w-1/2 bg-gray-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-3xl font-bold text-center text-gray-700 mb-6">Đăng nhập</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Email/
                                    Số điện thoại</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập email hoặc số điện thoại"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Mật
                                    khẩu</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 focus:outline-none"
                            >
                                Đăng nhập
                            </button>
                        </form>
                        <button
                            type="submit"
                            className="w-full border-2 py-3 my-2 rounded-md hover:bg-red-200 focus:outline-none"
                        >
                            Đăng nhập bằng Google
                        </button>
                        <div className="mt-4 text-center flex items-center text-center justify-center">
                            <a href="/forgot-password" className="text-sm text-red-500 hover:underline">Quên mật
                                khẩu?</a>
                            <a className={"px-2 text-blue-500 text-sm hover:underline"} href="/register">Đăng ký tài
                                khoản</a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
}

export default Login;
