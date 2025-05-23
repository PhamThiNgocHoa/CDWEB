// hooks/useCheckToken.ts
import { useEffect } from "react";
import {checkTokenExpiration} from "../server/api/authentication/auth.post";

export const useCheckToken = () => {
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
};
