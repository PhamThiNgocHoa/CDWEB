import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";
import useCustomer from "../hooks/useCustomer";

function ForgotPassword() {
    const [username, setUsername] = useState("");
    const router = useNavigate();
    const {fetchInitPasswordReset} = useCustomer();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetchInitPasswordReset(username)
        }catch (error){
            console.log(error)
        }

        router(`/reset-password/${encodeURIComponent(username)}`);
    };

    return (
        <>
            <Header />
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-100 px-4 py-20">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Quên mật khẩu</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium">
                            Tên đăng nhập hoặc email
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tên đăng nhập hoặc email"
                        />
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Tiếp tục
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ForgotPassword;
