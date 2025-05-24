import {checkTokenExpiration, logout} from "../server/api/authentication/auth.post";
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
                const isExpired = await checkTokenExpiration(token);
                if (isExpired) {
                    alert("Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.");
                    handleLogout();
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                handleLogout();
            }
        };

        verifyToken();
    }, []);


    return {isLoggedIn, handleLogout, setIsLoggedIn};
};
