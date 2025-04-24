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

        if (token) {
            localStorage.setItem("authToken", token);

            const decoded: any = jwtDecode(token);
            console.log("Decoded Token:", decoded);
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



