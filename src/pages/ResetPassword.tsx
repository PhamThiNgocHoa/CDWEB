import {useState, useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useNavigate, useParams} from "react-router-dom";
import useCustomer from "../hooks/useCustomer";

function ResetPassword() {
    const navigate = useNavigate();
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const {username} = useParams();
    const [user, setUser] = useState(username || "");
    const {fetchResetPassword} = useCustomer();

    useEffect(() => {
        setUser(username || "");
    }, [username]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchResetPassword(username, resetCode, newPassword)
        alert(`Reset mật khẩu cho ${username}\nMã xác nhận: ${resetCode}\nMật khẩu mới: ${newPassword}`);
        navigate("/login")
    };

    const inputClass =
        "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <>
            <Header/>
            <main className="min-h-[70vh] flex items-center justify-center bg-gray-100 px-4 py-20">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4"
                >
                    <h2 className="text-2xl font-semibold text-center">Đặt lại mật khẩu</h2>

                    <input
                        id="username"
                        type="hidden"
                        required
                        value={username}
                        className={inputClass}
                    />

                    <label className="block text-gray-700 font-medium" htmlFor="resetCode">
                        Mã xác nhận
                    </label>
                    <input
                        id="resetCode"
                        type="text"
                        required
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className={inputClass}
                        placeholder="Nhập mã xác nhận"
                    />

                    <label className="block text-gray-700 font-medium" htmlFor="newPassword">
                        Mật khẩu mới
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={inputClass}
                        placeholder="Nhập mật khẩu mới"
                    />

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Đặt lại mật khẩu
                    </button>
                </form>
            </main>
            <Footer/>
        </>
    );
}

export default ResetPassword;
