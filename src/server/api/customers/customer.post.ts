import {ChangePasswordDto} from "../../../models/ChangePasswordDto";

export const register = async (
    fullname: string,
    username: string,
    email: string,
    password: string,
    phone: string
): Promise<number> => {
    const res = await fetch("/api/customer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({fullname, username, email, password, phone})
    });

    if (!res.ok) throw new Error((await res.json()).message || "Register failed");
    return res.json();
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
    return data;
};
export const resetPassword = async (username: string, resetCode: string, newPassword: string): Promise<void> => {
    const params = new URLSearchParams({
        resetCode,
        newPassword
    });
    const response = await fetch(`/api/customer/resetPassword/${username}?${params.toString()}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({resetCode, newPassword})
    })
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Fail");
    return data
}












