import {checkEmail, checkTokenExpiration, checkUsername, logout} from "../server/api/authentication/auth.post";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                setIsLoggedIn(false);
                return;
            }

            try {
                const status = await checkTokenExpiration(token);

                if (status === 200) {
                    // 200 tức token còn hợp lệ
                    console.log("Token còn hợp lệ");
                    setIsLoggedIn(true);  // Cập nhật trạng thái đăng nhập
                } else {
                    alert("Phiên đăng nhập hết hạn");
                    localStorage.removeItem("authToken");
                    setIsLoggedIn(false);
                    navigate("/login");
                    console.log("Trạng thái khác:", status);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                // Gọi hàm logout (nếu có) hoặc set trạng thái
                handleLogout();
            }
        };

        verifyToken();
    }, []);

    const fetchCheckUsername = async (username: string) => {
        try {
            return await checkUsername(username);
        } catch (error) {
        }
    };

    const fetchCheckEmail = async (username: string) => {
        try {
            return await checkEmail(username);
        } catch (error) {
        }
    };


    return {isLoggedIn, handleLogout, setIsLoggedIn, fetchCheckUsername, fetchCheckEmail};
};
