import {jwtDecode} from 'jwt-decode';
import ApiService from "../ApiService";

export const login = async (username: string, password: string): Promise<any> => {
    try {
        const response = await ApiService.post("/api/auth/login", { username, password }, {}, false);

        const token = response.data.token;

        if (token) {
            localStorage.setItem("authToken", token);

            const decoded: any = jwtDecode(token);
            console.log("Decoded Token:", decoded);
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error:", error.message);
        throw new Error("Login failed");
    }
};



