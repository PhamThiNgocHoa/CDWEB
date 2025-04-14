import ApiService from "../ApiService";

export const register = async (
    fullname: string,
    username: string,
    email: string,
    password: string,
    phone: string
): Promise<void> => {
    try {
        const { data } = await ApiService.post("/api/auth/register", { fullname, username, email, password, phone }, {}, false);
        console.log("Registration successful:", data);
    } catch (error: any) {
        console.error("Registration failed:", error.message);
        throw new Error("Registration failed");
    }
};


export const initPasswordReset = async (username: string): Promise<void> => {
    const {data} = await ApiService.post(`/api/customer/initPasswordReset/${username}`, {}, {}, false);
    return data;
};
export const resetPassword = async (
    username: string,
    resetCode: string,
    newPassword: string
): Promise<void> => {
    const params = new URLSearchParams({
        resetCode,
        newPassword
    });

    const response = await fetch(`/api/customer/resetPassword/${username}?${params.toString()}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"}
    });

    if (!response.ok) {
        try {
            const data = await response.json();
            throw new Error(data.message || "Change password failed");
        } catch (err) {
            throw new Error("Unexpected error occurred");
        }
    }
};















