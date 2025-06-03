import {jwtDecode} from 'jwt-decode';
import ApiService from "../ApiService";
import {IntrospectResponse} from "../../../models/response/IntrospectResponse";
import {IntrospectRequest} from "../../../models/request/IntrospectRequest";


export const register = async (
    fullname: string,
    username: string,
    email: string,
    password: string,
    phone: string
): Promise<void> => {
    try {
        const {data} = await ApiService.post("/api/auth/register", {
            fullname,
            username,
            email,
            password,
            phone
        }, {}, false);
        console.log("Registration successful:", data);
    } catch (error: any) {
        console.error("Registration failed:", error.message);
        throw new Error("Registration failed");
    }
};

export const login = async (username: string, password: string): Promise<any> => {
    try {
        const response = await ApiService.post("/api/auth/login", {username, password}, {}, false);

        const token = response.data.token;
        const user = response.data.user;

        if (token) {
            localStorage.setItem("authToken", token);
        }

        if (user) {
            localStorage.setItem("userId", user.id);
            localStorage.setItem("username", user.username);
            localStorage.setItem("user", JSON.stringify(user)); // lưu toàn bộ nếu cần
        }

        return {success: true};
    } catch (error: any) {
        console.error("Error:", error.message);
        throw new Error("Login failed");
    }
};

export const logout = (): Promise<void> => {
    return ApiService.post("/api/auth/logout", {}, {}, true).then(() => {
        localStorage.removeItem("authToken");
    });
};

export const authenticate = async (
    request: IntrospectRequest
): Promise<IntrospectResponse> => {
    return await ApiService.post("/api/auth/introspect", request);
};

export const checkTokenExpiration = async (token: string | null): Promise<number> => {
    if (!token) {
        return 401;
    }
    try {
        const response = await ApiService.post(`/api/auth/checkTokenExpiration/${token}`, {}, {}, false);
        return response.code;
    } catch (error: any) {
        console.error("checkTokenExpiration failed", error);
        return 500;
    }
};


export const checkUsername = async (username: string): Promise<boolean> => {
    const res = await ApiService.post("/api/auth/check-username", username, {"Content-Type": "text/plain"}, false);
    return res.data === true;
};

export const checkEmail = async (email: string): Promise<boolean> => {
    const res = await ApiService.post("/api/auth/check-email", email, {"Content-Type": "text/plain"}, false);
    return res.data === true;
};







