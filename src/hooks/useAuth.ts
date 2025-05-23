import {checkTokenExpiration, logout} from "../server/api/authentication/auth.post"; // Import API logout
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        const verifyToken = async () => {
            if (token) {
                const isValid = await checkTokenExpiration(token);
                if (!isValid) {
                    alert("Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.");
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            }
        };

        verifyToken();
    }, []);

    return { isLoggedIn, handleLogout, setIsLoggedIn };
};
