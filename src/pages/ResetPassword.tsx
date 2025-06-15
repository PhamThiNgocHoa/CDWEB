import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import useCustomer from "../hooks/useCustomer";

function ResetPassword() {
    const navigate = useNavigate();
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const { username } = useParams();
    const [user, setUser] = useState(username || "");
    const { fetchResetPassword } = useCustomer();

    useEffect(() => {
        setUser(username || "");
    }, [username]);

    // ✅ Regex kiểm tra mật khẩu mạnh
    const isStrongPassword = (password: string) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        return regex.test(password);
    };

    // ✅ Kiểm tra bất đồng bộ khi người dùng nhập mật khẩu
    const handlePasswordChange = (value: string) => {
        setNewPassword(value);
        if (!isStrongPassword(value)) {
            setError(
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
            );
        } else {
            setError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (error) return;

        try {
            await fetchResetPassword(username, resetCode, newPassword);
            alert("Đặt lại mật khẩu thành công!");
            navigate("/login");
        } catch (err) {
            setError("Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại mã xác nhận hoặc thử lại sau.");
        }
    };

    const inputClass =
        "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <>
            <Header />
            <main className="min-h-[70vh] flex items-center justify-center bg-gray-100 px-4 py-20">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4"
                >
                    <h2 className="text-2xl font-semibold text-center">Đặt lại mật khẩu</h2>

                    {error && (
                        <div className="text-red-600 text-sm text-center mb-2">{error}</div>
                    )}

                    <input id="username" type="hidden" required value={username} className={inputClass} />

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
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className={inputClass}
                        placeholder="Nhập mật khẩu mới"
                    />

                    <button
                        type="submit"
                        disabled={!!error || newPassword === ""}
                        className={`w-full text-white py-2 rounded-md transition ${
                            error || newPassword === ""
                                ? "bg-red-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                        Đặt lại mật khẩu
                    </button>
                </form>
            </main>
            <Footer />
        </>
    );
}

export default ResetPassword;
