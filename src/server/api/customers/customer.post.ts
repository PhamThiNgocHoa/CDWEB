import {jwtDecode} from "jwt-decode";

export const login = async (username: string, password: string): Promise<any> => {
    try {
        const response = await fetch("/api/customer/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        });

        if (!response.ok) throw new Error(`Login failed: ${response.status}`);

        const {token} = await response.json();
        if (token) {
            localStorage.setItem("authToken", token);

            const decoded: any = jwtDecode(token);
            if (decoded.customerId) {
                localStorage.setItem("customerId", decoded.customerId.toString());
            }
        }

        return {success: true};
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Login failed");
    }
};
