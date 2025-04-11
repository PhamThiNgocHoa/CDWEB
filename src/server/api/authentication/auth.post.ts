import {jwtDecode} from 'jwt-decode';  // Sử dụng cú pháp import đúng

export const login = async (username: string, password: string): Promise<any> => {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        });

        if (!response.ok) throw new Error(`Login failed: ${response.status}`);

        const data = await response.json();

        const {token} = data.data;

        if (token) {
            localStorage.setItem("authToken", token);

            const decoded: any = jwtDecode(token);
        }

        return {success: true};
    } catch (error: any) {
        console.error("Error:", error.message);
        throw new Error("Login failed");
    }
};
