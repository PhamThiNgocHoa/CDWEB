import { useState, useEffect } from "react";

export const useToken = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        setToken(storedToken && storedToken !== "null" ? storedToken : null);
    }, []);

    return token;
};
