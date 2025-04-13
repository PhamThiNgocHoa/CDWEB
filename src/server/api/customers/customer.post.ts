export const register = async (
    fullname: string,
    username: string,
    email: string,
    password: string,
    phone: string
): Promise<number> => {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({fullname, username, email, password, phone})
    });

    if (!res.ok) throw new Error((await res.json()).message || "Register failed");
    return await res.json();
};
export const initPasswordReset = async (username: string): Promise<void> => {
    const response = await fetch(`/api/customer/initPasswordReset/${username}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Password reset failed");
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















