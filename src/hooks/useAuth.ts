import { logout } from "../server/api/authentication/auth.post"; // Import API logout
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

    return { isLoggedIn, handleLogout, setIsLoggedIn };
};
