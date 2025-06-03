// src/pages/Register.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import {useRegisterForm} from "../hooks/useRegisterForm";

function Register() {
    const {
        fullname, username, email, password, phone,
        error, message, loading, isUsernameTaken, isEmailValid, isEmailTaken,
        isPhoneValid, isPasswordValid, handleChange, handleRegister
    } = useRegisterForm();

    return (
        <div>
            <Header/>
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
                <div className="flex justify-center items-center md:w-1/2 bg-blue-100 p-4">
                    <img
                        src="https://images.pexels.com/photos/810050/pexels-photo-810050.jpeg?cs=srgb&dl=blur-book-stack-books-810050.jpg&fm=jpg"
                        alt="Register"
                        className="max-w-full max-h-96 object-contain"
                    />
                </div>

                <div className="flex justify-center items-center md:w-1/2 bg-gray-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-3xl font-bold text-center text-gray-700 mb-6">Tạo tài khoản</h3>
                        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                        {message && <div className="text-green-500 text-center mb-4">{message}</div>}
                        <form onSubmit={handleRegister}>
                            {/* Họ tên */}
                            <div className="mb-4">
                                <label htmlFor="fullname" className="block text-sm font-semibold text-gray-600">Họ
                                    Tên</label>
                                <input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={fullname}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập họ tên"
                                />
                            </div>

                            {/* Username */}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Tên
                                    người dùng</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên người dùng"
                                />
                                {isUsernameTaken && (
                                    <div className="text-red-500 text-sm">Tên người dùng đã tồn tại</div>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email"
                                       className="block text-sm font-semibold text-gray-600">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập email của bạn"
                                />
                                {isEmailTaken && (
                                    <div className="text-red-500 text-sm">Email đã tồn tại</div>
                                )}
                                {!isEmailValid && (
                                    <div className="text-red-500 text-sm">Email không hợp lệ</div>
                                )}
                            </div>

                            {/* Số điện thoại */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-600">Số điện
                                    thoại</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    value={phone}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập số điện thoại"
                                />
                                {!isPhoneValid && (
                                    <div className="text-red-500 text-sm">Số điện thoại không hợp lệ</div>
                                )}
                            </div>

                            {/* Mật khẩu */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Mật
                                    khẩu</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mật khẩu"
                                />
                                {!isPasswordValid && (
                                    <div className="text-red-500 text-sm">Mật khẩu phải có ít nhất 8 ký tự, có chữ hoa
                                        và ký tự đặc biệt</div>
                                )}
                            </div>

                            {/* Nút đăng ký */}
                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className={`w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={loading}
                                >
                                    {loading ? "Đang đăng ký..." : "Tạo tài khoản"}
                                </button>
                            </div>

                            {/* Link đăng nhập */}
                            <div className="mt-4 text-center flex items-center text-center justify-center">
                                <p className="text-sm text-gray-600">Bạn đã có tài khoản?</p>
                                <a href="/" className="px-2 text-blue-500 text-sm hover:underline">Đăng nhập</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Register;
