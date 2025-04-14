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
                ? {...ApiService.getAuthHeaders(), ...headers}
                : {"Content-Type": "application/json", ...headers};

            const options: RequestInit = {
                method: method,
                headers: combinedHeaders,
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch data: ${response.status} - ${errorMessage}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error("Error during API call:", error.message);
            throw new Error(`Error fetching data: ${error.message}`);
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
