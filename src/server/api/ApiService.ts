import axios from "axios";

class ApiService {
    private static getAuthHeaders() {
        const token = localStorage.getItem("authToken");

        const headers: any = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        return headers;
    }

    public static async request(
        url: string,
        method: string = "GET",
        body: any = null,
        headers: any = {},
        requireAuth: boolean = true
    ): Promise<any> {
        try {
            const combinedHeaders = requireAuth
                ? { ...ApiService.getAuthHeaders(), ...headers }
                : { "Content-Type": "application/json", ...headers };

            const axiosConfig: any = {
                url,
                method,
                headers: combinedHeaders,
                data: body,
            };

            const response = await axios(axiosConfig);

            return response.data;
        } catch (error: any) {
            console.error("Error during API call:", error.message);
            throw new Error(
                `Error fetching data: ${error.response?.status} - ${error.response?.data || error.message}`
            );
        }
    }

    public static get(url: string, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "GET", null, headers, requireAuth);
    }

    public static post(url: string, body: any, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "POST", body, headers, requireAuth);
    }

    public static put(url: string, body: any, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "PUT", body, headers, requireAuth);
    }

    public static delete(url: string, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "DELETE", null, headers, requireAuth);
    }

    public static patch(url: string, body: any, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "PATCH", body, headers, requireAuth);
    }
}

export default ApiService;
