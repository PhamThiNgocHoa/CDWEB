// src/pages/OAuth2Redirect.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuth2Redirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("authToken", token);
            navigate("/");
        } else {
            navigate("/login?error=oauth");
        }
    }, []);

    return <div>Đang xử lý đăng nhập...</div>;
};

export default OAuth2Redirect;
