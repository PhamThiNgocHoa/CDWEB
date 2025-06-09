import axios from "axios";

class ApiService {
    private static getAuthHeaders(body?: any) {
        const token = localStorage.getItem("authToken");

        const headers: any = {};

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        if (!(body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        return headers;
    }

    public static async request(
        url: string,
        method: string = "GET",
        body: any = null,
        headers: any = {},
        requireAuth: boolean = true,
        params: any = null
    ): Promise<any> {
        try {
            const combinedHeaders = requireAuth
                ? {...ApiService.getAuthHeaders(body), ...headers}
                : (!(body instanceof FormData)
                    ? {"Content-Type": "application/json", ...headers}
                    : {...headers});

            const axiosConfig: any = {
                url,
                method,
                headers: combinedHeaders,
                data: body,
            };

            if (params) {
                axiosConfig.params = params;
            }

            const response = await axios(axiosConfig);

            return response.data;
        } catch (error: any) {
            console.error("Error during API call:", error.message);
            throw new Error(
                `Error fetching data: ${error.response?.status} - ${error.response?.data || error.message}`
            );
        }
    }


    public static get(url: string, params: any = {}, headers: any = {}, requireAuth: boolean = true): Promise<any> {
        return ApiService.request(url, "GET", null, headers, requireAuth, params);
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
