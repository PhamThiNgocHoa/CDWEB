import { checkEmail, checkTokenExpiration, checkUsername, logout } from "../server/api/authentication/auth.post";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken"; // đường dẫn điều chỉnh theo vị trí thực tế của bạn

export const useAuth = () => {
    const navigate = useNavigate();
    const token = useToken();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Xác thực token khi thay đổi
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsLoggedIn(false);
                setError("Không có token đăng nhập");
                return;
            }

            try {
                const status = await checkTokenExpiration(token);
                if (status === 200) {
                    setIsLoggedIn(true);
                    console.log("Token còn hợp lệ");
                } else {
                    alert("Phiên đăng nhập hết hạn");
                    localStorage.removeItem("authToken");
                    setIsLoggedIn(false);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                handleLogout();
            }
        };

        verifyToken();
    }, [token]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("authToken");
            setIsLoggedIn(false);
            navigate("/login");
        }
    };

    const fetchCheckUsername = async (username: string) => {
        try {
            return await checkUsername(username);
        } catch (error) {
            console.error("Check username error:", error);
        }
    };

    const fetchCheckEmail = async (email: string) => {
        try {
            return await checkEmail(email);
        } catch (error) {
            console.error("Check email error:", error);
        }
    };

    return {
        isLoggedIn,
        handleLogout,
        setIsLoggedIn,
        fetchCheckUsername,
        fetchCheckEmail,
        token,
    };
};
